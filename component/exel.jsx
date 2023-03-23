import React from "react";
import * as Filesever from "file-saver";
// import XLSX from "sheetjs-style";
import { Button } from "react-bootstrap";
import { BsFileExcel, BsFileExcelFill } from "react-icons/bs";
import { FaFileExcel } from "react-icons/fa";
function Exel({ exelData, state, startDate, endDate }) {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-f";
  const fileEx = ".xlsx";

  const fileName = function () {
    if (state === "لم يغادر" || state === "null")
      return "تقرير مركبات الافراج المؤقت";

    if (state === "repeatEntry") return "تقرير مركبات الدخول المتكرر ";

    if (state === "غادر") return "تقرير المركبات المغادرة ";

    if (state === "مخالف") return "تقرير المركبات المخالفة";

    if (state === "مخلص") return "تقرير المركبات المخلصة";

    if (state === "دخول جديد") return "تقرير المركبات الجديدة";

    if (state === "ممددين") return "تقرير المركبات الممددة";

    if (state === "مخالفة تمديد") return "تقرير المركبات مخالفة التمديد";

    if (state === "مغادر قريبا")
      return "تقرير المركبات المتبقي لها 15 يوم او اقل";

    if (state === "ممددين") return "تقرير المركبات الممددة";
  };

  const exData = exelData.map((customer, index) => {
    return {
      "#": index + 1,
      "رقم الدفتر": customer.carnetNo,
      "تاريخ الدفتر": customer.bookDate,
      "اسم العميل": `${customer.ownerFName} ${customer.ownerSName} ${
        customer.ownerTName
      } ${customer.ownerFoName && customer.ownerFoName}`,

      "رقم الهوية": customer.passport,
      "نوع المركبة": customer.carType + " " + customer.carModel,
      "رقم الهيكل": customer.chaseNum,
      "تاريح الدخول": customer.enteringDate,
      "نوع الدفتر": customer.bookType,
      "نوع الدخول": customer.repeatEntry ? "متكرر" : "جديد",
      الحالة: customer.state,
      "الوقت المتاح": customer.availableTime,
      "الوقت المقضي": customer.stayingTime,
    };
  });

  const exportToExel = async () => {
    const XLSX = await import("sheetjs-style");
    // console.log(exelData);
    const ws = XLSX.utils.json_to_sheet(exData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    console.log(wb);
    const exelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([exelBuffer], { type: fileType });
    Filesever.saveAs(
      data,
      fileName() + " من " + startDate + " الى " + endDate + fileEx,
    );
  };

  return (
    <Button
      onClick={exportToExel}
      className="bg-success w-50 align-items-center justify-content-between">
      صيغة Excel <FaFileExcel size={"20px"} />
    </Button>
  );
}

export default Exel;
