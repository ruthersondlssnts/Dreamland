import { Box, styled, Typography } from "@mui/material";
import React from "react";
import { Container } from "@mui/system";
import MainDetails from "../Main/MainDetails";
import { grey } from "@mui/material/colors";
import { ASSETS_PATH } from "../../constants/Constants";

const CustomBox = styled(Box)(({ theme }) => ({
	display: "flex",
	gap: theme.spacing(10),
	alignItems: "center",
	[theme.breakpoints.down("md")]: {
		flexDirection: "column",
		textAlign: "center",
	},
}));

const GuidesBox = styled(Box)(({ theme }) => ({
	display: "flex",
	justifyContent: "space-around",
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
	alignItems: "center",
	marginTop: theme.spacing(5),
	[theme.breakpoints.down("sm")]: {
		margin: theme.spacing(2, 0, 2, 0),
	},
}));

const TextFlexbox = styled(Box)(({ theme }) => ({
	display: "flex",
	justifyContent: "space-between",
	padding: theme.spacing(0, 5, 0, 5),
	[theme.breakpoints.down("sm")]: {
		flexDirection: "column",
		gap: theme.spacing(5),
	},
}));

const LargeText = styled(Typography)(({ theme }) => ({
	fontSize: "64px",
	fontWeight: "700",
	[theme.breakpoints.down("md")]: {
		fontSize: "32px",
	},
}));

const SmallText = styled(Typography)(({ theme }) => ({
	fontSize: "18px",
	fontWeight: "500",
	[theme.breakpoints.down("md")]: {
		fontSize: "14px",
	},
}));

const icons = [
	{
		url: "iconlearning.png",
		name: "Learning",
		desc: `Sed ut perspiciatis unde omnis iste natus error sit voluptatem
    accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
    quae ab illo inventore veritatis et quasi architecto beatae vitae
    dicta sunt explicabo.`,
	},
	{
		url: "icongrowth.png",
		name: "Growth",
		desc: `Sed ut perspiciatis unde omnis iste natus error sit voluptatem
    accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
    quae ab illo inventore veritatis et quasi architecto beatae vitae
    dicta sunt explicabo.`,
	},
	{
		url: "iconempower.png",
		name: "Empowerment",
		desc: `Sed ut perspiciatis unde omnis iste natus error sit voluptatem
    accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
    quae ab illo inventore veritatis et quasi architecto beatae vitae
    dicta sunt explicabo.`,
	},
];

const JoinWhy = () => {
	return (
		<Container sx={{ py: 8 }}>
			<GuidesBox>
				{icons.map((i) => (
					<GuideBox>
						<img
							src={ASSETS_PATH + i.url}
							alt="Learning"
							style={{ width: "100%", maxWidth: 150 }}
						/>
						<Typography
							variant="body2"
							sx={{
								fontWeight: "500",
								fontSize: "20px",
								my: 1,
							}}
						>
							{i.name}
						</Typography>
						<Box
							sx={{
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
									textAlign: "center",
								}}
							>
								{i.desc}
							</Typography>
						</Box>
					</GuideBox>
				))}
			</GuidesBox>
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
					<Box
						sx={{
							pb: 5,
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
							Start today
						</Typography>
					</Box>

					<Box sx={{ position: "relative" }}>
						<Box
							component="img"
							sx={{
								width: "100%",
							}}
							alt="join1"
							src={ASSETS_PATH + "join1.jpg"}
						/>
						<Box
							component="img"
							sx={{
								position: { xs: "relative%", md: "absolute" },
								right: "-14%",
								top: "-14%",
								width: "47%",
								width: { xs: "80%", md: "47%" },
								m: "auto",
								display: "block",
							}}
							alt="join1"
							src={ASSETS_PATH + "join2.jpg"}
						/>
					</Box>
				</Box>
			</Container>
			<TextFlexbox>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<LargeText>500+</LargeText>
					<SmallText>Volunteer joined</SmallText>
				</Box>

				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<LargeText>$20,000+</LargeText>
					<SmallText>Incentive Released</SmallText>
				</Box>

				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<LargeText>3,500+</LargeText>
					<SmallText>Homes Sold</SmallText>
				</Box>
			</TextFlexbox>
		</Container>
	);
};

export default JoinWhy;
