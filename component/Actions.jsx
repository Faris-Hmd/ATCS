/** @format */

import React from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import formStyles from "../styles/Form.module.css";

function Actions({ handleChange, customer, isEditing }) {
  return (
    <div className={formStyles.inputGroup + " w-50"}>
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
        htmlFor="sixMonthEx"
        className={
          customer.sixMonthEx ? formStyles.checkBoxChecked : formStyles.checkBox
        }
      >
        تمديد ثاني
      </label>
      <label
        htmlFor="leftEx"
        className={
          customer.leftEx ? formStyles.checkBoxChecked : formStyles.checkBox
        }
      >
        تمديد مغادرة
      </label>
      {customer.threeMonthEx && (
        <>
          <FloatingLabel
            controlId="threeMonthExRec"
            label="رقم ايصال التمديد الاول"
            className="mb-2  w-50"
          >
            <Form.Control
              type="text"
              value={customer.threeMonthExRec}
              placeholder="threeMonthExRec"
              name="threeMonthExRec"
              onChange={handleChange}
              readOnly={!isEditing}
              required
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="threeMonthExSerialNum"
            label="رقم خطاب التمديد الاول"
            className="mb-2  w-50"
          >
            <Form.Control
              type="text"
              value={customer.threeMonthExSerialNum}
              placeholder="threeMonthExSerialNum"
              name="threeMonthExSerialNum"
              onChange={handleChange}
              readOnly={!isEditing}
              required
            />
          </FloatingLabel>
        </>
      )}
      {customer.sixMonthEx && (
        <FloatingLabel
          controlId="sixMonthExRec"
          label="رقم ايصال التمديد الثاني"
          className="mb-2  w-100"
        >
          <Form.Control
            type="text"
            value={customer.sixMonthExRec}
            placeholder="رقم ايصال التمديد الثاني"
            name="sixMonthExRec"
            onChange={handleChange}
            readOnly={!isEditing}
            required
          />
        </FloatingLabel>
      )}
      {customer.leftEx && (
        <>
          <FloatingLabel
            controlId="leftExRec"
            label="رقم ايصال تمديد المغادرة"
            className="mb-2  w-50"
          >
            <Form.Control
              type="text"
              value={customer.leftExRec}
              placeholder="رقم ايصال تمديد المغادرة"
              name="leftEx"
              onChange={handleChange}
              readOnly={!isEditing}
              required
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="leftExSerialNum"
            label="رقم خطاب تمديد المغادرة"
            className="mb-2  w-50"
          >
            <Form.Control
              type="text"
              value={customer.leftExSerialNum}
              placeholder="رقم خطاب تمديد المغادرة"
              name="leftExSerialNum"
              onChange={handleChange}
              readOnly={!isEditing}
              required
            />
          </FloatingLabel>
        </>
      )}
      {
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
          </Form.Select>
        </FloatingLabel>
      }
      {customer.state === "غادر" && (
        <>
          <FloatingLabel
            controlId="leftDay"
            label="اليوم"
            className={"w-30 mb-2"}
          >
            <Form.Control
              type="text"
              value={customer?.leftDay}
              placeholder="اليوم"
              name="leftDay"
              onChange={handleChange}
              readOnly={!isEditing}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="leftMonth"
            label="الشهر"
            className={"w-30 mb-2"}
          >
            <Form.Control
              type="text"
              value={customer?.leftMonth}
              placeholder="الشهر"
              name="leftMonth"
              onChange={handleChange}
              readOnly={!isEditing}
            />
          </FloatingLabel>{" "}
          <FloatingLabel
            controlId="leftYear"
            label="السنة"
            className={"w-30 mb-2"}
          >
            <Form.Control
              type="text"
              value={customer?.leftYear}
              placeholder="السنة"
              name="leftYear"
              onChange={handleChange}
              readOnly={!isEditing}
            />
          </FloatingLabel>
        </>
      )}
      <FloatingLabel
        controlId="isViolate"
        label="المخالفة"
        className="mb-2  w-100"
      >
        <Form.Select
          type="text"
          value={customer?.isViolate}
          placeholder="المخالفة"
          name="isViolate"
          onChange={handleChange}
          disabled={!isEditing}
        >
          <option value="غير مخالف">غير مخالف</option>
          <option value="مخالف">مخالف</option>
        </Form.Select>
      </FloatingLabel>

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
        name={"sixMonthEx"}
        id={"sixMonthEx"}
        checked={customer.sixMonthEx}
        onChange={handleChange}
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
    </div>
  );
}

export default Actions;
