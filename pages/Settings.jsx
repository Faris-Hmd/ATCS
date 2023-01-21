/** @format */

import { doc, getDoc, updateDoc } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
  Tab,
  Table,
  Tabs,
} from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { db } from "../firebase/firebase";
import { baseUrl } from "./_app";

function Settings() {
  const [premessions, setPremessions] = useState();
  const [users, setUsers] = useState([]);

  const [userType, setUserType] = useState("admin");
  const router = useRouter();
  const premessionsList = [
    { route: "Home", name: "القائمة" },
    { route: "Receipt", name: "استخراج ايصال" },
    { route: "Settings", name: "الاعدادات" },
    { route: "SignUp", name: "اضافة مستخدم" },
    { route: "Cars", name: "قائمة السيارات" },
    { route: "AddCar", name: "اضافة سيارة" },
    { route: "CarDetail", name: "تفاصيل العملاء" },
  ];

  async function handleUpdate() {
    await updateDoc(doc(db, "userType", userType), {
      premessions: premessions,
    });
  }
  function handleUserTypeChange(e) {
    getDoc(doc(db, "userType", e.target.value)).then((data) => {
      setPremessions(data.data().premessions);
      setUserType(data.data().userType);
    });
  }

  function handleChange(route) {
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
    getDoc(doc(db, "userType", userType)).then((data) => {
      setUserType(data.data().userType);
      setPremessions(data.data().premessions);
    });
  }, []);
  useEffect(() => {
    premessions && handleUpdate();
  }, [premessions]);

  useEffect(() => {
    fetch(baseUrl + "/api/getUsers")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  //   useEffect(() => console.log(premessions), [premessions]);
  return (
    <div className="containe">
      <div className="header">الاعدادات</div>
      <Tabs className="bg-clr w-100">
        <Tab title="المستخدمين" eventKey={1}>
          <Container>
            <Row className="justify-content-center">
              <Col xs={12} lg={10}>
                <Table
                  striped
                  responsive={"sm"}
                  hover
                  className="rounded mt-5 overflow-hidden shadow-sm p-2"
                >
                  <thead className="bg-clr">
                    <tr>
                      <th colSpan={3}>
                        <Link
                          href="/SignUp"
                          className="rounded bg-w p-2 text-decoration-none justify-content-between align-content-center"
                        >
                          اضافة <FaPlus />
                        </Link>
                      </th>
                    </tr>
                    <tr>
                      <th>البريدالاكتروني</th>
                      <th>اسم المستخدم</th>
                      <th>نوع المستخدم</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => {
                      return (
                        <tr
                          onClick={() => router.push(`/UserDetail/${user.uid}`)}
                        >
                          <td>{user.username}</td>
                          <td>{user.email}</td>
                          <td>{user.userType}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Container>
        </Tab>
        <Tab title="الصلاحيات" eventKey={2}>
          <Row className="justify-content-center mt-5">
            <Col xs={11} lg={6}>
              <Form>
                <div className="p-1 ">
                  <FloatingLabel label="نوع المستخدم">
                    <Form.Select
                      placeholder="hg"
                      onChange={handleUserTypeChange}
                      value={userType}
                    >
                      <option value="admin">مشرف</option>
                      <option value="swakinUser">مكتب سواكن</option>
                      <option value="ksaUser">مكتب السعودية</option>
                    </Form.Select>
                  </FloatingLabel>
                  {premessionsList.map((item) => {
                    return (
                      <div
                        key={item.name}
                        className={`mt-2 w-100 ${
                          premessions?.includes(item.route)
                            ? "checkBoxChecked"
                            : "checkBox"
                        }`}
                        onClick={() => handleChange(item.route)}
                      >
                        {item.name}
                      </div>
                    );
                  })}
                </div>
              </Form>
            </Col>
          </Row>
        </Tab>
        <Tab title="الرسوم" eventKey={3}>
          <div>
            <Row>
              <Col></Col>
            </Row>
          </div>
        </Tab>
      </Tabs>
    </div>
  );
}

export default Settings;
