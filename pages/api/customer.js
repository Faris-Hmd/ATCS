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
  const currentDate = new Date();

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
        const leftDate = customer.leftDate ? new Date(customer.leftDate) : 0;
        const clearDate = customer.clearDate ? new Date(customer.clearDate) : 0;

        const stayingTime =
          customer.state === "غادر" && leftDate !== 0
            ? (leftDate.getTime() - customer.enteringDateBySec) /
              (1000 * 60 * 60 * 24)
            : customer.state === "مخلص" && clearDate !== 0
            ? (clearDate.getTime() - customer.enteringDateBySec) /
              (1000 * 60 * 60 * 24)
            : (currentDate.getTime() - customer.enteringDateBySec) /
              (1000 * 60 * 60 * 24);

        res.status(200).json({
          ...customer,
          stayingTime,
          leftDateBySec: leftDate.getTime(),
          bookDate: bookDate.toISOString().slice(0, 10),
          enteringDate: enteringDate.toISOString().slice(0, 10),
          customerId: querySnapShot.id,
        });

        // console.log({
        //   ..customer,
        //   bookDate: bookDate.toISOString().slice(0, 10),
        //   enteringDate: enteringDate.toISOString().slice(0, 10),
        //   customerId: querySnapShot.id,
        // });
      }
      break;
    case "POST":
      {
        const customer = req.body;
        // console.log(customer);
        const enteringDate = new Date(customer.enteringDate);
        const bookDate = new Date(customer.bookDate);
        // console.log({
        //   ..customer,
        //   enteringDate: customer.enteringDate === 0 ? 0 : enteringDate,
        //   sixMonthEx: false,
        //   threeMonthEx: false,
        //   leftEx: false,
        //   enteringDateBySec: enteringDate.getTime(),
        //   bookDateBySec: bookDate.getTime(),
        //   bookNumNo: customer.carnetNo.slice(4),
        //   state: "لم يغادر",
        //   keywords: [
        //     ..new Set([
        //       customer.carnetNo.slice(4),
        //       customer.ownerSName,
        //       customer.ownerFName,
        //       customer.ownerTName,
        //       customer.ownerFoName,
        //       customer.carnetNo.trim(),
        //       customer.bookType !== undefined ? customer.bookType : "عادي",
        //       "لم يغادر",
        //     ]),
        //   ],
        // });
        await addDoc(collection(db, "customers"), {
          ...customer,
          enteringDate: customer.enteringDate === 0 ? 0 : enteringDate,
          sixMonthEx: false,
          threeMonthEx: false,
          leftEx: false,
          enteringDateBySec: enteringDate.getTime(),
          bookDateBySec: bookDate.getTime(),
          bookNumNo: customer.carnetNo.slice(4),
          state: "لم يغادر",
          keywords: [
            ...new Set([
              customer.carnetNo.slice(4),
              customer.ownerSName,
              customer.ownerFName,
              customer.ownerTName,
              customer.ownerFoName,
              customer.carnetNo.trim(),
              customer.bookType !== undefined ? customer.bookType : "عادي",
              "لم يغادر",
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
        // console.log({
        //   ..customer,
        //   enteringDateBySec: enteringDate.getTime(),
        //   bookDateBySec: bookDate.getTime(),
        //   bookNumNo: parseInt(customer.carnetNo.slice(4)),
        //   keywords: [
        //     ..new Set([
        //       customer.carnetNo.slice(4),
        //       customer.ownerSName,
        //       customer.ownerFName,
        //       customer.ownerTName,
        //       customer.ownerFoName,
        //       customer.carnetNo.trim(),
        //       customer.bookType !== undefined ? customer.bookType : "عادي",
        //       customer.state,
        //     ]),
        //   ],
        // });

        await updateDoc(doc(db, "customers", customer.customerId), {
          ...customer,
          enteringDateBySec: enteringDate.getTime(),
          bookDateBySec: bookDate.getTime(),
          bookNumNo: parseInt(customer.carnetNo.slice(4)),
          keywords: [
            ...new Set([
              customer.carnetNo.slice(4),
              customer.ownerSName,
              customer.ownerFName,
              customer.ownerTName,
              customer.ownerFoName,
              customer.carnetNo.trim(),
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
