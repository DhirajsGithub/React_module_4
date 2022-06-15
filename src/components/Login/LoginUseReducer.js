import React, { useState, useEffect, useReducer, useContext, useRef } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../../store/auth-context";
import Input from "../UI/Input/Input";

// All the data which will be required and used inside of the reducer function will be passed into this function when it's executed by React, automatically.
const emailReducer = (state, action) => {
  // handling the action cause by dispatchEmail fun
  if (action.type === "USER_INPUT") {
    // updating both validity and value whenever we receive user input action
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    // state is the snapshot when action.type === 'USER_INPUT' is hit or the previous value of the input
    return { value: state.value, isValid: state.value.includes("@") };
  }

  // initial state
  return { value: "", isValid: false };
};

const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: "", isValid: false };
};

const LoginUseReducer = (props) => {
  //   const [enteredEmail, setEnteredEmail] = useState('');
  //   const [emailIsValid, setEmailIsValid] = useState();
  //   const [enteredPassword, setEnteredPassword] = useState('');
  //   const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  //   isValid is set to null coz invalid property(we created) must not be apply initially without enterting any value
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  const autCtx = useContext(AuthContext);

  // optimising the useEffect hook
  //   whenever just the value changes and the validity did not change, this effect will not rerun.
  const { isValid: emailIsValided } = emailState; // we used an alias to pull out isValid as emailIsValided
  const { isValid: passwordIsValided = passwordState } = passwordState;
  // this can be used whenever some props changed

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("Checking form Validity");
      setFormIsValid(emailIsValided && passwordIsValided);
    }, 500);
    return () => {
      console.log("Clean Up");
      clearTimeout(identifier);
    };

    //   },[emailState, passwordState])
  }, [emailIsValided, passwordIsValided]);
  // if we had used emailState.isValid here then ANY property of emailState changes not just isValid effect function would re-run

  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);
    // dispatchEmail(someIdentifier, can be String, number often object is prefferred)
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });
    // val: event.target.value  --> payload

    // setFormIsValid(
    //   event.target.value.includes('@') && passwordState.isValid
    // );
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);

    dispatchPassword({ type: "USER_INPUT", val: event.target.value });

    // setFormIsValid(
    // //   event.target.value.trim().length > 6 && enteredEmail.includes('@')
    //   event.target.value.trim().length > 6 && emailState.isValid
    // );
  };

  const validateEmailHandler = () => {
    // we are setting the state based on the outdated state
    // we could use the functional form of setState but that is only valid for that state not other state
    // setEmailIsValid(emailState.isValid);
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchPassword({ type: "INPUT_BLUR" });
  };

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    if(formIsValid){
      // passing the value to onLogin
      autCtx.onLogin(emailState.value, passwordState.value);
    }else if(!emailIsValided){
      emailInputRef.current.focus();
    }else{
      passwordInputRef.current.focus();
    }
    
  };

 
  

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          id="email"
          label="E-Mail"
          type="email"
          isValid={emailIsValided}
          value={emailState.value}
          onBlur={validateEmailHandler}
          onChange={emailChangeHandler }
          ref={emailInputRef}
        />
        <Input
          id="password"
          label="Password"
          type="password"
          isValid={passwordIsValided}
          value={passwordState.value}
          onBlur={validatePasswordHandler}
          onChange={passwordChangeHandler }
          ref ={passwordInputRef }
        />
        
        <div className={classes.actions}>
          {/* <Button type="submit" className={classes.btn} disabled={!formIsValid}> */}
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default LoginUseReducer;

// when your state becomes more complex,
// bigger and combines multiple related states,
// useReducer can also be worth a closer look.

/*
useState() vs useReducer()
When using useState() becomes cumbersome or you're getting a lot of bugs/unintended behaviours

useState()
The main state management "tool"
Great for independent pieces of state/data
Great if state updates are easy and limited to a few kinds of updates


useReducer()
Great if you need "more power"
should be considered if you have related pieces of state/data
can be helpful if you have more complex state updates
 */
