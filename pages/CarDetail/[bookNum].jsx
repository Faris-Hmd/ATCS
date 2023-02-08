/** @format */

import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { BsPencil, BsPrinter, BsSave } from "react-icons/bs";
import { ImBin } from "react-icons/im";

import { useReactToPrint } from "react-to-print";
import ExtentionReportToPrint from "../../component/ExtentionReportToPrint";
import LeftingReportToPrint from "../../component/LeftingReportToPrint";
import { baseUrl } from "../_app";
import UserForm from "../../component/UserForm";
import {
  Button,
  ButtonGroup,
  Col,
  Container,
  Dropdown,
  DropdownButton,
  Row,
  Tab,
  Tabs,
} from "react-bootstrap";
import Actions from "../../component/Actions";
import LeftingExReportToPrint from "../../component/LeftingExReport";
import Loading from "../../component/Loading";

const CarDetail = () => {
  const [customer, setCustomer] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const route = useRouter();
  const { bookNum } = route.query;
  const leftReportRef = useRef();
  const exReportRef = useRef();
  const leftExReportRef = useRef();

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
    const { name, value } = event.target;
    if (event.target.type === "checkbox") {
      setCustomer((prev) => {
        return { ...prev, [name]: event.target.checked };
      });
    } else {
      // if (value.split(" ").length > 1) return;
      setCustomer((prev) => {
        return { ...prev, [name]: value };
      });
    }
  };

  const handleUpdate = async () => {
    setIsEditing(false);
    setIsLoading(true);
    axios({
      method: "post",
      url: `${baseUrl}/api/addCars`,
      data: {
        ...customer,
      },
    })
      .then((res) => {
        setCustomer(res.data);
        setIsLoading(false);
      })
      .catch(setIsLoading(false));
  };

  const handleDelete = () => {
    fetch(baseUrl + "/api/dltCustomer?bookNum=" + bookNum).then(
      route.push("/Cars"),
    );
  };

  useEffect(() => {
    if (!bookNum) return;
    fetch(baseUrl + "/api/getCar?bookNum=" + bookNum)
      .then((res) => res.json())
      .then((data) => {
        setCustomer(data);
        setIsLoading(false);
      });
  }, [bookNum]);

  if (isLoading) return <Loading />;
  if (customer)
    return (
      <Container className="p-0 m-0">
        <Col className="header">
          <span>
            <h4>بيانات العميل</h4>
          </span>
          <ButtonGroup className="rounded">
            {isEditing && (
              <Button
                onClick={handleUpdate}
                variant="light"
                disabled={!isEditing}>
                <BsSave size={"30px"} className="p-1" />
              </Button>
            )}

            <Button
              variant="light"
              onClick={() => setIsEditing((prev) => !prev)}>
              <BsPencil size={"30px"} className="p-1" />
            </Button>
            {isEditing && (
              <Button variant="light" onClick={() => handleDelete()}>
                <ImBin size={"30px"} className="p-1" />
              </Button>
            )}
            {(customer.threeMonthEx ||
              customer.sixMonthEx ||
              customer.leftEx) &&
              !isEditing && (
                <DropdownButton
                  variant="light"
                  as={ButtonGroup}
                  title={<BsPrinter size={"25px"} />}>
                  <Dropdown.Item eventKey="1" onClick={handleExPrint}>
                    <div>تمديد</div>
                  </Dropdown.Item>
                  <Dropdown.Item eventKey="2" onClick={handleLeftExPrint}>
                    <div>تمديد مغادرة</div>
                  </Dropdown.Item>
                  <Dropdown.Item eventKey="3" onClick={handleLeftPrint}>
                    <div>مغادرة</div>
                  </Dropdown.Item>
                </DropdownButton>
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
            <Tab title="التفاصيل" eventKey="التفاصيل" tabClassName={"m-1 mb-0"}>
              <Container>
                <Row className="justify-content-center">
                  <Col>
                    <UserForm
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
            <LeftingReportToPrint ref={leftReportRef} value={customer} />
            <ExtentionReportToPrint ref={exReportRef} value={customer} />
            <LeftingExReportToPrint ref={leftExReportRef} value={customer} />
          </div>
        )}
      </Container>
    );
};

export default CarDetail;
