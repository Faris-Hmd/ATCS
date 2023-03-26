/** @format */

import axios from "axios";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { baseUrl } from "../_app";
const currentDate = new Date();

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
      const enteringDate = new Date(customer.enteringDate);
      const bookDate = new Date(customer.bookDate);
      const leftDate = customer.leftDate ? new Date(customer.leftDate) : 0;
      const clearDate = customer.clearDate ? new Date(customer.clearDate) : 0;

      const availableTime = customer.threeMonthEx ? 180 : 90;
      console.count("updatg");
      const stayingTime =
        enteringDate.getTime() === 0
          ? 0
          : customer.state === "غادر" && leftDate !== 0
          ? (leftDate.getTime() - enteringDate.getTime()) /
            (1000 * 60 * 60 * 24)
          : customer.state === "مخلص" && clearDate !== 0
          ? (clearDate.getTime() - enteringDate.getTime()) /
            (1000 * 60 * 60 * 24)
          : (currentDate.getTime() - enteringDate.getTime()) /
            (1000 * 60 * 60 * 24);

      const nearLefting =
        Math.ceil(stayingTime) > availableTime - 15 &&
        Math.ceil(stayingTime) < availableTime;

      const isGreaterThanAvialTime =
        Math.ceil(stayingTime) > availableTime ? true : false;

      const moreThanYear =
        Math.ceil(
          (currentDate.getTime() - bookDate.getTime()) / (1000 * 60 * 60 * 24),
        ) > 365;

      const state = () => {
        if (enteringDate.getTime() === 0) {
          return "دخول جديد";
        } else if (moreThanYear) {
          if (customer.state === "غادر" || customer.state === "مخلص") {
            return customer.state;
          } else {
            return "مخالف";
          }
        } else if (customer.state === "غادر" || customer.state === "مخلص") {
          return customer.state;
        } else if (nearLefting) {
          return "مغادر قريبا";
        } else if (isGreaterThanAvialTime) {
          return "مخالفة تمديد";
        } else {
          return "لم يغادر";
        }
      };

      await updateDoc(doc(db, "customers", customer.customerId), {
        ...customer,
        stayingTime: Math.ceil(stayingTime),
        availableTime: availableTime,
        state: state(),
        bookDate: bookDate.toISOString().slice(0, 10),
        enteringDate: enteringDate.toISOString().slice(0, 10),
        enteringDateBySec: enteringDate.getTime(),
        bookDateBySec: bookDate.getTime(),
        bookNumNo: parseInt(customer.carnetNo.slice(4)),
        keywords: [
          ...new Set([
            customer.carnetNo.slice(4),
            customer.ownerSName,
            customer.ownerFName,
            customer.ownerTName,
            customer.ownerFoName && customer.ownerFoName,
            customer.ownerFName + " " + customer.ownerSName,
            customer.ownerFName +
              " " +
              customer.ownerSName +
              " " +
              customer.ownerTName,
            customer.carnetNo.trim(),
            customer.bookType !== undefined ? customer.bookType : "عادي",
            state(),
          ]),
        ],
      });
    }
    u();
  });
  // console.log(customers);
  res.status(200).json(customers);
}
