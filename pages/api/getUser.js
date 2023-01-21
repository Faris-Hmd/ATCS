/** @format */

import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { baseUrl } from "../_app";

export default async function handler(req, res) {
  const url = new URL(baseUrl + req.url);
  const searchParams = url.searchParams;
  const uid = searchParams.get("uid");
  console.log(uid);
  const querySnapShot = await getDoc(doc(db, "users", uid));
  const user = querySnapShot.data();
  console.log(user);
  res.status(200).json(user);
}
