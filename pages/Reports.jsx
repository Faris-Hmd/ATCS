/** @format */

import styles from "../styles/Reports.module.css";
import tableStyles from "../styles/Cars.module.css";

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
      <div className="header">
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
      <table className={tableStyles.table} style={{ direction: "rtl" }}>
        <thead className={tableStyles.tableHead}>
          <tr className={tableStyles.tableHeaderRow}>
            <th className={tableStyles.tableHeader}>#</th>
            <th className={tableStyles.tableHeader + " " + tableStyles.bookNum}>
              اسم العميل
            </th>
            <th className={tableStyles.tableHeader + " " + tableStyles.carType}>
              السيارة
            </th>
            <th className={tableStyles.tableHeader}>رقم الدفتر</th>
            <th
              className={tableStyles.tableHeader + " " + tableStyles.bookDate}
            >
              الدفتر
            </th>
            <th className={tableStyles.tableHeader}>الدخول</th>
            {/* <th
              className={tableStyles.tableHeader + " " + tableStyles.diffDate}
            >
              البقاء
            </th> */}
          </tr>
        </thead>
        <tbody className={styles.tableBody}>
          {cars.map((item, index) => {
            // var diff = cDate.getTime() - item.enteringDateBySec;
            // var dayDiff = diff / (1000 * 60 * 60 * 24);
            return (
              <tr
                className={styles.tableRow}
                style={{ background: item.state === "غادر" && "red" }}
                key={index}
              >
                <td className={tableStyles.index}>{1 + index}</td>
                <td
                  className={tableStyles.ownerName}
                >
                  {item.ownerFName + "  "}
                  {item.ownerSName + "  "}
                  {item.ownerTName + "  "}
                  {/* {item.ownerFOname} */}
                </td>
                <td className={tableStyles.carType}>{item.carType}</td>
                <td className={tableStyles.bookNum}>{item.bookNum}</td>
                <td className={tableStyles.bookDate}>
                  {item.bookMonth}/{item.bookDay}/{item.bookYear}
                </td>
                <td className={tableStyles.enteringDate}>
                  {item.enteringMonth}/{item.enteringDay}/{item.enteringYear}
                </td>
                {/* <td className={tableStyles.diffDate}>{Math.floor(dayDiff)}</td> */}
              </tr>
            );
          })}
        </tbody>
      </table>
      {cars.length > 0 && (
        <div className="hidden">
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
