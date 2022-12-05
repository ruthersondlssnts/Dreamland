import React, { useState } from "react";
import { Box, Button, Paper, styled, TextField } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useFormik } from "formik";
import * as Yup from "yup";
import { saveContactApi } from "../../apis";
import CustomAlert from "../../components/CustomAlert";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(3),
  textAlign: "center",
  border: "1px solid " + grey[700],
  boxShadow: "5px 5px 5px " + grey[700],
  color: theme.palette.text.secondary,
}));

const ContactForm = () => {
  const [alertSuccess, showAlertSuccess] = useState(false);
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      message: "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string()
        .max(50, "Must be 50 characters or less")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      message: Yup.string().required("Required"),
    }),
    onSubmit: (values, { resetForm }) => {
      saveContactApi(values).then((res) => {
        resetForm();
        showAlertSuccess(true);
        setTimeout(() => {
          showAlertSuccess(false);
        }, 6000);
      });
    },
  });
  return (
    <Box sx={{ py: 7 }}>
      <Item>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          sx={{
            "& .MuiTextField-root": { mt: 2 },
          }}
          onSubmit={formik.handleSubmit}
        >
          <CustomAlert
            title="Thank You!"
            message="Your submission is receive. We will be in touch with you shortly."
            collapse
            type="success"
            show={alertSuccess}
            setAlertClose={() => showAlertSuccess(false)}
          />
          <TextField
            fullWidth
            label="Your Name"
            variant="standard"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={
              Boolean(formik.touched.name && formik.errors.name) &&
              formik.errors.name
            }
            error={Boolean(formik.touched.name && formik.errors.name)}
          />
          <TextField
            fullWidth
            label="Email Address"
            variant="standard"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={
              Boolean(formik.touched.email && formik.errors.email) &&
              formik.errors.email
            }
            error={Boolean(formik.touched.email && formik.errors.email)}
          />
          <TextField
            fullWidth
            label="How can we help you?"
            multiline
            name="message"
            rows={4}
            variant="standard"
            value={formik.values.message}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={
              Boolean(formik.touched.message && formik.errors.message) &&
              formik.errors.message
            }
            error={Boolean(formik.touched.message && formik.errors.message)}
          />
          <Box sx={{ display: "flex", justifyContent: "flex-start", my: 3 }}>
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </Box>
        </Box>
      </Item>
    </Box>
  );
};

export default ContactForm;
