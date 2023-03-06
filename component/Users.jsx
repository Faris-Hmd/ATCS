/** @format */

import Link from "next/link";
import { useEffect, useState } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import { BiUserPlus } from "react-icons/bi";
import { baseUrl } from "../pages/_app";

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(baseUrl + "/api/getUsers")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} lg={8}>
          <Table
            striped
            hover
            className="rounded mt-5 overflow-hidden shadow p-2 fos-m">
            <thead className="bg-w">
              <tr>
                <th colSpan={3} className="p-3">
                  <Link
                    href="/SignUp"
                    className="rounded shadow bg-clr p-2 text-decoration-none justify-content-between align-content-center">
                    اضافة <BiUserPlus size={"25px"} />
                  </Link>
                </th>
              </tr>
              <tr>
                <th>اسم المستخدم</th>
                <th>البريدالاكتروني</th>
                <th>نوع المستخدم</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => {
                return (
                  <tr key={index}>
                    <td>{user.displayName}</td>
                    <td>{user.email}</td>
                    <td>{user.userType}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}
export default Users;
