/** @format */

import { Col, Row, Tab, Tabs } from "react-bootstrap";
import Premessions from "../component/Premmisions";
import Users from "../component/Users";

function Settings() {
  return (
    <div className="containe">
      <div className="header">الاعدادات</div>
      <Tabs className="bg-clr w-100">
        <Tab title="المستخدمين" eventKey={1}>
          <Users />
        </Tab>
        <Tab title="الصلاحيات" eventKey={2}>
          <Premessions />
        </Tab>
        <Tab title="الرسوم" eventKey={3}>
          <Row>
            <Col></Col>
          </Row>
        </Tab>
      </Tabs>
    </div>
  );
}

export default Settings;
