/** @format */
import React, { useEffect, useState } from "react";
import styles from "../../styles/Cars.module.css";
const CarsReportToPrint = React.forwardRef((props, ref) => {
  const [cars, setCars] = useState({});
  console.log(cars);
  useEffect(() => {
    if (props.value) setCars(props.value);
  }, []);

  return (
    cars.length && (
      <table className={styles.table} style={{ direction: "rtl" }} ref={ref}>
        <thead>
          <tr>
            <th>#</th>
            <th className={styles.bookNum}>اسم العميل</th>
            <th>نوع السيارة</th>
            <th>رقم الشاسيه</th>
            <th>رقم الدفتر</th>
            <th>الدفتر</th>
            <th>الدخول</th>
            <th>الهاتف</th>
          </tr>
        </thead>
        <tbody className={styles.tableBody}>
          {cars.map((item, index) => {
            return (
              <tr className={styles.tableRow} key={index}>
                <td className={styles.index}>{1 + index}</td>
                <td className={styles.ownerName}>
                  {item.ownerFname + "  "}
                  {item.ownerSname + "  "}
                  {item.ownerTname + "  "}
                  {item.ownerFOname}
                </td>
                <td className={styles.bookNum}>{item.carType}</td>
                <td className={styles.bookNum}>{item.chaseNum}</td>

                <td className={styles.bookNum}>{item.bookNum}</td>
                <td className={styles.bookDate}>
                  {item.bookMonth}/{item.bookDay}/{item.bookYear}
                </td>
                <td className={styles.enteringDate}>
                  {item.enteringMonth}/{item.enteringDay}/{item.enteringYear}
                </td>
                <td className={styles.bookNum}>{item.phones}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    )
  );
});
export default CarsReportToPrint;
//  <div className={Styles.header}>
//  <div className={Styles.dateCon}>
//      <div className={Styles.date}>التاريخ  2022/1/8</div>
//      <div className={Styles.bookNum}>رقم/ن/س/ر/ 2022/157</div>
//  </div>
//  <div classNameName={Styles.title}>تمديد دفاتر المرور الجمركي</div>
//  <div className={Styles.for}>معنون للسيد / مدير ادارة مكافحة التهريب المحترم </div>
//  </div>
//  <div className={Styles.stamps}>
// <div>ختم الشركة</div>
// <div>التوقيع</div>
// </div>
{
  /* <tr> 
 <td>التوصية :</td>
<td>لامانع لدينا في تجديد لفترة ثلاثة شهور أخرى وفق النظام المعمول به.</td>
</tr>
<tr>
<td>ملحوضة :</td>
<td>اي كشط او تعديل يلغي هذا الارونيك </td>
</tr>   */
}
