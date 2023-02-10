/** @format */

import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { baseUrl } from "../_app";

export default async function handler(req, res) {
  const url = new URL(baseUrl + req.url);
  const searchParams = url.searchParams;
  const customerId = searchParams.get("customerId");
  const querySnapShot = await getDoc(doc(db, "customers", customerId));
  const customer = querySnapShot.data();
  const bookDate = new Date(customer.bookDateBySec);
  const enteryDate = new Date(customer.enteringDateBySec);

  const bd =
    bookDate.getDate().toString().length === 1
      ? `0${bookDate.getDate().toString()}`
      : `${bookDate.getDate().toString()}`;
  const bm =
    bookDate.getDate().toString().length === 1
      ? `0${(bookDate.getMonth() + 1).toString()}`
      : `${bookDate.getDate().toString()}`;
  const by = bookDate.getFullYear();
  const ed =
    bookDate.getDate().toString().length === 1
      ? `0${enteryDate.getDate().toString()}`
      : `${enteryDate.getDate().toString()}`;
  const em =
    enteryDate.getDate().toString().length === 1
      ? `0${(enteryDate.getMonth() + 1).toString()}`
      : `${enteryDate.getDate().toString()}`;
  const ey = enteryDate.getFullYear();

  res.status(200).json({
    ...customer,
    bookDate: by + "-" + bm + "-" + bd,
    enteringDate: ey + "-" + em + "-" + ed,
    customerId: querySnapShot.id,
  });
}
