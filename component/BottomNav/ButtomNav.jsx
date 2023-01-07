/** @format */
import styles from "../../styles/ButtomNav.module.css";
import { FaBars, FaHome } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { BiPlusCircle } from "react-icons/bi";
import Link from "next/link";
const ButtomNav = () => {
  return (
    <div className={styles.buttomNav}>
      <Link href="/" className={styles.page}>
        <FaHome size={"25px"} />
      </Link>
      <Link href="/AddCar" className={styles.page}>
        <BiPlusCircle size={"25px"} />
      </Link>
      <Link href="/Menu" className={styles.page}>
        <FaBars size={"25px"} />
      </Link>
      <Link href={"/"} className={styles.page}>
        <FaRegStar size={"25px"} />
      </Link>
    </div>
  );
};

export default ButtomNav;
