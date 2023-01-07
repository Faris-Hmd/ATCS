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
          <Link href="/Cars" className={styles.opt}>
            <BsHouseDoor />
            الرئيسة
          </Link>
          <Link href="/Cars" className={styles.opt}>
            <BiCategoryAlt /> اضافة سيارة
          </Link>
          <Link href="/AddCar" className={styles.opt}>
            <BiPlusCircle />
            اضافة سيارة
          </Link>
          <Link href="/Cars" className={styles.opt}>
            <RiAdvertisementLine /> اضافة سيارة
          </Link>
          <Link href="/Cars" className={styles.opt}>
            <RiAdvertisementLine /> الرئيسة
          </Link>
          <Link href="/Cars" className={styles.opt}>
            <BiCategoryAlt /> استخراج تقارير
          </Link>
        </div>
        <div className={styles.optCon}>
          <Link href="/cars" className={styles.opt}>
            <MdOutlinePrivacyTip />
            سياسة الخصوصية
          </Link>
          <Link href="/Cars" className={styles.opt}>
            <BsInfoCircle />
            اعرف عنا
          </Link>
        </div>
      </div>
    </IconContext.Provider>
  );
};

export default Menu;
