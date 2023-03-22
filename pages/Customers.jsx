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
import { BsPrinter } from "react-icons/bs";
import { AuthContext } from "../context/authContext";
import CustomersReport from "../component/CustomersReport";
import { toast } from "react-toastify";
import Head from "next/head";
const Customers = () => {
  const reportRef = useRef();

  const { user, hasAccess } = useContext(AuthContext);
  const { customers, setCustomers } = useContext(CustomerContext);
  const [startDate, setStartDate] = useState("2022-11-21");
  const [endDate, setEndDate] = useState("2023-02-28");
  const [repeatEntry, setRepeatEntry] = useState(true);
  const [state, setState] = useState("null");
  const [keyword, setKeyword] = useState("null");
  const [searchBy, setSearchBy] = useState("enteringDateBySec");
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);
  const [isloading, setIsLoading] = useState(false);

  async function getCustomers() {
    toast.promise(
      fetch(
        `${baseUrl}/api/getCustomers?startDate=${startDate}&&endDate=${endDate}&&repeatEntry=${repeatEntry}&&state=${state}&&searchBy=${searchBy}&&keyword=${keyword}`,
      )
        .then((res) => {
          if (!res.ok) {
            setError(true);
            toast.error("حصل خطأ في العملية", { toastId: "errormsg" });
            return false;
          } else return res.json();
        })
        .then((data) => {
          data && (setCustomers(data), setError(false));
          setIsLoading(false);
        })
        .catch((e) => {
          setError(true);
          return e;
        }),
      {
        toastId: "msg",
        error: "حصل خطأ",
        pending: "جاري التحميل",
        success: "تم التحميل",
      },
    );
  }
  useEffect(() => {
    getCustomers();
  }, []);

  const handleFillterdSearch = (e) => {
    e.preventDefault();
    setCustomers([]);
    getCustomers();
  };

  const handlePrint = useReactToPrint({
    content: () => reportRef.current,
  });

  useEffect(() => {
    if (state === "repeatEntry") setRepeatEntry(true);
    if (state === "مخلص") setRepeatEntry(false);
    if (state === "دخول جديد") setSearchBy("bookDateBySec");
  }, [state]);
  if (!(user && hasAccess("Customers")))
    return <h3>لا تملك صلاحية الوصول لهذه الصفحة</h3>;

  if (user && hasAccess("Customers"))
    return (
      <>
        <Head>
          <title>بيانات العملاء</title>
        </Head>
        <Modal show={show} onHide={() => setShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>قائمة الفرز</Modal.Title>
          </Modal.Header>{" "}
          <Form
            onSubmit={(e) => {
              setKeyword("null");
              handleFillterdSearch(e);
              setShow(false);
            }}>
            <Modal.Body>
              <Form.Label>الحالة</Form.Label>
              <Form.Select
                value={state}
                onChange={(e) => setState(e.target.value)}>
                <option value={"null"}>الكل</option>
                <option value="دخول جديد">دخول جديد</option>
                <option value="لم يغادر">داخل البلاد</option>
                <option value="مخلص">مخلصين</option>
                <option value="غادر">مغادرين</option>
                <option value="ممددين">ممددين</option>
                <option value="مغادر قريبا"> متبقي 15 يوم او اقل </option>
                <option value="مخالفة تمديد">مخالفة تمديد </option>
                <option value="مخالف">مخالفين</option>
                <option value="repeatEntry">دخول متكرر</option>
              </Form.Select>
              <Form.Label>الدخول المتكرر</Form.Label>
              <Form.Select
                disabled={
                  state === "repeatEntry" ||
                  state === "مخلص" ||
                  state === "دخول جديد" ||
                  state === "مخالف"
                    ? true
                    : false
                }
                value={repeatEntry}
                onChange={(e) => setRepeatEntry(e.target.value)}>
                <option value={true}>عرض</option>
                <option value={false}>اخفاء</option>
              </Form.Select>
              <Form.Label>الحصر حسب </Form.Label>
              <Form.Select
                disabled={state === "دخول جديد" ? true : false}
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
                      min={startDate}
                      max="2023-03-31"
                      className="rounded"
                      value={startDate < endDate ? endDate : startDate}
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
              <Button variant="primary" type="submit">
                بحث
              </Button>
            </Modal.Footer>{" "}
          </Form>
        </Modal>
        <Container className="h-100 position-sticky">
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
                      " w-100 shadow p-2 rounded-bottom bg-clr position-sticky"
                    }>
                    <InputGroup className="w-100 border overflow-hidden rounded">
                      <Button
                        disabled={keyword === "null" || keyword === ""}
                        variant="outline-secondary"
                        onClick={(e) => {
                          handleFillterdSearch(e);
                        }}>
                        <FaSearch />
                      </Button>
                      <Button
                        variant="outline-secondary"
                        onClick={() => {
                          setShow(true);
                          setKeyword("null");
                        }}>
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
                  {isloading && <Loading />}
                  {error && <h2>error</h2>}
                  {!isloading && !error && (
                    <CustomersList customers={customers} />
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
