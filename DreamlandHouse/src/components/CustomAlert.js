import React, { useState } from "react";
import { Alert, AlertTitle, Collapse } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
export default function CustomAlert({
  type,
  title,
  subtitle,
  message,
  show,
  collapse,
  setAlertClose,
}) {
  return (
    <Collapse in={show}>
      <Alert
        severity={type}
        sx={{ width: "100%", mb: 2, textAlign: "left" }}
        action={
          collapse ? (
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={setAlertClose}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          ) : null
        }
      >
        <AlertTitle>{title}</AlertTitle>
        {subtitle && (
          <>
            <strong>{subtitle}</strong>
            <br />
          </>
        )}
        {message}
      </Alert>
    </Collapse>
  );
}
