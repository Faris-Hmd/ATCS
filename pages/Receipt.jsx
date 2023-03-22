/** @format */

import axios from "axios";
import Head from "next/head";
import React, { useContext, useState } from "react";
import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  InputGroup,
  Row,
} from "react-bootstrap";
import { BiSearch } from "react-icons/bi";
import { toast } from "react-toastify";
import Loading from "../component/Loading";
import { AuthContext } from "../context/authContext";
import { baseUrl } from "./_app";

function Receipt() {
  const { user, hasAccess } = useContext(AuthContext);
  const [customer, setCustomer] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [carnetNo, setBookNum] = useState("");
  const [enteringDate, setEnteringDate] = useState("2023-02-24");

  function getCustomer(e) {
    e.preventDefault();
    try {
      fetch(`${baseUrl}/api/receipt?carnetNo=${carnetNo}`)
        .then((res) => {
          if (!res.ok) {
            setCustomer({});
            res.json().then((data) => toast.error(data.error));
            return;
          } else return res.json();
        })
        .then((data) => {
          data && setCustomer(data);
        });
    } catch (error) {
      toast.error("حصل خطأ في العملية");
      setCustomer({});
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    if (customer.repeatEntry === true) {
      axios({
        method: "post",
        url: `${baseUrl}/api/customer`,
        data: {
          ...customer,
          enteringDate,
        },
      })
        .then(() => {
          setIsLoading(false);
          setCustomer({});
          toast.success("تم استخراج الايصال بنجاح");
        })
        .catch(() => {
          setIsLoading(false);
          toast.error("حصل خطأ في العملية");
        });
    } else {
      axios({
        method: "patch",
        url: `${baseUrl}/api/customer`,
        data: {
          ...customer,
          enteringDate,
        },
      })
        .then(() => {
          toast.success("تم استخراج الايصال بنجاح");
        })
        .catch(() => toast.error("العملية لم تتم بنجاح"));
    }
  }

  if (!(user && hasAccess("Receipt")))
    return <h3>لا تملك صلاحية الوصول لهذه الصفحة</h3>;

  if (user && hasAccess("Receipt"))
    return (
      <>
        <Head>
          <title>استخراج ايصال</title>
        </Head>
        <Container className="h-100 ">
          <Row>
            <Col xs={12} className="p-3 header">
              استخراج إيصال دخول
            </Col>
          </Row>
          <Row className="full">
            <Container className="full">
              <Col xs={12} lg={6}>
                <Form
                  id="receipt-form"
                  className="p-2 bg-w shadow rounded"
                  onSubmit={getCustomer}>
                  <InputGroup
                    label="رقم الدفتر"
                    controlId="carnetNo"
                    className="mb-2">
                    <Form.Control
                      type="text"
                      name="carnetNo"
                      placeholder="رقم الدفتر"
                      className="p-2"
                      onChange={(e) => {
                        setBookNum(e.currentTarget.value);
                      }}
                    />
                    <Button type="submit">
                      {isLoading ? <Loading /> : <BiSearch size="30px" />}
                    </Button>
                  </InputGroup>
                  <FloatingLabel
                    label="اسم المالك"
                    controlId="ownerName"
                    className="mb-2">
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
                  <div className="flex-r justify-content-between">
                    {" "}
                    <FloatingLabel
                      label="نوع المركبة"
                      controlId="ownerName"
                      className="mb-2 w-50">
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
                      className="mb-2 w-50">
                      <Form.Control
                        disabled
                        type="text"
                        name="ownerName"
                        placeholder="نوع المركبة"
                        value={customer?.carModel ? customer?.carModel : ""}
                      />{" "}
                    </FloatingLabel>
                  </div>

                  <FloatingLabel
                    label="رقم الهيكل"
                    controlId="ownerName"
                    className="mb-2">
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
                    className="mb-2">
                    <Form.Control
                      disabled
                      type="text"
                      name="ownerName"
                      placeholder="اسم المالك"
                      value={
                        customer?.repeatEntry === true
                          ? "دخول متكرر"
                          : "دخول جديد"
                      }
                    />
                  </FloatingLabel>

                  <div className="flex-r justify-content-between">
                    <FloatingLabel
                      label="تاريخ الدفتر"
                      controlId="enteringDate"
                      className="mb-2 w-50">
                      <Form.Control
                        disabled
                        type="date"
                        name="carnetNo"
                        placeholder="تاريخ الدفتر"
                        value={customer.bookDate}
                        onChange={(e) => {
                          setEnteringDate(e.target.value);
                        }}
                        required
                      />
                    </FloatingLabel>
                    <FloatingLabel
                      label="تاريخ الدخول"
                      controlId="enteringDate"
                      className="mb-2 w-50">
                      <Form.Control
                        type="date"
                        name="carnetNo"
                        placeholder="تاريخ الدخول"
                        value={enteringDate}
                        onChange={(e) => {
                          setEnteringDate(e.target.value);
                        }}
                        required
                      />
                    </FloatingLabel>
                  </div>

                  {customer && (
                    <Button
                      onClick={handleSubmit}
                      disabled={isLoading || !customer.ownerFName}>
                      استخراج
                    </Button>
                  )}
                </Form>
              </Col>
            </Container>
          </Row>
        </Container>
      </>
    );
}

export default Receipt;
