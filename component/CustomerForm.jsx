/** @format */

import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import InputGroup from "./InputGroup";
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
    class: "w-50",
    type: "text",
    isRequired: true,
  },
  {
    name: "natId",
    placeholder: "الرقم الوطني",
    class: "w-50",
    type: "text",
    isRequired: true,
  },

  {
    name: "residNum",
    placeholder: "رقم الاقامة",
    class: "w-50",
    type: "text",
    isRequired: false,
  },
  {
    name: "ownerEnteringDate",
    placeholder: "تاريخ دخول المالك",
    class: "w-50",
    type: "date",
    isRequired: false,
  },
  {
    name: "passportIssueDate",
    placeholder: "تاريخ اصدار الجواز",
    class: "w-50",
    type: "date",
    isRequired: false,
  },
  {
    name: "ownerResEndDate",
    placeholder: "تاريخ انتهاء الاقامة",
    class: "w-50",
    type: "date",
    isRequired: false,
  },
];
const carDetail = [
  {
    name: "carType",
    placeholder: "نوع العربة",
    class: "w-50",
    type: "text",
    isRequired: true,
  },
  {
    name: "carModel",
    placeholder: "موديل المركبة",
    class: "w-50",
    type: "text",
    isRequired: true,
  },
  {
    name: "chaseNum",
    placeholder: "رقم الهيكل",
    class: "w-100",
    type: "text",
    isRequired: true,
  },
  {
    name: "carColor",
    placeholder: "اللون",
    class: "w-50",
    type: "text",
    isRequired: false,
  },
  {
    name: "plateNum",
    placeholder: "رقم اللوحة",
    class: "w-50",
    type: "text",
    isRequired: false,
  },
  {
    name: "engineNum",
    placeholder: "رقم الماكنة",
    class: "w-100",
    type: "text",
    isRequired: false,
  },
  {
    name: "carValue",
    placeholder: "قيمة السيارة",
    class: "w-50",
    type: "text",
    isRequired: false,
  },
  {
    name: "carRegCoun",
    placeholder: "بلد تسجيل السيارة",
    class: "w-50",
    type: "text",
    isRequired: false,
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
    name: "bookDate",
    placeholder: "تاريخ اصدار الدفتر",
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
  {
    name: "shippingPort",
    placeholder: "ميناء الشحن",
    class: "w-50",
    type: "text",
    isRequired: false,
  },
  {
    name: "arrivalDest",
    placeholder: "جهة القدوم",
    class: "w-50",
    type: "text",
    isRequired: false,
  },
  {
    name: "portAccess",
    placeholder: "ميناء الوصول",
    class: "w-50",
    type: "text",
    isRequired: false,
  },
  {
    name: "shipName",
    placeholder: "اسم الباخرة",
    class: "w-50",
    type: "text",
    isRequired: false,
  },
  {
    name: "navAgent",
    placeholder: "الوكيل الملاحي",
    class: "w-50",
    type: "text",
    isRequired: false,
  },
  {
    name: "DeliveryAuthNum",
    placeholder: "رقم اذن التسليم",
    class: "w-50",
    type: "text",
    isRequired: false,
  },
];
// const enteringDetail = [
//   {
//     placeholder: "تاريخ الدخول",
//     name: "enteringDate",
//     type: "date",
//     class: "w-50",
//     isRequired: false,
//   },
//   {
//     placeholder: "نوع الدخول",
//     name: "repeatEntry",
//     type: "text",
//     class: "w-50",
//     isRequired: false,
//   },
// ];

const ksaAddress = [
  {
    placeholder: "اسم الشركة او الكفيل",
    name: "ownerKsaGuarantor",
    type: "text",
    class: "w-50",
    isRequired: false,
  },
  {
    placeholder: "تلفون",
    name: "ownerKsaPhone",
    type: "text",
    class: "w-50",
    isRequired: false,
  },
  {
    placeholder: "المدينة",
    name: "ownerKsaCity",
    type: "text",
    class: "w-50",
    isRequired: false,
  },
  {
    placeholder: "الحي",
    name: "ownerKsaDist",
    type: "text",
    class: "w-50",
    isRequired: false,
  },
  {
    placeholder: "الشارع",
    name: "ownerKsaStreet",
    type: "text",
    class: "w-50",
    isRequired: false,
  },
  {
    placeholder: "المبنى",
    name: "ownerKsaBuilding",
    type: "text",
    class: "w-50",
    isRequired: false,
  },
  {
    placeholder: "العنوان",
    name: "ownerKsaAddress",
    type: "text",
    class: "w-100",
    isRequired: false,
  },
  {
    placeholder: "جوال سعودي",
    name: "ownerKsaPhone",
    type: "text",
    class: "w-50",
    isRequired: false,
  },
  {
    placeholder: "واتساب سعودي",
    name: "ownerKsaWhats",
    type: "text",
    class: "w-50",
    isRequired: false,
  },
];
const sudanAddress = [
  {
    placeholder: "المدينة او القرية",
    name: "ownerSdCity",
    type: "text",
    class: "w-50",
    isRequired: false,
  },
  {
    placeholder: "المنطقة او الحي",
    name: "ownerSdDist",
    type: "text",
    class: "w-50",
    isRequired: false,
  },
  {
    placeholder: "اسم الشارع",
    name: "ownerSdStreet",
    type: "text",
    class: "w-50",
    isRequired: false,
  },
  {
    placeholder: "رقم المربع",
    name: "ownerSdSqr",
    type: "text",
    class: "w-50",
    isRequired: false,
  },
  {
    placeholder: "رقم المنزل",
    name: "ownerSdHuoseNum",
    type: "text",
    class: "w-50",
    isRequired: false,
  },

  {
    placeholder: "العنوان",
    name: "ownerSdAddress",
    type: "text",
    class: "w-50",
    isRequired: false,
  },

  {
    placeholder: "الجوال 1",
    name: "ownerSdPhone1",
    type: "text",
    class: "w-50",
    isRequired: false,
  },
  {
    placeholder: "الجوال 2",
    name: "ownerSdPhone2",
    type: "text",
    class: "w-50",
    isRequired: false,
  },
  {
    placeholder: "واتساب السودان",
    name: "ownerSdWhats",
    type: "text",
    class: "w-50",
    isRequired: false,
  },
  {
    placeholder: "الايميل",
    name: "ownerEmail",
    type: "text",
    class: "w-50",
    isRequired: false,
  },
];

const firstRelative = [
  {
    placeholder: "الاسم",
    name: "fRelName",
    type: "text",
    class: "w-50",
    isRequired: false,
  },
  {
    placeholder: "الجوال",
    name: "fRelPhone",
    type: "text",
    class: "w-50",
    isRequired: false,
  },
  {
    placeholder: "عنوان العمل",
    name: "fRelWorkAddress",
    type: "text",
    class: "w-50",
    isRequired: false,
  },
  {
    placeholder: "المدينة",
    name: "fRelCity",
    type: "text",
    class: "w-50",
    isRequired: false,
  },
  {
    placeholder: "المنطقة او الحي",
    name: "fRelDist",
    type: "text",
    class: "w-50",
    isRequired: false,
  },
  {
    placeholder: "رقم المربع",
    name: "fRelSqr",
    type: "text",
    class: "w-50",
    isRequired: false,
  },
  {
    placeholder: "رقم المنزل",
    name: "fRelHouseNum",
    type: "text",
    class: "w-50",
    isRequired: false,
  },
  {
    placeholder: "عنوان المنزل",
    name: "fRelHouseAddress",
    type: "text",
    class: "w-50",
    isRequired: false,
  },
];
const secRelative = [
  {
    placeholder: "الاسم",
    name: "sRelName",
    type: "text",
    class: "w-50",
    isRequired: false,
  },
  {
    placeholder: "الجوال",
    name: "sRelPhone",
    type: "text",
    class: "w-50",
    isRequired: false,
  },
  {
    placeholder: "عنوان العمل",
    name: "sRelWorkAddress",
    type: "text",
    class: "w-50",
    isRequired: false,
  },
  {
    placeholder: "المدينة",
    name: "sRelCity",
    type: "text",
    class: "w-50",
    isRequired: false,
  },
  {
    placeholder: "المنطقة او الحي",
    name: "sRelDist",
    type: "text",
    class: "w-50",
    isRequired: false,
  },
  {
    placeholder: "رقم المربع",
    name: "sRelSqr",
    type: "text",
    class: "w-50",
    isRequired: false,
  },
  {
    placeholder: "رقم المنزل",
    name: "sRelHouseNum",
    type: "text",
    class: "w-50",
    isRequired: false,
  },
  {
    placeholder: "عنوان المنزل",
    name: "sRelHouseAddress",
    type: "text",
    class: "w-50",
    isRequired: false,
  },
];
function CustomerForm({
  handleChange,
  customer,
  isEditing,
  handleSubmit,
  isForm,
  isLoading,
}) {
  return (
    <Form className="pb-3" onSubmit={handleSubmit}>
      <Container className="p-2">
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
            {/* <InputGroup
              customer={customer}
              title={"بيانات الدخول"}
              handleChange={handleChange}
              isEditing={isEditing}
              feilds={enteringDetail}
            /> */}
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
          <Col xs={12} lg={6}>
            <InputGroup
              customer={customer}
              title={"عنوان المالك في المملكة"}
              handleChange={handleChange}
              isEditing={isEditing}
              feilds={ksaAddress}
            />
          </Col>
          <Col xs={12} lg={6}>
            <InputGroup
              customer={customer}
              title={"بيانات المالك في السودان"}
              handleChange={handleChange}
              isEditing={isEditing}
              feilds={sudanAddress}
            />
          </Col>
          <Col xs={12} lg={6}>
            <InputGroup
              customer={customer}
              title={"بيانات القريب الاول"}
              handleChange={handleChange}
              isEditing={isEditing}
              feilds={firstRelative}
            />
          </Col>
          <Col xs={12} lg={6}>
            <InputGroup
              customer={customer}
              title={"بيانات القريب الثاني"}
              handleChange={handleChange}
              isEditing={isEditing}
              feilds={secRelative}
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
