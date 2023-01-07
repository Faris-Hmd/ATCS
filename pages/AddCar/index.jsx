/** @format */
import { useEffect, useState } from "react";
import styles from "../../styles/Form.module.css";
const AddCar = () => {
  const [formData, setFormData] = useState({});
  const handleChage = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  };
  useEffect(() => {
    console.log(formData);
  }, [formData]);
  return (
    <form className={styles.form}>
      <div className={styles.inputCon}>
        <label htmlFor="fName">الاسم الاول</label>
        <input
          type="text"
          name="fName"
          placeholder="الاسم الاول"
          onChange={handleChage}
        />
      </div>
      <div className={styles.inputCon}>
        <label htmlFor="sName">الاسم الثاني</label>
        <input
          type="text"
          name="sName"
          placeholder="الاسم الثاني"
          onChange={handleChage}
        />
      </div>
      <div className={styles.inputCon}>
        <label htmlFor="sName">الاسم الثاني</label>{" "}
        <input
          type="text"
          name="tName"
          placeholder="الاسم الثالث"
          onChange={handleChage}
        />
      </div>
      <div className={styles.inputCon}>
        <label htmlFor="sName">الاسم الرابع</label>{" "}
        <input
          type="text"
          name="foName"
          placeholder="الاسم الرابع"
          onChange={handleChage}
        />
      </div>
      <div className={styles.inputCon}>
        <label htmlFor="sName">رقم الدفتر</label>{" "}
        <input
          type="text"
          name="bookNum"
          placeholder="رقم الدفتر"
          onChange={handleChage}
        />
      </div>
      <div className={styles.inputCon}>
        <label htmlFor="sName">رقم الشاسيه</label>
        <input
          type="text"
          name="chaseNum"
          placeholder="رقم الشاسيه"
          onChange={handleChage}
        />
      </div>
      <div className={styles.inputCon}>
        <label htmlFor="sName">رقم الجواز</label>
        <input
          type="text"
          name="passport"
          placeholder="رقم الجواز"
          onChange={handleChage}
        />
      </div>
      <div className={styles.inputCon}>
        <label htmlFor="sName">رقم الهاتف</label>
        <input
          type="number"
          name="phones"
          placeholder="رقم الهاتف"
          onChange={handleChage}
        />
      </div>
      <div className={styles.inputCon}>
        <label htmlFor="sName">نوع المركبة</label>
        <input
          type="text"
          name="carType"
          placeholder="نوع المركبة"
          onChange={handleChage}
        />
      </div>
      <div className={styles.inputCon}>
        <label htmlFor="bookType">سياحي</label>
        <select name="bookType" id="bookType" onChange={handleChage}>
          <option value={true}>نعم</option>
          <option value={false}>لا</option>
        </select>{" "}
        <label htmlFor="enteringType">نوع الدخول</label>
        <select name="enteringType" id="enterType" onChange={handleChage}>
          <option value={"جديد"}>جديد</option>
          <option value={"مكرر"}>مكرر</option>
        </select>
      </div>

      <label htmlFor="bookDate">تاريخ الدفتر</label>
      <input type="date" name="bookDate" id="bookDate" onChange={handleChage} />
      <label htmlFor="enteringDate">تاريخ الدخول</label>
      <input
        type="date"
        name="enteringDate"
        id="enteringDate"
        onChange={handleChage}
      />
    </form>
  );
};
export default AddCar;
