/** @format */
import React from "react";
import { Container, Table } from "react-bootstrap";
import styles from "../styles/List.module.css";
import reportStyles from "../styles/report.module.css";

const CustsReportToPrint = React.forwardRef(
  ({ customers, startDate, endDate, state }, ref) => {
    const sDate = new Date(startDate);
    const eDate = new Date(endDate);
    return (
      <Container className="" ref={ref}>
        <div className={reportStyles.header}>
          <div className={reportStyles.title}>
            {(state === "لم يغادر" || state === "null") &&
              "تقرير مركبات الافراج المؤقت"}
            {state === "غادر" && "تقرير مركبات المغادرة "}
            {state === "مخالف" && "تقرير المركبات المخالفة"}
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
        <Table responsive={"sm"} striped>
          <thead>
            <tr className="bg-b">
              <th>#</th>
              <th>اسم العميل</th>
              <th>نوع السيارة</th>
              <th>رقم الشاسيه</th>
              <th>رقم الدفتر</th>
              <th>الدفتر</th>
              <th>الدخول</th>
              <th>الهاتف</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer, index) => {
              var eDate = new Date(customer.enteringDateBySec);
              var bDate = new Date(customer.bookDateBySec);
              return (
                <tr className={styles.tableRow} key={index}>
                  <td>{1 + index}</td>
                  <td className="text-nowrap">
                    {customer.ownerFName + "  "}
                    {customer.ownerSName + "  "}
                    {customer.ownerTName + "  "}
                    {customer.ownerFoName && customer.ownerFoName}
                  </td>
                  <td className="text-nowrap">{customer.carType}</td>
                  <td>{customer.chaseNum}</td>
                  <td>{customer.bookNum}</td>
                  <td>{bDate.toISOString().slice(0, 10)}</td>
                  <td>{eDate.toISOString().slice(0, 10)}</td>
                  <td className="text-nowrap">
                    {customer.phone2
                      ? customer.phone2
                      : customer.phone1
                      ? customer.phone1
                      : null}
                  </td>
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
