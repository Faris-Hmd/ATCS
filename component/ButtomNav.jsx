/** @format */
import styles from "../styles/ButtomNav.module.css";
import { FaBars, FaHome } from "react-icons/fa";
import { BiPlusCircle } from "react-icons/bi";
import Link from "next/link";
import { BsPrinterFill } from "react-icons/bs";
const ButtomNav = () => {
  return (
    <div className={styles.buttomNav}>
      <Link href="/Cars" className={styles.page}>
        <FaHome size={"25px"} />
        الرئيسية
      </Link>
      <Link href="/AddCar" className={styles.page}>
        <BiPlusCircle size={"25px"} />
        اضافة
      </Link>
      <Link href="/Menu" className={styles.page}>
        <FaBars size={"25px"} />
        القائمة
      </Link>
      <Link href={"/Reports"} className={styles.page}>
        <BsPrinterFill size={"25px"} />
        تقارير
      </Link>
    </div>
  );
};

export default ButtomNav;
