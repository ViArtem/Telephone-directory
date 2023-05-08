import React from "react";
import classes from "./MyInputNumber.module.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
const MyInputNumber = React.forwardRef((props, ref) => (
  <PhoneInput
    // className={props.className ? props.className : classes.myInput}
    inputProps={{
      ...props,
    }}
    value={props.value}
    ref={ref}
  />
));

export default MyInputNumber;
