/** @format */
import formStyles from "../styles/Form.module.css";
import { useEffect, useState } from "react";
import { FaSearch, FaSpinner } from "react-icons/fa";
import { baseUrl } from "./_app";
import CarsList from "../component/CarsList";

const Cars = () => {
  const [cars, setCars] = useState([]);
  const [keyword, setKeyword] = useState("1/2023");
  const [order, setOrder] = useState("enteringDateBySec");
  const [loading, setIsLoading] = useState(true);

  const getData = () => {
    console.log(order);
    setIsLoading(true);
    fetch(`${baseUrl}/api/getCars?q=${keyword}&&orderBy=${order}`)
      .then((res) => res.json())
      .then((data) => {
        setCars(data);
        setIsLoading(false);
      });
  };
  const handleKeywordSearch = (e) => {
    e.preventDefault();
    console.log(keyword);
    getData();
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
    getData();
  }, [order]);
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
          <select
            name="order"
            id=""
            className="bg-w"
            onChange={(e) => setOrder(e.target.value)}
          >
            <option value="enteringDateBySec">تاريخ الدخول</option>
            <option value="bookNumNo">رقم الدفتر</option>
          </select>
        </form>
      </div>
      {!loading ? (
        <CarsList cars={cars} />
      ) : (
        <h2>
          <FaSpinner size={"25px"} />
        </h2>
      )}
    </div>
  );
};
export default Cars;
