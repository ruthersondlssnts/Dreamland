import React from "react";
import { styled, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
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

const ImgContainer = styled(Box)(({ theme }) => ({
	width: "100%",
	[theme.breakpoints.down("md")]: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
}));

const Divider = styled("div")(({ theme }) => ({
	width: "13%",
	height: "5px",
	backgroundColor: grey[900],
	[theme.breakpoints.down("md")]: {
		marginLeft: "auto",
		marginRight: "auto",
	},
}));

export default function MainDetails() {
	return (
		<Box sx={{ py: 15 }}>
			<Container>
				<CustomBox>
					<ImgContainer>
						<img
							src={ASSETS_PATH + "details.jpg"}
							alt="house"
							style={{ maxWidth: "100%", borderRadius: 15 }}
						/>
					</ImgContainer>

					<Box>
						<Divider />
						<Typography
							sx={{
								fontSize: "35px",
								fontWeight: "700",
								my: 3,
							}}
						>
							We make future for the present
						</Typography>

						<Typography
							sx={{
								fontSize: "16px",
								lineHeight: "27px",
							}}
						>
							Experience life in one of the world’s most dynamic
							cities, where you can choose from an incredible
							selection of homes.
							<br />
							<br />
							Discover some of the very best apartments,
							penthouses, townhouses and villas across
							Philippines. Located in some of the most prime
							communities, these homes are designed to cater to
							every type of lifestyle.
						</Typography>
					</Box>
				</CustomBox>
			</Container>
		</Box>
	);
}
