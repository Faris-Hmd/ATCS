import { createContext, useState } from "react";

export const CustomerContext = createContext();
export const CustomerProvider = (props) => {
  const [customers, setCustomers] = useState([]);

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
