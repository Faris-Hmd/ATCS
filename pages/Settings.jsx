/** @format */

import { useContext } from "react";
import { Col, Container, Row, Tab, Tabs } from "react-bootstrap";
import Premessions from "../component/Premmisions";
import Users from "../component/Users";
import { AuthContext } from "../context/authContext";
import UserProfile from "../component/UserProfile";

function Settings() {
  const { user, hasAccess } = useContext(AuthContext);
  if (!(user && hasAccess("Settings")))
    return <h3>لا تملك صلاحية الوصول لهذه الصفحة</h3>;

  return (
    <Container className="p-0 m-0 ">
      <Col className="header p-3">الاعدادات</Col>
      <Col>
        <Tabs className="bg-clr  w-100">
          <Tab title="حسابي" eventKey={1}>
            <UserProfile />
          </Tab>
          <Tab title="المستخدمين" eventKey={2}>
            <Users />
          </Tab>
          <Tab title="الصلاحيات" eventKey={3}>
            <Container className="mt-3 d-flex justify-content-center align-content-center">
              <Col xs={12} lg={9}>
                <Premessions />
              </Col>
            </Container>
          </Tab>
          {/* <Tab title="الانواع" eventKey={4}>
            <Row>
              <Col></Col>
            </Row>
          </Tab> */}
        </Tabs>
      </Col>
    </Container>
  );
}

export default Settings;
