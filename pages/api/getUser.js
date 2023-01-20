/** @format */

import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { baseUrl } from "../_app";

export default async function handler(req, res) {
  const url = new URL(baseUrl + req.url);
  const searchParams = url.searchParams;
  const uid = searchParams.get("uid");
  const querySnapShot = await getDoc(doc(db, "users", uid));
  const user = querySnapShot.data();
  res.status(200).json(user);
}
