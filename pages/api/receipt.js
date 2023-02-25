/** @format */

import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { baseUrl } from "../_app";

export default async function handler(req, res) {
  const url = new URL(baseUrl + req.url);
  const bookNum = url.searchParams.get("bookNum");
  switch (req.method) {
    case "GET":
      {
        const querySnapShot = await getDocs(
          query(
            collection(db, "customers"),
            where("keywords", "array-contains", bookNum)
          )
        );

        const customer = querySnapShot.docs.find(
          (cust) => cust.data().enteringDateBySec === 0
        );

        if (customer) {
          const bookDate = new Date(customer.data().bookDateBySec);
          res.status(200).json({
            ...customer.data(),
            repeatEntry: false,
            customerId: querySnapShot.docs.at(0).id,
            bookDate: bookDate.toISOString().slice(0, 10),
          });
        } else {
          const bookDate = new Date(
            querySnapShot.docs.at(0).data().bookDateBySec
          );
          res.status(200).json({
            ...querySnapShot.docs.at(0).data(),
            repeatEntry: true,
            customerId: querySnapShot.docs.at(0).id,
            bookDate: bookDate.toISOString().slice(0, 10),
          });
        }
      }
      break;

    case "PATCH":
      {
        const premessions = req.body;
        await updateDoc(doc(db, "userType", userType), premessions);
        res.status(200).json("update");
      }
      break;
  }
}
