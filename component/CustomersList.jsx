/** @format */

import { useRouter } from "next/router";
import React from "react";
import { Table } from "react-bootstrap";

function CarsList({ customer }) {
  const currentDate = new Date();
  const router = useRouter();

  const handleNav = (bookNum) => {
    router.push("CustomerDetails/" + bookNum);
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
        {customer.map((customer, index) => {
          var diff = currentDate.getTime() - customer.enteringDateBySec;
          var dayDiff = diff / (1000 * 60 * 60 * 24);
          var eDate = new Date(customer.enteringDateBySec);
          var bDate = new Date(customer.bookDateBySec);

          return (
            <tr
              style={{
                background:
                  customer.state === "غادر"
                    ? "lightGreen"
                    : customer.isViolate === "مخالف" && "pink",
              }}
              onClick={() => handleNav(customer.bookNum)}
              key={index}>
              <td>{1 + index}</td>
              <td style={{ minWidth: "100px", textAlign: "right" }}>
                {`${customer.ownerFName} ${customer.ownerSName} ${customer.ownerTName}`}
              </td>
              <td style={{ minWidth: "100px", textAlign: "right" }}>
                {customer.carType}
              </td>
              <td>{customer.bookNum}</td>
              <td>
                {eDate.getMonth() + 1}/{eDate.getDate()}/{eDate.getFullYear()}
              </td>
              <td>
                {bDate.getMonth() + 1}/{bDate.getDate()}/{bDate.getFullYear()}
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
