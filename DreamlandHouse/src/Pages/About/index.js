import React from "react";
import { Box, Container, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { grey } from "@mui/material/colors";
import styles from "./index.module.css";
import { ASSETS_PATH } from "../../constants/Constants";

const CustomBox = styled(Box)(({ theme }) => ({
	display: "flex",
	gap: 0,
	alignItems: "center",
	[theme.breakpoints.down("md")]: {
		flexDirection: "column",
	},
}));

const About = () => {
	return (
		<>
			<Box className={styles.mainaboutbg}></Box>
			<Container>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						justifyContent: { md: "center", xs: "start" },
						alignItems: "center",
						py: 10,
					}}
				>
					<div
						style={{
							width: "5%",
							height: "5px",
							backgroundColor: grey[900],
							margin: "0 auto",
						}}
					></div>

					<Typography
						variant="h3"
						sx={{
							fontSize: "35px",
							fontWeight: "bold",
							color: grey[900],
							my: 3,
						}}
					>
						About us and the government
					</Typography>

					<Box
						sx={{
							width: "85%",
						}}
					>
						<Typography
							variant="body2"
							sx={{
								fontSize: "16px",
								fontWeight: "500",
								mb: 2,
							}}
						>
							We are an award-winning luxury brokerage connecting
							discerning international clients to the most
							incredible and exclusive homes in Philippines and
							around the globe. We enjoy an enviable reputation as
							trusted advisors to our clients, providing good
							old-fashioned honest brokerage services. Whether you
							are a first-time buyer or a seasoned seller, we help
							you make informed decisions.
						</Typography>
						<Typography
							variant="body2"
							sx={{
								fontSize: "16px",
								fontWeight: "500",
								mb: 2,
							}}
						>
							Our private client advisory services include
							strategic collaboration with developers and their
							architects, the creation of compelling brands,
							advice on the creation of distinctive and unique
							marketing materials, and market positioning for
							prime and super prime luxury houses and apartments.
						</Typography>
						<Typography
							variant="body2"
							sx={{
								fontSize: "16px",
								fontWeight: "500",
							}}
						>
							Ultimately, we aim to provide the most seamless
							customer experience, from the moment you connect
							with us to the completion of a successful
							transaction.
						</Typography>
					</Box>
				</Box>
			</Container>
			<Box sx={{ m: 5 }}>
				<CustomBox sx={{ display: "flex" }}>
					<Box sx={{ flex: 1, textAlign: "end" }}>
						<img
							src={ASSETS_PATH + "about1.jpg"}
							style={{ width: "100%", height: "100%" }}
						/>
					</Box>
					<Box sx={{ flex: 1 }}>
						<Box sx={{ p: "10%" }}>
							<Typography
								variant="body2"
								sx={{
									fontSize: "18px",
									fontWeight: "800",
									mb: 2,
								}}
							>
								Our Mission
							</Typography>
							<Typography
								variant="body2"
								sx={{
									fontSize: "16px",
									fontWeight: "500",
								}}
							>
								At Dreamland, when we talk about property
								consulting, we refer to far more than showcasing
								curated residences. We provide our clients with
								a comprehensive experience where access to
								unique and exclusive properties is just the
								starting point. We pride ourselves on combining
								the refinement of a luxury brand with the
								flexibility and solutions-driven mindset of a
								start-up. Our progressive thinking, creative
								approach and highly personalised advisory
								service are what set us apart from others in the
								market.
							</Typography>
						</Box>
					</Box>
				</CustomBox>

				<CustomBox sx={{ display: "flex" }}>
					<Box sx={{ flex: 1 }}>
						<Box sx={{ flex: 1 }}>
							<Box sx={{ p: "10%" }}>
								<Typography
									variant="body2"
									sx={{
										fontSize: "18px",
										fontWeight: "800",
										mb: 2,
									}}
								>
									Meet our people
								</Typography>
								<Typography
									variant="body2"
									sx={{
										fontSize: "16px",
										fontWeight: "500",
									}}
								>
									There is one central tenet that drives our
									Private Client team – to deliver a customer
									experience that is truly exceptional. We
									firmly believe in the concept of the
									‘knowledge broker’, ensuring that every
									member of our team is an expert in their
									chosen area and can provide the most
									comprehensive and trusted property advice to
									their clients. We will work alongside you to
									seamlessly meet your property goals,
									offering a service that is built on the
									highest levels of professionalism and
									discretion.
								</Typography>
							</Box>
						</Box>
					</Box>
					<Box sx={{ flex: 1, textAlign: "start" }}>
						<img
							src={ASSETS_PATH + "about2.jpg"}
							style={{ width: "100%", height: "100%" }}
						/>
					</Box>
				</CustomBox>
			</Box>
		</>
	);
};

export default About;
