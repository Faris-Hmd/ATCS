/** @format */

import { useContext } from "react";
import {
  Button,
  ButtonGroup,
  Col,
  Container,
  Tab,
  Tabs,
} from "react-bootstrap";
import Premessions from "../component/Premmisions";
import Users from "../component/Users";
import { AuthContext } from "../context/authContext";
import UserProfile from "../component/UserProfile";
import Head from "next/head";
import { BiLogOut } from "react-icons/bi";
import NoAccess from "../component/NoAccess";

function Settings() {
  const { user, hasAccess, handleSignOut } = useContext(AuthContext);

  return (
    <>
      <Head>
        <title>الاعدادات</title>
      </Head>
      <Container className="p-0 m-0 ">
        <Col className="header p-3">
          الاعدادات
          <ButtonGroup>
            <Button variant="light" onClick={handleSignOut}>
              خروج <BiLogOut size={"22px"} />
            </Button>
          </ButtonGroup>
        </Col>
        <Col>
          <Tabs className="bg-clr  w-100">
            <Tab title="حسابي" eventKey={1}>
              <UserProfile />
            </Tab>
            <Tab title="المستخدمين" eventKey={2}>
              {user && hasAccess("Users") ? <Users /> : <NoAccess />}
            </Tab>
            <Tab title="الصلاحيات" eventKey={3}>
              <Container className="mt-3 d-flex justify-content-center align-content-center">
                <Col xs={12} lg={9}>
                  {user && hasAccess("Premm") ? <Premessions /> : <NoAccess />}
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
    </>
  );
}

export default Settings;
