/** @format */
import formStyles from "../styles/Form.module.css";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { baseUrl } from "./_app";
import CarsList from "../component/CarsList";
import {
  Col,
  Container,
  Dropdown,
  Form,
  InputGroup,
  Row,
  Spinner,
  SplitButton,
} from "react-bootstrap";

const Cars = () => {
  const [cars, setCars] = useState([]);
  const [keyword, setKeyword] = useState("1/2023");
  const [order, setOrderBy] = useState("enteringDateBySec");
  const [loading, setIsLoading] = useState(true);

  const getData = () => {
    // console.log(order);
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
    // console.log(keyword);
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
    // updateIsVio();
  }, [cars]);
  useEffect(() => {
    getData();
    // updateIsVio();
  }, [order]);
  return (
    <Container className="m-0 p-0">
      <Col className="header">
        <Container>
          <Row>
            <Col className="pb-1" xs={12}>
              <span>
                <h4>سجلات العملاء</h4>
              </span>
            </Col>
            <Col xs={12} className="d-flex justify-content-center m-1">
              <Form
                onSubmit={(e) => e.preventDefault()}
                className={formStyles.fillter + " w-100"}
              >
                <InputGroup>
                  <SplitButton
                    variant="outline-secondary"
                    onClick={handleKeywordSearch}
                    title={<FaSearch size={"22px"} />}
                  >
                    <Dropdown.Item
                      onClick={(e) => setOrderBy("enteringDateBySec")}
                      href="#"
                    >
                      تاريخ الدخول
                    </Dropdown.Item>
                    <Dropdown.Item onClick={(e) => setOrderBy("bookNumNo")}>
                      رقم الدفتر
                    </Dropdown.Item>
                  </SplitButton>
                  <Form.Control
                    type="text"
                    name="keyword"
                    placeholder="ادخل الاسم, التاريخ, رقم الدفتر"
                    onChange={(e) => setKeyword(e.target.value)}
                    className="p-2
                      rounded border-0"
                  />
                </InputGroup>
              </Form>
            </Col>
          </Row>
        </Container>
      </Col>
      <Col className="text-center w-100">
        {!loading ? <CarsList cars={cars} /> : <Spinner size={"25px"} />}
      </Col>
    </Container>
  );
};
export default Cars;
