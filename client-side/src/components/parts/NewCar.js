import { useState } from "react";
import React from "react";

import {
  Button,
  TextField,
  Stack,
  Box,
  Alert,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function NewCar() {
  const [open, setOpen] = useState(false);

  const [errorMsg, setErrorMsg] = useState("Invalid Input!");

  const [car, setCar] = useState({
    plateNumber: {
      value: "",
      type: "text",
      name: "plateNumber",
      label: "Plate Number",
      error: false,
      helperText: "",
    },
    model: {
      value: "",
      type: "text",
      name: "model",
      label: "Model",
      error: false,
      helperText: "",
    },
    brand: {
      value: "",
      type: "text",
      name: "brand",
      label: "Brand",
      error: false,
      helperText: "",
    },
    year: {
      value: new Date().getFullYear(),
      name: "year",
      label: "Year",
      views: ["year"],
      error: false,
      helperText: "",
    },
  });
  const onSubmit = () => {};
  const onChange = (e) => {
    let key = e.target.name;
    setCar({
      ...car,
      [key]: {
        ...car[key],
        value: e.target.value,
        error: false,
        helperText: "",
      },
    });
  };
  const shouldDisableYear = (year) => {
    return year <= 2 + new Date().getFullYear() || year >= 1900;
  };

  return (
    <Stack spacing={3}>
      <form autocmplete="off" onSubmit={onSubmit} autoComplete="off">
        {Object.entries(car).map((key, value) => {
          return (
            <Box sx={{ p: 2 }} key={value}>
              <TextField
                variant="filled"
                required
                fullWidth
                color="primary"
                {...car[key[0]]}
                onChange={onChange}
              />
            </Box>
          );
        })}
        <Box sx={{ p: 2 }}>
          <Button
            variant="contained"
            type="submit"
            fullWidth
            color="primary"
            onClick={onSubmit}
          >
            Add Car
          </Button>
        </Box>
        <Box sx={{ p: 2 }}>
          {open ? (
            <Alert
              show={open}
              severity="error"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              {errorMsg}
            </Alert>
          ) : (
            <></>
          )}
        </Box>
      </form>
    </Stack>
  );
}
