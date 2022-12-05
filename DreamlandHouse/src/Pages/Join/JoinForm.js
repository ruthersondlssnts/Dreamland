import React, { useRef } from "react";
import {
	Alert,
	AlertTitle,
	Box,
	Checkbox,
	Container,
	FormControl,
	FormControlLabel,
	FormGroup,
	List,
	ListItem,
	ListItemText,
	MenuItem,
	Paper,
	TextField,
	Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import { Formik, useFormikContext } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import {
	resetFormJoinToInitialState,
	setFormJoin,
} from "../../store/slices/joinSlice";
import { grey } from "@mui/material/colors";
import { saveRegistrationApi } from "../../apis";
import CustomAlert from "../../components/CustomAlert";
import moment from "moment";
import { toggleLinearLoader } from "../../store/slices/uiSlice";
const steps = ["Identification", "Foreign National", "Confirmation"];
const phoneRegExp =
	/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const handleSteps = (step, formRef) => {
	switch (step) {
		case 0:
			return <PersonalStep formRef={formRef} />;
		case 1:
			return <ForeignStep formRef={formRef} />;
		case 2:
			return <ConfirmStep formRef={formRef} />;
		default:
			throw new Error("Unknown step");
	}
};

const PersonalSchema = Yup.object({
	fullname: Yup.string().required("Required"),
	email: Yup.string().email("Invalid email address").required("Required"),
	mobile: Yup.string()
		.required("Required")
		.matches(phoneRegExp, "Mobile number is not valid"),
	address: Yup.string().required("Required"),
	birthday: Yup.string()
		.required("Required")
		.test("birthday", "Should be greater than 18", function (value) {
			return moment().diff(moment(value), "years") >= 18;
		}),
	isNotFilipinoCitizen: Yup.boolean(),
	identificationFile: Yup.string().when("isNotFilipinoCitizen", {
		is: false,
		then: Yup.string().required("Required"),
	}),
	identificationType: Yup.string().when("isNotFilipinoCitizen", {
		is: false,
		then: Yup.string().required("Required"),
	}),
});

const ForeignSchema = Yup.object({
	foreignIdentificationType: Yup.string().when("isNotFilipinoCitizen", {
		is: true,
		then: Yup.string().required("Required"),
	}),
	foreignIdentificationFile: Yup.string().when("isNotFilipinoCitizen", {
		is: true,
		then: Yup.string().required("Required"),
	}),
	foreignPlaceOfBirth: Yup.string().when("isNotFilipinoCitizen", {
		is: true,
		then: Yup.string().required("Required"),
	}),
});

const ConfirmSchema = Yup.object({
	privacyAgreed: Yup.bool().oneOf(
		[true],
		"You must accept the terms and conditions to continue"
	),
});

function PersonalStep({ formRef }) {
	const { formJoin } = useSelector((state) => state.join);

	return (
		<>
			<Typography sx={{ mt: 2, textAlign: "center" }}>
				Personal Information
			</Typography>
			<Formik
				innerRef={formRef}
				initialValues={formJoin}
				validationSchema={PersonalSchema}
				enableReinitialize={true}
				validateOnMount={true}
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
							"& .MuiTextField-root": { mt: 2 },
						}}
						onSubmit={handleSubmit}
					>
						<TextField
							fullWidth
							name="fullname"
							label="Full Name"
							variant="standard"
							value={values.fullname}
							onChange={handleChange}
							size="small"
							onBlur={handleBlur}
							helperText={
								Boolean(touched.fullname && errors.fullname) &&
								errors.fullname
							}
							error={Boolean(touched.fullname && errors.fullname)}
						/>

						<TextField
							fullWidth
							name="birthday"
							label="Birthday"
							type="date"
							variant="standard"
							size="small"
							value={values.birthday}
							onChange={handleChange}
							onBlur={handleBlur}
							InputLabelProps={{
								shrink: true,
							}}
							helperText={
								Boolean(touched.birthday && errors.birthday) &&
								errors.birthday
							}
							error={Boolean(touched.birthday && errors.birthday)}
						/>
						<TextField
							fullWidth
							name="address"
							label="Address"
							variant="standard"
							value={values.address}
							onChange={handleChange}
							size="small"
							onBlur={handleBlur}
							helperText={
								Boolean(touched.address && errors.address) &&
								errors.address
							}
							error={Boolean(touched.address && errors.address)}
						/>
						<TextField
							fullWidth
							name="email"
							label="Email"
							variant="standard"
							size="small"
							value={values.email}
							onChange={handleChange}
							onBlur={handleBlur}
							helperText={
								Boolean(touched.email && errors.email) &&
								errors.email
							}
							error={Boolean(touched.email && errors.email)}
						/>
						<TextField
							fullWidth
							name="mobile"
							label="Mobile"
							variant="standard"
							value={values.mobile}
							size="small"
							onChange={handleChange}
							onBlur={handleBlur}
							helperText={
								Boolean(touched.mobile && errors.mobile) &&
								errors.mobile
							}
							error={Boolean(touched.mobile && errors.mobile)}
						/>
						{!values.isNotFilipinoCitizen && (
							<>
								<TextField
									name="identificationType"
									size="small"
									label="Identification Type"
									variant="standard"
									select
									fullWidth
									value={values.identificationType}
									onChange={handleChange}
									onBlur={handleBlur}
									helperText={
										Boolean(
											touched.identificationType &&
												errors.identificationType
										) && errors.identificationType
									}
									error={Boolean(
										touched.identificationType &&
											errors.identificationType
									)}
								>
									<MenuItem value={"UMID"}>UMID</MenuItem>
									<MenuItem value={"Driver"}>
										Driver's Liscence
									</MenuItem>
									<MenuItem value={"Philhealth"}>
										Philhealth Card
									</MenuItem>
									<MenuItem value={"Passport"}>
										Passport
									</MenuItem>
								</TextField>
								<span>
									<Button
										component="label"
										variant="outlined"
										sx={{ mt: 2, mr: 2 }}
									>
										Upload Id Card
										<input
											type="file"
											hidden
											onChange={(e) => {
												if (e.currentTarget.files[0]) {
													setFieldValue(
														"identificationFile",
														e.currentTarget.files[0]
															.name
													);
												}
											}}
										/>
									</Button>
									{values.identificationFile}
								</span>
								{Boolean(
									touched.identificationFile &&
										errors.identificationFile
								) && (
									<Typography color="error" variant="caption">
										{errors.identificationFile}
									</Typography>
								)}
							</>
						)}

						<FormGroup>
							<FormControlLabel
								control={
									<Checkbox
										name="isNotFilipinoCitizen"
										checked={values.isNotFilipinoCitizen}
										onChange={handleChange}
										onBlur={handleBlur}
									/>
								}
								label="I am not a Filipino Citizen"
							/>
						</FormGroup>
					</Box>
				)}
			</Formik>
		</>
	);
}

