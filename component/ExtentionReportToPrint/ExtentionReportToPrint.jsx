/** @format */

import React, { useEffect, useState } from "react";
import Styles from "../../styles/report.module.css";
const ExtentionReportToPrint = React.forwardRef((props, ref) => {
  const [car, setCar] = useState({});

  useEffect(() => {
    console.log("from priny", props.value);
    if (props.value) setCar(props.value);
  }, []);

  return (
    <div className={Styles.printContainer} ref={ref}>
      <div className={Styles.header}>
        <div className={Styles.dateCon}>
          <div className={Styles.date}>التاريخ 2022/1/8</div>
          <div className={Styles.bookNum}>رقم/ن/س/ر/ 2022/157</div>
        </div>
        <div className={Styles.title}>تمديد دفاتر المرور الجمركي</div>
        <div className={Styles.for}>
          معنون للسيد / مدير ادارة مكافحة التهريب المحترم{" "}
        </div>
      </div>
      <table className={Styles.table}>
        <tbody>
          <tr>
            <td>اسم المالك :</td>
            <td>
              {car.ownerFName} {car.ownerSName} {car.ownerTName}{" "}
              {car.ownerFoName}
            </td>

          </tr>
          <tr>
            <td>رقم الجواز :</td>

            <td>{car.passport}</td>
          </tr>
          <tr>
            <td>العنوان :</td>
            <td>{car.address}</td>
          </tr>
          <tr>
            <td>رقم الهاتف :</td>
            <td>
              {car.phone1} {car.phone2}
            </td>
          </tr>
          <tr>
            <td>تاربخ الدخول :</td>
            <td>
              {car.enteringYear}/{car.enteringMonth}/{car.enteringDay}
            </td>
          </tr>
          <tr>
            <td>ماركة المركبة :</td>
            <td>{car.carModel}</td>
          </tr>
          <tr>
            <td>موديل المركبة :</td>

            <td>{car.carManDate}</td>
          </tr>
          <tr>
            <td>رقم الهيكل :</td>
            <td>{car.chaseNum}</td>
          </tr>
          <tr>
            <td>رقم اللوحة :</td>
            <td>{car.carPlate}</td>
          </tr>
          <tr>
            <td>رقم الدفتر :</td>
            <td>{car.bookNum}</td>
          </tr>
          <tr>
            <td>التوصية :</td>
            <td>
              لامانع لدينا في تجديد لفترة ثلاثة شهور أخرى وفق النظام المعمول به.
            </td>
          </tr>
          <tr>
            <td>ملحوضة :</td>
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
