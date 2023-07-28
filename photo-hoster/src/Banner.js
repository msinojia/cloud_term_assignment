import React from "react";
import MuiAlert from "@mui/material/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Banner({ open, handleClose, message }) {
  return (
    <Alert onClose={handleClose} open={open} severity="success">
      {message}
    </Alert>
  );
}

export default Banner;