function ForeignStep({ formRef }) {
	const { formJoin } = useSelector((state) => state.join);
	return (
		<>
			<Typography sx={{ mt: 2, textAlign: "center" }}>
				{formJoin.isNotFilipinoCitizen
					? "Foreign National Verification"
					: "The form is hidden if you are a certified filipino citizen, please proceed or go back to make changes. Thank you."}
			</Typography>
			<Formik
				innerRef={formRef}
				initialValues={formJoin}
				validationSchema={ForeignSchema}
				enableReinitialize={true}
				validateOnMount={true}
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
							"& .MuiTextField-root": { mt: 2 },
						}}
						onSubmit={handleSubmit}
					>
						{values.isNotFilipinoCitizen && (
							<>
								<TextField
									fullWidth
									name="foreignPlaceOfBirth"
									label="Place of birth"
									variant="standard"
									value={values.foreignPlaceOfBirth}
									onChange={handleChange}
									size="small"
									onBlur={handleBlur}
									helperText={
										Boolean(
											touched.foreignPlaceOfBirth &&
												errors.foreignPlaceOfBirth
										) && errors.foreignPlaceOfBirth
									}
									error={Boolean(
										touched.foreignPlaceOfBirth &&
											errors.foreignPlaceOfBirth
									)}
								/>
								<TextField
									name="foreignIdentificationType"
									size="small"
									label="Identification Type"
									variant="standard"
									select
									fullWidth
									value={values.foreignIdentificationType}
									onChange={handleChange}
									onBlur={handleBlur}
									helperText={
										Boolean(
											touched.foreignIdentificationType &&
												errors.foreignIdentificationType
										) && errors.foreignIdentificationType
									}
									error={Boolean(
										touched.foreignIdentificationType &&
											errors.foreignIdentificationType
									)}
								>
									<MenuItem value={"CoR"}>
										Alien/Immigrant CoR
									</MenuItem>
									<MenuItem value={"Passport"}>
										Passport
									</MenuItem>
								</TextField>
								<span>
									<Button
										component="label"
										variant="outlined"
										sx={{ mt: 2, mr: 2 }}
									>
										Upload Id Card
										<input
											type="file"
											hidden
											onChange={(e) => {
												if (e.currentTarget.files[0]) {
													setFieldValue(
														"foreignIdentificationFile",
														e.currentTarget.files[0]
															.name
													);
												}
											}}
										/>
									</Button>
									{values.foreignIdentificationFile}
								</span>
								{Boolean(
									touched.foreignIdentificationFile &&
										errors.foreignIdentificationFile
								) && (
									<Typography color="error" variant="caption">
										{errors.foreignIdentificationFile}
									</Typography>
								)}
							</>
						)}
					</Box>
				)}
			</Formik>
		</>
	);
}

