/** @format */

import {  doc, getDoc, } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { baseUrl } from "../_app";

export default async function handler(req, res) {
  const url = new URL(baseUrl + req.url);
  const searchParams = url.searchParams;
  const bookNum = searchParams.get("bookNum");
  const querySnapShot = await getDoc(
      doc(db,"cars", bookNum ),
  );
  const car = querySnapShot.data()
  res.status(200).json(car);
}