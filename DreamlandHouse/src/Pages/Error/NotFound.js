import React from "react";
import { alpha, Box, Button, Link, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { APARTMENTS_PATH } from "../../constants/Constants";
import { useNavigate } from "react-router-dom";

const primary = grey[300]; // #f44336

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundImage: `url(${APARTMENTS_PATH}a146.jpg)`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        boxShadow: "inset 0 0 0 2000px " + alpha(primary, 0.9),
      }}
    >
      <Typography
        variant="h1"
        sx={{ color: grey[900], fontSize: { md: "10vw", xs: "none" } }}
      >
        404
      </Typography>
      <Typography variant="h6" style={{ color: grey[900] }}>
        The page you’re looking for doesn’t exist.
      </Typography>
      <Button variant="contained" sx={{ mt: 3 }} onClick={() => navigate("/")}>
        Back Home
      </Button>
    </Box>
  );
}
