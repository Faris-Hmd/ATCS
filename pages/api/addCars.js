/** @format */

import { doc, setDoc } from "firebase/firestore";
import { db } from "../../Firebase/firebase";

export default async function handler(req, res) {
  const cars = req.body;
  console.log(cars);

  //   await setDoc(doc(db, "cars", formData.bookNum), { ...formData });

  res.status(200).json(true);
}
