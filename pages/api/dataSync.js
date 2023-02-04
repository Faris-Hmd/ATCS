/** @format */

import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";

export default async function handler(req, res) {
  const currentDate = new Date();
  const querySnapShot = await getDocs(collection(db, "cars"));
  const customers = querySnapShot.docs.map((costomer) => {
    return { ...costomer.data() };
  });

  customers.map((customer) => {
    const bookDate = new Date(
      `${customer.bookYear}-${customer.bookMonth}-${customer.bookDay}`
    );
    const bookDateBySec = bookDate.getTime();
    const isViolate =
      365 -
        Math.floor(
          (currentDate.getTime() - bookDateBySec) / (1000 * 60 * 60 * 24)
        ) >
      0
        ? false
        : true;
    console.count(isViolate === true && isViolate);
    async function u() {
      await updateDoc(doc(db, "cars", customer.bookNum), {
        bookDateBySec: bookDateBySec,
        isViolate: customer.state === "غادر" ? false : isViolate,
      });
    }
    u();
  });
  res.status(200).json(true);
}
