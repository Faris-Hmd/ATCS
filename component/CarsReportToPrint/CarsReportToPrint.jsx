/** @format */
import React, { useEffect, useState } from "react";
import styles from "../../styles/Cars.module.css";
const CarsReportToPrint = React.forwardRef((props, ref) => {
  const [cars, setCars] = useState([]);
  // console.log(cars);
  const date = new Date();
  console.log(date.getDay() + 8);
  const month = date.getMonth() + 1;
  const day = date.getDay() + 8;
  useEffect(() => {
    setCars(props.value);
  }, []);
  // return <h1 ref={ref}>hhh</h1>;
  return (
    <div className={styles.printContainer} ref={ref}>
      <div className={styles.header}>
        <div className={styles.dateCon}>
          <div className={styles.date}>
            التاريخ {date.getFullYear() + "/" + month + "/" + day}
          </div>
          <div className={styles.bookNum}>رقم/ن/س/ر/ 2022/157</div>
        </div>
        <div className={styles.title}>تقرير مركبات الافراج المؤقت الشهري</div>
        <div className={styles.for}>
          الفترة من{" "}
          {cars[0]?.enteringYear + "/" + cars[0]?.enteringMonth + "/" + 1} الى{" "}
          {cars[0]?.enteringYear + "/" + cars[0]?.enteringMonth + "/" + 31}
        </div>
      </div>
      <table className={styles.table} style={{ direction: "rtl" }} ref={ref}>
        <thead>
          <tr>
            <th>#</th>
            <th className={styles.bookNum}>اسم العميل</th>
            <th>نوع السيارة</th>
            <th>رقم الشاسيه</th>
            <th>رقم الدفتر</th>
            <th>الدفتر</th>
            <th>الدخول</th>
            <th>الهاتف</th>
          </tr>
        </thead>
        <tbody className={styles.tableBody}>
          {cars.map((item, index) => {
            return (
              <tr className={styles.tableRow} key={index}>
                <td className={styles.index}>{1 + index}</td>
                <td className={styles.ownerName}>
                  {item.ownerFName + "  "}
                  {item.ownerSName + "  "}
                  {item.ownerTName + "  "}
                  {item.ownerFoName}
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
                <td className={styles.bookNum}>{item.phone2}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
});
export default CarsReportToPrint;

