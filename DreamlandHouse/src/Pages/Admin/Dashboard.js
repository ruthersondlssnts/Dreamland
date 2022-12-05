import React, { useEffect, useState } from "react";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import {
	getProfileImageApi,
	getRegistrationsApi,
	saveApartmentApi,
} from "../../apis";
import { loginRequest } from "../../authConfig";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Container } from "@mui/system";
import moment from "moment/moment";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Formik } from "formik";
import * as Yup from "yup";
import { Button, MenuItem, TextField } from "@mui/material";
import { APARTMENT_TYPES } from "../../constants/Constants";
import { useDispatch, useSelector } from "react-redux";
import {
	setProfilePicture,
	toggleLinearLoader,
} from "../../store/slices/uiSlice";
import CustomAlert from "../../components/CustomAlert";

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box sx={{ p: 3 }}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		"aria-controls": `simple-tabpanel-${index}`,
	};
}

export default function Dashboard() {
	const isAuthenticated = useIsAuthenticated();
	const { instance, accounts } = useMsal();
	const [registrations, setRegistrations] = useState(null);
	const navigate = useNavigate();
	const [value, setValue] = React.useState(0);
	const dispatch = useDispatch();

	if (!isAuthenticated) {
		navigate("/login");
		return;
	}

	const handleTabChange = (event, newValue) => {
		setValue(newValue);
	};

	useEffect(() => {
		if (!isAuthenticated) {
			navigate("/login");
			return;
		}

		dispatch(toggleLinearLoader(true));

		instance
			.acquireTokenSilent({
				...loginRequest,
				account: accounts[0],
			})
			.then((response) => {
				if (!sessionStorage.getItem("profile")) {
					getProfileImageApi(response.accessToken)
						.then((graphRespond) => {
							let src = `data:image/jpeg;base64,${graphRespond.data}`;
							dispatch(setProfilePicture(src));
							sessionStorage.setItem("profile", src);
						})
						.catch(() =>
							sessionStorage.setItem("profile", "no-image.jpg")
						);
				}
				getRegistrationsApi(response.accessToken).then(
					(registrationRespond) => {
						setRegistrations(registrationRespond.data);
						dispatch(toggleLinearLoader(false));
					}
				);
			});
	}, []);

	return (
		<Box sx={{ py: 10, minHeight: "100vh" }}>
			<PageHeader title="Dashboard" noBread admin={accounts[0]} />
			<Container>
				<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
					<Tabs
						value={value}
						onChange={handleTabChange}
						aria-label="basic tabs example"
					>
						<Tab label="Registrations" {...a11yProps(0)} />
						<Tab label="Apartments" {...a11yProps(1)} />
					</Tabs>
				</Box>
				<TabPanel value={value} index={0}>
					{registrations && (
						<Registrations registrations={registrations} />
					)}
				</TabPanel>
				<TabPanel value={value} index={1}>
					<ApartmentCreate />
				</TabPanel>
			</Container>
		</Box>
	);
}

const columns = [
	{ id: "fullname", label: "Name", minWidth: 170 },
	{ id: "address", label: "Address", minWidth: 170 },
	{ id: "birthday", label: "Birthday", minWidth: 170 },
	{ id: "email", label: "Email", minWidth: 170 },
	{ id: "mobile", label: "Mobile", minWidth: 170 },
	{ id: "isNotFilipinoCitizen", label: "Filipino", minWidth: 170 },
];

