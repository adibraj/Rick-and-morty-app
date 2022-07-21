import { Box, Paper } from "@mui/material";
import React from "react";

const Header = () => {
  return (
    <Paper
      elevation={6}
      sx={{
        height: "60px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          padding: 1,
          display: "flex",
          position: "relative",
          width: "100%",
        }}
        maxWidth="xl"
      >
        <img
          src="/assets/rick-logo.jpg"
          alt="logo"
          style={{
            width: "300px",
            borderRadius: 10,
          }}
        />
      </Box>
    </Paper>
  );
};

export default Header;
