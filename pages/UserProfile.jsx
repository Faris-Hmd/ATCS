/** @format */

import axios from "axios";
import { updateEmail, updatePassword, updateProfile } from "firebase/auth";
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

function UserProfile() {
  const { user, setUser } = useContext(UserContext);

  const [isLoading, setIsLoading] = useState(false);
  function handleChage(event) {
    const { name, value } = event.target;
    if (value.split(" ").length > 1) return;
    setUser((prev) => {
      return { ...prev, [name]: value };
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    // console.log(user);
    await updatePassword(auth.currentUser, user.password);
    await updateEmail(auth.currentUser, user.email);
    await updateProfile(auth.currentUser, { displayName: user.displayName });
    axios({
      method: "post",
      url: `${baseUrl}/api/user`,
      data: {
        uid: user.uid,
        email: user.email,
        userType: user.userType,
        displayName: user.displayName,
      },
    })
      .then(() => {
        setIsLoading(false);
      })
      .catch(setIsLoading(false));
  }

  useEffect(() => {
    if (!auth.currentUser) return;
    fetch(baseUrl + "/api/user?uid=" + auth.currentUser.uid)
      .then((res) => res.json())
      .then((data) =>
        setUser({
          uid: auth.currentUser.uid,
          displayName: auth.currentUser.displayName,
          email: auth.currentUser.email,
          userType: data.userType,
        }),
      );
  }, [auth.currentUser]);
  if (!auth.currentUser) return <h3>يجب تسجيل الدخول للوصول لهذه الصفحة</h3>;
  return (
    <Container>
      <Row>
        <div className="p-3 bg-clr">تعديل بيانات مستخدم</div>
      </Row>
      <Row className="justify-content-center">
        <Col xs={11} lg={5}>
          <Form className="justify-content-center" onSubmit={handleSubmit}>
            <Form.Group className="inputGroup  mt-5 p-1">
              <FloatingLabel
                label="اسم المستخدم"
                controlId="username"
                className="mb-2">
                <Form.Control
                  type="text"
                  name="displayName"
                  placeholder="اسم المستخدم"
                  onChange={handleChage}
                  value={user.displayName}
                />
              </FloatingLabel>
              <FloatingLabel
                label="البريد الالكتروني"
                controlId="email"
                className="mb-2">
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="البريد الالكتروني"
                  onChange={handleChage}
                  value={user.email}
                />
              </FloatingLabel>
              <FloatingLabel
                label="كلمة المرور"
                controlId="password"
                className="mb-2">
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="البريد الالكتروني"
                  onChange={handleChage}
                  value={user?.password}
                />
              </FloatingLabel>
              <FloatingLabel
                label="تاكيد كلمة المرور"
                controlId="password2"
                className="mb-2">
                <Form.Control
                  type="password"
                  name="password2"
                  placeholder="تاكيد كلمة المرور"
                  onChange={handleChage}
                  value={user?.password2}
                />
              </FloatingLabel>
              <FloatingLabel label="نوع المستخدم" controlId="userType">
                <Form.Select
                  disabled
                  name="userType"
                  placeholder="البريد الالكتروني"
                  onChange={handleChage}
                  value={user.userType}>
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

export default UserProfile;
