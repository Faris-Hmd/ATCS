import { Col, Container, ListGroup, Row, Tab } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { baseUrl } from "../pages/_app";
import Loading from "./Loading";

function Premessions() {
  const [premessions, setPremessions] = useState();
  const [userChangeLoading, setUserChangeLoading] = useState(true);
  const [userType, setUserType] = useState("admin");

  const premessionsList = [
    { route: "Home", name: "القائمة" },
    { route: "Receipt", name: "استخراج ايصال" },
    { route: "Settings", name: "الاعدادات" },
    { route: "SignUp", name: "اضافة مستخدم" },
    { route: "Cars", name: "قائمة السيارات" },
    { route: "AddCar", name: "اضافة سيارة" },
    { route: "CarDetail", name: "تفاصيل العملاء" },
  ];

  function getPremissions() {
    setUserChangeLoading(true);
    fetch(baseUrl + "/api/getPrem?userType=" + userType)
      .then((res) => res.json())
      .then((data) => {
        setUserType(data.userType);
        setPremessions(data.premessions);
        setUserChangeLoading(false);
        console.log(data);
      });
  }

  async function handlePremUpdate() {
    await updateDoc(doc(db, "userType", userType), {
      premessions: premessions,
    });
  }

  function handlePremChange(route) {
    if (!premessions?.includes(route)) {
      setPremessions((prev) => [...prev, route]);
      return;
    }

    if (premessions?.includes(route)) {
      setPremessions((prev) => prev.filter((item) => item !== route));
      return;
    }
  }

  useEffect(() => {
    getPremissions();
  }, [userType]);

  useEffect(() => {
    premessions && handlePremUpdate();
  }, [premessions]);

  return (
    <Container className="bg-w p-2 shadow rounded">
      <Tab.Container defaultActiveKey="#1">
        <Row>
          <Col lg={5}>
            <ListGroup>
              <ListGroup.Item
                action
                href="#1"
                // className={`${hre && "fc-w"}`}
                onClick={() => setUserType("admin")}>
                مشرف
              </ListGroup.Item>
              <ListGroup.Item
                action
                href="#2"
                onClick={() => setUserType("swakinUser")}>
                مكتب سواكن
              </ListGroup.Item>
              <ListGroup.Item
                action
                href="#3"
                onClick={() => setUserType("ksaUser")}>
                مكتب السعودية
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col lg={7}>
            {!userChangeLoading ? (
              <Tab.Content>
                {premessionsList.map((item, index) => {
                  return (
                    <div eventKey={"#" + index + 1} key={index}>
                      <div
                        className={`mt-2  ${
                          premessions?.includes(item.route)
                            ? "checkBoxChecked"
                            : "checkBox"
                        }`}
                        onClick={() => handlePremChange(item.route)}>
                        {item.name}
                      </div>
                    </div>
                  );
                })}
              </Tab.Content>
            ) : (
              <Loading />
            )}
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
}

export default Premessions;
