import React from "react";
import Box from "@mui/material/Box";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import UploadForm from "./UploadForm";
import ModerationScreen from "./ModerationScreen";
import Header from "./Header";

function App() {
  return (
    <Box>
      <Header />
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
