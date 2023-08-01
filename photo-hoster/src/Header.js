import React from "react";
import { AppBar, Toolbar, Typography, Box, IconButton } from "@mui/material";
import UploadIcon from "@mui/icons-material/FileUpload";

function landing() {
  if (window.location.pathname !== "/") {
    window.location.href = "/";
  }
}

function goToUpload() {
  if (window.location.pathname !== "/upload") {
    window.location.href = "/upload";
  }
}

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: "center" }}>
        {/* Branding */}
        <button
          style={{
            background: "none",
            border: "none",
            padding: "0",
            cursor: "pointer",
          }}
          onClick={landing}
        >
          <Box
            sx={{
              flexGrow: 1,
              display: "inline-block",
              borderRadius: "5px",
              padding: "4px 8px",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
              background: "linear-gradient(45deg, #42a5f5 30%, #80d6ff 90%)",
              border: "2px solid #1e88e5",
              "&:hover": {
                background: "linear-gradient(45deg, #80d6ff 30%, #42a5f5 90%)",
              },
            }}
          >
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontFamily: "Arial, sans-serif",
                fontWeight: "bold",
                fontSize: "24px",
                color: "#FFFFFF",
                textAlign: "center",
              }}
            >
              <span style={{ color: "#03045E" }}>Photo</span>
              <span style={{ color: "#E3DFFD" }}>Hoster</span>
            </Typography>
          </Box>
        </button>
        {/* Upload button */}
        <IconButton
          sx={{ justifyContent: "center" }}
          color="inherit"
          onClick={goToUpload}
        >
          <UploadIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
