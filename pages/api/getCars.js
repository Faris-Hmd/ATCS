/** @format */

import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { baseUrl } from "../_app";
export default async function handler(req, res) {
  const url = new URL(baseUrl + req.url);
  const searchParams = url.searchParams;
  const q = searchParams.get("q");
  const order = searchParams.get("orderBy");

  const querySnapShot = await getDocs(
    query(
      collection(db, "customers"),
      where("keywords", "array-contains", q),
      orderBy(order)
    )
  );
  const customers = querySnapShot.docs.map((customer) => {
    
    return { ...customer.data(), customerId: customer.id };
  });

  // console.log(customers);
  res.status(200).json(customers);
}
