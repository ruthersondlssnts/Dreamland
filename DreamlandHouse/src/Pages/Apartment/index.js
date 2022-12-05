import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import styles from "./index.module.css";

import { EffectFade, Navigation } from "swiper";
import { Box, Button, Skeleton, Typography } from "@mui/material";
import { Container } from "@mui/system";
import BedIcon from "@mui/icons-material/KingBedRounded";
import InfoIcon from "@mui/icons-material/InfoRounded";
import HomeIcon from "@mui/icons-material/HomeRounded";
import { grey } from "@mui/material/colors";
import { useNavigate, useParams } from "react-router-dom";
import { getApartmentApi } from "../../apis";
import { APARTMENTS_PATH } from "../../constants/Constants";
import BathtubIcon from "@mui/icons-material/Bathtub";
import { useDispatch, useSelector } from "react-redux";
import { setFormEnquire } from "../../store/slices/enquireSlice";
import BlogsCarousel from "../../components/BlogsCarousel";
import { toggleLinearLoader } from "../../store/slices/uiSlice";
import ApartmentChartDemand from "./ApartmentChartDemand";
export default function Apartment() {
	let { id } = useParams();
	const [apartment, setApartment] = useState(null);
	const { formEnquire } = useSelector((state) => state.enquire);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	useEffect(() => {
		if (!Number.isInteger(+id)) navigate("/404");

		dispatch(toggleLinearLoader(true));

		getApartmentApi(id)
			.then((res) => {
				let apartment = res.data;
				setApartment(apartment);
				dispatch(
					setFormEnquire({
						...formEnquire,
						referenceNumber: apartment.referenceNumber,
						apartmentType: apartment.apartmentTypeId,
						location: apartment.locationId,
						project: apartment.projectId,
						bedrooms: apartment.bedrooms,
						message: `Hi, I found your property with ref: ${apartment.referenceNumber}. Please contact me. Thank you.`,
					})
				);
				dispatch(toggleLinearLoader(false));
			})
			.catch((e) => {
				let status = e.response.data.status;
				if (status == 404) {
					navigate("/404");
				}
				dispatch(toggleLinearLoader(false));
			});
		return () => {
			dispatch(
				setFormEnquire({
					...formEnquire,
					referenceNumber: "",
					apartmentType: "",
					location: "",
					project: "",
					bedrooms: "",
					message: "",
				})
			);
		};
	}, []);

	return apartment ? (
		<>
			<Box pt={8}>
				<Swiper
					spaceBetween={30}
					loop={true}
					effect={"fade"}
					navigation={true}
					pagination={{
						clickable: true,
					}}
					modules={[EffectFade, Navigation]}
					className={styles.swiper}
					style={{
						"--swiper-navigation-color": "#fff",
					}}
				>
					{apartment.imagePaths.split(",").map((a) => (
						<SwiperSlide className={styles.swiperslide}>
							<img src={APARTMENTS_PATH + a} />
							<Box className={styles.watermark}>
								DreamlandHouse
							</Box>
						</SwiperSlide>
					))}
				</Swiper>
			</Box>
			<Box bgcolor={grey[900]} color="white">
				<Container>
					<Typography
						variant="body1"
						sx={{
							fontSize: "20px",
							fontWeight: "900",
							py: 1,
						}}
					>
						{apartment.name} by {apartment.project}
						<br />
						PHP {apartment.price}
					</Typography>
					<Box display="flex" gap={3}>
						<Typography
							variant="body2"
							sx={{
								fontSize: "16px",
								fontWeight: "500",
								mb: 2,
								display: "flex",
								alignItems: "center",
								flexWrap: "wrap",
							}}
						>
							<BedIcon /> {apartment.bedrooms}
						</Typography>
						<Typography
							variant="body2"
							sx={{
								fontSize: "16px",
								fontWeight: "500",
								mb: 2,
								display: "flex",
								alignItems: "center",
								flexWrap: "wrap",
							}}
						>
							<BathtubIcon /> {apartment.bathrooms}
						</Typography>
						<Typography
							variant="body2"
							sx={{
								fontSize: "16px",
								fontWeight: "500",
								mb: 2,
								display: "flex",
								alignItems: "center",
								flexWrap: "wrap",
							}}
						>
							<HomeIcon /> {apartment.squareFoot} Sq Ft
						</Typography>
						<Typography
							variant="body2"
							sx={{
								fontSize: "16px",
								fontWeight: "500",
								mb: 2,
								display: "flex",
								alignItems: "center",
								flexWrap: "wrap",
							}}
						>
							<InfoIcon /> Ref No. {apartment.referenceNumber}
						</Typography>
					</Box>
				</Container>
			</Box>
			<hr />
			<Box py={4}>
				<Container sx={{ pb: 4 }}>
					<Typography
						variant="h4"
						sx={{
							my: 2,
							mb: 4,
							fontWeight: "800",
						}}
					>
						Key Information
					</Typography>
					<Box
						display="flex"
						flexDirection={{ md: "row", xs: "column" }}
					>
						<Box flex={1} flexDirection={"column"} display="flex">
							<Box gap={2}>
								<ul className={styles.align}>
									<li>
										<b>Location</b> {apartment.location}
									</li>
									<li>
										<b>Address</b> {apartment.address}
									</li>
								</ul>
							</Box>
						</Box>
						<Box flex={1}>
							<ul className={styles.align}>
								<li>
									<b>Reference Number</b>{" "}
									{apartment.referenceNumber}
								</li>
								<li>
									<b>Type</b> {apartment.type}
								</li>
							</ul>
						</Box>
					</Box>
				</Container>
				<Container>
					<Box
						display="flex"
						gap={3}
						alignItems="center"
						flexDirection={{ md: "row", xs: "column" }}
					>
						<Box flex={1}>
							<Typography
								variant="h4"
								sx={{
									my: 2,
									fontWeight: "800",
								}}
							>
								Description
							</Typography>
							<ReadMore>
								<Typography
									variant="body2"
									sx={{
										fontSize: "16px",
										fontWeight: "500",
									}}
									dangerouslySetInnerHTML={{
										__html: apartment.description.replace(
											/\n/g,
											"<br/>"
										),
									}}
								></Typography>
							</ReadMore>

							<Typography
								variant="h4"
								sx={{
									my: 2,
									fontWeight: "800",
								}}
							>
								Features & Amenities
							</Typography>
							<Container>
								<ul>
									{apartment.amenities.split(",").map((a) => (
										<li>
											<Typography
												variant="body2"
												sx={{
													fontSize: "18px",
												}}
											>
												{a}
											</Typography>
										</li>
									))}
								</ul>
							</Container>
						</Box>
						<Box flex={1} width={1}>
							<ApartmentChartDemand
								width={1}
								apartment={apartment}
							/>
						</Box>
					</Box>
				</Container>
			</Box>
			<BlogsCarousel />
		</>
	) : (
		<SkeletonLoading />
	);
}

