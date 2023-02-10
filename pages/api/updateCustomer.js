/** @format */

import { doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";

export default async function handler(req, res) {
  const currentDate = new Date();
  const customer = req.body;
  // console.log(customer);
  console.log("-----------------------------------------------");

  const enteringDate = new Date(customer.enteringDate);
  const bookDate = new Date(customer.bookDate);
  const isViolate =
    Math.floor(
      (currentDate.getTime() - bookDate.getTime()) / (1000 * 60 * 60 * 24)
    ) > 365
      ? customer.state === "غادر"
        ? "غير مخالف"
        : "مخالف"
      : "غير مخالف";

  console.log({
    ...customer,
    isViolate: isViolate,
    enteringDateBySec: enteringDate.getTime(),
    bookDateBySec: bookDate.getTime(),
    bookNumNo: customer.bookNum.split("Ded0")[1]
      ? customer.bookNum.split("Ded0")[1]
      : customer.bookNum.split("Det0")[1],
    keywords: [
      ...new Set([
        customer.bookNum.split("Ded0")[1]
          ? customer.bookNum.split("Ded0")[1]
          : customer.bookNum.split("Det0")[1],
        customer.ownerSName.trim(),
        customer.ownerFName.trim(),
        customer.ownerTName.trim(),
        customer.ownerFoName.trim(),
        customer.bookNum.trim(),
        customer.bookType,
        customer.state ? customer.state : "لم يغادر",
        isViolate,
      ]),
    ],
  });

  await updateDoc(doc(db, "customers", customer.customerId), {
    ...customer,
    isViolate: isViolate,
    enteringDateBySec: enteringDate.getTime(),
    bookDateBySec: bookDate.getTime(),
    bookNumNo: customer.bookNum.split("Ded0")[1]
      ? customer.bookNum.split("Ded0")[1]
      : customer.bookNum.split("Det0")[1],
    keywords: [
      ...new Set([
        customer.bookNum.split("Ded0")[1]
          ? customer.bookNum.split("Ded0")[1]
          : customer.bookNum.split("Det0")[1],
        customer.ownerSName.trim(),
        customer.ownerFName.trim(),
        customer.ownerTName.trim(),
        customer.ownerFoName.trim(),
        customer.bookNum.trim(),
        customer.bookType,
        customer.state ? customer.state : "لم يغادر",
        isViolate,
      ]),
    ],
  });
  res.status(200).json(customer);
}
