import React from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";

function landing() {
  if (window.location.pathname !== "/") {
    window.location.href = "/";
  }
}

const Header = () => {
  return (
    <AppBar position="static" sx={{ marginBottom: "1em" }}>
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
      </Toolbar>
    </AppBar>
  );
};

export default Header;
