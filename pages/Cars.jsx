/** @format */
import formStyles from "../styles/Form.module.css";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { baseUrl } from "./_app";
import CarsList from "../component/CarsList";

const Cars = () => {
  const [cars, setCars] = useState([]);
  const [keyword, setKeyword] = useState([]);

  const handleKeywordSearch = (e) => {
    e.preventDefault();
    console.log(keyword);
    fetch(`${baseUrl}/api/getCars?q=${keyword}`)
      .then((res) => res.json())
      .then((data) => setCars(data));
  };
  const getDate = () => {
    fetch(`${baseUrl}/api/getCars?q=1/2023`)
      .then((res) => res.json())
      .then((data) => setCars(data));
  };
  // const handlethreeMonthExUpdate = async (car) => {
  //   await updateDoc(doc(db, "cars", car.bookNum), {
  //     threeMonthEx: !car.threeMonthEx,
  //   });
  //   getDate();
  // };
  // const handleSixMonthExUpdate = async (car) => {
  //   await updateDoc(doc(db, "cars", car.bookNum), {
  //     sixMonthEx: !car.sixMonthEx,
  //   });
  //   getDate();
  // };
  // const handleLeftExUpdate = async (car) => {
  //   await updateDoc(doc(db, "cars", car.bookNum), {
  //     leftEx: !car.leftEx,
  //   });
  //   getDate();
  // };

  useEffect(() => {
    getDate();
  }, []);

  return (
    <div className={"contenier"}>
      <div className="header">
        <form
          onSubmit={(e) => e.preventDefault()}
          className={formStyles.fillter}
        >
          <input
            type="text"
            name="keyword"
            placeholder="ادخل الاسم او التاريخ او رقم الدفتر"
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button onClick={handleKeywordSearch}>
            <FaSearch />
          </button>
        </form>
      </div>
      <CarsList cars={cars} />
    </div>
  );
};
export default Cars;
