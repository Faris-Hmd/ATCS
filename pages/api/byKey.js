import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { baseUrl } from "../_app";

export default async function handler(req, res) {
  const url = new URL(baseUrl + req.url);
  const searchParams = url.searchParams;

  const keyword = searchParams.get("keyword");
  console.log(keyword);
  const querySnapShot = await getDocs(
    query(
      collection(db, "customers"),
      where("keywords", "array-contains", keyword),
    ),
  );
  const customers = querySnapShot.docs.map((customer) => {
    return { ...customer.data(), customerId: customer.id };
  });
  res.status(200).json(customers);
}
