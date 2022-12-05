import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Apartment from "@mui/icons-material/Apartment";
import { Link, useNavigate } from "react-router-dom";
import { toggleEnquire } from "../store/slices/enquireSlice";
import { useDispatch, useSelector } from "react-redux";
import LinearLoading from "../components/LinearLoading";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";

const pages = ["About", "Apartments", "Join", "Contact"];
const settings = ["Dashboard", "Logout"];

function Navigation() {
	const dispatch = useDispatch();
	const { showLinearLoader, profilePicture } = useSelector(
		(state) => state.ui
	);
	const { instance, accounts } = useMsal();
	const isAuthenticated = useIsAuthenticated();
	const navigate = useNavigate();
	const [anchorElNav, setAnchorElNav] = React.useState(null);
	const [anchorElUser, setAnchorElUser] = React.useState(null);

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	return (
		<AppBar position="fixed" color="grey">
			{showLinearLoader && <LinearLoading />}

			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<Apartment
						sx={{ display: { md: "flex", xs: "none" }, mr: 1 }}
					/>
					<Link to="/">
						<Typography
							variant="h6"
							noWrap
							sx={{
								mr: 2,
								display: { xs: "none", md: "flex" },
								fontWeight: 700,
								color: "inherit",
								textDecoration: "none",
							}}
						>
							Dreamland
						</Typography>
					</Link>
					<Box
						sx={{
							flexGrow: 1,
							display: { xs: "flex", md: "none" },
						}}
					>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleOpenNavMenu}
							color="inherit"
						>
							<MenuIcon />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: "bottom",
								horizontal: "left",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "left",
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: "block", md: "none" },
							}}
						>
							{pages.map((page) => (
								<Link key={page} to={`/${page.toLowerCase()}`}>
									<MenuItem onClick={handleCloseNavMenu}>
										<Typography textAlign="center">
											{page}
										</Typography>
									</MenuItem>
								</Link>
							))}
							<MenuItem
								onClick={() => {
									handleCloseNavMenu();
									dispatch(toggleEnquire());
								}}
							>
								<Typography textAlign="center">
									Enquire
								</Typography>
							</MenuItem>
						</Menu>
					</Box>
					<Apartment
						sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
					/>
					<Typography
						variant="h5"
						noWrap
						component="a"
						href=""
						sx={{
							mr: 2,
							display: { xs: "flex", md: "none" },
							flexGrow: 1,
							fontWeight: 700,
							color: "inherit",
							textDecoration: "none",
						}}
					>
						Dreamland
					</Typography>
					<Box
						sx={{
							flexGrow: 1,
							display: { xs: "none", md: "flex" },
						}}
					>
						{pages.map((page) => (
							<Link key={page} to={`/${page.toLowerCase()}`}>
								<Button
									onClick={handleCloseNavMenu}
									sx={{
										my: 2,
										color: "inherit",
										display: "block",
										textTransform: "none",
									}}
								>
									{page}
								</Button>
							</Link>
						))}
						<Button
							onClick={() => {
								handleCloseNavMenu();
								dispatch(toggleEnquire());
							}}
							sx={{
								my: 2,
								color: "inherit",
								display: "block",
								textTransform: "none",
							}}
						>
							Enquire
						</Button>
					</Box>
					{isAuthenticated && (
						<Box sx={{ flexGrow: 0 }}>
							<Tooltip title={accounts[0].username}>
								<IconButton
									onClick={handleOpenUserMenu}
									sx={{ p: 0 }}
								>
									<Avatar
										alt={accounts[0].name}
										src={
											sessionStorage.getItem("profile") ??
											profilePicture ??
											"no.jpg"
										}
									/>
								</IconButton>
							</Tooltip>
							<Menu
								sx={{ mt: "45px" }}
								id="menu-appbar"
								anchorEl={anchorElUser}
								anchorOrigin={{
									vertical: "top",
									horizontal: "right",
								}}
								keepMounted
								transformOrigin={{
									vertical: "top",
									horizontal: "right",
								}}
								open={Boolean(anchorElUser)}
								onClose={handleCloseUserMenu}
							>
								{settings.map((setting) => {
									let Menu = ({ handleClick }) => (
										<MenuItem
											key={setting}
											onClick={handleClick}
										>
											<Typography textAlign="center">
												{setting}
											</Typography>
										</MenuItem>
									);

									if (setting == "Logout") {
										return (
											<Menu
												handleClick={() => {
													sessionStorage.removeItem(
														"profile"
													);
													instance.logoutRedirect({
														postLogoutRedirectUri:
															"/login",
													});
												}}
											/>
										);
									}

									if (setting == "Dashboard") {
										return (
											<Menu
												handleClick={() =>
													navigate("/dashboard")
												}
											/>
										);
									}

									return (
										<Menu
											handleClick={handleCloseUserMenu}
										/>
									);
								})}
							</Menu>
						</Box>
					)}
				</Toolbar>
			</Container>
		</AppBar>
	);
}
export default Navigation;
