/** @format */
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import ComponentToPrint from "./ToPrint/ToPrint";

const internetUrl = "https://next-e-shop-omega.vercel.app";
const localurl = " http://localhost:3002";
export const baseUrl = internetUrl;
const Home = () => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
      <ComponentToPrint ref={componentRef} />
      <button onClick={handlePrint}>Print this out!</button>
    </div>
  );
};

export default Home;
