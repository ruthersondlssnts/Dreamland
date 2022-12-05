import React, { useState } from "react";
import {
	Autocomplete,
	Button,
	Grid,
	MenuItem,
	Skeleton,
	TextField,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import SearchIcon from "@mui/icons-material/Search";
import { APARTMENT_TYPES, PRICE_RANGE } from "../../constants/Constants";
import { useSelector } from "react-redux";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

export default function ApartmentSearch({
	handleSearchChange,
	handleSearch,
	searchParams,
	handleReset,
	searchQuery,
}) {
	const { projectLocationAutocomplete } = useSelector(
		(state) => state.projects
	);
	const [valueAutoComp, setvalueAutoComp] = useState(searchParams);
	const handleChange = (event) => {
		handleSearchChange(event.target.name, event.target.value);
	};

	const handleAutoCompleteChange = (value) => {
		setvalueAutoComp(value);

		let locIds = value
			.filter((x) => x.type == "location")
			.map((item) => {
				return item.id;
			});
		let projIds = value
			.filter((x) => x.type == "project")
			.map((item) => {
				return item.id;
			});

		handleSearchChange("locationIds", locIds);
		handleSearchChange("projectIds", projIds);
	};

	const handleResetHere = () => {
		setvalueAutoComp([]);
		handleReset();
	};

	return (
		<Container
			sx={{
				py: { md: 3, xs: 2 },
				mt: { xs: 2 },
				position: "sticky",
				top: 50,
				bgcolor: "white",
				zIndex: "4",
				boxShadow: 2,
				minWidth: { md: "1500px" },
			}}
		>
			<Box
				display="flex"
				gap={2}
				flexDirection={{ md: "row", xs: "column" }}
			>
				<Box flex={4} width={1} alignSelf="flex-end">
					<Box
						sx={{
							display: "flex",
							alignItems: "flex-end",
						}}
					>
						<SearchIcon
							sx={{ color: "action.active", mr: 1, my: 0.5 }}
						/>
						<Autocomplete
							multiple
							id="tags-standard"
							options={projectLocationAutocomplete ?? []}
							getOptionLabel={(option) => option.name}
							fullWidth
							value={valueAutoComp}
							limitTags={2}
							onChange={(e, value) =>
								handleAutoCompleteChange(value)
							}
							size="small"
							renderInput={(params) => (
								<TextField
									{...params}
									variant="standard"
									label="Search Project name or Location"
									placeholder="Search"
									fullWidth
								/>
							)}
						/>
					</Box>
				</Box>
				<Box width={1} flex={2} display={{ md: "block", xs: "none" }}>
					<TextField
						fullWidth
						name="type"
						select
						label="Type"
						value={searchQuery.type ?? ""}
						variant="standard"
						onChange={handleChange}
					>
						<MenuItem value="" sx={{ color: "transparent" }}>
							X
						</MenuItem>
						{APARTMENT_TYPES.map((option) => (
							<MenuItem key={option.label} value={option.value}>
								{option.label}
							</MenuItem>
						))}
					</TextField>
				</Box>
				<Box width={1} flex={2} display={{ md: "block", xs: "none" }}>
					<TextField
						fullWidth
						select
						value={searchQuery.bedrooms ?? ""}
						label="Bedrooms"
						variant="standard"
						name="bedrooms"
						onChange={handleChange}
					>
						<MenuItem value="" sx={{ color: "transparent" }}>
							X
						</MenuItem>
						{[...Array(9).keys()].map((a) => (
							<MenuItem key={a} value={a}>
								{a == 0 && "Studio"}
								{a == 8 && "7+"}
								{a != 8 && a != 0 && a}
							</MenuItem>
						))}
					</TextField>
				</Box>
				<Box width={1} flex={2} display={{ md: "block", xs: "none" }}>
					<TextField
						fullWidth
						select
						label="Price"
						name="startPrice"
						variant="standard"
						value={searchQuery.startPrice ?? ""}
						defaultValue=""
						onChange={handleChange}
					>
						<MenuItem value="" sx={{ color: "transparent" }}>
							X
						</MenuItem>
						{PRICE_RANGE.map((option) => (
							<MenuItem key={option.label} value={option.value}>
								{option.label}
							</MenuItem>
						))}
					</TextField>
				</Box>
				<Box
					flex={1}
					alignSelf="flex-end"
					display="flex"
					justifyContent="space-evenly"
					gap={2}
					width={1}
				>
					<Box>
						<Button
							variant="outlined"
							startIcon={<RestartAltIcon />}
							onClick={handleResetHere}
						>
							Reset{" "}
						</Button>
					</Box>
					<Box>
						<Button
							variant="contained"
							onClick={handleSearch}
							startIcon={<SearchIcon />}
						>
							Search{" "}
						</Button>
					</Box>
				</Box>
			</Box>
		</Container>
	);
}
