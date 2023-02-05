/** @format */

import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";

export default async function handler(req, res) {
  const userType = url.searchParams.get("userType");
  const premessions = req.body;

  await updateDoc(doc(db, "userType", userType), premessions);

  res.status(200).json(premessions);
}
