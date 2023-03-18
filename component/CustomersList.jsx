/** @format */

import Link from "next/link";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { TbBookDownload, TbBookUpload } from "react-icons/tb";
import Loading from "./Loading";

const currentDate = new Date();

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
                }}
                className="bg-w fos-lg m-0"
              >
                <Container
                  className={`d-flex mt-1 border rounded p-2 align-items-center justify-content-between bg-w position-relative overflow-hidden 
                  ${customer.state === "مخلص" && "border-warning opacity-75"}
                  ${customer.state === "غادر" && "opacity-75"}
                  ${customer.state === "مخالف" && "border-danger"}`}
                >
                  <Col xs={1}>{index + 1}</Col>
                  <Col xs={5} className="text-start text-nowrap">
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
                        {customer.carnetNo}
                      </Row>
                    </Container>
                  </Col>
                  {/* <Col className="" xs={2}>
                    {customer.state}
                  </Col> */}
                  <Col xs={2} className="text-center rounded fos-m">
                    <span
                      className={` ${
                        customer.stayingTime <= customer.availableTime
                          ? "text-success"
                          : "text-danger"
                      }`}
                    >
                      {customer.stayingTime}
                    </span>
                    <span> / {customer.availableTime}</span>
                  </Col>
                  {customer.repeatEntry && (
                    <Col className="floating-badge">0</Col>
                  )}
                  {customer.state === "مخلص" && (
                    <Col className="floating-badge-2 floating-badge-orange">
                      0
                    </Col>
                  )}
                  {customer.state === "غادر" && (
                    <Col className="floating-badge-2 floating-badge-gray">
                      0
                    </Col>
                  )}
                  {customer.state === "لم يغادر" && (
                    <Col className="floating-badge-2 floating-badge-green">
                      0
                    </Col>
                  )}
                  {customer.state === "مغادر قريبا" && (
                    <Col className="floating-badge-2 floating-badge-yellow">
                      0
                    </Col>
                  )}
                  {customer.state === "مخالف" && (
                    <Col className="floating-badge-2 floating-badge-red">0</Col>
                  )}
                </Container>
              </Link>
            );
          })}
        </Col>
      </Row>
    </Container>
  );
}

export default CustomersList;
