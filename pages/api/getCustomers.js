/** @format */
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { baseUrl } from "../_app";
export default async function handler(req, res) {
  const url = new URL(baseUrl + req.url);
  const searchParams = url.searchParams;
  const fromDate = searchParams.get("startDate");
  const toDate = searchParams.get("endDate");
  const repeatEntry = searchParams.get("repeatEntry");
  const state = searchParams.get("state");
  const searchBy = searchParams.get("searchBy");
  const keyword = searchParams.get("keyword");

  const fromDateBySec = new Date(fromDate);
  const toDateBySec = new Date(toDate);

  let querySnapShot;

  if (keyword === "null") {
    let querys = [];
    if (state !== "null" && state !== "repeatEntry")
      querys.push(where("state", "==", state));

    if (repeatEntry === "false") querys.push(where("repeatEntry", "==", false));

    if (state === "repeatEntry") querys.push(where("repeatEntry", "==", true));

    console.log(searchParams);

    querySnapShot = await getDocs(
      query(
        collection(db, "customers"),
        where(searchBy, ">=", fromDateBySec.getTime()),
        where(searchBy, "<=", toDateBySec.getTime()),
        ...querys,
        orderBy(searchBy)
      )
    );
  } else {
    console.log(keyword);
    querySnapShot = await getDocs(
      query(
        collection(db, "customers"),
        where("keywords", "array-contains", keyword)
      )
    );
  }

  const customers = querySnapShot.docs.map((customer) => {
    const bookDate = new Date(customer.data().bookDateBySec);
    const enteringDate = new Date(customer.data().enteringDateBySec);

    return {
      ...customer.data(),
      customerId: customer.id,
      bookDate: bookDate.toISOString().slice(0, 10),
      stayingTime: customer.data().threeMonthEx ? 180 : 90,
      enteringDate: enteringDate ? enteringDate.toISOString().slice(0, 10) : 0,
    };
  });
  // console.log(customers);
  res.status(200).json(customers);
}
// console.log(searchParams);
// if (state === "null" && repeatEntry === "false") {
//   // عرض جميع العملاء و اخفاء الدخول المتكرر
//   console.log("عرض جميع العملاء و اخفاء الدخول المتكرر");
//   querySnapShot = await getDocs(
//     query(
//       collection(db, "customers"),
//       where(searchBy, ">=", fromDateBySec.getTime()),
//       where(searchBy, "<=", toDateBySec.getTime()),
//       where("repeatEntry", "==", false),
//       orderBy(searchBy)
//     )
//   );
// } else if (repeatEntry === "true" && state === "repeatEntry") {
//   //عرض الدخول المتكرر فقط
//   console.log("عرض الدخول المتكرر فقط");
//   querySnapShot = await getDocs(
//     query(
//       collection(db, "customers"),
//       where(searchBy, ">=", fromDateBySec.getTime()),
//       where(searchBy, "<=", toDateBySec.getTime()),
//       where("repeatEntry", "==", true),
//       orderBy(searchBy)
//     )
//   );
// } else if (state !== "null" && repeatEntry === "true") {
//   if (state === "lessThan15") {
//     console.log("عرض البيانات حسب الحالة و نضمين الدخول المتكرر");
//     querySnapShot = await getDocs(
//       query(
//         collection(db, "customers"),
//         where(searchBy, ">=", fromDateBySec.getTime()),
//         where(searchBy, "<=", toDateBySec.getTime()),
//         where("state", "==", state),
//         orderBy(searchBy)
//       )
//     );
//   } else {
//     console.log("عرض البيانات حسب الحالة و نضمين الدخول المتكرر");
//     querySnapShot = await getDocs(
//       query(
//         collection(db, "customers"),
//         where(searchBy, ">=", fromDateBySec.getTime()),
//         where(searchBy, "<=", toDateBySec.getTime()),
//         where("state", "==", state),
//         orderBy(searchBy)
//       )
//     );
//   }
//   //عرض البيانات حسب الحالة و نضمين الدخول المتكرر
// } else if (state !== "null" && repeatEntry === "false") {
//   //عرض العملاء حسب الحالة واخفاء الدخول المتكرر
//   console.log("عرض العملاء حسب الحالة واخفاء الدخول المتكرر");
//   querySnapShot = await getDocs(
//     query(
//       collection(db, "customers"),
//       where(searchBy, ">=", fromDateBySec.getTime()),
//       where(searchBy, "<=", toDateBySec.getTime()),
//       where("state", "==", state),
//       where("repeatEntry", "==", false),
//       orderBy(searchBy)
//     )
//   );
// } else if (state === "null") {
//   //عرض جميع البيانات و نضمين الدخول المتكرر
//   console.log("عرض جميع البيانات و نضمين الدخول المتكرر");
//   querySnapShot = await getDocs(
//     query(
//       collection(db, "customers"),
//       where(searchBy, ">=", fromDateBySec.getTime()),
//       where(searchBy, "<=", toDateBySec.getTime()),
//       orderBy(searchBy)
//     )
//   );
// }
