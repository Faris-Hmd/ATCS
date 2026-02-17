const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Customer = require("./models/Customer");

// Load env vars
dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const importData = async () => {
  await connectDB();

  const customers = [];
  const firstNames = [
    "Ahmed",
    "Mohamed",
    "Ali",
    "Omar",
    "Khalid",
    "Fahad",
    "Saeed",
    "Yousef",
    "Ibrahim",
    "Hassan",
  ];
  const lastNames = [
    "Al-Ghamdi",
    "Al-Harbi",
    "Al-Otaibi",
    "Al-Qahtani",
    "Al-Zahrani",
    "Al-Dossari",
    "Al-Mutairi",
    "Al-Shehri",
    "Al-Amri",
    "Al-Subaie",
  ];
  const cities = ["Riyadh", "Jeddah", "Dammam", "Khartoum", "Mecca", "Medina"];
  const carTypes = [
    "Toyota",
    "Hyundai",
    "Nissan",
    "Ford",
    "Chevrolet",
    "Kia",
    "Honda",
    "Mazda",
  ];
  const carModels = [
    "Camry",
    "Corolla",
    "Sonata",
    "Elantra",
    "Altima",
    "Taurus",
    "Caprice",
    "Optima",
    "Accord",
    "CX-9",
  ];
  const states = ["In Sudan", "Cleared", "Left"];
  const bookTypes = ["عادي", "سياحي"];

  for (let i = 0; i < 50; i++) {
    const randomDate = (start, end) =>
      new Date(
        start.getTime() + Math.random() * (end.getTime() - start.getTime()),
      );

    // Generate variables that are used for multiple fields
    const ownerFName =
      firstNames[Math.floor(Math.random() * firstNames.length)];
    const ownerSName =
      firstNames[Math.floor(Math.random() * firstNames.length)];
    const ownerTName = lastNames[Math.floor(Math.random() * lastNames.length)];

    const customer = {
      ownerFName,
      ownerSName,
      ownerTName,
      ownerFoName: "Customer_" + i,
      passport: "P" + Math.floor(10000000 + Math.random() * 90000000),
      natId: Math.floor(1000000000 + Math.random() * 9000000000).toString(),
      ownerEnteringDate: randomDate(new Date(2023, 0, 1), new Date()),
      passportIssueDate: randomDate(
        new Date(2018, 0, 1),
        new Date(2022, 11, 31),
      ),
      ownerResEndDate: randomDate(new Date(2024, 0, 1), new Date(2026, 11, 31)),
      ownerEmail: `customer${i}@example.com`,

      carType: carTypes[Math.floor(Math.random() * carTypes.length)],
      carModel: carModels[Math.floor(Math.random() * carModels.length)],
      chaseNum:
        "CH" + Math.random().toString(36).substring(2, 15).toUpperCase(),
      carColor: ["White", "Black", "Silver", "Red", "Blue"][
        Math.floor(Math.random() * 5)
      ],
      plateNum: Math.floor(1000 + Math.random() * 9000) + " ABC",
      engineNum:
        "ENG" + Math.random().toString(36).substring(2, 10).toUpperCase(),
      carValue: (Math.floor(Math.random() * 50) + 20) * 1000 + "",
      carRegCoun: "KSA",

      carnetNo: "CN" + Math.floor(10000 + Math.random() * 90000),
      bookDate: randomDate(new Date(2023, 0, 1), new Date()),
      bookType: bookTypes[Math.floor(Math.random() * bookTypes.length)],
      shippingPort: ["Jeddah", "Yanbu", "Dammam"][
        Math.floor(Math.random() * 3)
      ],
      arrivalDest: ["Suakin", "Port Sudan"][Math.floor(Math.random() * 2)],

      addressKsa: {
        city: cities[Math.floor(Math.random() * cities.length)],
        phone: "+9665" + Math.floor(10000000 + Math.random() * 90000000),
      },
      addressSudan: {
        city: "Khartoum",
        phone1: "+2499" + Math.floor(10000000 + Math.random() * 90000000),
      },
    };

    // --- Business logic ---

    // Pick a state
    const state = states[Math.floor(Math.random() * states.length)];
    customer.state = state;

    // Extended: ~15% chance → available time becomes 180 days
    const isExtended = Math.random() < 0.15;
    customer.extended = isExtended;
    customer.availableTime = isExtended ? 180 : 90;

    // Entering date: always set (sometime in the past year)
    const enteringDate = randomDate(
      new Date(Date.now() - 365 * 24 * 60 * 60 * 1000), // up to 1 year ago
      new Date(),
    );
    customer.enteringDate = enteringDate;

    // Left date: only if state is "Left"
    if (state === "Left") {
      // Left sometime between entering and now
      customer.leftDate = randomDate(enteringDate, new Date());
    }

    // Staying time: diff in days
    const endRef = customer.leftDate || new Date(); // left date or today
    const diffMs = endRef.getTime() - enteringDate.getTime();
    const stayingDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    customer.stayingTime = stayingDays;

    // Violator: auto-set if staying time exceeds available time
    customer.violator = stayingDays > customer.availableTime;

    // Explicitly add keywords array as requested, matching the hook logic for consistency
    // User requested: Fname, Sname, Carnet, Chase
    const keywords = new Set(
      [
        customer.carnetNo,
        customer.ownerFName,
        customer.ownerSName,
        customer.ownerTName,
        customer.ownerFoName,
        `${customer.ownerFName} ${customer.ownerSName}`,
        `${customer.ownerFName} ${customer.ownerSName} ${customer.ownerTName}`,
        customer.passport,
        customer.chaseNum,
        customer.state,
      ].filter(Boolean),
    );

    customer.keywords = Array.from(keywords);

    customers.push(customer);
  }

  try {
    await Customer.deleteMany(); // Optional: clear existing data
    console.log(
      "Data Destroyed (Optional step, assuming you want a fresh start or remove if you want append)",
    );

    await Customer.insertMany(customers);
    console.log("Data Imported!");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  await connectDB();

  try {
    await Customer.deleteMany();
    console.log("Data Destroyed!");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
