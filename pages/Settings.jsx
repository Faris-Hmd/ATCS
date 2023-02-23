/** @format */

import { Col, Container, Row, Tab, Tabs } from "react-bootstrap";
import Premessions from "../component/Premmisions";
import Users from "../component/Users";

function Settings() {
  return (
    <Container className="p-0 m-0">
      <Col className="header">الاعدادات</Col>
      <Col>
        <Tabs className="bg-clr w-100">
          <Tab title="المستخدمين" eventKey={1}>
            <Users />
          </Tab>
          <Tab title="الصلاحيات" eventKey={2}>
            <Container className="mt-3 d-flex justify-content-center align-content-center">
              <Col xs={12} lg={9}>
                <Premessions />
              </Col>
            </Container>
          </Tab>
          <Tab title="الرسوم" eventKey={3}>
            <Row>
              <Col></Col>
            </Row>
          </Tab>
        </Tabs>
      </Col>
    </Container>
  );
}

export default Settings;
