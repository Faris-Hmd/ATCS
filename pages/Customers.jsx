/** @format */
import formStyles from "../styles/Form.module.css";
import { useEffect, useState } from "react";
import { FaFilter, FaSearch } from "react-icons/fa";
import { baseUrl } from "./_app";
import CarsList from "../component/CustomersList";
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
  const [customers, setCustomers] = useState([]);
  const [startDate, setStartDate] = useState("2022-12-01");
  const [endDate, setEndDate] = useState("2023-01-31");
  const [repeatEntry, setRepeatEntry] = useState(false);
  const [isViolate, setIsViolate] = useState("غير مخالف");
  const [state, setState] = useState("لم يغادر");
  const [keyword, setKeyword] = useState();
  const [searchBy, setSearchBy] = useState("enteringDateBySec");
  const [order, setOrderBy] = useState("enteringDateBySec");
  const [loading, setIsLoading] = useState(true);
  const [show, setShow] = useState(false);
  const getData = () => {
    setIsLoading(true);
    fetch(
      `${baseUrl}/api/getCustomers?isViolate=${isViolate}&&orderBy=${order}&&startDate=${startDate}&&endDate=${endDate}&&repeatEntry=${repeatEntry}&&state=${state}&&searchBy=${searchBy}`,
    )
      .then((res) => res.json())
      .then((data) => {
        setCustomers(data);
        setIsLoading(false);
      });
  };
  const handleFillterdSearch = (e) => {
    e.preventDefault();
    getData();
  };

  const handleKeywordSearch = (e) => {
    e.preventDefault();
    fetch(`${baseUrl}/api/byKey?keyword=${keyword}`)
      .then((res) => res.json())
      .then((data) => {
        setCustomers(data);
        setIsLoading(false);
      });
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <Modal show={show} onHide={handleClose} keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>قائمة الفرز</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label className=" w-50">الترتيب</Form.Label>
          <Form.Select
            value={order}
            onChange={(e) => setOrderBy(e.target.value)}>
            <option value="bookByDateBySec">بتاريخ الدفتر</option>
            <option value="enteringDateBySec">بتاريخ الدخول</option>
          </Form.Select>
          <Form.Label className=" w-50">الحالة</Form.Label>
          <Form.Select
            value={isViolate}
            onChange={(e) => setState(e.target.value)}>
            <option value="لم يغادر">غير مغادرين</option>
            <option value="غادر">مغادرين</option>
          </Form.Select>
          <Form.Label className=" w-50">المخالفة</Form.Label>
          <Form.Select
            value={isViolate}
            onChange={(e) => setIsViolate(e.target.value)}>
            <option value="مخالف">مخالفين</option>
            <option value="غير مخالف">غير مخالفين</option>
          </Form.Select>
          <Form.Label className=" w-50">الدخول المتكرر</Form.Label>
          <Form.Select
            value={repeatEntry}
            onChange={(e) => setRepeatEntry(e.target.value)}>
            <option value={true}>عرض</option>
            <option value={false}>اخفاء</option>
          </Form.Select>
          <Form.Label className=" w-50">الحصر حسب </Form.Label>
          <Form.Select
            value={searchBy}
            onChange={(e) => setSearchBy(e.target.value)}>
            <option value="enteringDateBySec">تاريخ الدخول</option>
            <option value="bookByDateBySec">تاريخ الدفتر</option>
          </Form.Select>
          <Container className="p-0">
            <Row>
              <Col>
                <Form.Label>من</Form.Label>
                <Form.Control
                  type="date"
                  name="keyword"
                  className="rounded"
                  min="2021-07-01"
                  max="2023-03-10"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </Col>
              <Col>
                <Form.Label>الى</Form.Label>
                <Form.Control
                  type="date"
                  name="keyword"
                  min="2021-07-01"
                  max="2023-02-10"
                  defaultValue="2014-02-09"
                  className="rounded"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            إغلاق
          </Button>
          <Button variant="primary" onClick={handleFillterdSearch}>
            بحث
          </Button>
        </Modal.Footer>
      </Modal>
      <Container className="m-0 p-0 h-100">
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
        <Col className="text-center  h-100">
          {!loading ? <CarsList customers={customers} /> : <Loading />}
        </Col>
      </Container>
    </>
  );
};
export default Cars;
