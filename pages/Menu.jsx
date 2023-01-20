/** @format */
import { IconContext } from "react-icons";
import { BsCash, BsGear, BsHouseDoor, BsReceipt } from "react-icons/bs";
import {
  BiListUl,
  BiLogIn,
  BiLogOut,
  BiPlusCircle,
  BiPrinter,
} from "react-icons/bi";
import styles from "../styles/Menu.module.css";
import Link from "next/link";
import { UserContext } from "../context/userContext";
import { useContext } from "react";
import { Accordion } from "react-bootstrap";
import { FaUser, FaUserAlt, FaUserPlus } from "react-icons/fa";

function Menu() {
  const { user, handleSignOut } = useContext(UserContext);

  return (
    <IconContext.Provider value={{ className: styles.menuIcons }}>
      <div className={styles.menu}>
        <div className={styles.optCon}>
          <Link href="/" className={styles.opt}>
            <BsHouseDoor />
            الرئيسة
          </Link>
          <Link href="/Cars" className={styles.opt}>
            <BiListUl />
            قائمة السيارات
          </Link>
          <Link href="/AddCar" className={styles.opt}>
            <BiPlusCircle />
            اضافة سيارة
          </Link>
          <Link href="/" className={styles.opt}>
            <BsCash /> الحسابات
          </Link>
          <Link href="/Receipt" className={styles.opt}>
            <BsReceipt /> استخراج ايصال
          </Link>
          <Link href="/Reports" className={styles.opt}>
            <BiPrinter /> استخراج تقارير
          </Link>
        </div>
        <div className={styles.optCon}>
          {!user && (
            <Link href="/Login" className={styles.opt}>
              <BiLogIn />
              تسجيل الدخول
            </Link>
          )}
          {user && (
            <div className={styles.opt} onClick={handleSignOut}>
              <BiLogOut />
              تسجيل الخروج
            </div>
          )}
          <div className={styles.opt}>
            <BsGear />
            <Accordion className="w-100 no-border" dir="rtl">
              <Accordion.Item eventKey="0" className="w-100">
                <Accordion.Header>الاعدادات</Accordion.Header>
                <Accordion.Body>
                  <Link href="/SignUp" className={styles.opt}>
                    <FaUserPlus /> اضافة مستخدم
                  </Link>{" "}
                  <Link href="/SignUp" className={styles.opt}>
                    <FaUserPlus /> اضافة مستخدم
                  </Link>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        </div>
      </div>
    </IconContext.Provider>
  );
}

export default Menu;
