/** @format */
import { IconContext } from "react-icons";
import { BsGear, BsReceipt } from "react-icons/bs";
import {
  BiBook,
  BiLogIn,
  BiLogOut,
  BiPlusCircle,
  BiStats,
  BiUser,
} from "react-icons/bi";
import styles from "../styles/Menu.module.css";
import Link from "next/link";
import { AuthContext } from "../context/authContext";
import { useContext } from "react";
import { Col, Container, Row } from "react-bootstrap";

function SideMenu() {
  const { user, handleSignOut } = useContext(AuthContext);

  return (
    <IconContext.Provider value={{ className: styles.menuIcons }}>
      <div className={styles.menu}>
        <div className="bg-w flex text-center shadow-sm rounded-bottom overflow-hidden w-100">
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
        </div>

        <div className={styles.optCon}>
          <Link href="/Customers" className={styles.opt} prefetch={false}>
            <BiBook />
            قائمة العملاء
          </Link>
          <Link href="/AddCustomer" className={styles.opt} prefetch={false}>
            <BiPlusCircle />
            اضافة عميل
          </Link>
          <Link href="/Customers" className={styles.opt}>
            <BiStats /> احصائيات
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
          <Link href="/Settings" className={styles.opt} prefetch={false}>
            <BsGear />
            الاعدادات
          </Link>
        </div>
      </div>
    </IconContext.Provider>
  );
}

export default SideMenu;
