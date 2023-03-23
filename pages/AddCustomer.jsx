/** @format */
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { Col, Container } from "react-bootstrap";
import { toast } from "react-toastify";
import CustomerForm from "../component/CustomerForm";
import { AuthContext } from "../context/authContext";
import { baseUrl } from "./_app";

const AddCar = () => {
  const router = useRouter();
  const { user, hasAccess } = useContext(AuthContext);

  const [customer, setCustomer] = useState({
    bookType: "عادي",
    dest: "السعودية",
    enteringDate: 0,
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
      method: "POST",
      url: `${baseUrl}/api/customer`,
      data: {
        ...customer,
        enteringDate: new Date(0).toISOString().slice(0, 10),
      },
    })
      .then(() => {
        setIsLoading(false);
        toast.success("تمت الاضافة بنجاح !");
        router.push("/");
      })
      .catch((e) => setIsLoading(false));
  };
  useEffect(() => {
    console.log(customer);
  }, [customer]);
  if (!(user && hasAccess("AddCustomer")))
    return <h3>لا تملك صلاحية الوصول لهذه الصفحة</h3>;

  if (user && hasAccess("AddCustomer"))
    return (
      <>
        <Head>
          <title>اضافة عميل</title>
        </Head>
        <Container className="p-0">
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
      </>
    );
};
export default AddCar;
