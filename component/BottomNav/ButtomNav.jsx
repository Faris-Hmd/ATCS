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
        <FaHome size={"20px"} /> Home
      </Link>
      <Link href="/Cars" className={styles.page}>
        <BiPlusCircle size={"20px"} />
        Add AD
      </Link>
      <Link href="/Menu" className={styles.page}>
        <FaBars size={"19px"} /> Menu
      </Link>
      <Link href={"/"} className={styles.page}>
        <FaRegStar size={"19px"} /> Favorite
      </Link>
    </div>
  );
};

export default ButtomNav;
