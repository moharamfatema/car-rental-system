import React, { useState } from "react";

import {
  Button,
  TextField,
  Stack,
  Box,
  Alert,
  IconButton,
  MenuItem
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function NewCar() {
  const validYear = /^(19|20)[\d]{2}$/;

  const statuses = [
    {
      value: 'active',
      label: 'Active'
    },
    {
      value: 'outOfService',
      label:'Out Of Service'
    }
  ]

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
      inputProps: { inputMode: "numeric", pattern: validYear },
      error: false,
      helperText: "",
    },
    status:{
      ...statuses[0],
      select: true,
      name: 'status',
      label:'Status'

    }
  });
  
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
  const validate = () => {
    let err = false;
    if (!car.plateNumber.value.trim()) {
      setCar((oldcar) => ({
        ...oldcar,
        plateNumber: {
          ...oldcar["plateNumber"],
          error: true,
          helperText: "Plate Number cannot be empty!",
        },
      }));

      err = true;
    }
    if (!car.brand.value.trim()) {
      setCar((oldcar) => ({
        ...oldcar,
        brand: {
          ...oldcar["brand"],
          error: true,
          helperText: "Brand cannot be empty!",
        },
      }));

      err = true;
    } else {
      setCar((oldcar) => ({
        ...oldcar,
        brand: {
          ...oldcar["brand"],
          value: car.brand.value.trim(),
        },
      }));
    }
    if (!car.model.value.trim()) {
      setCar((oldcar) => ({
        ...oldcar,
        model: {
          ...oldcar["model"],
          error: true,
          helperText: "Model cannot be empty!",
        },
      }));

      err = true;
    } else {
      setCar((oldcar) => ({
        ...oldcar,
        brand: {
          ...oldcar["model"],
          value: car.model.value.trim(),
        },
      }));
    }
    if (!validYear.test(car.year.value)) {
      setCar((prevState) => ({
        ...prevState,
        year: {
          ...prevState["year"],
          error: true,
          helperText: "Please enter a valid Year!",
        },
      }));
      err = true;
    }

    return !err;
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (validate()){console.log(car);}
    
  };

  return (
    <Stack spacing={3}>
      <form autocmplete="off" onSubmit={onSubmit} autoComplete="off">
        {Object.entries(car).map((key, value) => {
          if (car[key[0]].name === 'status'){
            return(
              <Box sx={{ p: 2 }} key={value}>
              <TextField
                variant="filled"
                required
                fullWidth
                color="primary"
                {...car[key[0]]}
                onChange={onChange}>
                  {statuses.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              
            </Box>
            );
          }else{
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
          );}
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
