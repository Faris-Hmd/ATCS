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
import { AuthContext } from "../context/authContext";
import { auth } from "../firebase/firebase";
import { baseUrl } from "./_app";

function UserProfile() {
  const { user, setUser } = useContext(AuthContext);
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  function handleChage(event) {
    const { name, value } = event.target;
    if (value.split(" ").length > 1) return;
    setUserData((prev) => {
      return { ...prev, [name]: value };
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    await updatePassword(auth.currentUser, userData.password);
    await updateEmail(auth.currentUser, userData.email);
    await updateProfile(auth.currentUser, {
      displayName: userData.displayName,
    });
    axios({
      method: "post",
      url: `${baseUrl}/api/user`,
      data: {
        ...userData,
      },
    })
      .then(() => {
        setIsLoading(false);
        setUser(userData);
      })
      .catch(setIsLoading(false));
  }

  useEffect(() => {
    if (user) {
      setUserData(user);
    }
  }, [user]);

  if (!user) return <h3>يجب عليك تسجيل الدخول للوصول لهذه الصفحة</h3>;
  if (user)
    return (
      <Container className="h-100">
        <Row>
          <div className="p-3 bg-clr">تعديل بيانات مستخدم</div>
        </Row>
        <Row className="full">
          <Col xs={11} lg={5}>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="inputGroup   p-2 rounded shadow bg-w">
                <FloatingLabel
                  label="اسم المستخدم"
                  controlId="username"
                  className="mb-2">
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
                  className="mb-2">
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
                  className="mb-2">
                  <Form.Control
                    type="text"
                    name="password"
                    placeholder="البريد الالكتروني"
                    onChange={handleChage}
                    value={userData?.password}
                  />
                </FloatingLabel>
                <FloatingLabel
                  label="تاكيد كلمة المرور"
                  controlId="password2"
                  className="mb-2">
                  <Form.Control
                    type="text"
                    name="password2"
                    placeholder="تاكيد كلمة المرور"
                    onChange={handleChage}
                    value={userData?.password2}
                  />
                </FloatingLabel>
                <FloatingLabel label="نوع المستخدم" controlId="userType">
                  <Form.Select
                    disabled={userData !== "admin"}
                    name="userType"
                    placeholder="البريد الالكتروني"
                    onChange={handleChage}
                    value={userData.userType}>
                    <option value="admin">مشرف</option>
                    <option value="khUser">مكتب الخرطوم</option>
                    <option value="swakinUser">مكتب سواكن</option>
                    <option value="ksaUser">مكتب السعودية</option>
                  </Form.Select>
                </FloatingLabel>
                <Button
                  type="submit"
                  className="mt-2 w-100"
                  disabled={isLoading}>
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
