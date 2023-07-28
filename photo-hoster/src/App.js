import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import UploadForm from "./UploadForm";
import ModerationScreen from "./ModerationScreen";

function App() {
  return (
    <Box sx={{ m: 4 }}>
      <Typography variant="h3" component="h1" align="center" gutterBottom>
        Photo Hoster
      </Typography>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Navigate replace to="/upload" />} />
          <Route path="/upload" element={<UploadForm />} />
          <Route path="/moderate/:id" element={<ModerationScreen />} />
        </Routes>
      </BrowserRouter>
    </Box>
  );
}

export default App;
