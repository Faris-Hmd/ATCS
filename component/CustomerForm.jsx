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
      isRequired: true,
    },
    {
      name: "ownerSName",
      placeholder: "الاسم الثاني",
      class: "w-50",
      isRequired: true,
      type: "text",
    },
    {
      name: "ownerTName",
      placeholder: "الاسم الثالث",
      class: "w-50",
      type: "text",
      isRequired: true,
    },
    {
      name: "ownerFoName",
      placeholder: "الاسم الرابع",
      class: "w-50",
      type: "text",
      isRequired: true,
    },
    {
      name: "passport",
      placeholder: "رقم الجواز",
      class: "w-100",
      type: "text",
      isRequired: true,
    },
    { name: "address", placeholder: "العنوان", class: "w-100", type: "text" },
    {
      name: "phone1",
      placeholder: " رقم الهاتف الاول",
      class: "w-50",
      type: "text",
      isRequired: true,
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
      isRequired: true,
    },
    {
      name: "plateNum",
      placeholder: "رقم اللوحة",
      class: "w-100",
      type: "text",
      isRequired: true,
    },
    {
      name: "carType",
      placeholder: "ماركة المركبة",
      class: "w-100",
      type: "text",
      isRequired: true,
    },
    {
      name: "carModel",
      placeholder: "موديل المركبة",
      class: "w-100",
      type: "text",
      isRequired: true,
    },
  ];
  const bookDetail = [
    {
      name: "bookNum",
      placeholder: "رقم الدفتر",
      class: "w-100",
      type: "text",
      isRequired: true,
    },

    {
      placeholder: "تاريخ الدفتر",
      name: "bookDate",
      type: "date",
      class: "w-50",
      isRequired: true,
    },
    {
      name: "bookType",
      placeholder: "نوع الدفتر",
      type: "select",
      class: "w-50",
      opt: [{ value: "عادي" }, { value: "سياحي" }],
      isRequired: true,
    },
  ];
  const enteringDetail = [
    {
      class: "w-100",
      name: "dest",
      placeholder: "جهة الوصول",
      type: "select",
      opt: [{ value: "السعودية" }, { value: "مصر" }],
      isRequired: true,
    },
    {
      placeholder: "تاريخ الدخول",
      name: "enteringDate",
      type: "date",
      class: "w-50",
      isRequired: false,
    },
    {
      placeholder: "نوع الدخول",
      name: "repeatEntry",
      type: "text",
      class: "w-50",
      isRequired: false,
    },
  ];

  return (
    <Form className="pb-3" onSubmit={handleSubmit}>
      <Container className="p-1">
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
              <Button className="w-100 p-2" type="submit" disabled={isLoading}>
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
