/** @format */

import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { BsPencil, BsPrinter, BsSave2 } from "react-icons/bs";
import { useReactToPrint } from "react-to-print";
import ExtentionReportToPrint from "../../component/ExtentionReportToPrint";
import LeftingReportToPrint from "../../component/LeftingReportToPrint";
import formStyles from "../../styles/Form.module.css";

import { baseUrl } from "../_app";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";

const CarDetail = () => {
  const [car, setCar] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const route = useRouter();
  const leftReportRef = useRef();
  const exReportRef = useRef();
  const { bookNum } = route.query;

  const handleExPrint = useReactToPrint({
    content: () => exReportRef.current,
  });

  const handleLeftPrint = useReactToPrint({
    content: () => leftReportRef.current,
  });
  const handleChage = (event) => {
    const { name, value } = event.target;

    if (event.target.type === "checkbox") {
      setCar((prev) => {
        return { ...prev, [name]: event.target.checked };
      });
      return;
    }

    console.log([name], event.target.checked);
    if (value.split(" ").length > 1) return;
    setCar((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleUpdate = async () => {
    setCar({});
    setIsEditing(false);
    setIsLoading(true);
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
          car.state,
        ],
      },
    })
      .then((res) => {
        setCar(res.data);
        setIsLoading(false);
      })
      .catch(setIsLoading(false));
  };

  // useEffect(() => {
  //   const getdata = async () => {
  //     const data = await getDocs(collection(db, "cars"));
  //     const cars = data.docs.map((car) => {
  //       return { ...car.data() };
  //     });

  //   };
  //   getdata();
  // }, []);

  useEffect(() => {
    console.log(bookNum);
    fetch(baseUrl + "/api/getCar?bookNum=" + bookNum)
      .then((res) => res.json())
      .then((data) => {
        setCar(data);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <h2>Loading... </h2>;
  if (car)
    return (
      <div className={"contenier"}>
        <div className="header">
          <span>استمارة الافراج المؤقت</span>
          <span className="btn-con">
            {isEditing && (
              <div onClick={handleUpdate} className={"printBtn"}>
                <BsSave2 size={"22px"} />
                حفظ
              </div>
            )}
            {(car.threeMonthEx || car.sixMonthEx || car.leftEx) &&
              !isEditing && (
                <div onClick={handleExPrint} className={"printBtn"}>
                  <BsPrinter size={"22px"} />
                  تمديد
                </div>
              )}
            {car.state === "غادر" && !isEditing && (
              <div onClick={handleLeftPrint} className={"printBtn"}>
                <BsPrinter size={"22px"} />
                مغادرة
              </div>
            )}
            <div
              onClick={() => setIsEditing((prev) => !prev)}
              className={"printBtn"}
            >
              <BsPencil size={"22px"} />
              تعديل
            </div>
          </span>
        </div>
        <form className={formStyles.form} onSubmit={handleUpdate}>
          <div className={formStyles.side}>
            <div className={formStyles.inputGroup}>
              <div className={formStyles.inputGroupLabel}>بيانات المالك</div>
              <div className={"w-50 " + formStyles.inputCon}>
                <label htmlFor="ownerFName">الاسم الاول</label>
                <input
                  readOnly={!isEditing}
                  type="text"
                  name="ownerFName"
                  placeholder="الاسم الاول"
                  onChange={handleChage}
                  value={car.ownerFName}
                  className="w-50"
                  required
                />
              </div>
              <div className={formStyles.inputCon + " w-50"}>
                <label htmlFor="ownerSName">الاسم الثاني</label>
                <input
                  readOnly={!isEditing}
                  type="text"
                  name="ownerSName"
                  placeholder="الاسم الثاني"
                  onChange={handleChage}
                  value={car.ownerSName}
                  className="w-50"
                  required
                />
              </div>
              <div className={formStyles.inputCon + " w-50"}>
                <label htmlFor="ownerSName">الاسم الثالث</label>{" "}
                <input
                  readOnly={!isEditing}
                  type="text"
                  name="ownerTName"
                  placeholder="الاسم الثالث"
                  onChange={handleChage}
                  value={car.ownerTName}
                  className="w-50"
                  required
                />
              </div>
              <div className={formStyles.inputCon + " w-50"}>
                <label htmlFor="ownerSName">الاسم الرابع</label>{" "}
                <input
                  readOnly={!isEditing}
                  type="text"
                  name="ownerFoName"
                  placeholder="الاسم الرابع"
                  onChange={handleChage}
                  value={car.ownerFoName}
                  className="w-50"
                  required
                />
              </div>{" "}
              <div className={formStyles.inputCon}>
                <label htmlFor="ownerSName">رقم الجواز</label>
                <input
                  readOnly={!isEditing}
                  type="text"
                  name="passport"
                  placeholder="رقم الجواز"
                  onChange={handleChage}
                  value={car.passport}
                  required
                />
              </div>
              <div className={formStyles.inputCon}>
                <label htmlFor="ownerSName">رقم الدفتر</label>{" "}
                <input
                  readOnly={!isEditing}
                  type="text"
                  name="bookNum"
                  placeholder="رقم الدفتر"
                  onChange={handleChage}
                  value={car.bookNum}
                  required
                  min={8}
                />
              </div>
              <div className={formStyles.inputCon}>
                <label htmlFor="ownerSName">العنوان</label>
                <input
                  readOnly={!isEditing}
                  type="text"
                  name="address"
                  placeholder="العنوان"
                  onChange={handleChage}
                  value={car.address}
                />
              </div>
              <div className={formStyles.inputCon}>
                <label htmlFor="ownerSName">رقم الهاتف</label>
                <input
                  readOnly={!isEditing}
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
          <div className={formStyles.side}>
            {" "}
            <div className={formStyles.inputGroup}>
              <div className={formStyles.inputGroupLabel}>بيانات السيارة</div>
              <div className={formStyles.inputCon}>
                <label htmlFor="chaseNum">رقم الشاسيه</label>
                <input
                  readOnly={!isEditing}
                  type="text"
                  name="chaseNum"
                  id="chaseNum"
                  placeholder="رقم الشاسيه"
                  onChange={handleChage}
                  value={car.chaseNum}
                  required
                />
              </div>
              <div className={formStyles.inputCon}>
                <label htmlFor="ownerSName"> رقم اللوحة</label>
                <input
                  readOnly={!isEditing}
                  type="text"
                  name="carPlate"
                  placeholder="ادخل رقم اللوحة"
                  onChange={handleChage}
                  value={car.carPlate}
                />
              </div>{" "}
              <div className={formStyles.inputCon}>
                <label htmlFor="ownerSName"> ماركة المركبة</label>
                <input
                  readOnly={!isEditing}
                  type="text"
                  name="carType"
                  placeholder="ادخل ماركة المركبة"
                  onChange={handleChage}
                  value={car.carType}
                />
              </div>{" "}
              <div className={formStyles.inputCon}>
                <label htmlFor="ownerSName">موديل المركبة</label>
                <input
                  readOnly={!isEditing}
                  type="text"
                  name="carManDate"
                  placeholder="موديل المركبة"
                  onChange={handleChage}
                  value={car.carManDate}
                />
              </div>
              <div className={formStyles.inputCon}>
                <label htmlFor="bookType">نوع الدفتر</label>
                <select
                  disabled={!isEditing}
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
                  disabled={!isEditing}
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
                readOnly={!isEditing}
                type="text"
                name="bookDay"
                placeholder="اليوم"
                onChange={handleChage}
                value={car.bookDay}
                className={formStyles.dateInput + " w-20"}
                min={0}
                max={31}
                maxLength={2}
              />
              <input
                readOnly={!isEditing}
                type="text"
                name="bookMonth"
                placeholder="الشهر"
                onChange={handleChage}
                value={car.bookMonth}
                className={formStyles.dateInput + " w-20"}
              />
              <input
                readOnly={!isEditing}
                type="text"
                name="bookYear"
                placeholder="السنة"
                onChange={handleChage}
                value={car.bookYear}
                className={formStyles.dateInput}
              />
              <label htmlFor="enteringDate">تاريخ الدخول</label>
              <input
                readOnly={!isEditing}
                type="text"
                name="enteringDay"
                placeholder="اليوم"
                onChange={handleChage}
                className={formStyles.dateInput + " w-20"}
                value={car.enteringDay}
              />
              <input
                readOnly={!isEditing}
                type="text"
                name="enteringMonth"
                placeholder="الشهر"
                onChange={handleChage}
                className={formStyles.dateInput + " w-20"}
                value={car.enteringMonth}
              />
              <input
                readOnly={!isEditing}
                type="text"
                name="enteringYear"
                placeholder="السنة"
                onChange={handleChage}
                className={formStyles.dateInput}
                value={car.enteringYear}
              />
            </div>
            <div className={formStyles.inputGroup}>
              {" "}
              {car.state === "غادر" && (
                <div className={formStyles.inputCon}>
                  <label htmlFor="enteringDate">تاريخ المغادرة</label>

                  <input
                    readOnly={!isEditing}
                    type="text"
                    name="leftDay"
                    placeholder="اليوم"
                    onChange={handleChage}
                    className={formStyles.dateInput}
                    value={car.leftDay}
                  />

                  <input
                    readOnly={!isEditing}
                    type="text"
                    name="leftMonth"
                    placeholder="الشهر"
                    onChange={handleChage}
                    className={formStyles.dateInput}
                    value={car.leftMonth}
                  />
                  <input
                    readOnly={!isEditing}
                    type="text"
                    name="leftYear"
                    placeholder="السنة"
                    onChange={handleChage}
                    className={formStyles.dateInput}
                    value={car.leftYear}
                  />
                </div>
              )}
              <div className={formStyles.inputCon + " w-50"}>
                <label htmlFor="enteringDate"> الحالة</label>

                <select
                  disabled={!isEditing}
                  name="state"
                  onChange={handleChage}
                  value={car.state}
                  defaultValue="موجود"
                >
                  <option value="موجود">لم يغادر</option>
                  <option value="غادر">غادر</option>
                </select>
              </div>
              <div className={formStyles.inputCon}>
                <label htmlFor="enteringDate"> التمديد</label>

                <input
                  disabled={!isEditing}
                  id="threeMonthEx"
                  type="checkbox"
                  name="threeMonthEx"
                  onChange={handleChage}
                  checked={car.threeMonthEx}
                  className="hidden"
                />
                <input
                  disabled={!isEditing}
                  id="sixMonthEx"
                  type="checkbox"
                  name="sixMonthEx"
                  onChange={handleChage}
                  checked={car.sixMonthEx}
                  className="hidden"
                />
                <input
                  disabled={!isEditing}
                  id="leftEx"
                  type="checkbox"
                  name="leftEx"
                  onChange={handleChage}
                  checked={car.leftEx}
                  className="hidden"
                />
                <label
                  htmlFor="threeMonthEx"
                  className={
                    car.threeMonthEx
                      ? formStyles.checkBoxChecked
                      : formStyles.checkBox
                  }
                >
                  اول
                </label>
                <label
                  htmlFor="sixMonthEx"
                  className={
                    car.sixMonthEx
                      ? formStyles.checkBoxChecked
                      : formStyles.checkBox
                  }
                >
                  ثاني
                </label>
                <label
                  htmlFor="leftEx"
                  className={
                    car.leftEx
                      ? formStyles.checkBoxChecked
                      : formStyles.checkBox
                  }
                >
                  مغادرة
                </label>
              </div>
            </div>
          </div>
          <div className={formStyles.side}></div>
          {/* <input readOnly={!isEditing} type="submit" value="حفظ" disabled={isLoading} /> */}
        </form>
        <div className="hidden">
          <LeftingReportToPrint ref={leftReportRef} value={car} />
          <ExtentionReportToPrint ref={exReportRef} value={car} />
        </div>
      </div>
    );
};

export default CarDetail;
