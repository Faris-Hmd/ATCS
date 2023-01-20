/** @format */

import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { BsPencil, BsPrinter, BsSave2 } from "react-icons/bs";
import { useReactToPrint } from "react-to-print";
import ExtentionReportToPrint from "../../component/ExtentionReportToPrint";
import LeftingReportToPrint from "../../component/LeftingReportToPrint";
import formStyles from "../../styles/Form.module.css";

import { baseUrl } from "../_app";
// import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
// import { db } from "../../firebase/firebase";
import UserForm from "../../component/Form";
import { FloatingLabel, Form } from "react-bootstrap";

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
  const handleChange = (event) => {
    const { name, value } = event.target;
    if (event.target.type === "checkbox") {
      setCar((prev) => {
        return { ...prev, [name]: event.target.checked };
      });
      return;
    }
    console.log([name], value);
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

  // useEffect(() => {
  //   const getdata = async () => {
  //     const data = await getDocs(collection(db, "cars"));
  //     const cars = data.docs.map((car) => {
  //       return { ...car.data() };
  //     });

  //   };
  //   getdata();
  // }, []);

  useEffect(() => {
    console.log(bookNum);
    fetch(baseUrl + "/api/getCar?bookNum=" + bookNum)
      .then((res) => res.json())
      .then((data) => {
        setCar(data);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <h2>Loading... </h2>;
  if (car)
    return (
      <div className={"contenier"}>
        <div className="header">
          <span>استمارة الافراج المؤقت</span>
          <span className="btn-con">
            {isEditing && (
              <div onClick={handleUpdate} className={"printBtn"}>
                <BsSave2 size={"22px"} />
                حفظ
              </div>
            )}
            {(car.threeMonthEx || car.sixMonthEx || car.leftEx) &&
              !isEditing && (
                <div onClick={handleExPrint} className={"printBtn"}>
                  <BsPrinter size={"22px"} />
                  تمديد
                </div>
              )}
            {car.state === "غادر" && !isEditing && (
              <div onClick={handleLeftPrint} className={"printBtn"}>
                <BsPrinter size={"22px"} />
                مغادرة
              </div>
            )}
            <div
              onClick={() => setIsEditing((prev) => !prev)}
              className={"printBtn"}
            >
              <BsPencil size={"22px"} />
              تعديل
            </div>
          </span>
        </div>
        <UserForm handleChange={handleChange} car={car} isEditing={isEditing}>
          <div className={formStyles.inputGroup}>
            <div className={formStyles.inputGroupLabel}>الاجرائات</div>
            <div className="mb-2">
              <label
                htmlFor="threeMonthEx"
                className={
                  car.threeMonthEx
                    ? formStyles.checkBoxChecked
                    : formStyles.checkBox
                }
              >
                تمديد الاول
              </label>
              <label
                htmlFor="sixMonthEx"
                className={
                  car.sixMonthEx
                    ? formStyles.checkBoxChecked
                    : formStyles.checkBox
                }
              >
                تمديد ثاني
              </label>
              <label
                htmlFor="leftMonthEx"
                className={
                  car.leftEx ? formStyles.checkBoxChecked : formStyles.checkBox
                }
              >
                تمديد مغادرة
              </label>
            </div>
            {car.threeMonthEx && (
              <Form.Group className="mb-2">
                <FloatingLabel
                  controlId="threeMonthExRec"
                  label="رقم ايصال التمديد الاول"
                >
                  <Form.Control
                    type="text"
                    value={car.threeMonthExRec}
                    placeholder="threeMonthExRec"
                    name="threeMonthExRec"
                    onChange={handleChange}
                    readOnly={!isEditing}
                    required
                  />
                </FloatingLabel>
              </Form.Group>
            )}
            {car.sixMonthEx && (
              <Form.Group className="mb-2">
                <FloatingLabel
                  controlId="sixMonthExRec"
                  label="رقم ايصال التمديد الثاني"
                >
                  <Form.Control
                    type="text"
                    value={car.sixMonthExRec}
                    placeholder="رقم ايصال التمديد الثاني"
                    name="sixMonthExRec"
                    onChange={handleChange}
                    readOnly={!isEditing}
                    required
                  />
                </FloatingLabel>
              </Form.Group>
            )}
            {car.leftEx && (
              <Form.Group className="mb-2">
                <FloatingLabel
                  controlId="leftExRec"
                  label="رقم ايصال تمديد المغادرة"
                >
                  <Form.Control
                    type="text"
                    value={car.leftExRec}
                    placeholder="رقم ايصال تمديد المغادرة"
                    name="leftEx"
                    onChange={handleChange}
                    readOnly={!isEditing}
                    required
                  />
                </FloatingLabel>
              </Form.Group>
            )}
            {car.state && (
              <Form.Group className="mb-2">
                <FloatingLabel controlId="state" label="الحالة">
                  <Form.Select
                    type="text"
                    value={car?.state}
                    placeholder="الحالة"
                    name="state"
                    onChange={handleChange}
                    disabled={!isEditing}
                    required
                  >
                    <option value="لم يغادر">لم يغادر</option>
                    <option value="غادر">غادر</option>
                  </Form.Select>
                </FloatingLabel>
              </Form.Group>
            )}{" "}
            {car.state === "غادر" && (
              <>
                <FloatingLabel
                  controlId="leftDay"
                  label="اليوم"
                  className={"w-30 mb-2"}
                >
                  <Form.Control
                    type="text"
                    value={car?.leftDay}
                    placeholder="اليوم"
                    name="leftDay"
                    onChange={handleChange}
                    readOnly={!isEditing}
                  />
                </FloatingLabel>
                <FloatingLabel
                  controlId="leftMonth"
                  label="الشهر"
                  className={"w-30 mb-2"}
                >
                  <Form.Control
                    type="text"
                    value={car?.leftMonth}
                    placeholder="الشهر"
                    name="leftMonth"
                    onChange={handleChange}
                    readOnly={!isEditing}
                  />
                </FloatingLabel>{" "}
                <FloatingLabel
                  controlId="leftYear"
                  label="السنة"
                  className={"w-30 mb-2"}
                >
                  <Form.Control
                    type="text"
                    value={car?.leftYear}
                    placeholder="السنة"
                    name="leftYear"
                    onChange={handleChange}
                    readOnly={!isEditing}
                  />
                </FloatingLabel>
              </>
            )}
            <Form.Group className="mb-2">
              <FloatingLabel controlId="isViolate" label="المخالفة">
                <Form.Select
                  type="text"
                  value={car?.isViolate}
                  placeholder="المخالفة"
                  name="isViolate"
                  onChange={handleChange}
                  disabled={!isEditing}
                >
                  <option value="غير مخالف">غير مخالف</option>
                  <option value="مخالف">مخالف</option>
                </Form.Select>
              </FloatingLabel>
            </Form.Group>
            <Form.Check
              style={{ display: "none" }}
              disabled={!isEditing}
              name={"threeMonthEx"}
              id={"threeMonthEx"}
              onChange={handleChange}
              checked={car.threeMonthEx}
              required
            />
            <Form.Check
              style={{ display: "none" }}
              disabled={!isEditing}
              name={"sixMonthEx"}
              id={"sixMonthEx"}
              checked={car.sixMonthEx}
              onChange={handleChange}
              required
            />
            <Form.Check
              style={{ display: "none" }}
              disabled={!isEditing}
              name={"leftEx"}
              id={"leftEx"}
              checked={car.leftEx}
              onChange={handleChange}
              required
            />
          </div>
        </UserForm>
        <div className="hidden">
          <LeftingReportToPrint ref={leftReportRef} value={car} />
          <ExtentionReportToPrint ref={exReportRef} value={car} />
        </div>
      </div>
    );
};

export default CarDetail;
