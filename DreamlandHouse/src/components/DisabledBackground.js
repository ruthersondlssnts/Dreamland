import React from "react";

import { Box } from "@mui/material";
import { styled } from "@mui/system";

export const DisabledBackground = styled(Box)({
  width: "100%",
  height: "100%",
  position: "fixed",
  background: "#ccc",
  opacity: 0.5,
  zIndex: 1,
});
