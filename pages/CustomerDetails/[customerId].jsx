/** @format */

import axios from "axios";
import { useRouter } from "next/router";
import { useContext, useEffect, useRef, useState } from "react";
import { BsPencil, BsPrinter, BsSave } from "react-icons/bs";
import { ImBin } from "react-icons/im";

import { useReactToPrint } from "react-to-print";
import ExtentionReportToPrint from "../../component/ExtentionReportToPrint";
import LeftingReportToPrint from "../../component/LeftingReportToPrint";
import { baseUrl } from "../_app";
import CustomerForm from "../../component/CustomerForm";
import {
  Button,
  ButtonGroup,
  Col,
  Container,
  Modal,
  Row,
  Tab,
  Tabs,
} from "react-bootstrap";
import Actions from "../../component/Actions";
import LeftingExReportToPrint from "../../component/LeftingExReport";
import Loading from "../../component/Loading";
import { CustomerContext } from "../../context/customersContext";

const CarDetail = () => {
  const { customers } = useContext(CustomerContext);

  const [customer, setCustomer] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showRepModal, setShowRepModal] = useState(false);
  const [showDltModal, setShowDltModal] = useState(false);

  const route = useRouter();
  const { customerId } = route.query;

  const leftReportRef = useRef();
  const exReportRef = useRef();
  const leftExReportRef = useRef();

  const handleClose = () => setShowRepModal(false);
  const handleShow = () => setShowRepModal(true);

  const handleExPrint = useReactToPrint({
    content: () => exReportRef.current,
  });

  const handleLeftPrint = useReactToPrint({
    content: () => leftReportRef.current,
  });
  const handleLeftExPrint = useReactToPrint({
    content: () => leftExReportRef.current,
  });

  const handleChange = (event) => {
    console.log(customer);
    const { name, value } = event.target;
    // console.log(value, name);
    if (event.target.type === "checkbox") {
      setCustomer((prev) => {
        return { ...prev, [name]: event.target.checked };
      });
    } else {
      setCustomer((prev) => {
        return { ...prev, [name]: value };
      });
    }
  };

  const handleUpdate = async () => {
    // console.log(customer);
    setIsEditing(false);
    setIsLoading(true);
    axios({
      method: "patch",
      url: `${baseUrl}/api/customer`,
      data: {
        ...customer,
      },
    })
      .then(setIsLoading(false))
      .catch(setIsLoading(false));
  };

  const handleDelete = () => {
    fetch(baseUrl + "/api/customer?customerId=" + customer.customerId, {
      method: "delete",
    }).then(route.push("/Customers"));
  };

  useEffect(() => {
    if (!customerId) return;
    if (customers.find((cust) => cust.customerId === customerId)) {
      setCustomer(customers.find((cust) => cust.customerId === customerId));
      setIsLoading(false);
    } else {
      fetch(baseUrl + "/api/customer?customerId=" + customerId)
        .then((res) => res.json())
        .then((data) => {
          setCustomer(data);
          setIsLoading(false);
        });
    }
  }, [customerId, customers]);

  // useEffect(() => {
  //   console.log(customer);
  // }, [customerId]);

  if (isLoading) return <Loading />;
  if (customer)
    return (
      <>
        <Modal
          centered
          show={showDltModal}
          onHide={() => setShowDltModal(false)}>
          <Modal.Header>
            <Modal.Title>
              هل انت متأكد من حذف
              {" " + customer.ownerFName + " " + customer.ownerSName}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="d-flex justify-content-center">
            <Button onClick={handleDelete} variant="danger" className="w-50">
              حذف
              <ImBin size={"25px"} className="m-1" />
            </Button>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowDltModal(false)}>
              تراجع
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal
          show={showRepModal}
          onHide={handleClose}
          // backdrop="static"
          keyboard={false}>
          <Modal.Header>
            <Modal.Title>خطابات</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Button
              onClick={handleExPrint}
              disabled={!customer.threeMonthEx}
              className="w-100 mb-2">
              <div>تمديد</div>
            </Button>
            <Button
              onClick={handleLeftExPrint}
              disabled={!customer.leftEx}
              className="w-100 mb-2">
              <div>تمديد مغادرة</div>
            </Button>
            <Button
              onClick={handleLeftPrint}
              disabled={customer.state !== "غادر"}
              className="w-100 mb-1">
              <div>مغادرة</div>
            </Button>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              اغلاق
            </Button>
          </Modal.Footer>
        </Modal>
        <Container className="p-0 m-0">
          <Col className="header">
            <span>
              <h4>بيانات العميل</h4>
            </span>
            <ButtonGroup className="rounded overflow-hidden">
              <Button
                variant="light"
                onClick={() => setIsEditing((prev) => !prev)}>
                <BsPencil size={"25px"} />
              </Button>{" "}
              {!isEditing && (
                <Button onClick={handleShow} variant="light">
                  <BsPrinter size={"25px"} />
                </Button>
              )}
              {isEditing && (
                <>
                  <Button
                    onClick={handleUpdate}
                    variant="light"
                    disabled={!isEditing}>
                    <BsSave size={"25px"} />
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => setShowDltModal(true)}>
                    <ImBin size={"25px"} />
                  </Button>{" "}
                </>
              )}
            </ButtonGroup>
          </Col>
          <Col>
            <Tabs className="bg-clr w-100">
              <Tab
                eventKey={"الاجرائات"}
                title={"الاجرائات"}
                tabClassName={"m-1 mb-0"}>
                <Container>
                  <Row className="justify-content-center">
                    <Col xs={"auto"} lg={6}>
                      <Actions
                        handleChange={handleChange}
                        customer={customer}
                        isEditing={isEditing}
                      />
                    </Col>
                  </Row>
                </Container>
              </Tab>
              <Tab
                title="التفاصيل"
                eventKey="التفاصيل"
                tabClassName={"m-1 mb-0"}>
                <Container>
                  <Row className="justify-content-center">
                    <Col>
                      <CustomerForm
                        handleChange={handleChange}
                        customer={customer}
                        isEditing={isEditing}
                      />
                    </Col>
                  </Row>
                </Container>
              </Tab>
            </Tabs>
          </Col>
          {!isEditing && (
            <div className="hidden">
              <LeftingReportToPrint ref={leftReportRef} customer={customer} />
              <ExtentionReportToPrint ref={exReportRef} customer={customer} />
              <LeftingExReportToPrint
                ref={leftExReportRef}
                customer={customer}
              />
            </div>
          )}
        </Container>
      </>
    );
};

export default CarDetail;
