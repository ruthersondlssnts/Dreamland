import React from "react";
import { Box, Container, Typography } from "@mui/material";
import { styled } from "@mui/system";
import JoinWhy from "./JoinWhy";
import JoinForm from "./JoinForm";
import styles from "./index.module.css";

const CustomBox = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(10),
  alignItems: "center",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
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

const Join = () => {
  return (
    <>
      <Box className={styles.mainjoinbg}>
        <Container>
          <CustomBox>
            <Box sx={{ flex: "1.5" }}>
              <Title variant="h1" sx={{ mt: 12, mb: 2 }}>
                Join Our Team
              </Title>
              <Typography variant="body2" sx={{ fontSize: "18px", my: 4 }}>
                Help us on our quest to make the project even better
              </Typography>
              <JoinForm />
            </Box>
            <Box sx={{ flex: "1.25" }}></Box>
          </CustomBox>
        </Container>
      </Box>
      <JoinWhy />
    </>
  );
};

export default Join;
