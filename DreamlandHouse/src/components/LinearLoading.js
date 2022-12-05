import React from "react";
import { DisabledBackground } from "./DisabledBackground";
import { LinearProgress } from "@mui/material";

export default function LinearLoading({ children }) {
  return (
    <>
      <LinearProgress sx={{ zIndex: 2 }} />
      <DisabledBackground />
    </>
  );
}
