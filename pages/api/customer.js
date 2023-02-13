/** @format */

import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { baseUrl } from "../_app";

export default async function handler(req, res) {
  const currentDate = new Date();
  const url = new URL(baseUrl + req.url);
  const searchParams = url.searchParams;
  const customerId = searchParams.get("customerId");
  switch (req.method) {
    case "GET":
      {
        const querySnapShot = await getDoc(doc(db, "customers", customerId));
        const customer = querySnapShot.data();
        console.log(customer);
        const bookDate = new Date(customer.bookDateBySec);
        const enteringDate = new Date(customer.enteringDateBySec);
        res.status(200).json({
          ...customer,
          bookDate: bookDate.toISOString().slice(0, 10),
          enteringDate: enteringDate.toISOString().slice(0, 10),
          customerId: querySnapShot.id,
        });
      }
      break;

    case "POST": {
      const customer = req.body;
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

      await setDoc(doc(db, "customers", customer.customerId), {
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

    case "DELETE": {
      await deleteDoc(doc(db, "cars", customerId));
      res.status(200).json(true);
    }
    default:
      break;
  }
}
