/** @format */

import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import InputGroup from "./InputGroup";

function CustomerForm({
  handleChange,
  customer,
  isEditing,
  handleSubmit,
  isForm,
  isLoading,
}) {
  const ownerDetail = [
    {
      name: "ownerFName",
      placeholder: "الاسم الاول",
      class: "w-50",
      type: "text",
    },
    {
      name: "ownerSName",
      placeholder: "الاسم الثاني",
      class: "w-50",
      type: "text",
    },
    {
      name: "ownerTName",
      placeholder: "الاسم الثالث",
      class: "w-50",
      type: "text",
    },
    {
      name: "ownerFoName",
      placeholder: "الاسم الرابع",
      class: "w-50",
      type: "text",
    },
    {
      name: "passport",
      placeholder: "رقم الجواز",
      class: "w-100",
      type: "text",
    },
    { name: "address", placeholder: "العنوان", class: "w-100", type: "text" },
    {
      name: "phone1",
      placeholder: " رقم الهاتف الاول",
      class: "w-50",
      type: "text",
    },
    {
      name: "phone2",
      placeholder: " رقم الهاتف الثاني",
      class: "w-50",
      type: "text",
    },
  ];
  const carDetail = [
    {
      name: "chaseNum",
      placeholder: "رقم الهيكل",
      class: "w-100",
      type: "text",
    },
    {
      name: "plateNum",
      placeholder: "رقم اللوحة",
      class: "w-100",
      type: "text",
    },
    {
      name: "carType",
      placeholder: "ماركة المركبة",
      class: "w-100",
      type: "text",
    },
    {
      name: "carModel",
      placeholder: "موديل المركبة",
      class: "w-100",
      type: "text",
    },
  ];
  const bookDetail = [
    { name: "bookNum", placeholder: "رقم الدفتر", class: "w-50", type: "text" },
    {
      name: "bookType",
      placeholder: "نوع الدفتر",
      type: "select",
      class: "w-50",
      opt: [{ value: "عادي" }, { value: "سياحي" }],
    },
    { name: "bookDate", type: "date", class: "w-100" },
  ];
  const enteringDetail = [
    {
      class: "w-100",
      name: "dest",
      placeholder: "جهة الوصول",
      type: "select",
      opt: [{ value: "السعودية" }, { value: "مصر" }],
    },
    { name: "enteringDate", type: "date", class: "w-100" },
  ];

  return (
    <Form className="p-0 pb-3">
      <Container className="p-0">
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
                className="w-100 p-2"
                onClick={handleSubmit}
                disabled={isLoading}>
                {isLoading ? <Spinner /> : "اضافة"}
              </Button>
            </Col>
          </Row>
        )}
      </Container>
    </Form>
  );
}

export default CustomerForm;
