/** @format */

import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";

export default async function handler(req, res) {
  const querySnapShot = await getDocs(collection(db, "users"));
  const users = querySnapShot.docs.map((user) => {
    return {
      ...user.data(),
    };
  });
  res.status(200).json(users);
}
