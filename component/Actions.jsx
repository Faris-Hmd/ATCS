/** @format */

import { FloatingLabel, Form } from "react-bootstrap";
import formStyles from "../styles/Form.module.css";

function Actions({ handleChange, customer, isEditing }) {
  return (
    <div className={formStyles.inputGroup + " fos-m"}>
      <div className={formStyles.inputGroupLabel}>الاجرائات</div>
      <label
        htmlFor="threeMonthEx"
        className={
          customer.threeMonthEx
            ? formStyles.checkBoxChecked
            : formStyles.checkBox
        }
      >
        تمديد الاول
      </label>
      <label
        htmlFor="leftEx"
        className={
          customer.leftEx ? formStyles.checkBoxChecked : formStyles.checkBox
        }
      >
        تمديد مغادرة
      </label>{" "}
      <FloatingLabel controlId="state" label="الحالة" className="mb-2  w-100">
        <Form.Select
          type="text"
          value={customer?.state}
          placeholder="الحالة"
          name="state"
          onChange={handleChange}
          disabled={!isEditing}
          required
        >
          <option value="لم يغادر">لم يغادر</option>
          <option value="غادر">غادر</option>
          <option value="مخلص">مخلص</option>
          <option disabled value="مغادر قريبا">
            متبقي 15 يوم او اقل
          </option>
          <option disabled value="مخالف">
            مخالف
          </option>
        </Form.Select>
      </FloatingLabel>
      {customer.enteringDateBySec && (
        <>
          <FloatingLabel
            controlId="enteringRec"
            label="إذن الدخول"
            className="mb-2  w-50"
          >
            <Form.Control
              type="text"
              value={customer.enteringRec}
              placeholder="ايصال اذن دخول المركبة"
              name="enteringRec"
              onChange={handleChange}
              readOnly={!isEditing}
              required
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="enteringDate"
            label="الدخول المركبة"
            className="mb-2 w-50"
          >
            <Form.Control
              type="date"
              value={customer.enteringDate}
              placeholder="تاريخ دخول المركبة"
              name="enteringDate"
              onChange={handleChange}
              readOnly={!isEditing}
              required
            />
          </FloatingLabel>
        </>
      )}
      {customer.threeMonthEx && (
        <>
          <FloatingLabel
            controlId="threeMonthExSerialNum"
            label="خطاب التمديد"
            className="mb-2  w-30"
          >
            <Form.Control
              type="text"
              value={customer.threeMonthExSerialNum}
              placeholder="خطاب التمديد"
              name="threeMonthExSerialNum"
              onChange={handleChange}
              readOnly={!isEditing}
              required
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="threeMonthExDate"
            label="تاريخ التمديد"
            className="mb-2  w-30"
          >
            <Form.Control
              type="date"
              value={customer.threeMonthExDate}
              placeholder="تاريخ التمديد"
              name="threeMonthExDate"
              onChange={handleChange}
              readOnly={!isEditing}
              required
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="threeMonthExDur"
            label="مدة التمديد"
            className="mb-2  w-30"
          >
            <Form.Select
              type="text"
              value={customer.threeMonthExDur}
              placeholder="مدة التمديد"
              name="threeMonthExDur"
              onChange={handleChange}
              disabled={!isEditing}
              defaultValue="ثلاثة اشهر"
              required
            >
              <option value="ثلاثة أشهر">ثلاثة أشهر</option>
              <option value="شهرين">شهرين</option>
              <option value="شهر واحد">شهر واحد</option>
              <option value="15 يوم">15 يوم</option>
            </Form.Select>
          </FloatingLabel>
        </>
      )}
      {customer.leftEx && (
        <>
          <FloatingLabel
            controlId="leftExSerialNum"
            label="خطاب تمديد المغادرة"
            className="mb-2  w-50"
          >
            <Form.Control
              type="text"
              value={customer.leftExSerialNum}
              placeholder="خطاب تمديد المغادرة"
              name="leftExSerialNum"
              onChange={handleChange}
              readOnly={!isEditing}
              required
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="leftExDate"
            label="تاريخ تمديد المغادرة"
            className="mb-2  w-50"
          >
            <Form.Control
              type="date"
              value={customer.leftExDate}
              placeholder="تاريخ تمديد المغادرة"
              name="leftExDate"
              onChange={handleChange}
              readOnly={!isEditing}
              required
            />
          </FloatingLabel>
        </>
      )}
      {customer.state === "غادر" && (
        <>
          <FloatingLabel
            controlId="leftSerialNum"
            label="خطاب المغادرة"
            className={"w-50 mb-2"}
          >
            <Form.Control
              type="text"
              value={customer.leftSerialNum}
              placeholder="خطاب المغادرة"
              name="leftSerialNum"
              onChange={handleChange}
              readOnly={!isEditing}
              className={"w-100 mb-2"}
              required
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="leftDate"
            label="تاريخ المغادرة"
            className={"w-50 mb-2"}
          >
            <Form.Control
              type="date"
              value={customer?.leftDate}
              placeholder="تاريخ المغادرة"
              name="leftDate"
              onChange={handleChange}
              readOnly={!isEditing}
            />
          </FloatingLabel>
        </>
      )}
      {customer.state === "مخلص" && (
        <>
          <FloatingLabel
            controlId="clearSerialNum"
            label="خطاب التخليص"
            className="mb-2  w-50"
          >
            <Form.Control
              type="text"
              value={customer.clearSerialNum}
              placeholder="خطاب التخليص"
              name="clearSerialNum"
              onChange={handleChange}
              readOnly={!isEditing}
              required
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="clearDate"
            label="تاريخ التخليص"
            className="mb-2  w-50"
          >
            <Form.Control
              type="date"
              value={customer.clearDate}
              placeholder="تاريخ التخليص"
              name="clearDate"
              onChange={handleChange}
              readOnly={!isEditing}
            />
          </FloatingLabel>
        </>
      )}
      <Form.Check
        style={{ display: "none" }}
        disabled={!isEditing}
        name={"threeMonthEx"}
        id={"threeMonthEx"}
        onChange={handleChange}
        checked={customer.threeMonthEx}
        required
      />
      <Form.Check
        style={{ display: "none" }}
        disabled={!isEditing}
        name={"leftEx"}
        id={"leftEx"}
        checked={customer.leftEx}
        onChange={handleChange}
        required
      />
      {/* <Form.Check
        style={{ display: "none" }}
        disabled={!isEditing}
        name={"leftEx"}
        id={"leftEx"}
        checked={customer.leftEx}
        onChange={handleChange}
        required
      /> */}
    </div>
  );
}

export default Actions;
