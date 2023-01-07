/** @format */
import React, { useEffect, useRef, useState } from "react";
import styles from "../../styles/Cars.module.css";
import { data } from "../../data/data mapping";
const ComponentToPrint = React.forwardRef((props, ref) => {
  const [cars, setCars] = useState([]);
  const [keyword, setKeyword] = useState([]);
  const [dateMonthFillter, setDateMonthFillter] = useState(1);
  const [dateYearFillter, setDateYearFillter] = useState(2023);

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
    // console.table(cars);
    // console.table(cars.map((c) => c.bookNum === "Det0791761" && c.ownerFname));
  }, [cars]);

  useEffect(() => {
    setCars([]);
    data.slice(500).map((item) => {
      const [fn, sn, tn, fon] = item.ownerName.split(" ");
      const [m, d, y] = item.incomeDate.split("/");
      const [bm, bd, by] = item.bookDate.split("/");
      var eDate = new Date(`${m}/${d}/${y}`);
      var bookNum = item.bookNum.split(" ")[1]
        ? item.bookNum.split(" ")[1]
        : item.bookNum.split(" ")[0];

      setCars((prev) => [
        ...prev,
        {
          ownerFname: fn,
          ownerSname: sn,
          ownerTname: tn,
          ownerFOname: fon,
          phones: item.phones,
          bookDay: parseInt(bd),
          bookMonth: parseInt(bm),
          bookYear: parseInt(by),
          ownerId: item.ID,
          bookNum: bookNum,
          chaseNum: item.chaseNum,
          carType: item.carType,
          enteringMonth: parseInt(m),
          enteringDay: parseInt(d),
          enteringYear: parseInt(y),
          enteringDateBySec: eDate.getTime(),
          keywords: [item.chaseNum, fn, sn, tn, fon, bookNum],
        },
      ]);
    });
  }, []);
  return (
    <table className={styles.table} style={{ direction: "rtl" }} ref={ref}>
      <thead className={styles.tableHead}>
        <tr className={styles.tableHeaderRow}>
          <th className={styles.tableHeader}>#</th>
          <th className={styles.tableHeader + " " + styles.bookNum}>
            اسم العميل
          </th>
          <th className={styles.tableHeader}>نوع السيارة</th>
          <th className={styles.tableHeader}>رقم الشاسيه</th>
          <th className={styles.tableHeader}>رقم الدفتر</th>
          <th className={styles.tableHeader}>الدفتر</th>
          <th className={styles.tableHeader}>الدخول</th>
          <th className={styles.tableHeader}>الهاتف</th>
        </tr>
      </thead>
      <tbody className={styles.tableBody}>
        {cars.map((item, index) => {
          var cDate = new Date();
          var diff = cDate.getTime() - item.enteringDateBySec;
          var dayDiff = diff / (1000 * 60 * 60 * 24);
          return (
            <tr className={styles.tableRow} key={index}>
              <td className={styles.index}>{1 + index}</td>
              <td className={styles.ownerName}>
                {item.ownerFname + "  "}
                {item.ownerSname + "  "}
                {item.ownerTname + "  "}
                {item.ownerFOname}
              </td>
              <td className={styles.bookNum}>{item.carType}</td>
              <td className={styles.bookNum}>{item.chaseNum}</td>

              <td className={styles.bookNum}>{item.bookNum}</td>
              <td className={styles.bookDate}>
                {item.bookMonth}/{item.bookDay}/{item.bookYear}
              </td>
              <td className={styles.enteringDate}>
                {item.enteringMonth}/{item.enteringDay}/{item.enteringYear}
              </td>
              <td className={styles.bookNum}>{item.phones}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
});
export default ComponentToPrint;
