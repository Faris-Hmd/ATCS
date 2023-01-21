/** @format */
import formStyles from "../styles/Form.module.css";
import { useEffect, useState } from "react";
import { FaSearch, FaSpinner } from "react-icons/fa";
import { baseUrl } from "./_app";
import CarsList from "../component/CarsList";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

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
    <div className={"containe"}>
      <div className="header">
        <Form
          onSubmit={(e) => e.preventDefault()}
          className={formStyles.fillter}
        >
          <Container fluid>
            <Row>
              <Col xs={8}>
                <Form.Control
                  type="text"
                  name="keyword"
                  placeholder="ادخل الاسم, التاريخ, رقم الدفتر"
                  onChange={(e) => setKeyword(e.target.value)}
                  className="p-2"
                />
                <Button onClick={handleKeywordSearch}>
                  <FaSearch />
                </Button>
              </Col>
              <Col xs={4}>
                <Form.Select
                  className="p-2"
                  placeholder="الترتيب"
                  name="order"
                  onChange={(e) => setOrder(e.target.value)}
                >
                  <optgroup>
                    <option value="enteringDateBySec">تاريخ الدخول</option>
                    <option value="bookNumNo">رقم الدفتر</option>
                  </optgroup>
                  <optgroup>
                    <option value="enteringDateBySec">تاريخ الدخول</option>
                    <option value="bookNumNo">رقم الدفتر</option>
                  </optgroup>
                </Form.Select>
              </Col>
            </Row>
          </Container>
        </Form>
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
