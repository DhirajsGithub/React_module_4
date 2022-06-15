import React,{ useContext } from 'react';
import AuthContext from '../../store/auth-context';

import classes from './Navigation.module.css';

const Navigation = (props) => {
  const ctx = useContext(AuthContext)
  // using context using useContext react hook
  return(
    <nav className={classes.nav}>
      <ul>
        {ctx.isLoggedIn && (
          <li>
            <a href="/">Users</a>
          </li>
        )}
        {ctx.isLoggedIn && (
          <li>
            <a href="/">Admin</a>
          </li>
        )}
        {ctx.isLoggedIn && (
          <li>
          {/* triggering the Logout funtion from ctx  */}
            <button onClick={ctx.onLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  )

    // using context using .consumer
  // return (
  //   <AuthContext.Consumer>
  //   {/* the consumer takes a child which actually should be a function */}
  //   {/* if we are using .consumer with provider then there must be default value in the .provider component*/}
  //   {(ctx)=>{
  //     return (<nav className={classes.nav}>
  //     <ul>
  //       {ctx.isLoggedIn && (
  //         <li>
  //           <a href="/">Users</a>
  //         </li>
  //       )}
  //       {ctx.isLoggedIn && (
  //         <li>
  //           <a href="/">Admin</a>
  //         </li>
  //       )}
  //       {ctx.isLoggedIn && (
  //         <li>
  //           <button onClick={props.onLogout}>Logout</button>
  //         </li>
  //       )}
  //     </ul>
  //   </nav>)
  //   }}
   
  //   </AuthContext.Consumer> 
  // );


};

export default Navigation;
