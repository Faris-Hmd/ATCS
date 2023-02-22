/** @format */ import { useContext } from "react";
import { UserContext } from "../context/userContext";
import styles from "../styles/Navbar.module.css";

const Navbar = () => {
  const { user } = useContext(UserContext);
  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <span>A</span>TSC
      </div>
      <div className={styles.userNav}>{user?.displayName}</div>
    </nav>
  );
};

export default Navbar;
