import React, { useEffect } from "react";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { loginRequest } from "../../authConfig";
import { useNavigate } from "react-router-dom";
import { alpha, Avatar, Box, Button, Paper, Typography } from "@mui/material";
import { APARTMENTS_PATH } from "../../constants/Constants";
import { grey } from "@mui/material/colors";
import Apartment from "@mui/icons-material/Apartment";

export default function Login() {
	const { instance } = useMsal();
	const isAuthenticated = useIsAuthenticated();
	const navigate = useNavigate();

	function handleLogin() {
		instance.loginRedirect(loginRequest);
	}

	if (isAuthenticated) {
		navigate("/dashboard");
		return;
	}

	useEffect(() => {
		if (isAuthenticated) {
			navigate("/dashboard");
			return;
		}
	}, []);

	return (
		<Box
			sx={{
				width: 1,
				height: 1,
				position: "absolute",
				top: "0",
				left: "0",
				zIndex: "2000",
				backgroundImage: `url(${APARTMENTS_PATH}a3.jpg)`,
				backgroundPosition: "center",
				backgroundRepeat: "no-repeat",
				backgroundSize: "cover",
				boxShadow: "inset 0 0 0 2000px " + alpha(grey[500], 0.5),
			}}
		>
			<Paper
				elevation={8}
				sx={{
					position: "absolute",
					left: "50%",
					top: "25%",
					transform: "translate(-50%, 0)",
					width: "80%",
					height: "36%",
					maxWidth: "500px",
					textAlign: "center",
					borderRadius: "16px",
					background:
						"url(https://dreamlandstorage.blob.core.windows.net/fileupload/assets/bglogin.png), white",
					backgroundRepeat: "no-repeat",
					backgroundSize: "contain",
				}}
			>
				<Box sx={{ p: 3, py: 10, height: "50%" }}>
					<Typography
						variant="h2"
						noWrap
						sx={{
							fontWeight: 700,
							color: "inherit",
							fontSize: { md: "3rem", xs: "2rem" },
						}}
					>
						<Apartment
							sx={{ mr: 1, fontSize: { md: "3rem", xs: "2rem" } }}
						/>
						Dreamland
					</Typography>
				</Box>
				<Box sx={{ pt: 10, px: 3, height: "50%" }}>
					<Button
						variant="contained"
						onClick={handleLogin}
						startIcon={
							<Avatar
								variant="square"
								src={
									"https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/512px-Microsoft_logo.svg.png?20210729021049"
								}
							/>
						}
					>
						Log in with Active Directory
					</Button>
				</Box>
			</Paper>
		</Box>
	);
}
