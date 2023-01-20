/** @format */

import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";

export default async function handler(req, res) {
  const user = req.body;
  console.log(user);
  await setDoc(doc(db, "users", user.uid), { ...user });
  res.status(200).json(true);
}