function ConfirmStep({ formRef }) {
	const { formJoin } = useSelector((state) => state.join);

	const ListItemTextCustom = ({ secondary, primary }) => {
		return (
			<ListItemText
				disableTypography
				primary={
					<Typography
						style={{
							color: grey[900],
							fontSize: 14,
							fontWeight: 700,
						}}
					>
						{primary}
					</Typography>
				}
				secondary={secondary}
			/>
		);
	};
	return (
		<>
			<Typography sx={{ mt: 2, textAlign: "center" }}>
				Confirmation
			</Typography>
			<Container>
				<List dense={true}>
					<ListItem>
						<ListItemTextCustom
							primary={formJoin.fullname}
							secondary="Full Name"
						/>
					</ListItem>
					<ListItem>
						<ListItemTextCustom
							primary={formJoin.email}
							secondary="Email"
						/>
					</ListItem>
					<ListItem>
						<ListItemTextCustom
							primary={formJoin.mobile}
							secondary="Mobile"
						/>
					</ListItem>
					<ListItem>
						<ListItemTextCustom
							primary={formJoin.birthday}
							secondary="Birthday"
						/>
					</ListItem>
					<ListItem>
						<ListItemTextCustom
							primary={formJoin.address}
							secondary="Address"
						/>
					</ListItem>

					{formJoin.isNotFilipinoCitizen ? (
						<>
							<ListItem>
								<ListItemTextCustom
									primary={formJoin.foreignIdentificationType}
									secondary="ID Type"
								/>
							</ListItem>
							<ListItem>
								<ListItemTextCustom
									primary={formJoin.foreignPlaceOfBirth}
									secondary="Place of Birth"
								/>
							</ListItem>
						</>
					) : (
						<ListItem>
							<ListItemTextCustom
								primary={formJoin.identificationType}
								secondary="ID Type"
							/>
						</ListItem>
					)}
				</List>

				<Formik
					innerRef={formRef}
					initialValues={formJoin}
					validationSchema={ConfirmSchema}
					enableReinitialize={true}
					validateOnMount={true}
				>
					{({
						values,
						errors,
						touched,
						handleChange,
						handleBlur,
						handleSubmit,
					}) => (
						<Box
							component="form"
							noValidate
							autoComplete="off"
							sx={{
								"& .MuiTextField-root": { mt: 2 },
							}}
							onSubmit={handleSubmit}
						>
							<FormGroup>
								<FormControlLabel
									control={
										<Checkbox
											name="privacyAgreed"
											checked={values.privacyAgreed}
											onChange={handleChange}
											onBlur={handleBlur}
										/>
									}
									label="I have read and agree the Terms of Use and Privacy Policy"
								/>
								{Boolean(
									touched.privacyAgreed &&
										errors.privacyAgreed
								) && (
									<Typography color="error" variant="caption">
										{errors.privacyAgreed}
									</Typography>
								)}
							</FormGroup>
						</Box>
					)}
				</Formik>
			</Container>
		</>
	);
}

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
	...theme.typography.body2,
	padding: theme.spacing(3),
	color: theme.palette.text.secondary,
}));

