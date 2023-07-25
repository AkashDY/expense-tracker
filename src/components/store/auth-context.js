import React, { useState } from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  isProfileComplete: false,
  login: (token) => {},
  logout: () => {},
  completeProfile: () => {},
});

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem("token");
  const [token, setToken] = useState(initialToken);
  const [isProfileComplete, setIsProfileComplete] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  const userIsLoggedIn = !!token;

  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
  };

  const verifyEmailHandler = () => {
    setIsEmailVerified(true);
  };

  const logoutHandler = () => {
    setToken(null);
    setIsProfileComplete(false);
    localStorage.removeItem("token");
  };

  const completeProfileHandler = () => {
    setIsProfileComplete(true);
  };

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    isProfileComplete: isProfileComplete,
    login: loginHandler,
    logout: logoutHandler,
    completeProfile: completeProfileHandler,
    isEmailVerified: isEmailVerified,
    verifyEmail: verifyEmailHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
