/** @format */

import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";

export default async function handler(req, res) {
  const querySnapShot = await getDocs(collection(db, "customers"));
  const currentDate = new Date();

  const customers = querySnapShot.docs.map((customer) => {
    const state =
      Math.floor(
        (currentDate.getTime() - customer.data().bookDateBySec) /
          (1000 * 60 * 60 * 24),
      ) > 365
        ? customer.data().state === "غادر"
          ? "غادر"
          : "مخالف"
        : "لم يغادر";

    return {
      ...customer.data(),
      customerId: customer.id,
      repeatEntry: false,
      state: state,
    };
  });

  customers.forEach((customer) => {
    // console.log(customer.state);
    // console.log({
    //   ownerFName: customer.ownerFName,
    //   ownerSName: customer.ownerSName,
    //   ownerTName: customer.ownerTName,
    //   ownerFoName: customer.ownerFoName,
    //   phone1: customer.phone1,
    //   phone2: customer.phone2,
    //   bookNum: customer.bookNum,
    //   chaseNum: customer.chaseNum,
    //   enteringDateBySec: customer.enteringDateBySec,
    //   bookDateBySec: customer.bookDateBySec,
    //   state: customer.state,
    //   carType: customer.carType,
    //   bookNumNo: parseInt(customer.bookNumNo),
    //   keywords: [
    //     ...new Set([
    //       customer.bookNum.trim(),
    //       parseInt(customer.bookNum.slice(4)),
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
      await setDoc(doc(db, "customers", customer.customerId), {
        repeatEntry: customer.repeatEntry ? customer.repeatEntry : false,
        ownerFName: customer.ownerFName,
        ownerSName: customer.ownerSName,
        ownerTName: customer.ownerTName,
        ownerFoName: customer.ownerFoName,
        phone1: customer.phone1,
        phone2: customer.phone2,
        bookNum: customer.bookNum,
        chaseNum: customer.chaseNum,
        enteringDateBySec: customer.enteringDateBySec,
        bookDateBySec: customer.bookDateBySec,
        carType: customer.carType,
        state: customer.state,
        bookNumNo: parseInt(customer.bookNumNo),
        keywords: [
          ...new Set([
            customer.bookNum.trim(),
            parseInt(customer.bookNum.slice(4)),
            customer.ownerFName,
            customer.ownerSName,
            customer.ownerTName,
            customer.ownerFoName,
            customer.bookType !== undefined ? customer.bookType : "عادي",
            customer.state,
          ]),
        ],
      });
    }
    u();
  });
  // console.log(customers);
  res.status(200).json(customers);
}
