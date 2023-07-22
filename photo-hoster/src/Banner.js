import React from "react";
import Alert from "@mui/material/Alert";

const Banner = ({ open, handleClose }) => (
  <Alert severity="success" onClose={handleClose} open={open}>
    Photo uploaded successfully!
  </Alert>
);

export default Banner;
