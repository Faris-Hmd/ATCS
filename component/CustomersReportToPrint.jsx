/** @format */
import React, { useEffect, useState } from "react";
import styles from "../styles/List.module.css";
import reportStyles from "../styles/report.module.css";

const CarsReportToPrint = React.forwardRef((props, ref) => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    setCars(props.value);
  }, []);
  return (
    <div className={reportStyles.printContainer} ref={ref}>
      <div className={reportStyles.header}>
        <div className={reportStyles.title}>
          تقرير مركبات الافراج المؤقت الشهري
        </div>
        <div className={reportStyles.for}>
          {/* {"2022/12/31الى  الفترة من 2022/12/1"} */}
          {cars[0]?.enteringYear + "/" + cars[0]?.enteringMonth + "/" + 1} الى
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
