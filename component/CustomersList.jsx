import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import Loading from "./Loading";

function CustomersList({ customers }) {
  const currentDate = new Date();
  const router = useRouter();

  const handleNav = (customerId) => {
    router.push("CustomerDetails/" + customerId);
  };
  if (!customers) return <Loading />;
  // return customers.map((customer, index) => {
  //   var diff = currentDate.getTime() - customer.enteringDateBySec;
  //   var dayDiff = diff / (1000 * 60 * 60 * 24);
  //   var eDate = new Date(customer.enteringDateBySec);
  //   var bDate = new Date(customer.bookDateBySec);

  //   return (
  //     <Link
  //       className=""
  //       key={index}
  //       href={"CustomerDetails/" + customer.customerId}
  //       style={{
  //         color: "black",
  //         textDecoration: "none",
  //         background:
  //           customer.state === "غادر"
  //             ? "lightGreen"
  //             : customer.state === "مخالف" && "pink",
  //       }}>
  //       <Container className="d-flex p-1 border align-items-center">
  //         <Col xs={1}>{index + 1}</Col>
  //         <Col
  //           xs={4}
  //           className="text-start text-nowrap">{`${customer.ownerFName} ${customer.ownerSName} ${customer.ownerTName}`}</Col>
  //         {/* <Col>{customer.carType}</Col> */}
  //         <Col xs={4}>{customer.bookNumNo}</Col>
  //         <Col>
  //           <Container>
  //             <Row>
  //               <Col>{eDate.toISOString().slice(0, 10)}</Col>
  //             </Row>
  //             <Row>
  //               <Col>{bDate.toISOString().slice(0, 10)}</Col>
  //             </Row>
  //           </Container>
  //         </Col>

  //         {/* <Col>{Math.floor(dayDiff)}</Col> */}
  //       </Container>
  //     </Link>
  //   );
  // });

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
        {customers.map((customer, index) => {
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
                    : customer.state === "مخالف" && "pink",
              }}
              onClick={() => handleNav(customer.customerId)}
              key={index}>
              <td>{1 + index}</td>
              <td style={{ minWidth: "100px", textAlign: "right" }}>
                {`${customer.ownerFName} ${customer.ownerSName} ${customer.ownerTName}`}
              </td>
              <td style={{ minWidth: "100px", textAlign: "right" }}>
                {customer.carType}
              </td>
              <td>{customer.bookNum}</td>
              <td>{bDate.toISOString().slice(0, 10)}</td>
              <td>{eDate.toISOString().slice(0, 10)}</td>
              <td>{Math.floor(dayDiff)}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

export default CustomersList;
