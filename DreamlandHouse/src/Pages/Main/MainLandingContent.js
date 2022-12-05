import React from "react";
import { Box, Button, Container, styled, Typography } from "@mui/material";
import styles from "./MainLandingContent.module.css";

const CustomBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  gap: theme.spacing(5),
  alignItems: "center",
  marginTop: theme.spacing(5),
  paddingTop: theme.spacing(5),
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  },
}));

const Title = styled(Typography)(({ theme }) => ({
  fontSize: "64px",
  fontWeight: "bold",
  margin: theme.spacing(4, 0, 4, 0),
  [theme.breakpoints.down("sm")]: {
    fontSize: "40px",
  },
}));

export default function MainLandingContent() {
  return (
    <Box className={styles.mainbg}>
      <Container>
        <CustomBox>
          <Box sx={{ flex: "1.5" }}>
            <Typography
              variant="body2"
              sx={{
                fontSize: "18px",
                fontWeight: "500",
                mt: 10,
                mb: 4,
              }}
            >
              Welcome to the Dreamland Project
            </Typography>
            <Title variant="h1">Come home to a wonderful life.</Title>
            <Typography variant="body2" sx={{ fontSize: "18px", my: 4 }}>
              Dreamland Project paves the way for future-ready lifestyle that
              conviently connects you to places that matter!
            </Typography>
            <Button variant="contained" size="large">
              Learn More
            </Button>
          </Box>
          <Box sx={{ flex: "1.25" }}></Box>
        </CustomBox>
      </Container>
    </Box>
  );
}
