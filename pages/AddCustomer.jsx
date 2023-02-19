/** @format */
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Col, Container } from "react-bootstrap";
import CustomerForm from "../component/CustomerForm";
import { baseUrl } from "./_app";

const AddCar = () => {
  const router = useRouter();
  const [customer, setCustomer] = useState({
    bookType: "عادي",
    dest: "السعودية",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setCustomer((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    axios({
      method: "post",
      url: `${baseUrl}/api/customer`,
      data: {
        ...customer,
      },
    })
      .then(() => {
        setIsLoading(false);
        router.push("/CustomerDetails/" + customer.bookNum.trim());

        // setCar({});
      })
      .catch((e) => setIsLoading(false));
  };
  useEffect(() => {
    console.log(customer);
  }, [customer]);

  return (
    <Container className="p-0 m-0">
      <Col className="header p-3">استمارة اضافة عميل</Col>
      <Col>
        <CustomerForm
          customer={customer}
          handleChange={handleChange}
          isEditing={true}
          isForm={true}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </Col>
    </Container>
  );
};
export default AddCar;
