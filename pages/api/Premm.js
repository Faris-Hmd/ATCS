/** @format */

import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { baseUrl } from "../_app";

export default async function handler(req, res) {
  const url = new URL(baseUrl + req.url);
  const userType = url.searchParams.get("userType");
  switch (req.method) {
    case "GET":
      {
        const querySnapShot = await getDoc(doc(db, "userType", userType));
        res.status(200).json(querySnapShot.data());
      }
      break;

    case "PATCH":
      {
        const premessions = req.body;
        await updateDoc(doc(db, "userType", userType), premessions);
        res.status(200).json("update");
      }
      break;
  }
}
