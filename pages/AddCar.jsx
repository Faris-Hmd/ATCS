/** @format */
import axios from "axios";
import { useEffect, useState } from "react";
import UserForm from "../component/Form";
import { baseUrl } from "./_app";

const AddCar = () => {
  const [car, setCar] = useState({
    bookType: "عادي",
    enteringType: "جديد",
  });
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (event) => {
    const { name, value } = event.target;
    if (value.split(" ").length > 1) return;
    setCar((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
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
        ],
      },
    })
      .then(() => {
        setIsLoading(false);
        setCar({});
      })
      .catch(setIsLoading(false));
  };
  // useEffect(() => {
  //   console.log(car);
  // }, [car]);

  return (
    <div className={"containe"}>
      <div className="header">استمارة الافراج المؤقت</div>
      <UserForm car={car} handleChange={handleChange} isEditing={true} />
    </div>
  );
};
export default AddCar;
