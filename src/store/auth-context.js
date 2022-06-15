import React, { useState, useEffect } from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin : (email, password)=>{}
});

export default AuthContext;

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const storedUserLoginInfo = localStorage.getItem('isLoggedIn');
  useEffect(()=>{
    console.log("Hi Iam useEffect you only see this message after certain dependencies get changedf")
     if(storedUserLoginInfo){
    setIsLoggedIn(true)
  }
  }, [])

  const loginHandler = (email, password) => {
    localStorage.setItem("isLoggedIn", "1");
    setIsLoggedIn(true);
  };
  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  return <AuthContext.Provider
  value={{ 
      isLoggedIn : isLoggedIn,  
      onLogout : logoutHandler,
      onLogin : loginHandler   
  }}
  >{props.children}</AuthContext.Provider>;
};

// import React from 'react';

// const AuthContext = React.createContext({
//     isLoggedIn : false,
//    onLogout: ()=>{}
// })

// export default AuthContext;
