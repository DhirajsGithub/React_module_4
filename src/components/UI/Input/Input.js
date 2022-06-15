import React,{useRef, useImperativeHandle} from 'react'
import classes from './Input.module.css'

// const Input = (props) => {
const Input = React.forwardRef((props, ref) => {
    // we can accept refs as argument if a ref should be set from outside
    // we need to wrap and export our component in sepcail way

    const inputRef = useRef();

    const activate = () => {
        inputRef.current.focus();
      };

      useImperativeHandle(ref, () => {
          // to establish the connection from outside first arument is ref which is taken as argument 
        // which value should be accessible from outside through that name
        return {
          focus: activate,
        };
      });

  return (
    <div
    className={`${classes.control} ${
      props.isValid === false ? classes.invalid : ''
    }`}
  >
    <label htmlFor={props.id}>{props.label}</label>
    <input
      ref={inputRef}
      type={props.type}
      id={props.id}
      value={props.value}
      onChange={props.onChange}
      // The onblur attribute fires the moment that the element loses focus. Onblur is most often used with form validation code (e.g. when the user leaves a form field).
      onBlur={props.onBlur}
    />
  </div>
  )
})

export default Input