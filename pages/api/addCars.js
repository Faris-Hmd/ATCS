/** @format */

import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";

export default async function handler(req, res) {
  const car = req.body;
  console.log(car);

<<<<<<< HEAD
  await setDoc(doc(db, "cars", car.bookNum), { ...car });
  console.log(car);
=======
  await setDoc(doc(db, "cars", car.bookNum), car);

>>>>>>> 0b029b3a9e7ae84f763a70b24694abf627fd749b
  res.status(200).json(true);
}
