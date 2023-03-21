/** @format */

import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";

export default async function handler(req, res) {
  const querySnapShot = await getDocs(collection(db, "customers"));
  const currentDate = new Date();

  const customers = querySnapShot.docs.map((doc) => {
    const customer = doc.data();

    const enteringDate = new Date(customer.enteringDateBySec);
    const bookDate = new Date(customer.bookDateBySec);
    const availableTime = customer.threeMonthEx ? 180 : 90;

    const leftDate = customer.leftDate ? new Date(customer.leftDate) : 0;
    const clearDate = customer.clearDate ? new Date(customer.clearDate) : 0;

    const stayingTime =
      customer.enteringDateBySec === 0
        ? 0
        : customer.state === "غادر" && leftDate !== 0
        ? (leftDate.getTime() - customer.enteringDateBySec) /
          (1000 * 60 * 60 * 24)
        : customer.state === "مخلص" && clearDate !== 0
        ? (clearDate.getTime() - customer.enteringDateBySec) /
          (1000 * 60 * 60 * 24)
        : (currentDate.getTime() - customer.enteringDateBySec) /
          (1000 * 60 * 60 * 24);

    // const isLessThan15 = Math.ceil(stayingTime) > availableTime - 15;
    const nearLefting =
      Math.ceil(stayingTime) > availableTime - 15 &&
      Math.ceil(stayingTime) < availableTime;

    const isGreaterThanAvialTime =
      Math.ceil(stayingTime) > availableTime ? true : false;

    const moreThanYear =
      Math.ceil(
        (currentDate.getTime() - customer.bookDateBySec) /
          (1000 * 60 * 60 * 24),
      ) > 365;

    const state = () => {
      if (customer.enteringDateBySec === 0) {
        return "دخول جديد";
      } else if (moreThanYear) {
        if (customer.state === "غادر" || customer.state === "مخلص") {
          return customer.state;
        } else {
          return "مخالف";
        }
      } else if (nearLefting) {
        return "مغادر قريبا";
      } else if (isGreaterThanAvialTime) {
        return "مخالفة تمديد";
      } else {
        return "لم يغادر";
      }
    };
    console.log("---------------------------------------");
    console.log("isGraetThanAvailTime : ", isGreaterThanAvialTime);
    console.log("near lifting : ", nearLefting);

    const newCustomer = {
      // ...customer,
      customerId: doc.id,
      state: state(),
      stayingTime: Math.ceil(stayingTime),
      availableTime: availableTime,
      repeatEntry: customer.repeatEntry ? customer.repeatEntry : false,
      enteringDate: enteringDate.toISOString().slice(0, 10),
      bookDate: bookDate.toISOString().slice(0, 10),
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
    };

    return newCustomer;
  });

  customers.forEach((customer) => {
    async function u() {
      await updateDoc(doc(db, "customers", customer.customerId), customer);
    }
    u();
  });
  // console.log(customers);
  res.status(200).json(customers);
}
