import React from "react";
import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";
import BedIcon from "@mui/icons-material/Bed";
import BathtubIcon from "@mui/icons-material/Bathtub";
import HomeIcon from "@mui/icons-material/Home";
import { APARTMENTS_PATH } from "../../constants/Constants";

export default function ApartmentCard({ apartment }) {
  return (
    <Card sx={{ maxWidth: 350 }} elevation={2}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="200"
        image={APARTMENTS_PATH + apartment.imagePaths.split(",")[0]}
      />
      <CardContent>
        <Typography variant="body1" color="text.secondary">
          {apartment.type}
        </Typography>
        <Typography
          variant="h5"
          sx={{
            fontSize: "28px",
            fontWeight: "700",
          }}
        >
          PHP {apartment.price}
        </Typography>
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            fontSize: "18px",
            fontWeight: "600",
          }}
          noWrap
        >
          {apartment.name}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <PlaceIcon /> {apartment.location} <br />
            </Typography>
          </Grid>
          <Grid item xs={3} md={2}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <BedIcon /> {apartment.bedrooms}
            </Typography>
          </Grid>
          <Grid item xs={9} md={2}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <BathtubIcon /> {apartment.bathrooms}
            </Typography>
          </Grid>
          <Grid item xs={12} md={5}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <HomeIcon /> {apartment.squareFoot} Sq Ft
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
