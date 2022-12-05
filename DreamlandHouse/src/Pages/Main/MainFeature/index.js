import { Box, Container, styled, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";
import FeatureSwiper from "./FeatureSwiper";

const PropertiesTextBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    textAlign: "center",
  },
}));

const CustomContainer = styled(Container)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    paddingBottom: 50,
  },
}));

export default function MainFeature() {
  return (
    <Box sx={{ mt: 5, backgroundColor: grey[900], py: 10 }}>
      <CustomContainer>
        <PropertiesTextBox>
          <Typography
            sx={{ color: "white", fontSize: "35px", fontWeight: "bold" }}
          >
            Featured Projects
          </Typography>
          <Typography sx={{ fontSize: "16px", mt: 1, color: "white" }}>
            Explore the best off plan investment opportunities and new to market
            project launches.
          </Typography>
        </PropertiesTextBox>
      </CustomContainer>
      <FeatureSwiper />
    </Box>
  );
}
