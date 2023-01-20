/** @format */

import { FloatingLabel, Form } from "react-bootstrap";
import styles from "../styles/Form.module.css";

function UserForm({ handleChange, car, isEditing, children }) {
  const ownerDetail = [
    { name: "ownerFName", placeholder: "الاسم الاول", class: "w-50" },
    { name: "ownerSName", placeholder: "الاسم الثاني", class: "w-50" },
    { name: "ownerTName", placeholder: "الاسم الثالث", class: "w-50" },
    { name: "ownerFoName", placeholder: "الاسم الرابع", class: "w-50" },
    { name: "passport", placeholder: "رقم الجواز", class: "" },
    { name: "address", placeholder: "العنوان", class: "" },
    { name: "phone1", placeholder: " رقم الهاتف الاول", class: "w-50" },
    { name: "phone2", placeholder: " رقم الهاتف الثاني", class: "w-50" },
  ];
  const carDetail = [
    {
      name: "chaseNum",
      placeholder: "رقم الهيكل",
      class: "",
    },
    {
      name: "plateNum",
      placeholder: "رقم اللوحة",
      class: "",
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
    <Form className={styles.form}>
      <div className={styles.side}>
        <div className={styles.inputGroup}>
          <div className={styles.inputGroupLabel}>بيانات المالك</div>
          {ownerDetail.map((item, index) => {
            return (
              <FloatingLabel
                controlId={item.name}
                label={item.placeholder}
                className={(item.class && item.class) + " mb-2"}
                key={index}
              >
                <Form.Control
                  readOnly={!isEditing}
                  placeholder={item.placeholder}
                  type="text"
                  value={car?.[item.name]}
                  name={item.name}
                  onChange={handleChange}
                  required
                />
              </FloatingLabel>
            );
          })}
        </div>{" "}
        <div className={styles.inputGroup}>
          <div className={styles.inputGroupLabel}>بيانات الدفتر</div>
          {bookDetail.map((item, index) => {
            if (item.type === "select")
              return (
                <FloatingLabel
                  controlId={item.name}
                  label={item.placeholder}
                  className={(item.class && item.class) + " mb-2"}
                  key={index}
                >
                  <Form.Select
                    disable={isEditing}
                    placeholder={item.placeholder}
                    value={car?.[item.name]}
                    onChange={handleChange}
                    required
                    name={item.name}
                  >
                    {item.opt.map((option, index) => (
                      <option key={index} value={option.value}>
                        {option.value}
                      </option>
                    ))}
                  </Form.Select>
                </FloatingLabel>
              );
            else
              return (
                <FloatingLabel
                  controlId={item.name}
                  label={item.placeholder}
                  className={(item.class && item.class) + " mb-2"}
                  key={index}
                >
                  <Form.Control
                    readOnly={!isEditing}
                    placeholder={item.placeholder}
                    type="text"
                    value={car?.[item.name]}
                    onChange={handleChange}
                    required
                    maxLength={
                      item.name === "bookDay" || item.name === "bookMonth"
                        ? 2
                        : 4
                    }
                  />
                </FloatingLabel>
              );
          })}
        </div>
      </div>

      <div className={styles.side}>
        <div className={styles.inputGroup}>
          <div className={styles.inputGroupLabel}>بيانات السيارة</div>
          {carDetail.map((item, index) => {
            return (
              <FloatingLabel
                controlId={item.name}
                label={item.placeholder}
                className={(item.class && item.class) + " mb-2"}
                key={index}
              >
                <Form.Control
                  readOnly={!isEditing}
                  placeholder={item.placeholder}
                  type="text"
                  name={item.name}
                  value={car?.[item.name]}
                  onChange={handleChange}
                  required
                />
              </FloatingLabel>
            );
          })}
        </div>

        <div className={styles.inputGroup}>
          <div className={styles.inputGroupLabel}>بيانات الدخول</div>
          {enteringDetail.map((item, index) => {
            if (item.type === "select")
              return (
                <FloatingLabel
                  controlId={item.name}
                  label={item.placeholder}
                  className={(item.class && item.class) + " mb-2"}
                  key={index}
                >
                  <Form.Select
                    disable={!isEditing}
                    placeholder={item.placeholder}
                    value={car?.[item.name]}
                    onChange={handleChange}
                    required
                    name={item.name}
                  >
                    {item.opt.map((option, index) => (
                      <option key={index} value={option.value}>
                        {option.value}
                      </option>
                    ))}
                  </Form.Select>
                </FloatingLabel>
              );
            else
              return (
                <FloatingLabel
                  controlId={item.name}
                  label={item.placeholder}
                  className={(item.class && item.class) + " mb-2"}
                  key={index}
                >
                  <Form.Control
                    readOnly={!isEditing}
                    placeholder={item.placeholder}
                    type="text"
                    value={car?.[item.name]}
                    onChange={handleChange}
                    required
                    maxLength={
                      item.name === "bookDay" || item.name === "bookMonth"
                        ? 2
                        : 4
                    }
                  />
                </FloatingLabel>
              );
          })}
        </div>
      </div>
      <div className={styles.side}>{children}</div>
    </Form>
  );
}

export default UserForm;
