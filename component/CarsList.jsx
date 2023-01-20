/** @format */

import { useRouter } from "next/router";
import React from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import styles from "../styles/List.module.css";

function CarsList({ cars }) {
  const currentDate = new Date();
  const router = useRouter();

  const handleNav = (bookNum) => {
    router.push("CarDetail/" + bookNum);
  };

  return (
    <Table className={styles.table} striped responsive={"sm"} hover>
      <thead>
        <tr>
          <th>#</th>
          <th>اسم العميل</th>
          <th>السيارة</th>
          <th>رقم الدفتر</th>
          <th>الدفتر</th>
          <th>الدخول</th>
          <th>البقاء</th>
        </tr>
      </thead>
      <tbody>
        {cars.map((item, index) => {
          var diff = currentDate.getTime() - item.enteringDateBySec;
          var dayDiff = diff / (1000 * 60 * 60 * 24);
          return (
            <tr
              style={{ background: item.state === "غادر" && "pink" }}
              onClick={() => handleNav(item.bookNum)}
              key={index}
            >
              <td>{1 + index}</td>
              <td>
                {`${item.ownerFName} ${item.ownerSName} ${item.ownerTName}`}
              </td>
              <td>{item.carType}</td>
              <td>{item.bookNum}</td>
              <td>
                {item.bookMonth}/{item.bookDay}/{item.bookYear}
              </td>
              <td>
                {item.enteringMonth}/{item.enteringDay}/{item.enteringYear}
              </td>
              <td>{Math.floor(dayDiff)}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

export default CarsList;
