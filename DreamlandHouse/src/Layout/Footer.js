import { styled, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Box, Container } from "@mui/system";
import React from "react";
import { ASSETS_PATH } from "../constants/Constants";

const Footer = () => {
  const CustomContainer = styled(Container)(({ theme }) => ({
    display: "flex",
    justifyContent: "space-around",
    gap: theme.spacing(5),
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      textAlign: "center",
    },
  }));

  const IconBox = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
    },
  }));

  const FooterLink = styled("span")(({ theme }) => ({
    fontSize: "16px",
    color: grey[200],
    fontWeight: "300",
    cursor: "pointer",
    "&:hover": {
      color: "white",
    },
  }));

  return (
    <Box sx={{ py: 10, backgroundColor: grey[900], color: "white" }}>
      <CustomContainer>
        <Box>
          <Typography
            sx={{
              fontSize: "20px",
              fontWeight: "700",
              mb: 2,
            }}
          >
            Navigation
          </Typography>

          <FooterLink>About</FooterLink>
          <br />
          <FooterLink>Apartments</FooterLink>
          <br />
          <FooterLink>Join</FooterLink>
          <br />
          <FooterLink>Blog</FooterLink>
          <br />
          <FooterLink>Contact</FooterLink>
        </Box>

        <Box>
          <Typography
            sx={{
              fontSize: "20px",
              fontWeight: "700",
              mb: 2,
            }}
          >
            Company
          </Typography>

          <FooterLink>Partnerships</FooterLink>
          <br />
          <FooterLink>Terms of use</FooterLink>
          <br />
          <FooterLink>Privacy</FooterLink>
        </Box>

        <Box>
          <Typography
            sx={{
              fontSize: "20px",
              fontWeight: "700",
              mb: 2,
            }}
          >
            Connect with us
          </Typography>

          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: "500",
              mb: 2,
            }}
          >
            You’ll find your next dream house, in any style you prefer.
          </Typography>

          <IconBox>
            <img
              src={ASSETS_PATH + "iconfb.png"}
              alt="fbIcon"
              style={{ cursor: "pointer" }}
            />
            <img
              src={ASSETS_PATH + "icontwitter.png"}
              style={{ cursor: "pointer" }}
            />
            <img
              src={ASSETS_PATH + "iconlinkedln.png"}
              alt="linkedinIcon"
              style={{ cursor: "pointer" }}
            />
          </IconBox>
        </Box>
      </CustomContainer>
    </Box>
  );
};

export default Footer;
