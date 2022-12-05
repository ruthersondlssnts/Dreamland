import { EventType } from "@azure/msal-browser";
import { useMsal } from "@azure/msal-react";
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import ScrollTop from "../components/ScrollTop";
import Enquire from "../pages/Enquire";
import Footer from "./Footer";
import Navigation from "./Navigation";

export default function Layout({ children }) {
	const { instance } = useMsal();
	useEffect(() => {
		const callbackId = instance.addEventCallback((message) => {
			if (message.eventType === EventType.LOGIN_SUCCESS) {
				const result = message.payload;
				useNavigate("/dashboard");
			}
		});

		return () => {
			if (callbackId) {
				instance.removeEventCallback(callbackId);
			}
		};
	}, []);

	return (
		<>
			<Navigation />
			<Outlet />
			<ScrollTop />
			<Enquire />
			<Footer />
		</>
	);
}
