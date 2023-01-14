/** @format */

import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { BsPencil, BsPrinter, BsSave2 } from "react-icons/bs";
import { useReactToPrint } from "react-to-print";
import ExtentionReportToPrint from "../../component/ExtentionReportToPrint/ExtentionReportToPrint";
import LeftingReportToPrint from "../../component/LeftingReportToPrint";
import Styles from "../../styles/report.module.css";
import { baseUrl } from "../_app";

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
      console.log(444);
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

  useEffect(() => {
    console.log(bookNum);
    fetch(baseUrl + "/api/getCar?bookNum=" + bookNum)
      .then((res) => res.json())
      .then((data) => {
        setCar(data);
        setIsLoading(false);
      });
  }, []);
  // useEffect(() => {
  //   console.log(car);
  // }, [car]);
  return (
    <div className={Styles.container}>
      <div className="header">
        <span>تفاصيل المركبة</span>
        <span className="btn-con">
          {isEditing && (
            <span onClick={handleUpdate} className={Styles.printBtn}>
              <div> حفظ</div>

              <BsSave2 size={"25px"} />
            </span>
          )}
          {(car.threeMonthEx || car.sixMonthEx || car.leftEx) && !isEditing && (
            <span onClick={handleExPrint} className={Styles.printBtn}>
              <div>تمديد </div>

              <BsPrinter size={"25px"} />
            </span>
          )}
          {car.state === "غادر" && !isEditing && (
            <span onClick={handleLeftPrint} className={Styles.printBtn}>
              <div> مغادرة </div>

              <BsPrinter size={"25px"} />
            </span>
          )}
          <span
            onClick={() => setIsEditing((prev) => !prev)}
            className={Styles.printBtn}
          >
            <div> تعديل</div>

            <BsPencil size={"25px"} />
          </span>
        </span>
      </div>

      {!isLoading ? (
        <>
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
                    <td className="w-40">العنوان :</td>
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
                  <tr></tr>

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
                        disabled={!isEditing}
                        name="state"
                        onChange={handleChage}
                        value={car.state}
                        defaultValue="موجود"
                      >
                        <option value="موجود">لم يغادر</option>
                        <option value="غادر">غادر</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td>التمديد :</td>
                    <td>
                      {" "}
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
                            ? Styles.checkBoxChecked
                            : Styles.checkBox
                        }
                      >
                        ثلاثة اشهر
                      </label>
                      <label
                        htmlFor="sixMonthEx"
                        className={
                          car.sixMonthEx
                            ? Styles.checkBoxChecked
                            : Styles.checkBox
                        }
                      >
                        ستة اشهر
                      </label>
                      <label
                        htmlFor="leftEx"
                        className={
                          car.leftEx ? Styles.checkBoxChecked : Styles.checkBox
                        }
                      >
                        مغادرة
                      </label>
                    </td>
                  </tr>
                </tbody>
              </table>
            </form>
          </div>
          <div className={Styles.side}>
            <div className="hidden">
              <LeftingReportToPrint ref={leftReportRef} value={car} />
              <ExtentionReportToPrint ref={exReportRef} value={car} />
            </div>
          </div>
        </>
      ) : (
        <h2>Loading </h2>
      )}
    </div>
  );
};

export default CarDetail;
