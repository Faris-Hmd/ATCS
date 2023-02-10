/** @format */

import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";
const currentDate = new Date();
export default async function handler(req, res) {
  const querySnapShot = await getDocs(collection(db, "cars"));
  const cars = querySnapShot.docs.map((customer) => {
    let customerData = customer.data();
    // console.log(customerData);
    async function addCustOmer() {
      const isViolate =
        Math.floor(
          (currentDate.getTime() - customerData.bookDateBySec) /
            (1000 * 60 * 60 * 24)
        ) > 365
          ? customerData.state === "غادر"
            ? "غير مخالف"
            : "مخالف"
          : "غير مخالف";
      await addDoc(collection(db, "customers"), {
        bookDateBySec: customerData.bookDateBySec,
        enteringDateBySec: customerData.enteringDateBySec,
        carType: customerData.carType,
        phone1: customerData.phone1,
        phone2: customerData.phone2,
        bookNum: customerData.bookNum,
        chaseNum: customerData.chaseNum,
        ownerFName: customerData.ownerFName,
        ownerSName: customerData.ownerSName,
        ownerTName: customerData.ownerTName,
        ownerFoName: customerData.ownerFoName,
        chaseNum: customerData.chaseNum,
        bookNumNo: customerData.bookNum.split("Ded0")[1]
          ? customerData.bookNum.split("Ded0")[1]
          : customerData.bookNum.split("Det0")[1],
        isViolate: isViolate,
        enteringDate: `${customerData.enteringMonth}/${customerData.enteringYear}`,
        keywords: [
          ...new Set([
            customerData.bookNum.split("Ded0")[1]
              ? customerData.bookNum.split("Ded0")[1]
              : customerData.bookNum.split("Det0")[1],
            customerData.ownerSName && customerData.ownerSName.trim(),
            customerData.ownerFName && customerData.ownerFName.trim(),
            customerData.ownerTName && customerData.ownerTName.trim(),
            customerData.ownerFoName && customerData.ownerFoName.trim(),
            customerData.bookNum.trim(),
            customerData.bookType,
            `${customerData.enteringMonth}/${customerData.enteringYear}`,
            customerData.state ? customerData.state : "لم يغادر",
            isViolate,
          ]),
        ],
      });
    }
    addCustOmer();
    return { ...customer.data() };
  });

  res.status(200).json(cars);
}
