/** @format */
import Head from "next/head";
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
  return (
    <>
      <Head>
        <link rel="manifest" href="./manifest.json" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@600&display=swap"
          rel="stylesheet"
        />
      </Head>
      {!user ? (
        <Container className="full p-0 vh-100 rtl">
          <Login />
        </Container>
      ) : (
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
      )}
    </>
  );

  // if (user)
  //   return (
  //     <ThemeProvider>
  //       <div className={`App`}>
  //         {" "}
  //         <Head>
  //           <link rel="manifest" href="./manifest.json" />
  //           <link rel="preconnect" href="https://fonts.googleapis.com" />
  //           <link
  //             rel="preconnect"
  //             href="https://fonts.gstatic.com"
  //             crossorigin
  //           />
  //           <link
  //             href="https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@600&display=swap"
  //             rel="stylesheet"
  //           />
  //         </Head>
  //         <div className="rightSide"></div>
  //         <div className="leftSide">
  //           <Menu />
  //         </div>
  //         <Navbar />
  //         <ButtomNav />
  //         <main className="main">{children}</main>
  //       </div>
  //     </ThemeProvider>
  //   );
};
export default Layout;
