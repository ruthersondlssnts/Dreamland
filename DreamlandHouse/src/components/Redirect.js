import React, { useEffect } from "react";
import { Box, CircularProgress } from "@mui/material";
import { grey } from "@mui/material/colors";

export default function Redirect() {
	return (
		<Box
			sx={{
				width: 1,
				height: 1,
				position: "absolute",
				top: "0",
				left: "0",
				zIndex: "2000",
				background: grey[300],
			}}
		>
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					height: 1,
					alignItems: "center",
				}}
			>
				<CircularProgress size="12vh" />
			</Box>
		</Box>
	);
}
