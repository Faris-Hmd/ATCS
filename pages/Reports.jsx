/** @format */

import styles from "../styles/Reports.module.css";
import formStyles from "../styles/Form.module.css";
import { BsPrinter } from "react-icons/bs";
import { useEffect, useRef, useState } from "react";
import { baseUrl } from "./_app";
import CarsReportToPrint from "../component/CarsReportToPrint/CarsReportToPrint";
import { useReactToPrint } from "react-to-print";

const Reports = () => {
  const [cars, setCars] = useState([]);
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleOnChange = async (e) => {
    setCars([]);
    fetch(baseUrl + "/api/getCars?q=" + e.target.value)
      .then((res) => res.json())
      .then((data) => setCars(data));
  };

  return (
    <div className={formStyles.contenier}>
      <div className="label">
        تقرير السيارات
        <form className={"w-60 " + formStyles.form}>
          <select
            name="keyword"
            id=""
            className={"bg-w"}
            onChange={handleOnChange}
          >
            <option value="">التاريخ</option>
            <option value="1/2023">1/2023</option>
            <option value="12/2022">12/2022</option>
            <option value="11/2022">11/2022</option>
            <option value="10/2022">10/2022</option>
            <option value="9/2022">9/2022</option>
          </select>
          <select name="keyword" id="" className={"bg-w"}>
            <option value="">الحالة</option>
            <option value="مخالف">مخالفين</option>
            <option value="غادر">مغادرين</option>
          </select>
        </form>{" "}
        <div className={formStyles.printBtn} onClick={handlePrint}>
          <BsPrinter />
        </div>
      </div>
        {cars.length > 0 && (
          <div>
            <CarsReportToPrint ref={componentRef} value={cars} />
          </div>
        )}
        {/* {cars.map((car) => (
          <h2>{car.ownerFName}</h2>
        ))} */}
    </div>
  );
};
export default Reports;
