/** @format */

import { signInWithEmailAndPassword } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase";

export const AuthContext = createContext();

export const UserProvider = (props) => {
  const [user, setUser] = useState(null);

  function hasAccess(route) {
    // console.log(user);
    if (user.premessions.includes(route)) return true;
    else return false;
  }

  const setUserData = (user) => {
    setUser({
      premessions: user.premessions,
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

  useEffect(() => {
    if (user)
      signInWithEmailAndPassword(auth, user.email, user.password).then(
        (userCredential) => {
          console.log(userCredential);
          // handleGetUserData(userCredential.user);
        },
      );

  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        handleSignOut,
        hasAccess,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
};
