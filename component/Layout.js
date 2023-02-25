/** @format */

import { useContext } from "react";
import { Container, ThemeProvider } from "react-bootstrap";
import { AuthContext } from "../context/authContext";
import Login from "../pages/Login";
import Menu from "../pages/Menu";
import ButtomNav from "./ButtomNav";
import Navbar from "./Navbar";

/** @format */
const Layout = ({ children }) => {
  const { user } = useContext(AuthContext);
  if (!user)
    return (
      <Container className="full p-0  vh-100 rtl">
        <Login />
      </Container>
    );

  if (user)
    return (
      <ThemeProvider>
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
