/** @format */
import styles from "../../styles/Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <span>A</span>TSC
      </div>
      <div className={styles.userNav}></div>
    </nav>
  );
};

export default Navbar;
