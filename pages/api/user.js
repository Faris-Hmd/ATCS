/** @format */

import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { baseUrl } from "../_app";

export default async function handler(req, res) {
  const user = req.body;

  switch (req.method) {
    case "GET":
      {
        const url = new URL(baseUrl + req.url);
        const searchParams = url.searchParams;
        const uid = searchParams.get("uid");
        const querySnapShot = await getDoc(doc(db, "users", uid));
        const user = querySnapShot.data();
        const querySnapSho = await getDoc(doc(db, "userType", user.userType));
        const userType = querySnapSho.data();
        res.status(200).json({ ...user, premessions: userType.premessions });
      }
      break;
    case "POST":
      {
        await setDoc(doc(db, "users", user.uid), { ...user });
        res.status(200).json(true);
      }
      break;
  }
}
