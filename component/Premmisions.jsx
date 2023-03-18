/** @format */

import { Button, Col, Container, ListGroup, Row, Tab } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { baseUrl } from "../pages/_app";
import Loading from "./Loading";
import axios from "axios";
import { toast } from "react-toastify";

function Premessions() {
  const [premessions, setPremessions] = useState();
  const [userChangeLoading, setUserChangeLoading] = useState(true);
  const [userType, setUserType] = useState("admin");

  const premessionsList = [
    { route: "Home", name: "الرئيسة" },
    { route: "Customers", name: "قائمة العملاء" },
    { route: "CustomersDetails", name: "تفاصيل العملاء" },
    { route: "AddCustomer", name: "اضافة عميل" },
    { route: "Receipt", name: "استخراج ايصال" },
    // { route: "Settings", name: "الاعدادات" },
    { route: "SignUp", name: "اضافة مستخدم" },
    { route: "Users", name: "المستخدمين" },
    { route: "Premm", name: "تغيير الصلاحيات" },
  ];

  function getPremissions() {
    setUserChangeLoading(true);
    fetch(baseUrl + "/api/Premm?userType=" + userType)
      .then((res) => res.json())
      .then((data) => {
        setUserType(data.userType);
        setPremessions(data.premessions);
        setUserChangeLoading(false);
        // console.log(data);
      });
  }

  async function handlePremUpdate() {
    axios({
      method: "PATCH",
      url: `${baseUrl}/api/Premm?userType=` + userType,
      data: {
        premessions: premessions,
      },
    }).then(() => {
      toast.success("تمت تعديل الصلاحيات بنجاح !", { toastId: "1" });
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

  // useEffect(() => {
  //   premessions && handlePremUpdate();
  // }, [premessions]);

  return (
    <Container className="bg-w p-2 shadow rounded h-500">
      <Tab.Container defaultActiveKey="#1">
        <Row>
          <Col lg={5} className="justify-content-center h-600">
            <ListGroup>
              <ListGroup.Item
                action
                href="#1"
                // className={`${hre && "fc-w"}`}
                onClick={() => setUserType("admin")}
              >
                مشرف
              </ListGroup.Item>
              <ListGroup.Item
                action
                href="#4"
                // className={`${hre && "fc-w"}`}
                onClick={() => setUserType("khUser")}
              >
                مكتب الخرطوم
              </ListGroup.Item>
              <ListGroup.Item
                action
                href="#2"
                onClick={() => setUserType("swakinUser")}
              >
                مكتب سواكن
              </ListGroup.Item>
              <ListGroup.Item
                action
                href="#3"
                onClick={() => setUserType("ksaUser")}
              >
                مكتب السعودية
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col lg={7} className="justify-content-center ">
            {!userChangeLoading ? (
              <Tab.Content>
                {premessionsList.map((item, index) => {
                  return (
                    <>
                      <div eventKey={"#" + index + 1} key={index}>
                        <div
                          className={`mt-2  ${
                            premessions?.includes(item.route)
                              ? "checkBoxChecked"
                              : "checkBox"
                          }`}
                          onClick={() => handlePremChange(item.route)}
                        >
                          {item.name}
                        </div>
                      </div>
                    </>
                  );
                })}
                <Button className="w-100 mt-2" onClick={handlePremUpdate}>
                  حفظ التعديلات
                </Button>
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
