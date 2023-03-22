/** @format */

import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useContext, useState } from "react";
import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
} from "react-bootstrap";
import { AuthContext } from "../context/authContext";
import { baseUrl } from "./_app";
import Loading from "../component/Loading";
import { toast } from "react-toastify";
import Head from "next/head";

function Login() {
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { user, setUser } = useContext(AuthContext);

  function handleChage(event) {
    const { name, value } = event.target;
    if (value.split(" ").length > 1) return;
    setUserData((prev) => {
      return { ...prev, [name]: value };
    });
  }
  async function login(userData) {
    console.log("fromm login");
    const { auth } = await import("../firebase/firebase");
    signInWithEmailAndPassword(auth, userData.email, userData.password)
      .then((userCredential) => {
        // console.log(auth.currentUser);
        if (user === null) handleGetUserData(userCredential.user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error.message);
        setIsLoading(false);
        toast.error("البريد الالكتروني أو كلمة المرور خاطئة !");
      });
  }

  async function handleGetUserData(userCred) {
    const { auth } = await import("../firebase/firebase");
    console.log("fromm getUser");
    fetch(baseUrl + "/api/user?uid=" + userCred.uid)
      .then((res) => res.json())
      .then((data) => {
        if (auth.currentUser === null) login(data);
        toast.success("  تم تسجيل بأسم " + data.displayName);
        setUser({
          premessions: data.premessions,
          email: data.email,
          uid: data.uid,
          displayName: data.displayName,
          userType: data.userType,
          password: data.password,
        });
      })
      .catch(() => {
        setIsLoading(false);
        toast.error("حصل خطأ في تسجيل الدخول!");
      });
  }

  function handleSubmit(event) {
    setIsLoading(true);
    event.preventDefault();
    // console.log(userData);
    login(userData);
  }

  return (
    <>
      <Head>
        <title>تسجيل الدخول ATCS</title>
      </Head>
      <Container className="p-0 m-0 w-100  h-100">
        <Row>
          <Col className="p-3 header">تسجيل الدخول لنظام نادي السيارات</Col>
        </Row>
        <Row className="justify-content-center align-content-center h-75">
          <Col xs={9} lg={4}>
            <Form
              className="w-100 bg-w rounded shadow-lg border p-2"
              onSubmit={handleSubmit}>
              <div className="flex pb-3">
                <img src="/icons/atcs-logo.png" alt="" width={"120px"} />
              </div>
              <FloatingLabel
                label="البريد الالكتروني"
                controlId="email"
                className="mb-2 w-100">
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="البريد الالكتروني"
                  onChange={handleChage}
                  value={userData.email ? userData.email : ""}
                />
              </FloatingLabel>
              <FloatingLabel
                label="كلمة المرور"
                controlId="password"
                className="mb-2 w-100">
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="البريد الالكتروني"
                  onChange={handleChage}
                  value={userData.password ? userData.password : ""}
                />
              </FloatingLabel>
              <Button type="submit" className="mt-2 w-100" disabled={isLoading}>
                {isLoading ? <Loading /> : "تسجيل"}
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Login;
