/** @format */ import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import styles from "../styles/Navbar.module.css";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        {/* <span>A</span>TSC */}
        <img width={"80px"} src="/icons/atcs-icon.png" alt="atcs" />
        <span className="p-2">نادي السيارات و الرحلات السوداني</span>
      </div>

      <Link
        href="UserProfile"
        className="bg-clr fos-sm rounded p-1 me-1 shadow-sm ">
        {user?.displayName}
      </Link>
    </nav>
  );
};

export default Navbar;
