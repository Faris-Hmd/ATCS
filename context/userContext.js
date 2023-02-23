/** @format */
/** @format */
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [user, setUser] = useState(null);

  const setUserData = (user) => {
    // console.log(user);
    setUser({
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      password: user.password,
      userType: user.userType,
    });
  };

  //----------------------- SIGNOUT -----------------------
  const handleSignOut = async () => {
    const { auth } = await import("../firebase/firebase");
    console.log("from out");
    auth
      .signOut()
      .then(() => {
        setUser(null);
        sessionStorage.removeItem("user");
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    if (sessionStorage.getItem("user") !== null) {
      let u = sessionStorage.getItem("user");
      setUserData(JSON.parse(u));
    }
  }, []);
  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        handleSignOut,
      }}>
      {props.children}
    </UserContext.Provider>
  );
};
