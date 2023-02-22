/** @format */
import { IconContext } from "react-icons";
import { BsCash, BsGear, BsHouseDoor, BsReceipt } from "react-icons/bs";
import {
  BiListUl,
  BiLogIn,
  BiLogOut,
  BiPlusCircle,
  BiPrinter,
  BiSync,
  BiUser,
} from "react-icons/bi";
import styles from "../styles/Menu.module.css";
import Link from "next/link";
import { UserContext } from "../context/userContext";
import { useContext, useState } from "react";
import { baseUrl } from "./_app";
import { Spinner } from "react-bootstrap";

function Menu() {
  const { user, handleSignOut } = useContext(UserContext);
  const [syncing, setIsSyncing] = useState(false);

  function dataSync() {
    setIsSyncing(true);
    fetch(baseUrl + "/api/dataSync")
      .then((res) => res.json())
      .then((data) => data === true && setIsSyncing(false))
      .catch(setIsSyncing(false));
  }

  return (
    <IconContext.Provider value={{ className: styles.menuIcons }}>
      <div className={styles.menu}>
        <div className={styles.optCon}>
          <Link href="/" className={styles.opt}>
            <BsHouseDoor />
            الرئيسة
          </Link>
          <Link href="/Customers" className={styles.opt}>
            <BiListUl />
            قائمة السيارات
          </Link>
          <Link
            href="/AddCustomer
          "
            className={styles.opt}>
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
            <>
              <div className={styles.opt} onClick={handleSignOut}>
                <BiLogOut />
                تسجيل الخروج
              </div>
              <Link href="/UserProfile" className={styles.opt}>
                <BiUser /> الملف الشخصي
              </Link>
            </>
          )}
          <div className={styles.opt} onClick={() => {}}>
            {syncing ? <Spinner /> : <BiSync />}
            مزامنة البيانات
          </div>
          <Link href="/Settings" className={styles.opt}>
            <BsGear />
            الاعدادات
          </Link>
        </div>
      </div>
    </IconContext.Provider>
  );
}

export default Menu;
