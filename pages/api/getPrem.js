/** @format */

import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { baseUrl } from "../_app";

export default async function handler(req, res) {
  const url = new URL(baseUrl + req.url);
  const userType = url.searchParams.get("userType");
  const querySnapShot = await getDoc(doc(db, "userType", userType));
  //   console.log(querySnapShot.data());
  //   console.log(userType);
  res.status(200).json(querySnapShot.data());
}
