/** @format */

import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
} from "react-bootstrap";
import { UserContext } from "../context/userContext";
import { auth } from "../firebase/firebase";
import { baseUrl } from "./_app";
import Loading from "../component/Loading";

function Login() {
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { setUser } = useContext(UserContext);

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
    signInWithEmailAndPassword(auth, userData.email, userData.password)
      .then((userCredential) => {
        handleGetUserData(userCredential.user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error.message);
        setIsLoading(false);
      });
  }
  function handleGetUserData(user) {
    fetch(baseUrl + "/api/user?uid=" + user.uid)
      .then((res) => res.json())
      .then((data) => {
        setUser({
          email: user.email,
          uid: user.uid,
          displayName: user.displayName,
          userType: data.userType,
          password: userData.password,
        });
        sessionStorage.setItem(
          "user",
          JSON.stringify({
            email: user.email,
            uid: user.uid,
            displayName: user.displayName,
            userType: data.userType,
            password: userData.password,
          })
        );
        setIsLoading(false);
        router.push("/");
      });
  }

  return (
    <Container className="h-100">
      <Row>
        <Col className="p-3 header">تسجيل الدخول</Col>
      </Row>
      <Row className="justify-content-center align-content-center h-75">
        <Col xs={10} lg={5}>
          <Form
            className="w-100 bg-w rounded shadow p-2"
            onSubmit={handleSubmit}
          >
            <FloatingLabel
              label="البريد الالكتروني"
              controlId="email"
              className="mb-2 w-100"
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
              className="mb-2 w-100"
            >
              <Form.Control
                type="password"
                name="password"
                placeholder="البريد الالكتروني"
                onChange={handleChage}
                value={userData.password}
              />
            </FloatingLabel>
            <Button type="submit" className="mt-2 w-100" disabled={isLoading}>
              {isLoading ? <Loading /> : "تسجيل"}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
