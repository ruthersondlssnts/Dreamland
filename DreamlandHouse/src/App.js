import React from "react";
import "./styles.css";
import { ThemeProvider } from "@mui/material";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import theme from "./components/theme";
import loadable from "@loadable/component";

const Main = loadable(() => import("./pages/Main"));
const Layout = loadable(() => import("./layout"));
const Apartments = loadable(() => import("./pages/Apartments"));
const About = loadable(() => import("./pages/About"));
const Contact = loadable(() => import("./pages/Contact"));
const Join = loadable(() => import("./pages/Join"));
const Blog = loadable(() => import("./pages/Blog"));
const Apartment = loadable(() => import("./pages/Apartment"));
const NotFound = loadable(() => import("./pages/Error/NotFound"));
const Redirect = loadable(() => import("./components/Redirect"));
const Dashboard = loadable(() => import("./pages/Admin/Dashboard"));
const Login = loadable(() => import("./pages/Admin/Login"));

export default function App() {
	return (
		<Router>
			<ThemeProvider theme={theme}>
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route
							index
							element={<Main fallback={<Redirect />} />}
						/>
						<Route
							path="apartments"
							exact
							element={<Apartments fallback={<Redirect />} />}
						/>
						<Route
							path="apartments/:id"
							element={<Apartment fallback={<Redirect />} />}
						/>
						<Route
							path="about"
							element={<About fallback={<Redirect />} />}
						/>
						<Route
							path="contact"
							element={<Contact fallback={<Redirect />} />}
						/>
						<Route
							path="join"
							element={<Join fallback={<Redirect />} />}
						/>
						<Route
							path="blogs/:id"
							exact
							element={<Blog fallback={<Redirect />} />}
						/>
						<Route
							path="dashboard"
							exact
							element={<Dashboard fallback={<Redirect />} />}
						/>
						<Route
							path="/login"
							exact
							element={<Login fallback={<Redirect />} />}
						/>
						<Route
							path="*"
							exact
							element={<NotFound fallback={<Redirect />} />}
						/>
					</Route>
				</Routes>
			</ThemeProvider>
		</Router>
	);
}
