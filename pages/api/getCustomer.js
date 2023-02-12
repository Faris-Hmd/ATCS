/** @format */

import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { baseUrl } from "../_app";

export default async function handler(req, res) {
  const url = new URL(baseUrl + req.url);
  const searchParams = url.searchParams;
  const bookNum = searchParams.get("bookNum");
  const querySnapShot = await getDocs(
    query(collection(db, "customers"), where("bookNum", "==", bookNum)),
  );
  const customer = querySnapShot.docs.at(0).data();
  const bookDate = new Date(customer.bookDateBySec);
  const enteringDate = new Date(customer.enteringDateBySec);
  console.log("-----------------------------------------------");

  // console.log({
  //   ...customer,
  //   bookDate: bookDate.toISOString().slice(0, 10),
  //   enteringDate: enteringDate.toISOString().slice(0, 10),
  //   customerId: querySnapShot.docs.at(0).id,
  // });
  res.status(200).json({
    ...customer,
    bookDate: bookDate.toISOString().slice(0, 10),
    enteringDate: enteringDate.toISOString().slice(0, 10),
    customerId: querySnapShot.docs.at(0).id,
  });
}
