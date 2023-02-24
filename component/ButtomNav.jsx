/** @format */
import styles from "../styles/ButtomNav.module.css";
import { FaBars, FaHome } from "react-icons/fa";
import { BiPlusCircle } from "react-icons/bi";
import Link from "next/link";
import { BsPrinterFill, BsReceipt } from "react-icons/bs";
const ButtomNav = () => {
  return (
    <div className={styles.buttomNav}>
      <Link href="/Customers" className={styles.page}>
        <FaHome size={"25px"} />
        الرئيسية
      </Link>
      <Link href="/AddCustomer" className={styles.page}>
        <BiPlusCircle size={"25px"} />
        اضافة
      </Link>{" "}
      <Link href={"/Receipt"} className={styles.page}>
        <BsReceipt size={"25px"} />
        إيصال
      </Link>
      <Link href="/Menu" className={styles.page}>
        <FaBars size={"25px"} />
        القائمة
      </Link>
    </div>
  );
};

export default ButtomNav;
