/** @format */

import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";

export default async function handler(req, res) {
  const querySnapShot = await getDocs(collection(db, "cars"));
  const customers = querySnapShot.docs.map((costomer) => {
    return { ...costomer.data() };
  });

  const currentDate = new Date();
  customers.slice(560).map((customer) => {
    console.log(1);
    var eDate = new Date(
      `${customer.enteringMonth}/${customer.enteringDay}/${customer.enteringYear}`
    );

    const bookDate = new Date(
      `${customer.bookYear}-${customer.bookMonth}-${customer.bookDay}`
    );
    const isViolate =
      Math.floor(
        (currentDate.getTime() - bookDate.getTime()) / (1000 * 60 * 60 * 24)
      ) > 365
        ? customer.state === "غادر"
          ? "غير مخالف"
          : "مخالف"
        : "غير مخالف";
    console.log(isViolate);
    setDoc(doc(db, "cars", customer.bookNum), {
      ...customer,
      isViolate: isViolate,
      enteringDate: `${customer.enteringMonth}/${customer.enteringYear}`,
      enteringDateBySec: eDate.getTime(),
      bookDateBySec: bookDate.getTime(),
      keywords: [
        ...new Set([
          customer.bookNum.split("Ded")[1]
            ? customer.bookNum.split("Ded")[1]
            : customer.bookNum.split("Det")[1],
          customer.ownerSName.trim(),
          customer.ownerFName.trim(),
          customer.ownerTName.trim(),
          customer.ownerFoName.trim(),
          customer.bookNum.trim(),
          customer.bookType,
          `${customer.enteringMonth}/${customer.enteringYear}`,
          customer.state ? customer.state : "لم يغادر",
          isViolate,
        ]),
      ],
    });

    // console.log(customer);
    // axios({
    //   method: "post",
    //   url: `${baseUrl}/api/addCars`,
    //   data: {
    //     ...customer,
    //   },
    // });
  });
  res.status(200).json(true);
}
