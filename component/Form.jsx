/** @format */

import { Col, Container, Form, Row } from "react-bootstrap";
import InputGroup from "./InputGroup";

function UserForm({ handleChange, car, isEditing }) {
  const ownerDetail = [
    { name: "ownerFName", placeholder: "الاسم الاول", class: "w-50" },
    { name: "ownerSName", placeholder: "الاسم الثاني", class: "w-50" },
    { name: "ownerTName", placeholder: "الاسم الثالث", class: "w-50" },
    { name: "ownerFoName", placeholder: "الاسم الرابع", class: "w-50" },
    { name: "passport", placeholder: "رقم الجواز", class: "w-100" },
    { name: "address", placeholder: "العنوان", class: "w-100" },
    { name: "phone1", placeholder: " رقم الهاتف الاول", class: "w-50" },
    { name: "phone2", placeholder: " رقم الهاتف الثاني", class: "w-50" },
  ];
  const carDetail = [
    {
      name: "chaseNum",
      placeholder: "رقم الهيكل",
      class: "w-100",
    },
    {
      name: "plateNum",
      placeholder: "رقم اللوحة",
      class: "w-100",
    },
    {
      name: "carType",
      placeholder: "ماركة المركبة",
      class: "w-50",
    },
    {
      name: "carModel",
      placeholder: "موديل المركبة",
      class: "w-50",
    },
  ];
  const bookDetail = [
    { name: "bookNum", placeholder: "رقم الدفتر", class: "w-50" },
    {
      name: "bookType",
      placeholder: "نوع الدفتر",
      type: "select",
      class: "w-50",
      opt: [{ value: "سياحي" }, { value: "عادي" }],
    },
    { name: "bookDay", placeholder: "اليوم", class: "w-30" },
    { name: "bookMonth", placeholder: "الشهر", class: "w-30" },
    { name: "bookYear", placeholder: "السنة", class: "w-30" },
  ];
  const enteringDetail = [
    {
      class: "w-100",
      name: "dest",
      placeholder: "جهة القدوم",
      type: "select",
      opt: [{ value: "السعودية" }, { value: "مصر" }],
    },
    { name: "enteringDay", placeholder: "اليوم", class: "w-30" },
    { name: "enteringMonth", placeholder: "الشهر", class: "w-30" },
    { name: "enteringYear", placeholder: "السنة", class: "w-30" },
  ];

  return (
    <Form>
      <Container>
        <Row>
          <Col xs={12} lg={4}>
            <InputGroup
              car={car}
              title={"بيانات المالك"}
              handleChage={handleChange}
              isEditing={isEditing}
              feilds={ownerDetail}
            />
            <InputGroup
              car={car}
              title={"بيانات الدخول"}
              handleChage={handleChange}
              isEditing={isEditing}
              feilds={enteringDetail}
            />
          </Col>
          <Col xs={12} lg={4}>
            <InputGroup
              car={car}
              title={"بيانات الدفتر"}
              handleChage={handleChange}
              isEditing={isEditing}
              feilds={bookDetail}
            />
            <InputGroup
              car={car}
              title={"بيانات السيارة"}
              handleChage={handleChange}
              isEditing={isEditing}
              feilds={carDetail}
            />
          </Col>
          <Col xs={12} lg={4}></Col>
        </Row>
      </Container>
    </Form>
  );
}

export default UserForm;
