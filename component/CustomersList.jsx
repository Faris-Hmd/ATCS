/** @format */

import Link from "next/link";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { TbBookDownload, TbBookUpload } from "react-icons/tb";
import Loading from "./Loading";

function CustomersList({ customers }) {
  if (!customers) return <Loading />;
  return (
    <Container className="p-1 m-0">
      <Row>
        <Col>
          {customers.map((customer, index) => {
            // var diff = currentDate.getTime() - customer.enteringDateBySec;
            // var dayDiff = diff / (1000 * 60 * 60 * 24);
            var eDate = new Date(customer.enteringDateBySec);
            var bDate = new Date(customer.bookDateBySec);
            return (
              <Link
                key={index}
                href={"CustomerDetails/" + customer.customerId}
                style={{
                  color: "black",
                  textDecoration: "none",
                  background:
                    customer.state === "غادر"
                      ? "lightGreen"
                      : customer.state === "مخالف" && "pink",
                }}
                className="bg-w fos-lg m-0"
              >
                <Container className="d-flex mt-1 border rounded p-2 align-items-center justify-content-between bg-w">
                  {/* <Col xs={1}>{index + 1}</Col> */}
                  <Col className="text-start text-nowrap">
                    <Container>
                      <Row>{`${customer.ownerFName} ${customer.ownerSName} ${customer.ownerTName}`}</Row>
                      <Row>
                        <Container className="p-0 m-0">
                          <Row>
                            <Col className="fos-sm text-start text-nowrap opacity-75">
                              <TbBookUpload />
                              {bDate.toISOString().slice(2, 10)}
                              {" / "}
                              <TbBookDownload />
                              {eDate.toISOString().slice(2, 10)}
                            </Col>
                          </Row>
                        </Container>
                      </Row>
                    </Container>
                  </Col>
                  <Col className="text-start text-nowrap">
                    <Container>
                      <Row>{customer.carType}</Row>
                      <Row className="fos-sm opacity-75 text-nowrap">
                        {customer.bookNum}
                      </Row>
                    </Container>
                  </Col>
                  <Col xs={1}>{customer.repeatEntry ? "متكرر" : "جديد"}</Col>
                  {/* <Col>{Math.floor(dayDiff)}</Col> */}
                </Container>
              </Link>
            );
          })}
        </Col>
      </Row>
    </Container>
  );

  // return (
  //   <Table striped responsive={"sm"} hover>
  //     <thead style={{ backgroundColor: "var(--theme-clr)", color: "white" }}>
  //       <tr>
  //         <th>#</th>
  //         <th>اسم العميل</th>
  //         <th>السيارة</th>
  //         <th>رقم الدفتر</th>
  //         <th>الدفتر</th>
  //         <th>الدخول</th>
  //         <th>البقاء</th>
  //       </tr>
  //     </thead>
  //     <tbody>
  //       {customers.map((customer, index) => {
  //         var diff = currentDate.getTime() - customer.enteringDateBySec;
  //         var dayDiff = diff / (1000 * 60 * 60 * 24);
  //         var eDate = new Date(customer.enteringDateBySec);
  //         var bDate = new Date(customer.bookDateBySec);

  //         return (
  //           <tr
  //             style={{
  //               background:
  //                 customer.state === "غادر"
  //                   ? "lightGreen"
  //                   : customer.state === "مخالف" && "pink",
  //             }}
  //             onClick={() => handleNav(customer.customerId)}
  //             key={index}>
  //             <td>{1 + index}</td>
  //             <td className="text-nowrap text-start">
  //               {`${customer.ownerFName} ${customer.ownerSName} ${customer.ownerTName}`}
  //             </td>
  //             <td className="text-nowrap text-start">{customer.carType}</td>
  //             <td>{customer.bookNum}</td>
  //             <td>{bDate.toISOString().slice(0, 10)}</td>
  //             <td>{eDate.toISOString().slice(0, 10)}</td>
  //             <td>{Math.floor(dayDiff)}</td>
  //           </tr>
  //         );
  //       })}
  //     </tbody>
  //   </Table>
  // );
}

export default CustomersList;
