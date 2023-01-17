/** @format */
import Layout from "../component/Layout";
import "../styles/globals.css";
import "../styles/util.css";

const internetUrl = "https://atcs-demo.netlify.app";
const localurl = " http://localhost:3005";
export const baseUrl = internetUrl;
function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