export default function JoinForm() {
	const [activeStep, setActiveStep] = React.useState(0);
	const formRef = useRef();
	const dispatch = useDispatch();

	const handleNext = () => {
		formRef.current.setTouched(
			Object.fromEntries(
				Object.keys(formRef.current.initialValues).map((key) => [
					key,
					true,
				])
			)
		);

		formRef.current.validateForm();

		if (formRef.current.isValid) {
			formRef.current.handleSubmit();
			dispatch(setFormJoin(formRef.current.values));
			if (activeStep === steps.length - 1) {
				dispatch(toggleLinearLoader(true));

				saveRegistrationApi(formRef.current.values)
					.then((res) => {
						setActiveStep((prevActiveStep) => prevActiveStep + 1);
					})
					.finally(() => dispatch(toggleLinearLoader(false)));
				return;
			}
			setActiveStep((prevActiveStep) => prevActiveStep + 1);
		}
	};

	const handleBack = () => {
		dispatch(setFormJoin(formRef.current.values));
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleReset = () => {
		dispatch(resetFormJoinToInitialState());
		setActiveStep(0);
	};

	return (
		<Box sx={{ width: "100%" }}>
			<Item>
				<Stepper activeStep={activeStep}>
					{steps.map((label, index) => {
						const stepProps = {};
						const labelProps = {};
						return (
							<Step key={label} {...stepProps}>
								<StepLabel {...labelProps}>{label}</StepLabel>
							</Step>
						);
					})}
				</Stepper>
				{activeStep === steps.length ? (
					<React.Fragment>
						<Typography sx={{ mt: 2, mb: 1 }}>
							<CustomAlert
								title="Thank You!"
								subtitle="Your application was succesfully submitted"
								message="We will contact you when a decision is made."
								type="success"
								show={true}
							/>
						</Typography>
						<Box
							sx={{
								display: "flex",
								flexDirection: "row",
								pt: 2,
							}}
						>
							<Box sx={{ flex: "1 1 auto" }} />
							<Button onClick={handleReset}>Reset</Button>
						</Box>
					</React.Fragment>
				) : (
					<React.Fragment>
						{handleSteps(activeStep, formRef)}
						<Box
							sx={{
								display: "flex",
								flexDirection: "row",
								pt: 2,
							}}
						>
							<Button
								color="inherit"
								disabled={activeStep === 0}
								onClick={handleBack}
								sx={{ mr: 1 }}
							>
								Back
							</Button>
							<Box sx={{ flex: "1 1 auto" }} />

							<Button onClick={handleNext}>
								{activeStep === steps.length - 1
									? "Finish"
									: "Next"}
							</Button>
						</Box>
					</React.Fragment>
				)}
			</Item>
		</Box>
	);
}
