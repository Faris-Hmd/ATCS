/** @format */

import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";
import { baseUrl } from "../_app";

function UserDetail() {
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { uid } = router.query;
  function handleChage(event) {
    const { name, value } = event.target;
    if (value.split(" ").length > 1) return;
    setUserData((prev) => {
      return { ...prev, [name]: value };
    });
  }
  function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    handleSetUserData();
    console.log(userData);
  }
  async function handleSetUserData() {
    axios({
      method: "post",
      url: `${baseUrl}/api/addUser`,
      data: {
        uid: uid,
        email: userData.email,
        userType: userData.userType,
        username: userData.username,
        password: userData.password,
      },
    })
      .then(() => {
        setIsLoading(false);
      })
      .catch(setIsLoading(false));
  }

  useEffect(() => {
    fetch(baseUrl + "/api/getUser?uid=" + uid)
      .then((res) => res.json())
      .then((data) => setUserData(data));
  }, []);

  return (
    <Container fluid dir="rtl">
      <Row>
        <Col>
          <div className="p-3 bg-clr">اضافة مستخدم</div>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col xs={10} lg={5}>
          <Form className="justify-content-center" onSubmit={handleSubmit}>
            <Form.Group className="inputGroup  mt-5 p-1">
              <FloatingLabel
                label="اسم المستخدم"
                controlId="username"
                className="mb-2"
              >
                <Form.Control
                  type="text"
                  name="username"
                  placeholder="اسم المستخدم"
                  onChange={handleChage}
                  value={userData.username}
                />
              </FloatingLabel>
              <FloatingLabel
                label="البريد الالكتروني"
                controlId="email"
                className="mb-2"
              >
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="البريد الالكتروني"
                  onChange={handleChage}
                  value={userData.email}
                />
              </FloatingLabel>
              <FloatingLabel
                label="كلمة المرور"
                controlId="password"
                className="mb-2"
              >
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="البريد الالكتروني"
                  onChange={handleChage}
                  value={userData.password}
                />
              </FloatingLabel>
              <FloatingLabel
                label="تاكيد كلمة المرور"
                controlId="password2"
                className="mb-2"
              >
                <Form.Control
                  type="password"
                  name="password2"
                  placeholder="تاكيد كلمة المرور"
                  onChange={handleChage}
                  value={userData.password2}
                />
              </FloatingLabel>
              <FloatingLabel label="نوع المستخدم" controlId="userType">
                <Form.Select
                  name="userType"
                  placeholder="البريد الالكتروني"
                  onChange={handleChage}
                  value={userData.userType}
                >
                  <option value="admin">مشرف</option>
                  <option value="swakinUser">مكتب سواكن</option>
                  <option value="ksaUser">مكتب السعودية</option>
                </Form.Select>
              </FloatingLabel>
              <Button type="submit" className="mt-2 w-100" disabled={isLoading}>
                {isLoading ? <Spinner /> : "حفظ"}
              </Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default UserDetail;
