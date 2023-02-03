/** @format */

import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";
import { UserContext } from "../context/userContext";
import { auth } from "../firebase/firebase";
import { baseUrl } from "./_app";
import styles from "../styles/Form.module.css";

function Login() {
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { user, setUser } = useContext(UserContext);

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
        handleGetUserData(userCredential.user.uid);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }
  function handleGetUserData(uid) {
    fetch(baseUrl + "/api/getUser?uid=" + uid)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setIsLoading(false);
      });
  }
  useEffect(() => {
    if (!isLoading && user) {
      console.log(user);
      sessionStorage.setItem("user", JSON.stringify(user));
      router.push("/");
    }
  }, [user, isLoading]);
  return (
    <Container dir="rtl"  className="w-100">
      <Row>
        <Col>
          <div className="p-3 bg-clr">تسجيل الدخول</div>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col xs={10} lg={5}>
          <Form className="justify-content-center" onSubmit={handleSubmit}>
           <div className={styles.inputGroup}>
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
                {isLoading ? <Spinner /> : "تسجيل"}
              </Button>
        </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
