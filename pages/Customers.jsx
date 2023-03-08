/** @format */
import formStyles from "../styles/Form.module.css";
import { useContext, useEffect, useRef, useState } from "react";
import { FaFilter, FaSearch } from "react-icons/fa";
import { baseUrl } from "./_app";
import CustomersList from "../component/CustomersList";
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
import { CustomerContext } from "../context/customersContext";
import { useReactToPrint } from "react-to-print";
import { useQuery } from "react-query";
import { BsPrinter } from "react-icons/bs";
import { AuthContext } from "../context/authContext";
import CustomerReport from "../component/CustomerReport";
import CustomersReport from "../component/CustomersReport";

const Customers = () => {
  const reportRef = useRef();

  const { user, hasAccess } = useContext(AuthContext);
  const { customers, setCustomers } = useContext(CustomerContext);
  const [startDate, setStartDate] = useState("2022-12-01");
  const [endDate, setEndDate] = useState("2022-12-31");
  const [repeatEntry, setRepeatEntry] = useState(true);
  const [state, setState] = useState("null");
  const [keyword, setKeyword] = useState("null");
  const [searchBy, setSearchBy] = useState("enteringDateBySec");
  const [show, setShow] = useState(false);
  const [isEnable, setIsEnable] = useState(false);

  const { data, isloading, error } = useQuery(
    "customers",
    async () =>
      await fetch(
        `${baseUrl}/api/getCustomers?startDate=${startDate}&&endDate=${endDate}&&repeatEntry=${repeatEntry}&&state=${state}&&searchBy=${searchBy}&&keyword=${keyword}`,
      ).then((res) => res.json()),
    { enabled: isEnable },
  );

  const handleFillterdSearch = (e) => {
    e.preventDefault();
    // setCustomers([]);
    setIsEnable(true);
  };

  const handlePrint = useReactToPrint({
    content: () => reportRef.current,
  });

  useEffect(() => {
    if (data) {
      setCustomers(data);
      setIsEnable(false);
    } else {
      setIsEnable(true);
    }
  }, [data]);
  useEffect(() => {
    if (state === "repeatEntry") setRepeatEntry(true);
  }, [state]);
  if (!(user && hasAccess("Customers")))
    return <h3>لا تملك صلاحية الوصول لهذه الصفحة</h3>;

  if (user && hasAccess("Customers"))
    return (
      <>
        <Modal show={show} onHide={() => setShow(false)} keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title>قائمة الفرز</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Label>الحالة</Form.Label>
            <Form.Select
              value={state}
              onChange={(e) => setState(e.target.value)}>
              <option value={"null"}>الكل</option>
              <option value="repeatEntry">دخول متكرر</option>
              <option value="لم يغادر">داخل البلاد</option>
              <option value="مخلص">مخلصين</option>
              <option value="غادر">مغادرين</option>
              <option value="مخالف">مخالفين</option>
            </Form.Select>
            <Form.Label>الدخول المتكرر</Form.Label>
            <Form.Select
              disabled={state === "repeatEntry" && true}
              value={repeatEntry}
              onChange={(e) => setRepeatEntry(e.target.value)}>
              <option value={true}>عرض</option>
              <option value={false}>اخفاء</option>
            </Form.Select>
            <Form.Label>الحصر حسب </Form.Label>
            <Form.Select
              value={searchBy}
              onChange={(e) => setSearchBy(e.target.value)}>
              <option value="enteringDateBySec">تاريخ الدخول</option>
              <option value="bookDateBySec">تاريخ الدفتر</option>
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
                    max="2023-03-31"
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
            <Button variant="secondary" onClick={() => setShow(false)}>
              إغلاق
            </Button>
            <Button
              variant="primary"
              onClick={(e) => {
                handleFillterdSearch(e);
                setKeyword(null);
                setShow(false);
              }}>
              بحث
            </Button>
          </Modal.Footer>
        </Modal>
        <Container className="h-100">
          <Row>
            <Col className="header p-3">سجلات العملاء</Col>
          </Row>
          <Row className="h-100">
            <Col lg={9}>
              <Container className="p-0 m-0 h-100">
                <Row>
                  <Form
                    onSubmit={handleFillterdSearch}
                    className={
                      formStyles.fillter +
                      " w-100 shadow p-2 rounded-bottom bg-clr "
                    }>
                    <InputGroup className="w-100 border overflow-hidden rounded">
                      <Button
                        variant="outline-secondary"
                        onClick={handleFillterdSearch}>
                        <FaSearch />
                      </Button>
                      <Button
                        variant="outline-secondary"
                        onClick={() => setShow(true)}>
                        <FaFilter />
                      </Button>
                      <Form.Control
                        type="text"
                        name="keyword"
                        placeholder="ادخل الاسم أو رقم الدفتر"
                        onChange={(e) => setKeyword(e.target.value)}
                        className="p-2 rounded border-0"
                      />
                      <Button variant="outline-secondary" onClick={handlePrint}>
                        <BsPrinter size={"22px"} />
                      </Button>
                    </InputGroup>
                  </Form>
                </Row>
                <Row className="h-100">
                  {customers.length > 0 ? (
                    <CustomersList customers={customers} />
                  ) : (
                    <Loading />
                  )}
                </Row>
              </Container>
            </Col>
          </Row>

          {/* <Col lg={3} className="bg-b">
          f
        </Col> */}
        </Container>
        {(state || state === "null") && (
          <div className="hidden">
            <CustomersReport
              state={state}
              startDate={startDate}
              endDate={endDate}
              customers={customers}
              ref={reportRef}
              repeatEntry={repeatEntry}
            />
          </div>
        )}
      </>
    );
};
export default Customers;
