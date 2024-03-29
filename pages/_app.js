/** @format */
import Layout from "../component/Layout";
import "../styles/globals.css";
import "../styles/util.css";
// import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.rtl.min.css";
import { UserProvider } from "../context/authContext";
import { CustomerProvider } from "../context/customersContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const internetUrl = "https://atcs-demo.netlify.app";
const localurl = " http://localhost:3005";
export let baseUrl = internetUrl;

if (process && process.env.NODE_ENV === "development") {
  baseUrl = localurl;
}

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ToastContainer autoClose={3000} position={"top-center"} rtl={true} />
      <UserProvider>
        <CustomerProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </CustomerProvider>
      </UserProvider>
    </>
  );
}

export default MyApp;