function Registrations({ registrations }) {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	return (
		<Paper sx={{ width: "100%", overflow: "hidden" }}>
			<TableContainer sx={{ maxHeight: 440 }}>
				<Table stickyHeader aria-label="sticky table">
					<TableHead>
						<TableRow>
							{columns.map((column) => (
								<TableCell
									key={column.id}
									align={column.align}
									style={{ minWidth: column.minWidth }}
								>
									{column.label}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{registrations
							.slice(
								page * rowsPerPage,
								page * rowsPerPage + rowsPerPage
							)
							.map((row) => {
								return (
									<TableRow
										hover
										role="checkbox"
										tabIndex={-1}
										key={row.code}
									>
										{columns.map((column) => {
											let value = row[column.id];
											if (column.id == "birthday") {
												value =
													moment(value).format("l");
											}

											if (
												column.id ==
												"isNotFilipinoCitizen"
											) {
												value = value ? "No" : "Yes";
											}

											return (
												<TableCell
													key={column.id}
													align={column.align}
												>
													{column.format &&
													typeof value === "number"
														? column.format(value)
														: value}
												</TableCell>
											);
										})}
									</TableRow>
								);
							})}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				rowsPerPageOptions={[10, 25, 100]}
				component="div"
				count={registrations.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</Paper>
	);
}

const ApartmentSchema = Yup.object({
	referenceNumber: Yup.string().required("Required"),
	type: Yup.string().required("Required"),
	name: Yup.string().required("Required"),
	price: Yup.number().required("Required"),
	address: Yup.string().required("Required"),
	description: Yup.string().required("Required"),
	bedrooms: Yup.number().required("Required"),
	bathrooms: Yup.number().required("Required"),
	squareFoot: Yup.number().required("Required"),
	amenities: Yup.string().required("Required"),
	projectId: Yup.string().required("Required"),
	photos: Yup.mixed().test(
		"required",
		"You need to provide a file",
		(file) => {
			if (file) return true;
			return false;
		}
	),
});

function ApartmentCreate() {
	const { projects } = useSelector((state) => state.projects);
	const { instance, accounts } = useMsal();
	const [alertSuccess, showAlertSuccess] = useState(false);
	const dispatch = useDispatch();
	return (
		<Paper sx={{ width: "100%", overflow: "hidden" }}>
			<Formik
				initialValues={{
					referenceNumber: "",
					type: "",
					name: "",
					price: "",
					address: "",
					description: "",
					bedrooms: "",
					bathrooms: "",
					squareFoot: "",
					amenities: "",
					projectId: "",
					photos: "",
				}}
				validationSchema={ApartmentSchema}
				onSubmit={(values, { setStatus, setSubmitting, resetForm }) => {
					dispatch(toggleLinearLoader(true));
					const formData = new FormData();

					for (var i = 0; i < values.photos.length; i++) {
						let file = values.photos[i];
						formData.append("photos", file);
					}

					Object.keys(values).forEach(function (key) {
						if (key == "photos") return;
						formData.append(key, values[key]);
					});

					instance
						.acquireTokenSilent({
							...loginRequest,
							account: accounts[0],
						})
						.then((response) => {
							saveApartmentApi(formData, response.accessToken)
								.then((response) => {
									resetForm();
									setSubmitting(false);
									showAlertSuccess(true);
								})
								.catch((err) => setSubmitting(false))
								.finally(() =>
									dispatch(toggleLinearLoader(false))
								);
						});
				}}
			>
				{({
					values,
					errors,
					touched,
					handleChange,
					handleBlur,
					handleSubmit,
					setFieldValue,
					/* and other goodies */
				}) => (
					<Box
						component="form"
						noValidate
						autoComplete="off"
						sx={{
							"& .MuiTextField-root": { mt: 1 },
							m: 3,
						}}
						onSubmit={handleSubmit}
					>
						<CustomAlert
							title="Success!"
							message="Apartment saved successfully"
							collapse
							type="success"
							show={alertSuccess}
							setAlertClose={() => showAlertSuccess(false)}
						/>
						<Typography variant="h6"> Create Apartment</Typography>

						<TextField
							fullWidth
							name="referenceNumber"
							label="Reference Number"
							variant="standard"
							value={values.referenceNumber}
							onChange={handleChange}
							size="small"
							onBlur={handleBlur}
							helperText={
								Boolean(
									touched.referenceNumber &&
										errors.referenceNumber
								) && errors.referenceNumber
							}
							error={Boolean(
								touched.referenceNumber &&
									errors.referenceNumber
							)}
						/>

						<TextField
							fullWidth
							name="projectId"
							select
							label="Project"
							variant="standard"
							defaultValue=""
							size="small"
							onChange={handleChange}
							onBlur={handleBlur}
							helperText={
								Boolean(
									touched.projectId && errors.projectId
								) && errors.projectId
							}
							error={Boolean(
								touched.projectId && errors.projectId
							)}
						>
							<MenuItem value="" sx={{ color: "transparent" }}>
								X
							</MenuItem>
							{projects.map((option) => (
								<MenuItem key={option.name} value={option.id}>
									{option.name} - {option.location.name}
								</MenuItem>
							))}
						</TextField>
						<TextField
							fullWidth
							name="name"
							label="Name"
							variant="standard"
							value={values.name}
							size="small"
							onChange={handleChange}
							onBlur={handleBlur}
							helperText={
								Boolean(touched.name && errors.name) &&
								errors.name
							}
							error={Boolean(touched.name && errors.name)}
						/>
						<TextField
							fullWidth
							name="address"
							label="Address"
							variant="standard"
							value={values.address}
							size="small"
							onChange={handleChange}
							onBlur={handleBlur}
							helperText={
								Boolean(touched.address && errors.address) &&
								errors.address
							}
							error={Boolean(touched.address && errors.address)}
						/>
						<TextField
							fullWidth
							name="price"
							label="Price"
							variant="standard"
							value={values.price}
							inputProps={{
								inputMode: "numeric",
								pattern: "[0-9]*",
							}}
							size="small"
							type="number"
							onChange={handleChange}
							onBlur={handleBlur}
							helperText={
								Boolean(touched.price && errors.price) &&
								errors.price
							}
							error={Boolean(touched.price && errors.price)}
						/>
						<TextField
							fullWidth
							name="bedrooms"
							label="Bedrooms"
							variant="standard"
							value={values.bedrooms}
							inputProps={{
								inputMode: "numeric",
								pattern: "[0-9]*",
							}}
							size="small"
							type="number"
							onChange={handleChange}
							onBlur={handleBlur}
							helperText={
								Boolean(touched.bedrooms && errors.bedrooms) &&
								errors.bedrooms
							}
							error={Boolean(touched.bedrooms && errors.bedrooms)}
						/>
						<TextField
							fullWidth
							name="bathrooms"
							label="Bathrooms"
							variant="standard"
							value={values.bathrooms}
							inputProps={{
								inputMode: "numeric",
								pattern: "[0-9]*",
							}}
							size="small"
							type="number"
							onChange={handleChange}
							onBlur={handleBlur}
							helperText={
								Boolean(
									touched.bathrooms && errors.bathrooms
								) && errors.bathrooms
							}
							error={Boolean(
								touched.bathrooms && errors.bathrooms
							)}
						/>
						<TextField
							fullWidth
							name="squareFoot"
							label="Square Foot"
							variant="standard"
							value={values.squareFoot}
							inputProps={{
								inputMode: "numeric",
								pattern: "[0-9]*",
							}}
							size="small"
							type="number"
							onChange={handleChange}
							onBlur={handleBlur}
							helperText={
								Boolean(
									touched.squareFoot && errors.squareFoot
								) && errors.squareFoot
							}
							error={Boolean(
								touched.squareFoot && errors.squareFoot
							)}
						/>
						<TextField
							fullWidth
							name="amenities"
							label="Amenities"
							variant="standard"
							value={values.amenities}
							size="small"
							onChange={handleChange}
							onBlur={handleBlur}
							helperText={
								Boolean(
									touched.amenities && errors.amenities
								) && errors.amenities
							}
							error={Boolean(
								touched.amenities && errors.amenities
							)}
						/>
						<TextField
							fullWidth
							name="type"
							size="small"
							select
							label="Type"
							variant="standard"
							defaultValue=""
							onChange={handleChange}
							onBlur={handleBlur}
							helperText={
								Boolean(touched.type && errors.type) &&
								errors.type
							}
							error={Boolean(touched.type && errors.type)}
						>
							<MenuItem value="" sx={{ color: "transparent" }}>
								X
							</MenuItem>
							{APARTMENT_TYPES.map((option) => (
								<MenuItem
									key={option.label}
									value={option.value}
								>
									{option.label}
								</MenuItem>
							))}
						</TextField>

						<TextField
							fullWidth
							label="Description"
							multiline
							name="description"
							rows={3}
							variant="standard"
							value={values.description}
							onChange={handleChange}
							onBlur={handleBlur}
							helperText={
								Boolean(
									touched.description && errors.description
								) && errors.description
							}
							error={Boolean(
								touched.description && errors.description
							)}
						/>
						<span>
							<Button
								component="label"
								variant="outlined"
								sx={{ mt: 2, mr: 2 }}
							>
								Upload Pictures
								<input
									type="file"
									hidden
									multiple
									onChange={(e) => {
										if (e.currentTarget.files[0]) {
											setFieldValue(
												"photos",
												e.currentTarget.files
											);
										}
									}}
								/>
							</Button>
							{values.photos?.length > 0
								? values.photos?.length + "file/s uploaded"
								: null}
						</span>
						{Boolean(touched.photos && errors.photos) && (
							<Typography color="error" variant="caption">
								{errors.photos}
							</Typography>
						)}
						<Box
							sx={{
								display: "flex",
								justifyContent: "flex-start",
								my: 3,
							}}
						>
							<Button variant="contained" type="submit">
								Submit
							</Button>
						</Box>
					</Box>
				)}
			</Formik>
		</Paper>
	);
}
