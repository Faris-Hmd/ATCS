/** @format */

import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";

export default async function handler(req, res) {
  const car = req.body;
  console.log(car);

  await setDoc(doc(db, "cars", car.bookNum), { ...car });
  console.log(car);
  res.status(200).json(true);
}
