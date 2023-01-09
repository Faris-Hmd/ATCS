/** @format */

import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { BsPrinter } from "react-icons/bs";
import { useReactToPrint } from "react-to-print";
import ExtentionReportToPrint from "../../component/ExtentionReportToPrint/ExtentionReportToPrint";
import Styles from "../../styles/report.module.css";
import ComponentToPrint from "../ToPrint/ToPrint";
import { baseUrl } from "../_app";

const CarDetail = () => {
  const [car, setCar] = useState({});
  const route = useRouter();
  const componentRef = useRef();
  const { bookNum } = route.query;

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  useEffect(() => {
    console.log(bookNum);
    fetch(baseUrl + "/api/getCar?bookNum=" + bookNum)
      .then((res) => res.json())
      .then((data) => setCar(data));
  }, []);
  useEffect(() => {
    console.log(car);
  }, [car]);
  return car.bookNum ? (
    <div className={Styles.container}>
      <div className="label">
        <span>تفاصيل المركبة</span>
        <span onClick={handlePrint} className={Styles.printBtn}>
          <BsPrinter size={"25px"} />
        </span>
      </div>
      <div className={Styles.side}>
        <div className="hidden">
          <ExtentionReportToPrint ref={componentRef} value={car} />
        </div>

        <table className={Styles.table}>
          <tbody>
            <tr>
              <td>اسم المالك :</td>
              <td>
                <input
                  type="text"
                  neme="carModel"
                  placeholder="الاول"
                  onChange={(e) =>
                    setCar((prev) => {
                      return { ...prev, ownerFName: e.target.value };
                    })
                  }
                  value={car?.ownerFName}
                />{" "}
                <input
                  type="text"
                  neme="carModel"
                  placeholder="الثاني"
                  onChange={(e) =>
                    setCar((prev) => {
                      return { ...prev, ownerSName: e.target.value };
                    })
                  }
                  value={car?.ownerSName}
                />{" "}
                <input
                  type="text"
                  neme="carModel"
                  placeholder="الثالث"
                  onChange={(e) =>
                    setCar((prev) => {
                      return { ...prev, ownerTName: e.target.value };
                    })
                  }
                  value={car.ownerTName}
                />{" "}
                <input
                  type="text"
                  neme="carModel"
                  placeholder="الرابع"
                  onChange={(e) =>
                    setCar((prev) => {
                      return { ...prev, ownerFOName: e.target.value };
                    })
                  }
                  value={car.ownerFOName}
                />
              </td>
            </tr>
            <tr>
              <td>رقم الجواز :</td>
              <td>
                <input
                  type="text"
                  neme="carModel"
                  placeholder="رقم الجواز"
                  onChange={(e) =>
                    setCar((prev) => {
                      return { ...prev, passport: e.target.value };
                    })
                  }
                  value={car?.passport}
                />
              </td>
            </tr>
            <tr>
              <td>العنوان :</td>
              <td>
                <input
                  type="text"
                  neme="carModel"
                  placeholder="العنوان"
                  onChange={(e) =>
                    setCar((prev) => {
                      return { ...prev, address: e.target.value };
                    })
                  }
                  value={car?.address}
                />
              </td>
            </tr>
            <tr>
              <td>رقم الهاتف :</td>
              <td>
                {" "}
                <input
                  type="text"
                  neme="carModel"
                  placeholder="رقم الهاتف"
                  onChange={(e) =>
                    setCar((prev) => {
                      return { ...prev, phone1: e.target.value };
                    })
                  }
                  value={car.phone1}
                />
              </td>
            </tr>
            <tr>
              <td>تاربخ الدخول :</td>
              <td>
                <input
                  type="text"
                  neme="carModel"
                  placeholder="اليوم"
                  onChange={(e) =>
                    setCar((prev) => {
                      return { ...prev, enteringDay: e.target.value };
                    })
                  }
                  value={car.enteringDay}
                />
                {"/"}
                <input
                  type="text"
                  neme="carModel"
                  placeholder="الشهر"
                  onChange={(e) =>
                    setCar((prev) => {
                      return { ...prev, enteringMonth: e.target.value };
                    })
                  }
                  value={car.enteringMonth}
                />
                {"/"}
                <input
                  type="text"
                  neme="carModel"
                  placeholder="السنة"
                  onChange={(e) =>
                    setCar((prev) => {
                      return { ...prev, enteringYear: e.target.value };
                    })
                  }
                  value={car.enteringYear}
                />
              </td>
            </tr>
            <tr>
              <td>ماركة المركبة :</td>
              <td>
                <input
                  type="text"
                  neme="carModel"
                  placeholder="ادخل ماركة المركبة"
                  onChange={(e) =>
                    setCar((prev) => {
                      return { ...prev, carType: e.target.value };
                    })
                  }
                  value={car.carType}
                />
              </td>
            </tr>
            <tr>
              <td>موديل المركبة :</td>
              <td>
                <input
                  type="text"
                  neme="carModel"
                  placeholder="موديل المركبة"
                  onChange={(e) =>
                    setCar((prev) => {
                      return { ...prev, carManDate: e.target.value };
                    })
                  }
                  value={car.carManDate}
                />
              </td>
            </tr>
            <tr>
              <td>رقم الهيكل :</td>
              <td>
                <input
                  type="text"
                  neme="carModel"
                  placeholder="موديل المركبة"
                  onChange={(e) =>
                    setCar((prev) => {
                      return { ...prev, chaseNum: e.target.value };
                    })
                  }
                  value={car.chaseNum}
                />
              </td>
            </tr>
            <tr>
              <td>رقم اللوحة :</td>
              <td>
                {" "}
                <input
                  type="text"
                  neme="carPlate"
                  placeholder="ادخل رقم اللوحة"
                  onChange={(e) =>
                    setCar((prev) => {
                      return { ...prev, carPlate: e.target.value };
                    })
                  }
                  value={car?.carPlate}
                />
              </td>
            </tr>
            <tr>
              <td>رقم الدفتر :</td>
              <td>
                <input
                  type="text"
                  neme="carPlate"
                  placeholder="رقم الدفتر"
                  onChange={(e) =>
                    setCar((prev) => {
                      return { ...prev, bookNum: e.target.value };
                    })
                  }
                  value={car?.bookNum}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  ) : (
    <h2>Loading</h2>
  );
};

export default CarDetail;
