/** @format */
import styles from "../../styles/Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <span>EL</span>neelen
      </div>
      <div className={styles.userNav}></div>
    </nav>
  );
};

export default Navbar;
