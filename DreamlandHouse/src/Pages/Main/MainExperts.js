import { Box, Button, Container, styled, Typography } from "@mui/material";
import React from "react";

import { grey } from "@mui/material/colors";
import { ASSETS_PATH } from "../../constants/Constants";

const experts = [
	{
		url: "expert1.jpg",
		title: "Architect",
		name: "LIAM URE",
	},
	{
		url: "expert2.jpg",
		title: "Engineer",
		name: "DARREN JARVIS",
	},
	{
		url: "expert3.jpg",
		title: "Engineer",
		name: "GEORGIA PEACOCK",
	},
];

const CustomBox = styled(Box)(({ theme }) => ({
	width: "32%",
	[theme.breakpoints.down("md")]: {
		width: "85%",
	},
}));

const GuidesBox = styled(Box)(({ theme }) => ({
	display: "flex",
	justifyContent: "space-around",
	width: "70%",
	marginTop: theme.spacing(5),
	marginBottom: theme.spacing(5),
	[theme.breakpoints.down("md")]: {
		width: "100%",
	},
	[theme.breakpoints.down("sm")]: {
		marginBottom: "0",
		flexDirection: "column",
	},
}));

const GuideBox = styled(Box)(({ theme }) => ({
	display: "flex",
	flexDirection: "column",
	padding: theme.spacing(2),
	alignItems: "center",
	marginTop: theme.spacing(5),
	[theme.breakpoints.down("sm")]: {
		margin: theme.spacing(2, 0, 2, 0),
	},
}));

const MainExperts = () => {
	return (
		<Container>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
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
					Meet our Experts
				</Typography>

				<CustomBox>
					<Typography
						variant="body2"
						sx={{
							fontSize: "16px",
							fontWeight: "500",
							color: "#5A6473",
							textAlign: "center",
						}}
					>
						Experts and leaders who have already joined the hands to
						make your dream home possible
					</Typography>
				</CustomBox>

				<GuidesBox>
					{experts.map((e) => (
						<GuideBox key={e.url}>
							<img
								src={ASSETS_PATH + e.url}
								alt={e.name}
								width="100%"
								style={{ borderRadius: 20 }}
							/>
							<Typography
								variant="body2"
								sx={{
									fontWeight: "500",
									fontSize: "20px",
									color: "#3B3c45",
									my: 1,
									textAlign: "center",
								}}
							>
								{e.name}
							</Typography>
							<Box
								sx={{
									cursor: "pointer",
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
								}}
							>
								<Typography
									variant="body2"
									sx={{
										fontWeight: "bold",
										fontSize: "14px",
									}}
								>
									{e.title}
								</Typography>
							</Box>
						</GuideBox>
					))}
				</GuidesBox>
			</Box>
		</Container>
	);
};

export default MainExperts;
