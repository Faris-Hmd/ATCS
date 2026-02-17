const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const customerRoutes = require("./routes/customerRoutes");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

// Load env vars
dotenv.config();

// Connect to database
// connectDB(); // Call this after validation or inside a start function

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
// Routes
app.use("/api/customers", customerRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;

// Start server function
const start = async () => {
  if (!process.env.MONGO_URI) {
    console.log("MONGO_URI not found in .env, skipping DB connection for now.");
  } else {
    await connectDB();
  }

  app.listen(PORT, console.log(`Server running on port ${PORT}`));
};

start();
