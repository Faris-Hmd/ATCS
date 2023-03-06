/** @format */
import { IconContext } from "react-icons";
import { BsCash, BsGear, BsHouseDoor, BsReceipt } from "react-icons/bs";
import {
  BiBook,
  BiListUl,
  BiLogIn,
  BiLogOut,
  BiPlusCircle,
  BiSync,
  BiUser,
  BiUserCircle,
} from "react-icons/bi";
import styles from "../styles/Menu.module.css";
import Link from "next/link";
import { AuthContext } from "../context/authContext";
import { useContext, useState } from "react";
import { baseUrl } from "./_app";
import { Col, Container, Row, Spinner } from "react-bootstrap";

function Menu() {
  const { user, handleSignOut } = useContext(AuthContext);
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
        <Link
          href="/UserProfile"
          className="bg-w flex text-center shadow-sm rounded-bottom overflow-hidden w-100">
          <Container>
            <Col>
              <img width={"80px"} src="/icons/user.png" className="icon" />
            </Col>

            <Row className="text-nowrap">
              <Col className="flex-r ">{user.userType}</Col>
              <Col className="flex-r text-nowrap">
                {user.displayName}
                <BiUser />
              </Col>
            </Row>
          </Container>
        </Link>

        <div className={styles.optCon}>
          <Link href="/" className={styles.opt}>
            <BsHouseDoor />
            الرئيسة
          </Link>
          <Link href="/Customers" className={styles.opt}>
            <BiBook />
            قائمة العملاء
          </Link>
          <Link href="/AddCustomer" className={styles.opt}>
            <BiPlusCircle />
            اضافة عميل
          </Link>
          <Link href="/#" className={styles.opt}>
            <BsCash /> الحسابات
          </Link>
          <Link href="/Receipt" className={styles.opt}>
            <BsReceipt /> استخراج ايصال
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
            </>
          )}
          {/* <div className={styles.opt} onClick={() => {}}>
            {syncing ? <Spinner /> : <BiSync />}
            مزامنة البيانات
          </div> */}
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
