/** @format */

import { addDoc, collection, } from "firebase/firestore";
import { db } from "../../firebase/firebase";

export default async function handler(req, res) {
  const currentDate = new Date();
  const customer = req.body;
  console.log(customer);
  console.log("-----------------------------------------------");

  const enteringDate = new Date(customer.enteringDate);
  const bookDate = new Date(customer.bookDate);
  const isViolate =
    Math.floor(
      (currentDate.getTime() - bookDate.getTime()) / (1000 * 60 * 60 * 24),
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
    bookNumNo: parseInt(customer.bookNum.slice(4)),
    keywords: [
      ...new Set([
        parseInt(customer.bookNum.slice(4)),
        customer.ownerSName.trim(),
        customer.ownerFName.trim(),
        customer.ownerTName.trim(),
        customer.ownerFoName.trim(),
        customer.bookNum.trim(),
        customer.bookType !== undefined ? customer.bookType : "عادي",
        customer.state ? customer.state : "لم يغادر",
        isViolate,
      ]),
    ],
  });

  await addDoc(collection(db, "customers"), {
    ...customer,
    isViolate: isViolate,
    enteringDateBySec: enteringDate.getTime(),
    bookDateBySec: bookDate.getTime(),
    bookNumNo: parseInt(customer.bookNum.slice(4)),
    keywords: [
      ...new Set([
        parseInt(customer.bookNum.slice(4)),
        customer.ownerSName,
        customer.ownerFName,
        customer.ownerTName,
        customer.ownerFoName,
        customer.bookNum.trim(),
        customer.bookType !== undefined ? customer.bookType : "عادي",
        customer.state ? customer.state : "لم يغادر",
        isViolate,
      ]),
    ],
  });
  res.status(200).json(customer);
}
