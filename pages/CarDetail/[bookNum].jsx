/** @format */

import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { BsPencil, BsPrinter, BsSave2 } from "react-icons/bs";
import { useReactToPrint } from "react-to-print";
import ExtentionReportToPrint from "../../component/ExtentionReportToPrint";
import LeftingReportToPrint from "../../component/LeftingReportToPrint";

import { baseUrl } from "../_app";
// import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
// import { db } from "../../firebase/firebase";
import UserForm from "../../component/Form";
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

const CarDetail = () => {
  const [car, setCar] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const route = useRouter();
  const leftReportRef = useRef();
  const exReportRef = useRef();
  const { bookNum } = route.query;

  const handleExPrint = useReactToPrint({
    content: () => exReportRef.current,
  });

  const handleLeftPrint = useReactToPrint({
    content: () => leftReportRef.current,
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    if (event.target.type === "checkbox") {
      setCar((prev) => {
        return { ...prev, [name]: event.target.checked };
      });
      return;
    }
    console.log([name], value);
    if (value.split(" ").length > 1) return;
    setCar((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleUpdate = async () => {
    setIsEditing(false);
    setIsLoading(true);
    var eDate = new Date(
      `${car.enteringMonth}/${car.enteringDay}/${car.enteringYear}`
    );
    axios({
      method: "post",
      url: `${baseUrl}/api/addCars`,
      data: {
        ...car,
        enteringDate: `${car.enteringMonth}/${car.enteringYear}`,
        enteringDateBySec: eDate.getTime(),
        keywords: [
          car.ownerSName,
          car.ownerFName,
          car.ownerTName,
          car.ownerFoName,
          car.bookNum,
          car.bookType,
          car.enteringType,
          `${car.enteringMonth}/${car.enteringYear}`,
          car.state,
        ],
      },
    })
      .then((res) => {
        setCar(res.data);
        setIsLoading(false);
      })
      .catch(setIsLoading(false));
  };

  // useEffect(() => {
  //   const getdata = async () => {
  //     const data = await getDocs(collection(db, "cars"));
  //     const cars = data.docs.map((car) => {
  //       return { ...car.data() };
  //     });

  //   };
  //   getdata();
  // }, []);

  useEffect(() => {
    console.log(bookNum);
    fetch(baseUrl + "/api/getCar?bookNum=" + bookNum)
      .then((res) => res.json())
      .then((data) => {
        setCar(data);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <h2>Loading... </h2>;
  if (car)
    return (
      <div className={"containe"}>
        <div className="header">
          <span>بيانات العميل</span>
          <ButtonGroup size="sm">
            <Button
              onClick={handleUpdate}
              variant="light"
              disabled={!isEditing}
            >
              <BsSave2 size={"22px"} className="m-1" />
            </Button>

            <Button
              variant="light"
              onClick={() => setIsEditing((prev) => !prev)}
            >
              <BsPencil size={"22px"} className="m-1" />
            </Button>

            {(car.threeMonthEx || car.sixMonthEx || car.leftEx) &&
              !isEditing && (
                <DropdownButton
                  variant="light"
                  as={ButtonGroup}
                  title={<BsPrinter size={"22px"} />}
                >
                  <Dropdown.Item eventKey="1" onClick={handleExPrint}>
                    <div>تمديد</div>
                  </Dropdown.Item>
                  <Dropdown.Item eventKey="2" onClick={handleLeftPrint}>
                    <div>مغادرة</div>
                  </Dropdown.Item>
                </DropdownButton>
              )}
          </ButtonGroup>
        </div>
        <Tabs className="bg-clr w-100">
          <Tab
            eventKey={"الاجرائات"}
            title={"الاجرائات"}
            tabClassName={"m-1 mb-0"}
          >
            <Container>
              <Row className="justify-content-center">
                <Col xs={"auto"} lg={4}>
                  <Actions
                    handleChange={handleChange}
                    car={car}
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
                    car={car}
                    isEditing={isEditing}
                  />
                </Col>
              </Row>
            </Container>
          </Tab>
        </Tabs>
        <div className="hidden">
          <LeftingReportToPrint ref={leftReportRef} value={car} />
          <ExtentionReportToPrint ref={exReportRef} value={car} />
        </div>
      </div>
    );
};

export default CarDetail;
