/** @format */

import Menu from "../pages/Menu";
import ButtomNav from "./ButtomNav";
import Navbar from "./Navbar";

/** @format */
const Layout = ({ children }) => {
  return (
    <div className={`App `}>
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
