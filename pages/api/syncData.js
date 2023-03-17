/** @format */

import {
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";

export default async function handler(req, res) {
  const querySnapShot = await getDocs(collection(db, "customers"));
  const currentDate = new Date();

  const customers = querySnapShot.docs.map((customer) => {
    const stayingTime = customer.data().threeMonthEx ? 180 : 90;

    const isLessThan15 =
      Math.floor(
        (currentDate.getTime() - customer.data().enteringDateBySec) /
          (1000 * 60 * 60 * 24)
      ) >
      stayingTime - 15
        ? true
        : false;

    const state =
      Math.floor(
        (currentDate.getTime() - customer.data().bookDateBySec) /
          (1000 * 60 * 60 * 24)
      ) > 365
        ? customer.data().state === "غادر"
          ? "غادر"
          : "مخالف"
        : isLessThan15
        ? "مغادر قريبا"
        : "لم يغادر";

    return {
      ...customer.data(),
      customerId: customer.id,
      repeatEntry: customer.data().repeatEntry
        ? customer.data().repeatEntry
        : false,
      // state: state,
    };
  });

  customers.forEach((customer) => {
    // console.log(customer.state);
    // console.log({
    //   ...customer,
    //   ownerSdPhone1: customer.phone1,
    //   ownerSdPhone2: customer.phone2 ? customer.phone2 : null,
    //   carnetNo: customer.bookNum,
    //   chaseNum: customer.chaseNum,
    //   enteringDateBySec: customer.enteringDateBySec,
    //   bookDateBySec: customer.bookDateBySec,
    //   carType: customer.carType,
    //   state: customer.state,
    //   repeatEntry: customer.repeatEntry,
    //   bookType: customer.bookType !== undefined ? customer.bookType : "عادي",
    //   bookNumNo: parseInt(customer.bookNumNo),
    //   keywords: [
    //     ...new Set([
    //       customer.carnetNo.trim(),
    //       customer.carnetNo.slice(4),
    //       customer.ownerFName,
    //       customer.ownerSName,
    //       customer.ownerTName,
    //       customer.ownerFoName,
    //       customer.bookType !== undefined ? customer.bookType : "عادي",
    //       customer.state,
    //     ]),
    //   ],
    // });
    async function u() {
      await updateDoc(doc(db, "customers", customer.customerId), {
        repeatEntry: customer.repeatEntry,
        carnetNo: customer.bookNum,
      });
    }
    // u();
  });
  // console.log(customers);
  res.status(200).json(customers);
}
