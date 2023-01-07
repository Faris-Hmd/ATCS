/** @format */

import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../Firebase/firebase";

export default async function handler(req, res) {
  const querySnapShot = await getDocs(
    query(collection(db, "cars"), where("enteringYear", ">=", 2023))
  );
  const cars = querySnapShot.docs.map((car) => {
    return { ...car.data() };
  });
  console.log(cars);
  res.status(200).json(cars);
}
