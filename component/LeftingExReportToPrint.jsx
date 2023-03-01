/** @format */
import React from "react";
import Styles from "../styles/report.module.css";

const LeftingExReportToPrint = React.forwardRef(({ customer }, ref) => {
  
  const exDate = new Date(customer.leftExDate);
  const eDate = new Date(customer.enteringDateBySec);

  return (
    <div className={Styles.printContainer} ref={ref}>
      <div className={Styles.header}>
        <div className={Styles.dateCon}>
          <div className={Styles.date}>
            التاريخ{" "}
            {exDate.getFullYear() +
              "/" +
              (exDate.getMonth() + 1) +
              "/" +
              exDate.getUTCDate()}
          </div>
          <div className={Styles.bookNum}>
            رقم/ن/س/ر/ {customer.leftExSerialNum}
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
              {customer.ownerFName} {customer.ownerSName} {customer.ownerTName}{" "}
              {customer.ownerFoName}
            </td>
          </tr>
          <tr>
            <td>رقـــــــم الجــــــواز :</td>

            <td>{customer.passport}</td>
          </tr>
          <tr>
            <td>العـــــــــــــــــــنوان :</td>
            <td>{customer.address}</td>
          </tr>
          <tr>
            <td>رقــــم الهــــــاتف :</td>
            <td>
              {customer.phone1} {customer.phone2}
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
            <td>{customer.carType}</td>
          </tr>
          <tr>
            <td>مـــوديل المركبة :</td>
            <td>{customer.carModel}</td>
          </tr>
          <tr>
            <td>رقــــــــم الـــهيكل :</td>
            <td>{customer.chaseNum}</td>
          </tr>
          <tr>
            <td>رقـــــــم اللـــــوحة :</td>
            <td>{customer.plateNum}</td>
          </tr>
          <tr>
            <td>رقـــــــم الـــدفـــتر :</td>
            <td>{customer.bookNum}</td>
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