import axios from "axios";
import config from "../config";

const API_URL = config.api;
const APARTMENT_API_URL = API_URL + "apartments";
const PROJECT_API_URL = API_URL + "projects";
const ENQUIRY_API_URL = API_URL + "enquiries";
const CONTACT_API_URL = API_URL + "contacts";
const BLOG_API_URL = API_URL + "blogs";
const REGISTRATION_API_URL = API_URL + "registrations";
const GRAPH_API_URL = API_URL + "graph";

export function getApartmentsApi(params) {
	var query = `?pageNumber=${params.pageNumber ?? 1}&pageSize=${
		params.pageSize ?? 9
	}`;

	query += params.startPrice
		? `&startPrice=${params.startPrice}&endPrice=${params.endPrice}`
		: "";

	query += Number.isInteger(params.type) ? `&type=${params.type}` : "";
	query += Number.isInteger(params.bedrooms)
		? `&bedrooms=${params.bedrooms}`
		: "";

	if (params.locationIds) {
		params.locationIds.map((id) => {
			query += `&locationIds=${id}`;
		});
	}

	if (params.projectIds) {
		params.projectIds.map((id) => {
			query += `&projectIds=${id}`;
		});
	}

	return axios.get(APARTMENT_API_URL + query);
}

export function getApartmentApi(id) {
	return axios.get(APARTMENT_API_URL + "/" + id);
}

export function getApartmentDemandApi(id, refno) {
	return axios.get(
		APARTMENT_API_URL +
			"/GetApartmentDemand?timescale=" +
			id +
			"&refNo=" +
			refno
	);
}

export function getProjectsAndLocationsAutocompleteApi() {
	return axios.get(
		PROJECT_API_URL + "/GetAllProjectsAndLocationsAutocomplete"
	);
}

export function getProjectsAndLocationsApi() {
	return axios.get(PROJECT_API_URL + "/GetAllProjectsAndLocations");
}

export function getBlogsApi() {
	return axios.get(BLOG_API_URL);
}

export function getBlogApi(id) {
	return axios.get(BLOG_API_URL + "/" + id);
}

export function getRegistrationsApi(token) {
	return axios.get(REGISTRATION_API_URL, {
		headers: { Authorization: "Bearer " + token },
	});
}

export function getProfileImageApi(token) {
	return axios.get(GRAPH_API_URL + "/profile", {
		headers: { Authorization: "Bearer " + token },
	});
}

export function saveApartmentApi(data, token) {
	return axios.post(APARTMENT_API_URL, data, {
		headers: {
			"Content-Type": "multipart/form-data",
			Authorization: "Bearer " + token,
		},
	});
}

export function saveEnquiryApi(data) {
	return axios.post(ENQUIRY_API_URL, data);
}

export function saveContactApi(data) {
	return axios.post(CONTACT_API_URL, data);
}

export function saveRegistrationApi(data) {
	return axios.post(REGISTRATION_API_URL, data);
}
