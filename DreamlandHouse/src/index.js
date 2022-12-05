require("file-loader?name=[name].[ext]!./index.html");

import React from "react";
import ReactDOM from "react-dom/client";
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import App from "./App";
import { store } from "./store";
import { Provider } from "react-redux";
import { msalConfig } from "./authConfig";

const msalInstance = new PublicClientApplication(msalConfig);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
	<MsalProvider instance={msalInstance}>
		<Provider store={store}>
			<App />
		</Provider>
	</MsalProvider>
);
