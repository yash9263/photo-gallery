import React from "react";
import "./LoginSnack.css";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";

function LoginSnack() {
  return (
    <div className="snack">
      <span className="snackIcon">
        <ErrorOutlineIcon />
      </span>
      <div className="snackMessage">Login to use this feature.</div>
    </div>
  );
}

export default LoginSnack;
