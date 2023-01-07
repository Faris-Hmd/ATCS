/** @format */
import { useEffect, useState } from "react";
import styles from "../../styles/Form.module.css";
const AddCar = () => {
  const [formData, setFormData] = useState({});
  const handleChage = (event) => {
    const { name, value } = event.target;
    console.log(value.split(" ").length);
    console.log(value.split(" ").length > 1);
    if (value.split(" ").length > 1 || value === " ") return;
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  };
  // useEffect(() => {
  //   console.log(formData);
  // }, [formData]);
  return (
    <>
      <div className="label">استمارة الافراج المؤقت</div>
      <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
        <div className={styles.side}>
          <div className={styles.inputCon}>
            <label htmlFor="fName">الاسم الاول</label>
            <input
              type="text"
              name="fName"
              placeholder="الاسم الاول"
              onChange={handleChage}
              value={formData?.fName}
              // pattern="[0-9]"
            />
          </div>
          <div className={styles.inputCon}>
            <label htmlFor="sName">الاسم الثاني</label>
            <input
              type="text"
              name="sName"
              placeholder="الاسم الثاني"
              onChange={handleChage}
              value={formData?.sName}
            />
          </div>
          <div className={styles.inputCon}>
            <label htmlFor="sName">الاسم الثاني</label>{" "}
            <input
              type="text"
              name="tName"
              placeholder="الاسم الثالث"
              onChange={handleChage}
              value={formData?.tName}
            />
          </div>
          <div className={styles.inputCon}>
            <label htmlFor="sName">الاسم الرابع</label>{" "}
            <input
              type="text"
              name="foName"
              placeholder="الاسم الرابع"
              onChange={handleChage}
              value={formData?.foName}
            />
          </div>{" "}
          <div className={styles.inputCon}>
            <label htmlFor="sName">رقم الجواز</label>
            <input
              type="text"
              name="passport"
              placeholder="رقم الجواز"
              onChange={handleChage}
              value={formData?.passport}
            />
          </div>
          <div className={styles.inputCon}>
            <label htmlFor="sName">رقم الدفتر</label>{" "}
            <input
              type="text"
              name="bookNum"
              placeholder="رقم الدفتر"
              onChange={handleChage}
              value={formData?.bookNum}
            />
          </div>{" "}
          <div className={styles.inputCon}>
            <label htmlFor="sName">رقم الهاتف</label>
            <input
              type="number"
              name="phones"
              placeholder="رقم الهاتف"
              onChange={handleChage}
              value={formData?.phones}
            />
          </div>
        </div>
        <div className={styles.side}>
          {" "}
          <div className={styles.inputCon}>
            <label htmlFor="chaseNum">رقم الشاسيه</label>
            <input
              type="text"
              name="chaseNum"
              id="chaseNum"
              placeholder="رقم الشاسيه"
              onChange={handleChage}
              value={formData?.chaseNum}
            />
          </div>
          <div className={styles.inputCon}>
            <label htmlFor="sName">نوع المركبة</label>
            <input
              type="text"
              name="carType"
              placeholder="نوع المركبة"
              onChange={handleChage}
              value={formData?.carType}
            />
          </div>
          <div className={styles.inputCon}>
            <label htmlFor="bookType">سياحي</label>
            <select
              name="bookType"
              id="bookType"
              onChange={handleChage}
              value={formData?.bookType}
            >
              <option value={true}>نعم</option>
              <option value={false}>لا</option>
            </select>{" "}
            <label htmlFor="enteringtype">نوع الدخول</label>
            <select
              name="enteringType"
              id="enteringtype"
              onChange={handleChage}
              value={formData?.enteringType}
            >
              <option value={"جديد"}>جديد</option>
              <option value={"مكرر"}>مكرر</option>
            </select>
          </div>
          <label htmlFor="bookDate">تاريخ الدفتر</label>
          <input
            type="date"
            name="bookDate"
            id="bookDate"
            onChange={handleChage}
            value={formData?.bookDate}
          />
          <label htmlFor="enteringDate">تاريخ الدخول</label>
          <input
            type="date"
            name="enteringDate"
            id="enteringDate"
            onChange={handleChage}
            value={formData?.enteringDate}
          />
        </div>
        <input type="submit" value="حفظ" />
      </form>
    </>
  );
};
export default AddCar;
