/** @format */
import axios from "axios";
import { useEffect, useState } from "react";
import UserForm from "../component/Form";
import { baseUrl } from "./_app";

const AddCar = () => {
  const [car, setCar] = useState({
    bookType: "عادي",
    enteringType: "جديد",
  });
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (event) => {
    const { name, value } = event.target;
    if (value.split(" ").length > 1) return;
    setCar((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    var eDate = new Date(
      `${car.enteringMonth}/${car.enteringDay}/${car.enteringYear}`
    );
    axios({
      method: "post",
      url: `${baseUrl}/api/addCars`,
      data: {
        ...car,
        enteringDate: `${car.enteringMonth}/${car.enteringYear}`,
        enteringDateBySec: eDate.getTime(),
        keywords: [
          car.ownerSName,
          car.ownerFName,
          car.ownerTName,
          car.ownerFoName,
          car.bookNum,
          car.bookType,
          car.enteringType,
          `${car.enteringMonth}/${car.enteringYear}`,
        ],
      },
    })
      .then(() => {
        setIsLoading(false);
        setCar({});
      })
      .catch(setIsLoading(false));
  };
  useEffect(() => {
    console.log(car);
  }, [car]);

  return (
    <div className={"contenier"}>
      <div className="header">استمارة الافراج المؤقت</div>
      <UserForm car={car} handleChange={handleChange} isEditing={true} />
    </div>
  );
};
export default AddCar;

{
  /* <Form className={styles.form} onSubmit={handleSubmit}>
  <div className={styles.side}>
    <div className={styles.inputGroup}>
      <div className={styles.inputGroupLabel}>بيانات المالك</div>
      <div className={"w-50 " + styles.inputCon}>
        <label htmlFor="ownerFName">الاسم الاول</label>
        <input
          type="text"
          name="ownerFName"
          placeholder="الاسم الاول"
          onChange={handleChage}
          value={car.ownerFName}
          className="w-50"
          required
        />
      </div>
      <div className={styles.inputCon + " w-50"}>
        <label htmlFor="ownerSName">الاسم الثاني</label>
        <input
          type="text"
          name="ownerSName"
          placeholder="الاسم الثاني"
          onChange={handleChage}
          value={car.ownerSName}
          className="w-50"
          required
        />
      </div
      <div className={styles.inputCon + " w-50"}>
        <label htmlFor="ownerSName">الاسم الثالث</label>{" "}
        <input
          type="text"
          name="ownerTName"
          placeholder="الاسم الثالث"
          onChange={handleChage}
          value={car.ownerTName}
          className="w-50"
          required
        />
      </div>
      <div className={styles.inputCon + " w-50"}>
        <label htmlFor="ownerSName">الاسم الرابع</label>{" "}
        <input
          type="text"
          name="ownerFoName"
          placeholder="الاسم الرابع"
          onChange={handleChage}
          value={car.ownerFoName}
          className="w-50"
          required
        />
      </div>{" "}
      <div className={styles.inputCon}>
        <label htmlFor="ownerSName">رقم الجواز</label>
        <input
          type="text"
          name="passport"
          placeholder="رقم الجواز"
          onChange={handleChage}
          value={car.passport}
          required
        />
      </div>
      <div className={styles.inputCon}>
        <label htmlFor="ownerSName">رقم الدفتر</label>{" "}
        <input
          type="text"
          name="bookNum"
          placeholder="رقم الدفتر"
          onChange={handleChage}
          value={car.bookNum}
          required
          min={8}
        />
      </div>
      <div className={styles.inputCon}>
        <label htmlFor="ownerSName">العنوان</label>
        <input
          type="text"
          name="address"
          placeholder="العنوان"
          onChange={handleChage}
          value={car.address}
        />
      </div>
      <div className={styles.inputCon}>
        <label htmlFor="ownerSName">رقم الهاتف</label>
        <input
          type="number"
          name="phone1"
          placeholder="رقم الهاتف"
          onChange={handleChage}
          value={car.phones1}
          required
        />
      </div>
    </div>
  </div>
  <div className={styles.side}>
    {" "}
    <div className={styles.inputGroup}>
      <div className={styles.inputGroupLabel}>بيانات السيارة</div>
      <div className={styles.inputCon}>
        <label htmlFor="chaseNum">رقم الشاسيه</label>
        <input
          type="text"
          name="chaseNum"
          id="chaseNum"
          placeholder="رقم الشاسيه"
          onChange={handleChage}
          value={car.chaseNum}
          required
        />
      </div>
      <div className={styles.inputCon}>
        <label htmlFor="ownerSName"> رقم اللوحة</label>
        <input
          type="text"
          name="carPlate"
          placeholder="ادخل رقم اللوحة"
          onChange={handleChage}
          value={car.carPlate}
        />
      </div>{" "}
      <div className={styles.inputCon}>
        <label htmlFor="ownerSName"> ماركة المركبة</label>
        <input
          type="text"
          name="carType"
          placeholder="ادخل ماركة المركبة"
          onChange={handleChage}
          value={car.carType}
        />
      </div>{" "}
      <div className={styles.inputCon}>
        <label htmlFor="ownerSName">موديل المركبة</label>
        <input
          type="text"
          name="carManDate"
          placeholder="موديل المركبة"
          onChange={handleChage}
          value={car.carManDate}
        />
      </div>
      <div className={styles.inputCon}>
        <label htmlFor="bookType">نوع الدفتر</label>
        <select
          name="bookType"
          id="bookType"
          onChange={handleChage}
          value={car.bookType}
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
          value={car.enteringType}
          defaultValue={"جديد"}
          required
        >
          <option value={"جديد"}>جديد</option>
          <option value={"مكرر"}>مكرر</option>
        </select>
      </div>
      <label htmlFor="bookDate">تاريخ الدفتر</label>
      <input
        type="text"
        name="bookDay"
        placeholder="اليوم"
        onChange={handleChage}
        value={car.bookDay}
        className={styles.dateInput + " w-20"}
        min={0}
        max={31}
        maxLength={2}
      />
      <input
        type="text"
        name="bookMonth"
        placeholder="الشهر"
        onChange={handleChage}
        value={car.bookMonth}
        className={styles.dateInput + " w-20"}
      />
      <input
        type="text"
        name="bookYear"
        placeholder="السنة"
        onChange={handleChage}
        value={car.bookYear}
        className={styles.dateInput}
      />
      <label htmlFor="enteringDate">تاريخ الدخول</label>
      <input
        type="text"
        name="enteringDay"
        placeholder="اليوم"
        onChange={handleChage}
        className={styles.dateInput + " w-20"}
        value={car.enteringDay}
      />
      <input
        type="text"
        name="enteringMonth"
        placeholder="الشهر"
        onChange={handleChage}
        className={styles.dateInput + " w-20"}
        value={car.enteringMonth}
      />
      <input
        type="text"
        name="enteringYear"
        placeholder="السنة"
        onChange={handleChage}
        className={styles.dateInput}
        value={car.enteringYear}
      />
    </div>
  </div>
  <div className={styles.side}></div>

  <input type="submit" value="حفظ" disabled={isLoading} />
    </Form> */
}
