/** @format */

import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";

export default async function handler(req, res) {
  const querySnapShot = await getDocs(collection(db, "cars"));
  const cars = querySnapShot.docs.map((car) => {
    return { ...car.data() };
  });
  res.status(200).json(cars);
}
