/** @format */
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  ButtonGroup,
  Col,
  Container,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import { BsPrinter } from "react-icons/bs";
import UserForm from "../component/UserForm";
import { baseUrl } from "./_app";

const AddCar = () => {
  const router = useRouter();
  const [customer, setCustomer] = useState({
    bookType: "عادي",
    enteringType: "جديد",
  });
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (event) => {
    const { name, value } = event.target;

    // if (value.split(" ").length > 1) return;
    setCustomer((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    var eDate = new Date(
      `${customer.enteringMonth}/${customer.enteringDay}/${customer.enteringYear}`
    );
    axios({
      method: "post",
      url: `${baseUrl}/api/addCars`,
      data: {
        ...customer,
        enteringDate: `${customer.enteringMonth}/${customer.enteringYear}`,
        enteringDateBySec: eDate.getTime(),
        keywords: [
          customer.ownerSName.trim(),
          customer.ownerFName.trim(),
          customer.ownerTName.trim(),
          customer.ownerFoName.trim(),
          customer.chaseNum.trim(),
          customer.bookNum.trim(),
          customer.bookType,
          `${customer.enteringMonth}/${customer.enteringYear}`,
        ],
      },
    })
      .then(() => {
        setIsLoading(false);
        router.push("/CarDetail/" + customer.bookNum.trim());

        // setCar({});
      })
      .catch(setIsLoading(false));
  };
  useEffect(() => {
    console.log(customer);
  }, [customer]);

  return (
    <Container className="p-0 m-0">
      <Col className="header p-3">استمارة اضافة عميل</Col>
      <Col>
        <UserForm
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
