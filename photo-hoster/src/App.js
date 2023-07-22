import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Banner from "./Banner";
import UploadForm from "./UploadForm";

function App() {
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setUploadSuccess(false);
  };

  return (
    <Box sx={{ m: 4 }}>
      <Typography variant="h3" component="h1" align="center" gutterBottom>
        Photo Hoster
      </Typography>
      <UploadForm setUploadSuccess={setUploadSuccess} />
      {uploadSuccess && (
        <Banner open={uploadSuccess} handleClose={handleClose} />
      )}
    </Box>
  );
}

export default App;
