/** @format */

import { useRouter } from "next/router";
import React from "react";
import styles from "../styles/List.module.css";

function CarsList({ cars }) {
  const currentDate = new Date();
  const router = useRouter();

  const handleNav = (bookNum) => {
    router.push("CarDetail/" + bookNum);
  };

  return (
    <table className={styles.table} style={{ direction: "rtl" }}>
      <thead >
        <tr className={styles.tableHeaderRow}>
          <th >#</th>
          <th className={styles.bookNum}>
            اسم العميل
          </th>
          <th className={styles.carType}>السيارة</th>
          <th >رقم الدفتر</th>
          <th className={styles.bookDate}>الدفتر</th>
          <th >الدخول</th>
          <th className={styles.diffDate}>البقاء</th>
        </tr>
      </thead>
      <tbody className={styles.tableBody}>
        {cars.map((item, index) => {
          var diff = currentDate.getTime() - item.enteringDateBySec;
          var dayDiff = diff / (1000 * 60 * 60 * 24);
          return (
            <tr
              className={styles.tableRow}
              style={{ background: item.state === "غادر" && "red" }}
              onClick={() => handleNav(item.bookNum)}
              key={index}
            >
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
  );
}

export default CarsList;
