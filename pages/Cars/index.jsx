/** @format */
import styles from "../../styles/Cars.module.css";

import { useEffect, useState } from "react";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { BsPrinter } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import { baseUrl } from "../_app";
import { useRouter } from "next/router";
import CarsReportToPrint from "../../component/CarsReportToPrint/CarsReportToPrint";

var cDate = new Date();
const Cars = () => {
  const [cars, setCars] = useState([]);
  const [keyword, setKeyword] = useState([]);
  const componentRef = useRef();
  const router = useRouter();

  const handleNav = (bookNum) => {
    router.push("CarDetail/" + bookNum);
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleKeywordSearch = (e) => {
    e.preventDefault();
    console.log(keyword);
    fetch(`${baseUrl}/api/getCars?q=${keyword}`)
      .then((res) => res.json())
      .then((data) => setCars(data));
  };

  useEffect(() => {
    fetch(`${baseUrl}/api/getCars?q=1/2023`)
      .then((res) => res.json())
      .then((data) => setCars(data));
  }, []);
  useEffect(() => {
    console.log(cars);
  }, [cars]);
  return (
    <>
      {/* <Head>
        <header>
          <title>Cars info</title>
        </header>
      </Head> */}
      <div className="hidden">
        <CarsReportToPrint ref={componentRef} value={cars} />
      </div>
      <div className={styles.fillterMenu}>
        <div onClick={handlePrint} className={styles.printBtn}>
          <BsPrinter />
        </div>
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            name="keyword"
            placeholder="ادخل الاسم او التاريخ او رقم الدفتر"
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button onClick={handleKeywordSearch}>
            <FaSearch />
          </button>
        </form>
      </div>
      <table className={styles.table} style={{ direction: "rtl" }}>
        <thead className={styles.tableHead}>
          <tr className={styles.tableHeaderRow}>
            <th className={styles.tableHeader}>#</th>
            <th className={styles.tableHeader + " " + styles.bookNum}>
              اسم العميل
            </th>
            <th className={styles.tableHeader + " " + styles.carType}>
              السيارة
            </th>
            <th className={styles.tableHeader}>رقم الدفتر</th>
            <th className={styles.tableHeader + " " + styles.bookDate}>
              الدفتر
            </th>
            <th className={styles.tableHeader}>الدخول</th>
            <th className={styles.tableHeader + " " + styles.diffDate}>
              البقاء
            </th>
          </tr>
        </thead>
        <tbody className={styles.tableBody}>
          {cars.map((item, index) => {
            var diff = cDate.getTime() - item.enteringDateBySec;
            var dayDiff = diff / (1000 * 60 * 60 * 24);
            return (
              <tr
                className={styles.tableRow}
                key={index}
                onClick={() => handleNav(item.bookNum)}>
                <td className={styles.index}>{1 + index}</td>
                <td className={styles.ownerName}>
                  {item.ownerFName + "  "}
                  {item.ownerSName + "  "}
                  {item.ownerTName + "  "}
                  {/* {item.ownerFOname} */}
                </td>
                <td className={styles.carType}>{item.carType}</td>
                <td className={styles.bookNum}>{item.bookNum}</td>
                <td className={styles.bookDate}>
                  {item.bookMonth}/{item.bookDay}/{item.bookYear}
                </td>
                <td className={styles.enteringDate}>
                  {item.enteringMonth}/{item.enteringDay}/{item.enteringYear}
                </td>
                <td className={styles.diffDate}>{Math.floor(dayDiff)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
export default Cars;
