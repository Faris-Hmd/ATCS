/** @format */

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { baseUrl } from "../_app";

export default async function handler(req, res) {
  const url = new URL(baseUrl + req.url);
  const searchParams = url.searchParams;
  const customerId = searchParams.get("customerId");
  console.log(req.method);
  switch (req.method) {
    case "GET":
      {
        const querySnapShot = await getDoc(doc(db, "customers", customerId));
        const customer = querySnapShot.data();
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

    case "POST":
      {
        const customer = req.body;
        console.log(customer);
        const enteringDate = new Date(customer.enteringDate);
        const bookDate = new Date(customer.bookDate);
        await addDoc(collection(db, "customers"), {
          ...customer,
          enteringDateBySec: enteringDate.getTime(),
          bookDateBySec: bookDate.getTime(),
          bookNumNo: parseInt(customer.bookNum.slice(4)),
          reapetEntry: false,
          keywords: [
            ...new Set([
              parseInt(customer.bookNum.slice(4)),
              customer.ownerSName,
              customer.ownerFName,
              customer.ownerTName,
              customer.ownerFoName,
              customer.bookNum.trim(),
              customer.bookType !== undefined ? customer.bookType : "عادي",
              customer.state,
            ]),
          ],
        });
        res.status(200).json(customer);
      }
      break;
    case "PATCH":
      {
        const customer = req.body;
        const enteringDate = new Date(customer.enteringDate);
        const bookDate = new Date(customer.bookDate);
        await updateDoc(doc(db, "customers", customer.customerId), {
          ...customer,
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
              customer.state,
            ]),
          ],
        });
        res.status(200).json(customer);
      }
      break;
    case "DELETE": {
      await deleteDoc(doc(db, "customers", customerId));
      res.status(200).json(true);
    }
    default:
      break;
  }
}
