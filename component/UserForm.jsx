/** @format */

import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import InputGroup from "./InputGroup";

function UserForm({
  handleChange,
  customer,
  isEditing,
  handleSubmit,
  isForm,
  isLoading,
}) {
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
      class: "w-100",
    },
    {
      name: "carModel",
      placeholder: "موديل المركبة",
      class: "w-100",
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
    <Form className="pb-3">
      <Container>
        <Row>
          <Col xs={12} lg={4}>
            <InputGroup
              customer={customer}
              title={"بيانات المالك"}
              handleChange={handleChange}
              isEditing={isEditing}
              feilds={ownerDetail}
            />
          </Col>

          <Col xs={12} lg={4}>
            <InputGroup
              customer={customer}
              title={"بيانات الدفتر"}
              handleChange={handleChange}
              isEditing={isEditing}
              feilds={bookDetail}
            />{" "}
            <InputGroup
              customer={customer}
              title={"بيانات الدخول"}
              handleChange={handleChange}
              isEditing={isEditing}
              feilds={enteringDetail}
            />
          </Col>
          <Col xs={12} lg={4}>
            <InputGroup
              customer={customer}
              title={"بيانات السيارة"}
              handleChange={handleChange}
              isEditing={isEditing}
              feilds={carDetail}
            />
          </Col>
        </Row>
        {isForm && (
          <Row className="d-flex justify-content-center">
            <Col xs={12} lg={4}>
              <Button
                className="w-100"
                onClick={handleSubmit}
                disabled={isLoading}
              >
                {isLoading ? <Spinner /> : "اضافة"}
              </Button>
            </Col>
          </Row>
        )}
      </Container>
    </Form>
  );
}

export default UserForm;
