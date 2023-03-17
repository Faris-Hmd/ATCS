/** @format */
import React from "react";
import Styles from "../styles/report.module.css";

const CustomerReport = React.forwardRef(({ customer, reportType }, ref) => {
  const exDate = new Date(customer.threeMonthExDate);
  const eDate = new Date(customer.enteringDateBySec);
  if (!customer) return <div></div>;
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
          <div className={Styles.carnetNo}>
            رقم/ن/س/ر/ {customer.threeMonthExSerialNum}
          </div>
        </div>
        {reportType === "تمديد مغادرة" && (
          <div className={Styles.title}>تمديد مغادرة عربة افراج مؤقت</div>
        )}
        {reportType === "مغادرة" && (
          <div className={Styles.title}>خطاب مغادرة عربة افراج مؤقت</div>
        )}

        {reportType === "تمديد" && (
          <div className={Styles.title}>تمديد دفاتر المرور الجمركي</div>
        )}
        {reportType === "تخليص" && (
          <div className={Styles.title}>
            اورنيك تخليص مركبات دفاتر المرور الجمركي
          </div>
        )}
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
            <td>العــــــــــــــــــــنوان :</td>
            <td>{customer.ownerSdAddress}</td>
          </tr>
          <tr>
            <td>رقـــــم الهــــــاتف :</td>
            <td>{customer.ownerSdPhone1}</td>
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
            <td>{customer.carnetNo}</td>
          </tr>
          <tr>
            <td>التــــــــــــــــوصية :</td>
            {reportType === "تمديد" && (
              <td>
                لا مانع لدينا في تجديد لفترة {customer.threeMonthExDur} أخرى وفق
                النظام المعمول به.
              </td>
            )}
            {reportType === "مغادرة" && (
              <td>نوصي بالمغادرة فورا وفق النظام المعمول به.</td>
            )}

            {reportType === "تمديد مغادرة" && (
              <td>
                لا مانع لدينا لمنحه فترة سماح للمغادرة وفق النظام المعمول به.
              </td>
            )}

            {reportType === "تخليص" && (
              <td>لا مانع لدينا وفق النظام المعمول به.</td>
            )}
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

export default CustomerReport;
