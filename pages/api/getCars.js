/** @format */

import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { baseUrl } from "../_app";

export default async function handler(req, res) {
  const url = new URL(baseUrl + req.url);
  const searchParams = url.searchParams;
  const q = searchParams.get("q");
  const querySnapShot = await getDocs(
    query(
      collection(db, "cars"),
      where("keywords", "array-contains", q),
      orderBy("ownerFName")
    )
  );
  const cars = querySnapShot.docs.map((car) => {
    return { ...car.data() };
  });
  console.log(cars);
  res.status(200).json(cars);
}
