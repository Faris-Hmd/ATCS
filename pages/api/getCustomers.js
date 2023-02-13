/** @format */
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { baseUrl } from "../_app";
export default async function handler(req, res) {
  const url = new URL(baseUrl + req.url);
  // console.log(url.toString());
  const searchParams = url.searchParams;
  const fromDate = searchParams.get("startDate");
  const toDate = searchParams.get("endDate");
  const repeatEntry = searchParams.get("repeatEntry");
  const isViolate = searchParams.get("isViolate");
  const state = searchParams.get("state");
  const searchBy = searchParams.get("searchBy");
  const order = searchParams.get("orderBy");
  const keyword = searchParams.get("keyword");

  const fromDateBySec = new Date(fromDate);
  const toDateBySec = new Date(toDate);
  let querySnapShot;
  // console.log(state);
  if (!keyword) {
    querySnapShot = await getDocs(
      query(
        collection(db, "customers"),
        // where("repeatEntry", "==", repeatEntry),
        where(searchBy, ">=", fromDateBySec.getTime()),
        where(searchBy, "<=", toDateBySec.getTime()),
        // where("state", "==", state),
        where("isViolate", "==", isViolate),
        orderBy(order),
      ),
    );
    // console.log(querySnapShot.docs.at(0).data());
  } else {
    console.log("kjhbckgdkchgbkdhc");
    console.log(keyword);

    querySnapShot = await getDocs(
      query(
        collection(db, "customers"),
        where("keywords", "array-contains", "فارس"),
        orderBy(order),
      ),
    );
  }

  const customers = querySnapShot.docs.map((customer) => {
    return { ...customer.data(), customerId: customer.id };
  });

  // const querySnapShot = await getDocs(collection(db, "customers"));
  // const customers = querySnapShot.docs.map((customer) => {
  //   if (customer.data().keywords.includes("لم يغادر")) {
  //     return {
  //       ...customer.data(),
  //       customerId: customer.id,
  //       repeatEntry: false,
  //       state: "لم يغادر",
  //     };
  //   } else
  //     return {
  //       ...customer.data(),
  //       customerId: customer.id,
  //       repeatEntry: false,
  //       state: "غادر",
  //     };
  // });
  // customers.forEach((customer) => {
  //   async function u() {
  //     await setDoc(doc(db, "customers", customer.customerId), {
  //       ...customer,
  //       customer: null,
  //     });
  //   }
  //   u();
  // });
  // console.log(customers);
  res.status(200).json(customers);
}
