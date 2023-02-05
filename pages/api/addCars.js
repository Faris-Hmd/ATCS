/** @format */

import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";

export default async function handler(req, res) {
  const currentDate = new Date();
  const customer = req.body;
  console.log(customer);
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
  await setDoc(doc(db, "cars", customer.bookNum), {
    ...customer,
    isViolate: isViolate,
    enteringDate: `${customer.enteringMonth}/${customer.enteringYear}`,
    enteringDateBySec: eDate.getTime(),
    bookDateBySec: bookDate.getTime(),
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
        `${customer.enteringMonth}/${customer.enteringYear}`,
        customer.state ? customer.state : "لم يغادر",
        isViolate,
      ]),
    ],
  });
  res.status(200).json(customer);
}
