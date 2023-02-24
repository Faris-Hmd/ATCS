/** @format */

import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
} from "react-bootstrap";
import { baseUrl } from "./_app";

function Receipt() {
  const [customer, setCustomer] = useState({});
  const [bookNum, setBookNum] = useState("");
  const [enteringDate, setEnteringDate] = useState("2023-02-24");

  function handleSubmit(e) {
    e.preventDefault();
    if (customer.repeatEntry === true) {
      axios({
        method: "post",
        url: `${baseUrl}/api/customer`,
        data: {
          ...customer,
          enteringDate,
        },
      });
      // .then(setIsLoading(false))
      // .catch(setIsLoading(false));
    } else {
      axios({
        method: "patch",
        url: `${baseUrl}/api/customer`,
        data: {
          ...customer,
          enteringDate,
        },
      });
    }
  }

  useEffect(() => {
    if (bookNum.length >= 5) {
      fetch(`${baseUrl}/api/receipt?bookNum=${bookNum}`)
        .then((res) => res.json())
        .then((data) => {
          setCustomer(data);
        });
    }
  }, [bookNum]);

  return (
    <Container className="h-100">
      <Row>
        <Col xs={12} className="p-3 header">
          استخراج إيصال دخول
        </Col>
      </Row>
      <Row className="full">
        <Container>
          <Col xs={12} lg={6}>
            <Form className="p-2 bg-w shadow rounded" onSubmit={handleSubmit}>
              <FloatingLabel
                label="رقم الدفتر"
                controlId="bookNum"
                className="mb-2"
              >
                <Form.Control
                  type="text"
                  name="bookNum"
                  placeholder="رقم الدفتر"
                  onChange={(e) => {
                    setBookNum(e.currentTarget.value);
                  }}
                />
              </FloatingLabel>

              <FloatingLabel
                label="اسم المالك"
                controlId="ownerName"
                className="mb-2"
              >
                <Form.Control
                  disabled
                  type="text"
                  name="ownerName"
                  placeholder="اسم المالك"
                  value={
                    customer?.ownerFName
                      ? customer?.ownerFName +
                        " " +
                        customer?.ownerSName +
                        " " +
                        customer?.ownerTName
                      : ""
                  }
                />
              </FloatingLabel>
              <FloatingLabel
                label="نوع المركبة"
                controlId="ownerName"
                className="mb-2"
              >
                <Form.Control
                  disabled
                  type="text"
                  name="ownerName"
                  placeholder="نوع المركبة"
                  value={customer?.carType ? customer?.carType : ""}
                />
              </FloatingLabel>
              <FloatingLabel
                label="موديل المركبة"
                controlId="ownerName"
                className="mb-2"
              >
                <Form.Control
                  disabled
                  type="text"
                  name="ownerName"
                  placeholder="نوع المركبة"
                  value={customer?.carModel ? customer?.carModel : ""}
                />
              </FloatingLabel>
              <FloatingLabel
                label="رقم الهيكل"
                controlId="ownerName"
                className="mb-2"
              >
                <Form.Control
                  disabled
                  type="text"
                  name="ownerName"
                  placeholder="نوع المركبة"
                  value={customer?.chaseNum ? customer?.chaseNum : ""}
                />
              </FloatingLabel>
              <FloatingLabel
                label="نوع الدخول"
                controlId="repeatEntery"
                className="mb-2"
              >
                <Form.Control
                  disabled
                  type="text"
                  name="ownerName"
                  placeholder="اسم المالك"
                  value={
                    customer?.repeatEntry === true ? "دخول متكرر" : "دخول جديد"
                  }
                />
              </FloatingLabel>
              <FloatingLabel
                label="تاريخ الدخول"
                controlId="enteringDate"
                className="mb-2"
              >
                <Form.Control
                  type="date"
                  name="bookNum"
                  placeholder="تاريخ الدخول"
                  value={enteringDate}
                  onChange={(e) => {
                    setEnteringDate(e.target.value);
                  }}
                  required
                />
              </FloatingLabel>
              <Button
                type="submit"
                disabled={customer.ownerFName ? false : true}
              >
                استخراج
              </Button>
            </Form>
          </Col>
        </Container>
      </Row>
    </Container>
  );
}

export default Receipt;
