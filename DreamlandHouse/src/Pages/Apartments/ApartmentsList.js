import React from "react";
import {
	Box,
	Card,
	CardContent,
	Container,
	Pagination,
	Skeleton,
} from "@mui/material";
import ApartmentCard from "./ApartmentCard";
import { Link } from "react-router-dom";

export default function ApartmentList({
	pagination,
	apartments,
	handlePageChange,
}) {
	return (
		<Container sx={{ py: 6, minHeight: "90vh" }}>
			<Box
				width={1}
				display="flex"
				flexWrap="wrap"
				gap={5}
				justifyContent="center"
			>
				{apartments ? (
					apartments.map((a) => (
						<Box
							key={a.name}
							display="flex"
							justifyContent="center"
						>
							<Link to={`/apartments/${a.id}`}>
								<ApartmentCard apartment={a} />
							</Link>
						</Box>
					))
				) : (
					<SkeletonLoading />
				)}
			</Box>
			<Box
				width={1}
				m={3}
				sx={{ display: "flex", justifyContent: "center" }}
			>
				{pagination && (
					<Pagination
						count={pagination.TotalPageCount}
						page={pagination.CurrentPage}
						color="primary"
						onChange={handlePageChange}
					/>
				)}
			</Box>
		</Container>
	);
}

const SkeletonLoading = () => (
	<Box
		width={1}
		display="flex"
		flexWrap="wrap"
		gap={5}
		justifyContent="center"
	>
		{[...Array(9).keys()].map((a) => (
			<Card sx={{ maxWidth: 345, width: 1 }} key={a}>
				<Skeleton
					sx={{ height: 190 }}
					animation="wave"
					variant="rectangular"
				/>
				<CardContent>
					<Skeleton
						animation="wave"
						height={10}
						style={{ marginBottom: 6 }}
					/>
					<Skeleton animation="wave" height={10} width="80%" />
					<Skeleton animation="wave" height={10} width="80%" />
					<Skeleton animation="wave" height={10} width="80%" />
				</CardContent>
			</Card>
		))}
	</Box>
);
