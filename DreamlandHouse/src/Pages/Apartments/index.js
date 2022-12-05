import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import PageHeader from "../../components/PageHeader";
import ApartmentSearch from "./ApartmentSearch";
import ApartmentList from "./ApartmentsList";
import { getApartmentsApi } from "../../apis";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { toggleLinearLoader } from "../../store/slices/uiSlice";

export default function Apartments() {
	const [apartments, setApartments] = useState(null);
	const [pagination, setPagination] = useState(null);
	const [searchParams, setSearchParams] = useSearchParams();
	const dispatch = useDispatch();
	const [searchQuery, setSearchQuery] = useState({
		pageNum: 1,
		pageSize: 9,
		startPrice: null,
		endPrice: null,
		locationIds: null,
		projectIds: searchParams.get("project")
			? [searchParams.get("project")]
			: [],
		type: null,
		bedrooms: null,
	});

	const handlePageChange = (event, pageNumber) => {
		let params = {
			...searchQuery,
			pageNumber,
		};

		getApartments(params);
		setSearchQuery({ ...searchQuery, pageNumber });
	};

	const handleSearch = () => {
		let params = {
			...searchQuery,
			pageNumber: 1,
		};
		let start = (params.startPrice === 0 ? 1 : params.startPrice) * 1000000;
		let end = start + 10000000;
		params.startPrice = start;
		params.endPrice = end;

		getApartments(params);
	};

	const handleReset = () => {
		let params = {
			pageNum: 1,
			pageSize: 9,
			startPrice: null,
			endPrice: null,
			locationIds: null,
			projectIds: null,
			type: null,
			bedrooms: null,
		};

		setSearchQuery(params);
		getApartments(params);
	};

	const handleSearchChange = (name, value) => {
		setSearchQuery((prevState) => ({ ...prevState, [name]: value }));
	};

	useEffect(() => {
		getApartments();
	}, []);

	const getApartments = (params = searchQuery) => {
		setApartments(null);
		dispatch(toggleLinearLoader(true));

		getApartmentsApi(params).then((res) => {
			setPagination(JSON.parse(res.headers["x-pagination"])); //{"TotalItemCount":18,"TotalPageCount":2,"PageSize":9,"CurrentPage":2}
			setApartments(res.data);
			dispatch(toggleLinearLoader(false));
		});
	};

	return (
		<Box sx={{ py: 10, minHeight: "90vh" }}>
			<PageHeader title="Apartments" />
			<ApartmentSearch
				handleSearch={handleSearch}
				handleReset={handleReset}
				handleSearchChange={handleSearchChange}
				searchQuery={searchQuery}
				searchParams={
					searchParams.get("project")
						? [
								{
									id: searchParams.get("project"),
									name: searchParams.get("name"),
									type: "project",
								},
						  ]
						: []
				}
			/>
			<ApartmentList
				apartments={apartments}
				handlePageChange={handlePageChange}
				pagination={pagination}
			/>
		</Box>
	);
}
