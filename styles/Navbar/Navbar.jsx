/** @format */

import { useContext } from "react";
import { UserContext } from "../../Context/UserProvider";
import styles from "../../styles/Navbar.module.css";

const Navbar = () => {
  const { currentUser } = useContext(UserContext);
  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <span>EL</span>neelen
      </div>
      <div className={styles.userNav}>
        {currentUser && (
          <img
            src={currentUser.profileImg}
            alt=""
            className={styles.profileImg}
          />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
