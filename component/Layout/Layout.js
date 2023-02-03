/** @format */

import Menu from "../../pages/Menu";
import ButtomNav from "../BottomNav/ButtomNav";
import Navbar from "../Navbar/Navbar";

/** @format */
const Layout = ({ children }) => {
  return (
    <div className={`App`}>
      <div className="rightSide"></div>
      <div className="leftSide">
        <Menu />
      </div>
      <Navbar />
      <ButtomNav />
      <main className="main">{children}</main>
    </div>
  );
};
export default Layout;
