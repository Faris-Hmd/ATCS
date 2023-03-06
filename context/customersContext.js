import { createContext, useState } from "react";

export const CustomerContext = createContext();
export const CustomerProvider = (props) => {
  const [customers, setCustomers] = useState([]);
console.log(customers.length);
  return (
    <CustomerContext.Provider
      value={{
        customers,
        setCustomers,
      }}>
      {props.children}
    </CustomerContext.Provider>
  );
};
