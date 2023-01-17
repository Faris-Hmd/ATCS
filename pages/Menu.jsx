/** @format */
import { IconContext } from "react-icons";
import { BsHouseDoor, BsInfoCircle } from "react-icons/bs";
import { RiAdvertisementLine } from "react-icons/ri";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { BiCategoryAlt, BiPlusCircle } from "react-icons/bi";
import styles from "../styles/Menu.module.css";

import Link from "next/link";

function Menu() {
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
          <Link href="/Reports" className={styles.opt}>
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
}

export default Menu;
