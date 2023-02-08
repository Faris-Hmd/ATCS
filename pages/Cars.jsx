/** @format */
import formStyles from "../styles/Form.module.css";
import { useEffect, useState } from "react";
import { FaFilter, FaSearch } from "react-icons/fa";
import { baseUrl } from "./_app";
import CarsList from "../component/CarsList";
import {
  Button,
  Col,
  Container,
  Form,
  InputGroup,
  Modal,
  Row,
} from "react-bootstrap";
import Loading from "../component/Loading";

const Cars = () => {
  const [cars, setCars] = useState([]);
  const [keyword, setKeyword] = useState("1/2023");
  const [order, setOrderBy] = useState("enteringDateBySec");
  const [loading, setIsLoading] = useState(true);
  const [show, setShow] = useState(false);
  const getData = () => {
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
    getData();
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
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
    <>
      <Modal show={show} onHide={handleClose} keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>قائمة الفرز</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label className="p-2 w-50">الترتيب</Form.Label>
          <Form.Select onChange={(e) => setOrderBy(e.target.value)}>
            <option value="bookNumNo">برقم الدفتر</option>
            <option value="enteringDateBySec">بتاريخ الدخول</option>
          </Form.Select>
          <Form.Label className="p-2 w-50">الحالة</Form.Label>
          <Form.Select onChange={(e) => setKeyword(e.target.value)}>
            <option value="مخالف">مخالفين</option>
            <option value="مغادر">مغادرين</option>
          </Form.Select>
          <Form.Label className="p-2 w-50">من</Form.Label>
          <Form.Control
            type="date"
            name="keyword"
            className="p-2 w-50 rounded"
          />
          <Form.Label>الى</Form.Label>
          <Form.Control
            type="date"
            name="keyword"
            className="p-2 w-50
                      rounded"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            إغلاق
          </Button>
        </Modal.Footer>
      </Modal>
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
                  className={formStyles.fillter + " w-100"}>
                  <InputGroup>
                    <Button
                      variant="outline-secondary"
                      onClick={handleKeywordSearch}>
                      <FaSearch />
                    </Button>
                    <Button variant="outline-secondary " onClick={handleShow}>
                      <FaFilter />
                    </Button>

                    <Form.Control
                      type="text"
                      name="keyword"
                      placeholder="ادخل الاسم, التاريخ, رقم الدفتر"
                      onChange={(e) => setKeyword(e.target.value)}
                      className="p-2 rounded border-0"
                    />
                  </InputGroup>
                </Form>
              </Col>
            </Row>
          </Container>
        </Col>
        <Col className="text-center w-100">
          {!loading ? <CarsList cars={cars} /> : <Loading />}
        </Col>
      </Container>
    </>
  );
};
export default Cars;
