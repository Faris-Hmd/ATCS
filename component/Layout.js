/** @format */
import Head from "next/head";
import { useContext } from "react";
import { Container, ThemeProvider } from "react-bootstrap";
import { AuthContext } from "../context/authContext";
import Login from "../pages/Login";
import SideMenu from "./SideMenu";
import ButtomNav from "./ButtomNav";
import Navbar from "./Navbar";

/** @format */
const Layout = ({ children }) => {
  const { user } = useContext(AuthContext);
  return (
    <>
      <Head>
        <link rel="manifest" href="./manifest.json" />
        <link
          rel="shortcut icon"
          type="image/x-icon"
          href="/icons/atcs-logo.png"
        />
      </Head>
      {!user ? (
        <Container className="full p-0 vh-100 rtl w-100">
          <Login />
        </Container>
      ) : (
        <ThemeProvider>
          <div className={`App`}>
            <div className="rightSide"></div>
            <div className="leftSide">
              <SideMenu />
            </div>
            <Navbar />
            <ButtomNav />
            <main className="main">{children}</main>
          </div>
        </ThemeProvider>
      )}
    </>
  );
};
export default Layout;
