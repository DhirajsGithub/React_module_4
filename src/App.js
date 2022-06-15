import React, { useState, useEffect, useContext  } from 'react';
// import Login from './components/Login/Login';
import LoginUseReducer from './components/Login/LoginUseReducer';
import Home from './components/Home/Home';
import AuthContext from './store/auth-context';
import MainHeader from './components/MainHeader/MainHeader';


function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // const storedUserLoginInfo = localStorage.getItem('isLoggedIn');      // will return 1 or 0 or whatever we set as second argument in localStorage.setItem()
  // // if(storedUserLoginInfo){
  // //   setIsLoggedIn(true)          // we are only allowed to set state in function
  // // }
  // // this leads to infinite loop coz we check if this is store if isLoggedIn is stored then we set  it to true then the page will render again it will see if isLoggedIn is stored
  
  // // NOTE: first all app.js page will run then after code inside useEffect will run the state is being change then again whole page will rerender but the code inside useEffect will run only if dependencies changed
  // useEffect(()=>{
  //   console.log("Hi Iam useEffect you only see this message after certain dependencies get changedf")
  //    if(storedUserLoginInfo){
  //   setIsLoggedIn(true)
  // }
  // }, [])
  // // when the dependency array is empty? It simply means that the hook will only trigger once when the component is first rendered. So for example, for useEffect it means the callback will run once at the beginning of the lifecycle of the component and never again

  // const loginHandler = (email, password) => {
  //   // We should of course check email and password
  //   // But it's just a dummy/ demo anyways
  //   localStorage.setItem("isLoggedIn", "1")
  //   setIsLoggedIn(true);
    
  // };

  // const logoutHandler = () => {
  //   localStorage.removeItem("isLoggedIn")
  //   setIsLoggedIn(false);
  // };

  const ctx = useContext(AuthContext);

  return (
  //   // <React.Fragment>
  //   <AuthContext.Provider value={{ 
  //     isLoggedIn : isLoggedIn,  // from line 10
  //     onLogout : logoutHandler    // can also pass a functio with context 
  // }} >
  //     {/* <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} /> */}
  //     <MainHeader />
  //     <main>
  //       {!isLoggedIn && <LoginUseReducer onLogin={loginHandler} />}
  //       {isLoggedIn && <Home onLogout={logoutHandler} />}
  //     </main>
  //     </AuthContext.Provider>
  //   // </React.Fragment>
  <React.Fragment>
      <MainHeader />
      <main>
        {!ctx.isLoggedIn && <LoginUseReducer />}
        {ctx.isLoggedIn && <Home />}
      </main>
    </React.Fragment>
  );
}


// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const storedUserLoginInfo = localStorage.getItem('isLoggedIn');
//   // if(storedUserLoginInfo){
//   //   setIsLoggedIn(true)
//   // }
//   // this leads to infinite loop coz we check if this is store if isLoggedIn is stored then we set  it to true then the page will render again it will see if isLoggedIn is stored
  
//   // NOTE: first all app.js page will run then after code inside useEffect will run the state is being change then again whole page will rerender but the code inside useEffect will run only if dependencies changed
//   useEffect(()=>{
//     console.log("Hi Iam useEffect you only see this message after certain dependencies get changedf")
//      if(storedUserLoginInfo){
//     setIsLoggedIn(true)
//   }
//   }, [])
//   // when the dependency array is empty? It simply means that the hook will only trigger once when the component is first rendered. So for example, for useEffect it means the callback will run once at the beginning of the lifecycle of the component and never again

//   const loginHandler = (email, password) => {
//     // We should of course check email and password
//     // But it's just a dummy/ demo anyways
//     localStorage.setItem("isLoggedIn", "1")
//     setIsLoggedIn(true);
    
//   };

//   const logoutHandler = () => {
//     localStorage.removeItem("isLoggedIn")
//     setIsLoggedIn(false);
//   };

//   return (
//     // <React.Fragment>
//     <AuthContext.Provider value={{ 
//       isLoggedIn : isLoggedIn,  // from line 10
//       onLogout : logoutHandler    // can also pass a functio with context 
//   }} >
//       {/* <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} /> */}
//       <MainHeader />
//       <main>
//         {!isLoggedIn && <LoginUseReducer onLogin={loginHandler} />}
//         {isLoggedIn && <Home onLogout={logoutHandler} />}
//       </main>
//       </AuthContext.Provider>
//     // </React.Fragment>
//   );
// }

export default App;
