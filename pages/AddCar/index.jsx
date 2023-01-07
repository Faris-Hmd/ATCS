/** @format */
import axios from "axios";
import { useState } from "react";
import styles from "../../styles/Form.module.css";
const AddCar = () => {
  const [formData, setFormData] = useState({
    bookType: "عادي",
    enteringType: "جديد",
  });
  const [isLoading, setIsLoading] = useState(false);
  const handleChage = (event) => {
    const { name, value } = event.target;
    console.log(value.split(" ").length);
    console.log(value.split(" ").length > 1);
    if (value.split(" ").length > 1) return;
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    console.log(formData);
    const [y, m, d] = formData.enteringDate.split("-");
    const [by, bm, bd] = formData.bookDate.split("-");
    var eDate = new Date(`${m}/${d}/${y}`);
    var enteringDate = `${m}/${y}`;
    var fullDate = `${m}/${d}/${y}`;
    console.log(m, d, y);
    axios({
      method: "post",
      url: `${baseUrl}/api/addCars`,
      data: {
        ...formData,
        enteringDate: fullDate,
        enteringDay: parseInt(d),
        enteringMonth: parseInt(m),
        enteringYear: parseInt(y),
        bookDay: parseInt(bd),
        bookMonth: parseInt(bm),
        bookYear: parseInt(by),
        enteringDateBySec: eDate.getTime(),
        keywords: [
          formData.sName,
          formData.fName,
          formData.tName,
          formData.foName,
          formData.bookNum,
          formData.bookType,
          formData.enteringType,
          enteringDate,
        ],
      },
    }).then(() => {
      setIsLoading(false);
      setFormData({});
    });
  };

  return (
    <>
      <div className="label">استمارة الافراج المؤقت</div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.side}>
          <div className={styles.inputCon}>
            <label htmlFor="fName">الاسم الاول</label>
            <input
              type="text"
              name="fName"
              placeholder="الاسم الاول"
              onChange={handleChage}
              value={formData?.fName}
              required
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
              required
            />
          </div>
          <div className={styles.inputCon}>
            <label htmlFor="sName">الاسم الثالث</label>{" "}
            <input
              type="text"
              name="tName"
              placeholder="الاسم الثالث"
              onChange={handleChage}
              value={formData?.tName}
              required
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
              required
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
              required
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
              required
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
              required
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
              required
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
              required
            />
          </div>
          <div className={styles.inputCon}>
            <label htmlFor="bookType">نوع الدفتر</label>
            <select
              name="bookType"
              id="bookType"
              onChange={handleChage}
              value={formData.bookType}
              defaultValue={"عادي"}
              required
            >
              <option value={"عادي"}>عادي</option>
              <option value={"سياحي"}>سياحي</option>
            </select>{" "}
            <label htmlFor="enteringtype">نوع الدخول</label>
            <select
              name="enteringType"
              id="enteringtype"
              onChange={handleChage}
              value={formData.enteringType}
              defaultValue={"جديد"}
              required
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
            required
          />
          <label htmlFor="enteringDate">تاريخ الدخول</label>
          <input
            type="date"
            name="enteringDate"
            id="enteringDate"
            onChange={handleChage}
            value={formData?.enteringDate}
            required
          />
        </div>
        <input type="submit" value="حفظ" disabled={isLoading} />
      </form>
    </>
  );
};
export default AddCar;
