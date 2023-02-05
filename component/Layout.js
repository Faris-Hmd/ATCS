/** @format */

import { ThemeProvider } from "react-bootstrap";
import Menu from "../pages/Menu";
import ButtomNav from "./ButtomNav";
import Navbar from "./Navbar";

/** @format */
const Layout = ({ children }) => {
  return (
    <ThemeProvider dir="rtl">
      <div className={`App`}>
        <div className="rightSide"></div>
        <div className="leftSide">
          <Menu />
        </div>
        <Navbar />
        <ButtomNav />
        <main className="main">{children}</main>
      </div>
    </ThemeProvider>
  );
};
export default Layout;
