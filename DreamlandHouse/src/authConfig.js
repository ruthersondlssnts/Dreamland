import { LogLevel } from "@azure/msal-browser";
import config from "./config";

export const msalConfig = {
	auth: {
		clientId: "2da9e45f-c3ee-49ec-b788-334e05b8136b",
		authority:
			"https://login.microsoftonline.com/07cc872f-b6e3-487f-834e-25eb4f34ddad",
		redirectUri: config.redirectLoginUri,
	},
	cache: {
		cacheLocation: "sessionStorage", // This configures where your cache will be stored
		storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
	},
	system: {
		loggerOptions: {
			loggerCallback: (level, message, containsPii) => {
				if (containsPii) {
					return;
				}
				switch (level) {
					case LogLevel.Error:
						console.error(message);
						return;
					case LogLevel.Info:
						console.info(message);
						return;
					case LogLevel.Verbose:
						console.debug(message);
						return;
					case LogLevel.Warning:
						console.warn(message);
						return;
				}
			},
		},
	},
};

export const loginRequest = {
	scopes: [
		"api://f8b1a9f4-c847-42f1-892e-fe968a3e9373/readwrite",
		"User.Read",
	],
	// scopes: ["User.Read"],
};

export const graphConfig = {
	graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
};
