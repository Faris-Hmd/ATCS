/** @format */

import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { baseUrl } from "../_app";

export default async function handler(req, res) {
  const url = new URL(baseUrl + req.url);
  const carnetNo = url.searchParams.get("carnetNo");
  switch (req.method) {
    case "GET":
      {
        const querySnapShot = await getDocs(
          query(
            collection(db, "customers"),
            where("keywords", "array-contains", carnetNo)
          )
        );

        const isCustClr = querySnapShot.docs.find(
          (cust) => cust.data().state === "مخلص"
        );
        if (isCustClr) {
          return res.status(406).send({ error: "تم تخليص مركبة هذا العميل" });
        }

        const isCustVio = querySnapShot.docs.find(
          (cust) => cust.data().state === "مخالف"
        );
        if (isCustVio) {
          return res.status(406).send({ error: "هذا العميل مخالف" });
        }

        const newEntryCustomer = querySnapShot.docs.find(
          (cust) => cust.data().enteringDateBySec === 0
        );

        if (newEntryCustomer) {
          const bookDate = new Date(newEntryCustomer.data().bookDateBySec);
          res.status(200).json({
            ...newEntryCustomer.data(),
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
  }
}
