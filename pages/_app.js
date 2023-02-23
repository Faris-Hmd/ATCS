/** @format */
import Layout from "../component/Layout";
import "../styles/globals.css";
import "../styles/util.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.rtl.min.css";
import { UserProvider } from "../context/userContext";
import { CustomerProvider } from "../context/customersContext";
import { QueryClient, QueryClientProvider } from "react-query";
const internetUrl = "https://atcs-demo.netlify.app";
const localurl = " http://localhost:3005";
export let baseUrl = internetUrl;

if (process && process.env.NODE_ENV === "development") {
  baseUrl = localurl;
  console.log(baseUrl);
}

const queryClient = new QueryClient();
function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <CustomerProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </CustomerProvider>
      </UserProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
