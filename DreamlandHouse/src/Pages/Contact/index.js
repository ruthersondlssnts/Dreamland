import { Box, styled, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import PageHeader from "../../components/PageHeader";
import ContactForm from "./ContactForm";
import FrequentQuestions from "./FrequentQuestions";

const CustomContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-around",
  gap: theme.spacing(5),
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    textAlign: "center",
  },
}));

const Contact = () => {
  return (
    <Box sx={{ py: 10, backgroundColor: "#ebebeb" }}>
      <PageHeader title="Contact" noBread />
      <Container>
        <Typography
          sx={{
            fontSize: "16px",
            lineHeight: "27px",
            my: 3,
          }}
        >
          For quickest response times, please use our contact form below or
          email us directly.
        </Typography>
        <FrequentQuestions />
        <ContactForm />
        <CustomContainer>
          <Box>
            <Typography
              sx={{
                fontSize: "20px",
                fontWeight: "700",
                mb: 2,
              }}
            >
              You can also reach us via phone at:
            </Typography>
            <Typography>+12 (248) 591-4351</Typography>
            <br />
            <Typography>+63 (912) 591-6542</Typography>
          </Box>

          <Box>
            <Typography
              sx={{
                fontSize: "20px",
                fontWeight: "700",
                mb: 2,
              }}
            >
              Or via mail:
            </Typography>

            <Typography>inquiry@dreamlandhouse.com</Typography>
          </Box>

          <Box>
            <Typography
              sx={{
                fontSize: "20px",
                fontWeight: "700",
                mb: 2,
              }}
            >
              We are located at:
            </Typography>
            <Typography>4th Floor, Investment House</Typography>
            <br />
            <Typography>8-34 Percy Place, Philippines, 1550</Typography>
          </Box>
        </CustomContainer>
      </Container>
    </Box>
  );
};

export default Contact;
