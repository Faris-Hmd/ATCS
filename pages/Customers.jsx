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
    return <h3>???? ???????? ???????????? ???????????? ???????? ????????????</h3>;

  if (user && hasAccess("Customers"))
    return (
      <>
        <Modal show={show} onHide={() => setShow(false)} keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title>?????????? ??????????</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Label>????????????</Form.Label>
            <Form.Select
              value={state}
              onChange={(e) => setState(e.target.value)}>
              <option value={"null"}>????????</option>
              <option value="repeatEntry">???????? ??????????</option>
              <option value="???? ??????????">???????? ????????????</option>
              <option value="????????">????????????</option>
              <option value="????????">??????????????</option>
              <option value="??????????">??????????????</option>
            </Form.Select>
            <Form.Label>???????????? ??????????????</Form.Label>
            <Form.Select
              disabled={state === "repeatEntry" && true}
              value={repeatEntry}
              onChange={(e) => setRepeatEntry(e.target.value)}>
              <option value={true}>??????</option>
              <option value={false}>??????????</option>
            </Form.Select>
            <Form.Label>?????????? ?????? </Form.Label>
            <Form.Select
              value={searchBy}
              onChange={(e) => setSearchBy(e.target.value)}>
              <option value="enteringDateBySec">?????????? ????????????</option>
              <option value="bookDateBySec">?????????? ????????????</option>
            </Form.Select>
            <Container className="p-0">
              <Row>
                <Col>
                  <Form.Label>????</Form.Label>
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
                  <Form.Label>??????</Form.Label>
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
              ??????????
            </Button>
            <Button
              variant="primary"
              onClick={(e) => {
                handleFillterdSearch(e);
                setKeyword(null);
                setShow(false);
              }}>
              ??????
            </Button>
          </Modal.Footer>
        </Modal>
        <Container className="h-100">
          <Row>
            <Col className="header p-3">?????????? ??????????????</Col>
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
                        placeholder="???????? ?????????? ???? ?????? ????????????"
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
