/** @format */
import React from "react";
import { Container, Table } from "react-bootstrap";
import reportStyles from "../styles/report.module.css";

const CustsReportToPrint = React.forwardRef(
  ({ customers, startDate, endDate, state, repeatEntry }, ref) => {
    const sDate = new Date(startDate);
    const eDate = new Date(endDate);
    return (
      <Container className="ltr fos-m w-100 text-start" ref={ref}>
        <div className={reportStyles.header}>
          <div className={reportStyles.title}>
            {(state === "لم يغادر" || state === "null") && repeatEntry === true
              ? "تقرير مركبات الافراج المؤقت شامل للدخول المتكرر"
              : "تقرير مركبات الافراج المؤقت"}

            {state === "repeatEntry" && "تقرير مركبات الدخول المتكرر "}
            {state === "غادر" && "تقرير المركبات المغادرة "}
            {state === "مخالف" && "تقرير المركبات المخالفة"}
            {state === "مخلص" && "تقرير المركبات المخلصة"}
          </div>
          <div className="fs-6">
            الفترة من{" "}
            {sDate.getFullYear() +
              "/" +
              (sDate.getMonth() + 1) +
              "/" +
              sDate.getDate()}{" "}
            الى{" "}
            {eDate.getFullYear() +
              "/" +
              (eDate.getMonth() + 1) +
              "/" +
              eDate.getDate()}
          </div>
        </div>
        <Table striped bordered>
          <thead>
            <tr className="bg-b">
              <th>الهاتف</th>
              <th>الدخول</th>
              <th>الدفتر</th>
              <th>رقم الشاسيه</th>
              <th>نوع السيارة</th>
              <th>اسم العميل</th>
              <th>رقم الدفتر</th>
              <th>#</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer, index) => {
              var eDate = new Date(customer.enteringDateBySec);
              var bDate = new Date(customer.bookDateBySec);
              return (
                <tr key={index}>
                  <td className="text-nowrap">
                    {customer.phone2
                      ? customer.phone2
                      : customer.phone1
                      ? customer.phone1
                      : null}
                  </td>{" "}
                  <td>{eDate.toISOString().slice(0, 10)}</td>
                  <td>{bDate.toISOString().slice(0, 10)}</td>
                  <td>{customer.chaseNum}</td>
                  <td className="text-nowrap">{customer.carType}</td>
                  <td className="text-nowrap">
                    {customer.ownerFName + "  "}
                    {customer.ownerSName + "  "}
                    {customer.ownerTName + "  "}
                    {customer.ownerFoName && customer.ownerFoName}
                  </td>
                  <td>{customer.bookNum}</td>
                  <td>{1 + index}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
    );
  },
);
export default CustsReportToPrint;
