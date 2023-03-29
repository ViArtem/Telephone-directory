import React from "react";
import classes from "./Photo.module.css";

const Photo = ({ children, ...props }) => (
  <div className={classes.photo}>{children}</div>
);

export default Photo;
