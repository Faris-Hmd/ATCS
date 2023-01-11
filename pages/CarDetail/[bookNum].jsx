/** @format */

import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { BsPencil, BsPrinter, BsSave, BsSave2 } from "react-icons/bs";
import { useReactToPrint } from "react-to-print";
import ExtentionReportToPrint from "../../component/ExtentionReportToPrint/ExtentionReportToPrint";
import Styles from "../../styles/report.module.css";
import { baseUrl } from "../_app";

const CarDetail = () => {
  const [car, setCar] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const route = useRouter();
  const componentRef = useRef();
  const { bookNum } = route.query;

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleChage = (event) => {
    const { name, value } = event.target;
    console.log(name);
    if (value.split(" ").length > 1) return;
    setCar((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleUpdate = async () => {
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
        ],
      },
    })
      .then((car) => {
        setCar(car);
        setIsLoading(false);
      })
      .catch(setIsLoading(false));
  };

  useEffect(() => {
    console.log(bookNum);
    fetch(baseUrl + "/api/getCar?bookNum=" + bookNum)
      .then((res) => res.json())
      .then((data) => setCar(data));
  }, []);
  // useEffect(() => {
  //   console.log(car);
  // }, [car]);
  return car.bookNum ? (
    <div className={Styles.container}>
      <div className="label">
        <span>تفاصيل المركبة</span>
        <span className="btn-con">
          {isEditing && (
            <span onClick={handleUpdate} className={Styles.printBtn}>
              <BsSave2 size={"25px"} />
            </span>
          )}
          <span
            onClick={() => setIsEditing((prev) => !prev)}
            className={Styles.printBtn}
          >
            <BsPencil size={"25px"} />
          </span>
          <span onClick={handlePrint} className={Styles.printBtn}>
            <BsPrinter size={"25px"} />
          </span>
        </span>
      </div>

      <div className={Styles.side}>
        <form>
          <table className={Styles.table}>
            <tbody>
              <tr>
                <td>اسم المالك :</td>
                <td>
                  <input
                    readOnly={!isEditing}
                    type="text"
                    name="ownerFName"
                    placeholder="الاول"
                    onChange={handleChage}
                    value={car?.ownerFName}
                  />{" "}
                  <input
                    readOnly={!isEditing}
                    type="text"
                    name="ownerSName"
                    placeholder="الثاني"
                    onChange={handleChage}
                    value={car?.ownerSName}
                  />{" "}
                  <input
                    readOnly={!isEditing}
                    type="text"
                    name="ownerTName"
                    placeholder="الثالث"
                    onChange={handleChage}
                    value={car.ownerTName}
                  />{" "}
                  <input
                    readOnly={!isEditing}
                    type="text"
                    name="ownerFoName"
                    placeholder="الرابع"
                    onChange={handleChage}
                    value={car.ownerFoName}
                  />
                </td>
              </tr>
              <tr>
                <td>رقم الجواز :</td>
                <td>
                  <input
                    readOnly={!isEditing}
                    type="text"
                    name="passport"
                    placeholder="رقم الجواز"
                    onChange={handleChage}
                    value={car?.passport}
                  />
                </td>
              </tr>
              <tr>
                <td>العنوان :</td>
                <td>
                  <input
                    readOnly={!isEditing}
                    type="text"
                    name="address"
                    placeholder="العنوان"
                    onChange={handleChage}
                    value={car.address}
                  />
                </td>
              </tr>
              <tr>
                <td>رقم الهاتف :</td>
                <td>
                  <input
                    readOnly={!isEditing}
                    type="text"
                    name="phone1"
                    placeholder="رقم الهاتف"
                    onChange={handleChage}
                    value={car.phone2}
                  />
                </td>
              </tr>

              {car.carType && (
                <tr>
                  <td>نوع المركبة :</td>
                  <td>
                    <input
                      readOnly={!isEditing}
                      type="text"
                      name="carType"
                      placeholder="ادخل ماركة المركبة"
                      onChange={handleChage}
                      value={car.carType}
                    />
                  </td>
                </tr>
              )}
              <tr>
                <td>ماركة المركبة :</td>
                <td>
                  <input
                    readOnly={!isEditing}
                    type="text"
                    name="carModel"
                    placeholder="ادخل ماركة المركبة"
                    onChange={handleChage}
                    value={car.carModel}
                  />
                </td>
              </tr>
              <tr>
                <td>موديل المركبة :</td>

                <td>
                  <input
                    readOnly={!isEditing}
                    type="text"
                    name="carManDate"
                    placeholder="موديل المركبة"
                    onChange={handleChage}
                    value={car.carManDate}
                  />
                </td>
              </tr>
              <tr>
                <td>رقم الهيكل :</td>
                <td>
                  <input
                    readOnly={!isEditing}
                    type="text"
                    name="chaseNum"
                    placeholder="موديل المركبة"
                    onChange={handleChage}
                    value={car.chaseNum}
                  />
                </td>
              </tr>
              <tr>
                <td>رقم اللوحة :</td>
                <td>
                  {" "}
                  <input
                    readOnly={!isEditing}
                    type="text"
                    name="carPlate"
                    placeholder="ادخل رقم اللوحة"
                    onChange={handleChage}
                    value={car?.carPlate}
                  />
                </td>
              </tr>
              <tr>
                <td>رقم الدفتر :</td>
                <td>
                  <input
                    readOnly={!isEditing}
                    type="text"
                    name="bookNum"
                    placeholder="رقم الدفتر"
                    onChange={handleChage}
                    value={car.bookNum}
                  />
                </td>
              </tr>
              <tr>
                <td>تاريخ الدفتر :</td>
                <td>
                  <input
                    readOnly={!isEditing}
                    type="text"
                    name="bookDay"
                    placeholder="اليوم"
                    onChange={handleChage}
                    className={Styles.dateInput}
                    value={car.bookDay}
                  />

                  <input
                    readOnly={!isEditing}
                    type="text"
                    name="bookMonth"
                    placeholder="الشهر"
                    onChange={handleChage}
                    className={Styles.dateInput}
                    value={car.bookMonth}
                  />

                  <input
                    readOnly={!isEditing}
                    type="text"
                    name="bookYear"
                    placeholder="السنة"
                    onChange={handleChage}
                    className={Styles.dateInput}
                    value={car.bookYear}
                  />
                </td>
              </tr>
              <tr>
                <td>تاربخ الدخول :</td>
                <td>
                  <input
                    readOnly={!isEditing}
                    type="text"
                    name="enteringDay"
                    placeholder="اليوم"
                    onChange={handleChage}
                    value={car.enteringDay}
                    className={Styles.dateInput}
                  />

                  <input
                    readOnly={!isEditing}
                    type="text"
                    name="enteringMonth"
                    placeholder="الشهر"
                    onChange={handleChage}
                    className={Styles.dateInput}
                    value={car.enteringMonth}
                  />

                  <input
                    readOnly={!isEditing}
                    type="text"
                    name="enteringYear"
                    placeholder="السنة"
                    onChange={handleChage}
                    className={Styles.dateInput}
                    value={car.enteringYear}
                  />
                </td>
              </tr>
              {car.state === "غادر" && (
                <tr>
                  <td>تاريخ المغادرة : </td>
                  <td>
                    <input
                      readOnly={!isEditing}
                      type="text"
                      name="leftDay"
                      placeholder="اليوم"
                      onChange={handleChage}
                      className={Styles.dateInput}
                      value={car.leftDay}
                    />

                    <input
                      readOnly={!isEditing}
                      type="text"
                      name="leftMonth"
                      placeholder="الشهر"
                      onChange={handleChage}
                      className={Styles.dateInput}
                      value={car.leftMonth}
                    />
                    <input
                      readOnly={!isEditing}
                      type="text"
                      name="leftYear"
                      placeholder="السنة"
                      onChange={handleChage}
                      className={Styles.dateInput}
                      value={car.leftYear}
                    />
                  </td>
                </tr>
              )}
              <tr>
                <td>الحالة :</td>
                <td>
                  <select
                    readOnly={!isEditing}
                    name="state"
                    onChange={handleChage}
                    value={car.state}
                  >
                    <option value="موجود">لم يغادر</option>
                    <option value="غادر">غادر</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
      <div className={Styles.side}>
        <div className="hidden">
          <ExtentionReportToPrint ref={componentRef} value={car} />
        </div>
      </div>
    </div>
  ) : (
    <h2>Loading</h2>
  );
};

export default CarDetail;
