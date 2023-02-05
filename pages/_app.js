/** @format */
import Layout from "../component/Layout";
import "../styles/globals.css";
import "../styles/util.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.rtl.min.css";
import { UserProvider } from "../context/userContext";
const internetUrl = "https://atcs-demo.netlify.app";
const localurl = " http://localhost:3005";
export let baseUrl = internetUrl;

if (process && process.env.NODE_ENV === "development") {
  baseUrl = localurl;
  console.log(baseUrl);
}

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserProvider>
  );
}

export default MyApp;
