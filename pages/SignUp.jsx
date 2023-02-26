/** @format */

import axios from "axios";
import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";
import { auth } from "../firebase/firebase";
import { baseUrl } from "./_app";

function SignUp() {
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  function handleChage(event) {
    const { name, value } = event.target;
    if (value.split(" ").length > 1) return;
    setUserData((prev) => {
      return { ...prev, [name]: value };
    });
  }
  function handleSubmit(event) {
    setIsLoading(true);
    event.preventDefault();
    if (userData.password !== userData.password2) return;
    console.log(userData);
    createUserWithEmailAndPassword(auth, userData.email, userData.password)
      .then((userCredential) => {
        handleSetUserData(userCredential.user.uid);
      })
      .catch((error) => {
        setIsLoading(false);
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }
  async function handleSetUserData(uid) {
    axios({
      method: "post",
      url: `${baseUrl}/api/user`,
      data: {
        uid: uid,
        email: userData.email,
        userType: userData.userType,
        displayName: userData.displayName,
        password: userData.password,
      },
    })
      .then(() => {
        setIsLoading(false);
      })
      .catch(setIsLoading(false));
  }

  return (
    <Container className="h-100">
      <Row>
        <Col className="p-3 header">اضافة مستخدم</Col>
      </Row>
      <Row className="full">
        <Col xs={10} lg={5}>
          <Form className="bg-w shadow rounded p-2" onSubmit={handleSubmit}>
            <Form.Group>
              <FloatingLabel
                label="اسم المستخدم"
                controlId="displayName"
                className="mb-2"
              >
                <Form.Control
                  type="text"
                  name="displayName"
                  placeholder="اسم المستخدم"
                  onChange={handleChage}
                  value={userData.displayName}
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
                  onChange={handleChage}
                  value={userData.userType}
                >
                  <option value="admin">مشرف</option>
                  <option value="khUser">مكتب الخرطوم</option>
                  <option value="swakinUser">مكتب سواكن</option>
                  <option value="ksaUser">مكتب السعودية</option>
                </Form.Select>
              </FloatingLabel>
              <Button type="submit" className="mt-3 w-100" disabled={isLoading}>
                {isLoading ? <Spinner /> : "حفظ"}
              </Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default SignUp;
