/** @format */

import axios from "axios";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { baseUrl } from "../_app";

export default async function handler(req, res) {
  const querySnapShot = await getDocs(collection(db, "customers"));

  const customers = querySnapShot.docs.map((doc) => {
    return {
      ...doc.data(),
      customerId: doc.id,
    };
  });
  customers.forEach((customer) => {
    async function u() {
      axios({
        method: "patch",
        url: `${baseUrl}/api/customer`,
        data: {
          ...customer,
        },
      })
        .then((res) => res.data())

        .catch(() => {
          // res.status(400).json({ errorMsg: "خطأ في التحديث" });
        });
    }
    u();
  });
  // console.log(customers);
  res.status(200).json(customers);
}
