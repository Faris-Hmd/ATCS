/** @format */
import styles from "../styles/ButtomNav.module.css";
import { FaHome } from "react-icons/fa";
import { BiBook, BiHome, BiPlusCircle } from "react-icons/bi";
import Link from "next/link";
import { BsGear, BsReceipt } from "react-icons/bs";
const ButtomNav = () => {
  return (
    <div className={styles.buttomNav}>
      {" "}
      <Link href="/Settings" className={styles.page}>
        <BsGear size={"25px"} />
        الاعدادات
      </Link>{" "}
      <Link href={"/Receipt"} className={styles.page}>
        <BsReceipt size={"25px"} />
        إيصال
      </Link>
      <Link href="/AddCustomer" className={styles.page}>
        <BiPlusCircle size={"25px"} />
        اضافة
      </Link>{" "}
      <Link href="/Customers" className={styles.page}>
        <BiBook size={"25px"} />
        السجلات
      </Link>{" "}
      <Link href="/" className={styles.page}>
        <BiHome size={"25px"} />
        الرئيسية
      </Link>
    </div>
  );
};

export default ButtomNav;
