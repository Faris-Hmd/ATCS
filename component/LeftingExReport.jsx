/** @format */
import React from "react";
import Styles from "../styles/report.module.css";

const LeftingExReportToPrint = React.forwardRef((props, ref) => {
  const date = new Date();
  const eDate = new Date(props.value.enteringDateBySec);

  return (
    <div className={Styles.printContainer} ref={ref}>
      <div className={Styles.header}>
        <div className={Styles.dateCon}>
          <div className={Styles.date}>
            التاريخ{" "}
            {date.getFullYear() +
              "/" +
              (date.getMonth() + 1) +
              "/" +
              date.getUTCDate()}
          </div>
          <div className={Styles.bookNum}>
            رقم/ن/س/ر/ {props.value.leftExSerialNum}
          </div>
        </div>
        <div className={Styles.title}>تمديد مغادرة عربة افراج مؤقت</div>
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
              {props.value.ownerFName} {props.value.ownerSName}{" "}
              {props.value.ownerTName} {props.value.ownerFoName}
            </td>
          </tr>
          <tr>
            <td>رقـــــــم الجــــــواز :</td>

            <td>{props.value.passport}</td>
          </tr>
          <tr>
            <td>العـــــــــــــــــــنوان :</td>
            <td>{props.value.address}</td>
          </tr>
          <tr>
            <td>رقــــم الهــــــاتف :</td>
            <td>
              {props.value.phone1} {props.value.phone2}
            </td>
          </tr>
          <tr>
            <td>تــاربخ الـــــدخول :</td>
            <td>
              {eDate.getFullYear() +
                "/" +
                (eDate.getMonth() + 1) +
                "/" +
                eDate.getUTCDate()}
            </td>
          </tr>
          <tr>
            <td>مـــاركة الــمركبة :</td>
            <td>{props.value.carType}</td>
          </tr>
          <tr>
            <td>مـــوديل المركبة :</td>
            <td>{props.value.carModel}</td>
          </tr>
          <tr>
            <td>رقــــــــم الـــهيكل :</td>
            <td>{props.value.chaseNum}</td>
          </tr>
          <tr>
            <td>رقـــــــم اللـــــوحة :</td>
            <td>{props.value.plateNum}</td>
          </tr>
          <tr>
            <td>رقـــــــم الـــدفـــتر :</td>
            <td>{props.value.bookNum}</td>
          </tr>
          <tr>
            <td>التــــــــــــــــوصية :</td>
            <td>
              لا مانع لدينا لمنحه فترة سماح للمغادرة وفق النظام المعمول به.
            </td>
          </tr>
          <tr>
            <td>مــلــــــــحــوضـــة :</td>
            <td>اي كشط او تعديل يلغي هذا الارونيك. </td>
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

export default LeftingExReportToPrint;
