/** @format */
import { IconContext } from "react-icons";
import {
  BsFillMoonFill,
  BsHouseDoor,
  BsInfoCircle,
  BsSunFill,
} from "react-icons/bs";
import { RiAdvertisementLine } from "react-icons/ri";
import { VscSignOut } from "react-icons/vsc";

import { MdOutlineLogin, MdOutlinePrivacyTip } from "react-icons/md";
import { FaRegStar } from "react-icons/fa";
import { BiCategoryAlt, BiPlusCircle } from "react-icons/bi";

import styles from "./Menu.module.css";

import Link from "next/link";

const Menu = () => {
  return (
    <IconContext.Provider value={{ className: styles.menuIcons }}>
      <div className={styles.menu}>
        <div className={styles.optCon}>
          <Link href="/" className={styles.opt}>
            <BsHouseDoor />
            Home
          </Link>
          <Link href="/" className={styles.opt}>
            <BiCategoryAlt /> Add Offer
          </Link>
          <Link href="/AddCar" className={styles.opt}>
            <BiPlusCircle />
            Add Car
          </Link>
          <Link href="/" className={styles.opt}>
            <RiAdvertisementLine /> My Advartisments
          </Link>
          <Link href="/Cars" className={styles.opt}>
            <RiAdvertisementLine /> ATSC
          </Link>
          <Link href="/" className={styles.opt}>
            <BiCategoryAlt /> Categories
          </Link>
        </div>
        <div className={styles.optCon}>
          <Link href="/" className={styles.opt}>
            <MdOutlinePrivacyTip />
            Privecy and Security
          </Link>
          <Link href="/" className={styles.opt}>
            <BsInfoCircle />
            About
          </Link>
        </div>
      </div>
    </IconContext.Provider>
  );
};

export default Menu;
