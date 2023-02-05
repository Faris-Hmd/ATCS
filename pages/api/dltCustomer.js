/** @format */

import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { baseUrl } from "../_app";

export default async function handler(req, res) {
  const url = new URL(baseUrl + req.url);
  const searchParams = url.searchParams;
  const bookNum = searchParams.get("bookNum");
  await deleteDoc(doc(db, "cars", bookNum));
  res.status(200).json(true);
}
