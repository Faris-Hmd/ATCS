/** @format */

import formStyles from "../styles/Form.module.css";
import { BsPrinter } from "react-icons/bs";
import { useRef, useState } from "react";
import { baseUrl } from "./_app";
import CustsReportToPrint from "../component/CustomersReportToPrint";
import { useReactToPrint } from "react-to-print";
import CarsList from "../component/CustomersList";

const Reports = () => {
  const [cars, setCars] = useState([]);
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleOnChange = async (e) => {
    setCars([]);
    fetch(
      baseUrl +
        "/api/getCars?q=" +
        e.target.value +
        "&&orderBy=enteringDateBySec",
    )
      .then((res) => res.json())
      .then((data) => setCars(data));
  };

  return (
    <div className={"containe ltr"}>
      <div className="header">
        تقرير السيارات
        <form className={"w-60 " + formStyles.form}>
          <select
            name="keyword"
            id=""
            className={"bg-w"}
            onChange={handleOnChange}>
            <option value="">التاريخ</option>
            <option value="1/2023">1/2023</option>
            <option value="12/2022">12/2022</option>
            <option value="11/2022">11/2022</option>
            <option value="10/2022">10/2022</option>
            <option value="9/2022">9/2022</option>
          </select>
          <select
            name="keyword"
            id=""
            className={"bg-w"}
            onChange={handleOnChange}>
            <option value="">الحالة</option>
            <option value="مخالف">مخالفين</option>
            <option value="غادر">مغادرين</option>
          </select>
        </form>
        <div className={"printBtn"} onClick={handlePrint}>
          <BsPrinter size={"25px"} />
        </div>
      </div>
      <CarsList cars={cars} />
      {cars.length > 0 && (
        <div className="hidden">
          <CustsReportToPrint ref={componentRef} value={cars} />
        </div>
      )}
    </div>
  );
};
export default Reports;
