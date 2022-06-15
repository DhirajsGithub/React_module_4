import React, { useState, useEffect } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';


const Login = (props) => {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  // useEffect(()=>{
  //   console.log("Hi Iam useEffect you only see this message after certain dependencies get changed, here at every keystroke of password and email")
  //     setFormIsValid(
  //     enteredEmail.includes('@') && enteredPassword.trim().length > 6
  //   );
  // },[enteredEmail, enteredPassword])
  // NOTE: we don't need the side effect at every key stroke instead we need a Debouncing 
  // coz sometimes while sending https request it will genereate some unusual traffic
  useEffect(()=>{
    const identifier = setTimeout(()=>{
      console.log("Checking form Validity")
      setFormIsValid(
      enteredEmail.includes('@') && enteredPassword.trim().length > 6
    );
    }, 500)

    // useEffect also return a function 
    // this function will be triggle first than identifier funtion or any other above funtion which is not returning 
    // with no dependencies the clean up funtion only run when the component is removed from the dom
    return ()=>{
      console.log("Clean Up");
      clearTimeout(identifier);
    }
    
  },[enteredEmail, enteredPassword])

//   // this will run after every state change or after every rerendering of the page
// //   this effect function
// // runs after every component render cycle.
// // Not before it and not during it, but after it.
// // Including the first time this component was mounted.
//   useEffect(()=>{
//     console.log("Effect Running without dependencies")
//   })

//   // Now this function here, only executes for the first time this component was mounted and rendered,
//   useEffect(()=>{
//     console.log("Effect Running with empty dependencies")
//   },[])
//   // this will run at every key stroke in the password as we didn't use debouncing over there
//   useEffect(()=>{
//     console.log("Effect Running with only enteredPassword dependencies and without debounging")
//   },[enteredPassword])

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);

    // setFormIsValid(
    //   event.target.value.includes('@') && enteredPassword.trim().length > 6
    // );
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);

    // setFormIsValid(
    //   event.target.value.trim().length > 6 && enteredEmail.includes('@')
    // );
  };

  const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.includes('@'));
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(enteredEmail, enteredPassword);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;


// useEffect in general, is a super important hook
// that helps you deal with code
// that should be executed in response to something.
// And something could be the component being loaded.
// It could be the email address being updated.
// It could be anything, whenever you have an action
// that should be executed in response to some other action,
// that is a side effect
// and that is where a useEffect is able to help you.
// You must add all "things" you use in your effect function if those "things" could change because your component (or some parent component) re-rendered. 