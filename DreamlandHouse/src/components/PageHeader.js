import React from "react";
import { Chip, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import { emphasize, styled } from "@mui/material/styles";
import CustomBreadcrumb from "./CustomBreadcrumb";

const CustomBox = styled(Box)(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
	[theme.breakpoints.down("md")]: {
		flexDirection: "column",
		textAlign: "center",
	},
}));

export default function PageHeader({ title, noBread, admin }) {
	return (
		<Container>
			<CustomBox>
				<Box>
					<Typography
						sx={{
							fontSize: "35px",
							fontWeight: "700",
							my: 3,
						}}
					>
						{title}
					</Typography>
				</Box>
				<Box>
					{!noBread && (
						<Typography
							component="span"
							sx={{
								fontSize: "35px",
								fontWeight: "700",
								my: 3,
							}}
						>
							<CustomBreadcrumb title={title} />
						</Typography>
					)}

					{admin && (
						<>
							<Typography component="span" sx={{}}>
								Hi {admin.name}!
							</Typography>
						</>
					)}
				</Box>
			</CustomBox>
		</Container>
	);
}
