import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { useDispatch, useSelector } from "react-redux";
import {
  resetFormEnquireToInitialState,
  setFormEnquire,
  toggleEnquire,
} from "../../store/slices/enquireSlice";
import { Box } from "@mui/system";
import { MenuItem, Paper, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getProjectsAndLocationsApi, saveEnquiryApi } from "../../apis";
import {
  setLocations,
  setProjectLocationAutocomplete,
  setProjects,
} from "../../store/slices/projectSlice";
import { APARTMENT_TYPES } from "../../constants/Constants";
import CustomAlert from "../../components/CustomAlert";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Enquire() {
  const { showEnquire, formEnquire } = useSelector((state) => state.enquire);
  const { locations, projects } = useSelector((state) => state.projects);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [alertSuccess, showAlertSuccess] = useState(false);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: formEnquire,
    enableReinitialize: true,
    validationSchema: Yup.object({
      firstname: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      lastname: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      country: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      dispatch(setFormEnquire(values));
      let data = { ...values };
      data.bedrooms = data.bedrooms || null;
      data.apartmentType = data.apartmentType || null;
      saveEnquiryApi(data).then((res) => {
        dispatch(resetFormEnquireToInitialState());
        showAlertSuccess(true);
        setTimeout(() => {
          showAlertSuccess(false);
        }, 15000);
      });
    },
  });

  useEffect(() => {
    if (formEnquire.project && formEnquire.location) {
      let filters = projects.filter(
        (p) => p.location.id == formEnquire.location
      );
      setFilteredProjects(filters);
    }
  }, [formEnquire]);

  useEffect(() => {
    getProjectsAndLocationsApi().then((res) => {
      let locs = res.data.locations;
      let projs = res.data.projects;
      dispatch(setLocations(locs));
      dispatch(setProjects(projs));

      let autoCompleteLocations = locs.map((l) => {
        return {
          id: l.id,
          name: l.name + ", " + l.country,
          type: "location",
        };
      });

      let autoCompleteProjects = projs.map((p) => {
        return {
          id: p.id,
          name: `${p.name} - ${p.location.name}, ${p.location.country}`,
          type: "project",
        };
      });

      dispatch(
        setProjectLocationAutocomplete(
          autoCompleteLocations.concat(autoCompleteProjects)
        )
      );
    });
  }, []);

  const handleClose = () => {
    dispatch(setFormEnquire(formik.values));
    dispatch(toggleEnquire());
  };

  return (
    <Dialog
      fullScreen
      open={showEnquire}
      onClose={handleClose}
      TransitionComponent={Transition}
      PaperProps={{
        style: {
          background: "#ebebeb",
        },
      }}
    >
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Enquire Now
          </Typography>
          <Button autoFocus color="inherit" onClick={handleClose}>
            Close
          </Button>
        </Toolbar>
      </AppBar>

      <Box display="flex" justifyContent="center" my={5}>
        <Paper elevation={3} sx={{ width: "100%", maxWidth: "500px", p: 4 }}>
          <CustomAlert
            title="Thank You!"
            message="Thank you for your enquiry. We will be in touch with you shortly"
            collapse
            type="success"
            show={alertSuccess}
            setAlertClose={() => showAlertSuccess(false)}
          />

          <Box
            component="form"
            sx={{
              "& > :not(style)": { mb: 2 },
            }}
            autoComplete="off"
            onSubmit={formik.handleSubmit}
          >
            <TextField
              name="firstname"
              label="First Name"
              variant="outlined"
              size="small"
              fullWidth
              value={formik.values.firstname}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helperText={
                Boolean(formik.touched.firstname && formik.errors.firstname) &&
                formik.errors.firstname
              }
              error={Boolean(
                formik.touched.firstname && formik.errors.firstname
              )}
            />
            <TextField
              name="lastname"
              label="Last Name"
              variant="outlined"
              size="small"
              fullWidth
              value={formik.values.lastname}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helperText={
                Boolean(formik.touched.lastname && formik.errors.lastname) &&
                formik.errors.lastname
              }
              error={Boolean(formik.touched.lastname && formik.errors.lastname)}
            />
            <TextField
              name="email"
              label="Email"
              variant="outlined"
              fullWidth
              size="small"
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
              name="country"
              label="Your Country"
              size="small"
              variant="outlined"
              fullWidth
              value={formik.values.country}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helperText={
                Boolean(formik.touched.country && formik.errors.country) &&
                formik.errors.country
              }
              error={Boolean(formik.touched.country && formik.errors.country)}
            />
            <TextField
              name="location"
              size="small"
              label="Property location"
              variant="outlined"
              select
              fullWidth
              value={formik.values.location}
              onChange={(e) => {
                let filters = projects.filter(
                  (p) => p.location.id == e.target.value
                );
                setFilteredProjects(filters);
                formik.handleChange(e);
              }}
              onBlur={formik.handleBlur}
            >
              <MenuItem value="" sx={{ color: "transparent" }}>
                X
              </MenuItem>
              {locations.length > 0 &&
                locations.map((l) => (
                  <MenuItem key={l.name} value={l.id}>
                    {l.name + ", " + l.country}
                  </MenuItem>
                ))}
            </TextField>
            {filteredProjects.length > 0 && (
              <TextField
                name="project"
                size="small"
                label="Project"
                variant="outlined"
                select
                fullWidth
                value={formik.values.project}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                {filteredProjects.map((p) => (
                  <MenuItem key={p.name} value={p.id}>
                    {p.name}
                  </MenuItem>
                ))}
              </TextField>
            )}
            <TextField
              name="apartmentType"
              id="outlined-basic"
              label="Apartment Type"
              size="small"
              variant="outlined"
              select
              fullWidth
              value={formik.values.apartmentType}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              {APARTMENT_TYPES.map((a) => (
                <MenuItem key={a.label} value={a.value}>
                  {a.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Bedrooms"
              size="small"
              variant="outlined"
              name="bedrooms"
              select
              fullWidth
              value={formik.values.bedrooms}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              {[...Array(9).keys()].map((a) => (
                <MenuItem key={a} value={a}>
                  {a == 0 && "Studio"}
                  {a == 8 && "7+"}
                  {a != 8 && a != 0 && a}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              size="small"
              label="Ref No."
              variant="outlined"
              fullWidth
              name="referenceNumber"
              value={formik.values.referenceNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <TextField
              label="Message"
              size="small"
              variant="outlined"
              fullWidth
              multiline
              name="message"
              rows={4}
              value={formik.values.message}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            <Button variant="contained" type="submit">
              Enquire Now
            </Button>
          </Box>
        </Paper>
      </Box>
    </Dialog>
  );
}
