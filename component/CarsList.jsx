/** @format */

import { useRouter } from "next/router";
import React from "react";
import { Table } from "react-bootstrap";

function CarsList({ cars }) {
  const currentDate = new Date();
  const router = useRouter();

  const handleNav = (bookNum) => {
    router.push("CarDetail/" + bookNum);
  };

  return (
    <Table striped responsive={"sm"} hover>
      <thead style={{ backgroundColor: "var(--theme-clr)", color: "white" }}>
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
              style={{
                background:
                  item.state === "غادر"
                    ? "lightGreen"
                    : item.isViolate === "مخالف" && "pink",
              }}
              onClick={() => handleNav(item.bookNum)}
              key={index}
            >
              <td>{1 + index}</td>
              <td style={{ minWidth: "200px" }}>
                {`${item.ownerFName} ${item.ownerSName} ${item.ownerTName}`}
              </td>
              <td style={{ minWidth: "200px" }}>{item.carType}</td>
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
