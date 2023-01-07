/** @format */
import styles from "../../styles/Cars.module.css";

import { useEffect, useState } from "react";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import ComponentToPrint from "../ToPrint/ToPrint";
import { BsPrinter } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import { FaFilter } from "react-icons/fa";
import Head from "next/head";
import axios from "axios";

var cDate = new Date();
const jsonMap = () => {
  const [cars, setCars] = useState([]);
  const [keyword, setKeyword] = useState([]);
  const [dateMonthFillter, setDateMonthFillter] = useState(1);
  const [dateYearFillter, setDateYearFillter] = useState(2023);

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleDateFillterChange = (event) => {
    const { name, value } = event.target;
    if (name === "date") {
      const [y, m, d] = value.split("-");
      const date = new Date(`${m}/${d}/${y}`);
      // console.log(date.getFullYear(), 1 + date.getMonth());
      setDateYearFillter(date.getFullYear());
      setDateMonthFillter(1 + date.getMonth());
    }
  };

  const handleKeywordSearch = (e) => {
    e.preventDefault();
    console.log(keyword);
    console.log(keyword.split(" ").filter((item) => item !== ""));
  };
  const handleDateSearch = (e) => {
    e.preventDefault();
    console.log(dateMonthFillter, dateYearFillter);
  };

  useEffect(() => {
    axios({ method: "get", url: "http://localhost:3005/api/getCars" }).then(
      (res) => setCars(res.data)
    );
  }, []);

  // useEffect(() => {
  //   setCars([]);
  //   data.map((item) => {
  //     const [fn, sn, tn, fon] = item.ownerName.split(" ");
  //     const [m, d, y] = item.incomeDate.split("/");
  //     const [bm, bd, by] = item.bookDate.split("/");
  //     var eDate = new Date(`${m}/${d}/${y}`);
  //     var bookNum = item.bookNum.split(" ")[1]
  //       ? item.bookNum.split(" ")[1]
  //       : item.bookNum.split(" ")[0];

  //     setCars((prev) => [
  //       ...prev,
  //       {
  //         ownerFName: fn,
  //         ownerSName: sn,
  //         ownerTName: tn !== undefined ? tn : null,
  //         ownerFoName: fon !== undefined ? fon : null,
  //         bookDay: parseInt(bd),
  //         bookMonth: parseInt(bm),
  //         bookYear: parseInt(by),
  //         passport: item.ID !== undefined ? item.ID : null,
  //         bookNum: bookNum,
  //         chaseNum: item.chaseNum !== undefined ? item.chaseNum : null,
  //         carType: item.carType !== undefined ? item.carType : null,
  //         enteringMonth: parseInt(m),
  //         enteringDay: parseInt(d),
  //         enteringYear: parseInt(y),
  //         enteringDateBySec: eDate.getTime(),
  //         bookType:
  //           item.phones === "سياحي ," || item.phones === ",سياحي"
  //             ? "سياحي"
  //             : "عادي",
  //         phone1:
  //           item.phones === "سياحي ," ||
  //           item.phones === ",سياحي" ||
  //           item.phones === "," ||
  //           item.phones === " "
  //             ? null
  //             : item.phones?.split(",")[0],
  //         phone2:
  //           item.phones === "سياحي ," ||
  //           item.phones === ",سياحي" ||
  //           item.phones === "," ||
  //           item.phones === ""
  //             ? null
  //             : item.phones?.split(",")[1],
  //         keywords: [fn, sn, bookNum],
  //       },
  //     ]);
  //   });
  // }, []);
  // useEffect(() => {
  //   // cars.map((car) => {
  //   //   setDoc(doc(db, "cars", car.bookNum), {
  //   //     ...car,
  //   //     phone1: car.phone1 === undefined ? null : car.phone1,
  //   //     phone2: car.phone2 === undefined ? null : car.phone2,
  //   //   });
  //   // });
  //   // console.log(cars);
  // }, [cars]);
  return (
    <>
      <Head>
        <header>
          <title>Cars info</title>
        </header>
      </Head>
      <div className="hidden">
        <ComponentToPrint ref={componentRef} />
      </div>
      <div className={styles.fillterMenu}>
        <div onClick={handlePrint} className={styles.printBtn}>
          <BsPrinter />
        </div>
        <div>
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              name="keyword"
              placeholder="بحث"
              onChange={(e) => setKeyword(e.target.value)}
            />
            <button onClick={handleKeywordSearch}>
              <FaSearch />
            </button>
          </form>
        </div>
        <div>
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              type="date"
              name="date"
              placeholder="search by date"
              onChange={handleDateFillterChange}
            />
            <button onClick={handleDateSearch}>
              <FaFilter />
            </button>
          </form>
        </div>
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
              <tr className={styles.tableRow} key={index}>
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
export default jsonMap;