const SkeletonLoading = () => (
	<Box
		width={1}
		display="flex"
		justifyContent="center"
		flexDirection={"column"}
	>
		<Skeleton
			sx={{ height: "90vh", width: 1 }}
			animation="wave"
			variant="rectangular"
		/>
		<Box>
			<Container>
				<Skeleton
					variant="text"
					sx={{ fontSize: "20px", width: "30%" }}
				/>
				<Skeleton
					variant="text"
					sx={{ fontSize: "20px", width: "30%" }}
				/>
				<Skeleton
					variant="text"
					sx={{ fontSize: "20px", width: "20%" }}
				/>
				<Skeleton
					variant="text"
					sx={{ fontSize: "20px", width: "20%" }}
				/>
			</Container>
		</Box>
	</Box>
);

let style = {
	display: "-webkit-box",
	WebkitLineClamp: 6,
	overflow: "hidden",
	WebkitBoxOrient: "vertical",
};

function ReadMore({ children }) {
	const [isHidden, setIsHidden] = useState(true);
	return (
		<>
			<Box sx={isHidden ? style : null}>{children}</Box>
			<Button
				size="small"
				sx={{ textDecoration: "underline" }}
				onClick={() => setIsHidden(!isHidden)}
			>
				{isHidden ? "⬇ Read More" : "⬆ Read Less"}
			</Button>
		</>
	);
}
