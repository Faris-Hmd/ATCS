/** @format */
import React, { useEffect, useState } from "react";
import Styles from "../styles/report.module.css";

const ExtentionReportToPrint = React.forwardRef((props, ref) => {
  const [car, setCar] = useState({});
  const date = new Date();
  useEffect(() => {
    // console.log("from priny", props.value);
    console.log(date.getDay());
    if (props.value) setCar(props.value);
  }, []);

  return (
    <div className={Styles.printContainer} ref={ref}>
      <div className={Styles.header}>
        <div className={Styles.dateCon}>
          <div className={Styles.date}>
            التاريخ{" "}
            {date.getFullYear() +
              "/" +
              date.getMonth() +
              "/" +
              (date.getUTCDate())}
          </div>
          <div className={Styles.bookNum}>
            رقم/ن/س/ر/ {car.threeMonthExSerialNum}
          </div>
        </div>
        <div className={Styles.title}>تمديد دفاتر المرور الجمركي</div>
        <div className={Styles.for}>
          <span>معنون للسيد / مدير ادارة مكافحة التهريب </span>
          <span>المحترم</span>
        </div>
      </div>
      <table className={Styles.table}>
        <tbody>
          <tr>
            <td>اســــــم المــــالك :</td>

            <td>
              {car.ownerFName} {car.ownerSName} {car.ownerTName}{" "}
              {car.ownerFoName}
            </td>
          </tr>
          <tr>
            <td>رقـــــــم الجــــــواز :</td>

            <td>{car.passport}</td>
          </tr>
          <tr>
            <td>العــــــــــــــــــــنوان :</td>
            <td>{car.address}</td>
          </tr>
          <tr>
            <td>رقـــــم الهــــــاتف :</td>
            <td>
              {car.phone1} {car.phone2}
            </td>
          </tr>
          <tr>
            <td>تــاربخ الـــــدخول :</td>
            <td>
              {car.enteringYear}/{car.enteringMonth}/{car.enteringDay}
            </td>
          </tr>
          <tr>
            <td>مـــاركة الــمركبة :</td>
            <td>{car.carType}</td>
          </tr>
          <tr>
            <td>مـــوديل المركبة :</td>
            <td>{car.carModel}</td>
          </tr>
          <tr>
            <td>رقــــــــم الـــهيكل :</td>
            <td>{car.chaseNum}</td>
          </tr>
          <tr>
            <td>رقـــــــم اللـــــوحة :</td>
            <td>{car.plateNum}</td>
          </tr>
          <tr>
            <td>رقـــــــم الـــدفـــتر :</td>
            <td>{car.bookNum}</td>
          </tr>
          <tr>
            <td>التــــــــــــــــوصية :</td>
            <td>
              لامانع لدينا في تجديد لفترة ثلاثة شهور أخرى وفق النظام المعمول به.
            </td>
          </tr>
          <tr>
            <td>مــلــــــــحــوضـــة :</td>
            <td>اي كشط او تعديل يلغي هذا الارونيك </td>
          </tr>
        </tbody>
      </table>

      <div className={Styles.stamps}>
        <div>ختم الشركة</div>
        <div>التوقيع</div>
      </div>
    </div>
  );
});

export default ExtentionReportToPrint;
