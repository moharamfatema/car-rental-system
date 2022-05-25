import React, { useState } from "react";

import {
  Button,
  TextField,
  Stack,
  Grid,
  Paper,
  Box,
  Alert,
  IconButton,
  MenuItem,
} from "@mui/material";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";

export default function NewCar() {
  const validYear = /^(19|20)[\d]{2}$/;

  let navigate = useNavigate();
  let location = useLocation();
  let params = useParams();

  const statuses = [
    {
      value: "active",
      label: "Active",
    },
    {
      value: "outOfService",
      label: "Out Of Service",
    },
  ];

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
    status: {
      ...statuses[0],
      select: true,
      name: "status",
      label: "Status",
    },
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
        model: {
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
  const url = "http://localhost:80/carrental/newcar.php";
  const onSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("OK");
      fetch(url, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          plateNumber: car.plateNumber.value,
          model: car.model.value,
          brand: car.brand.value,
          year: car.year.value,
          status: car.status.value,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res["error"] === "car exists!") {
            setErrorMsg("Car Already Exists!");
            setOpen("true");
            console.log(res["error"]);
          } else {
            console.log(res);
            navigate("/" + location.search);
          }
        })
        .catch((err) => {
          setErrorMsg("An Error Ocurred! Please Try Again Later.");
          setOpen("true");
          console.log(err);
        });
    }
  };

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid item style={{ padding: "30px" }}>
        <h2 style={{ color: "white" }}>
          {" "}
          Please Fill Out This Form To Register A New Car
        </h2>
      </Grid>
      <Grid item xs={8} md={4}>
        <Paper>
          <Stack spacing={3}>
            <form autocmplete="off" onSubmit={onSubmit} autoComplete="off">
              {Object.entries(car).map((key, value) => {
                if (car[key[0]].name === "status") {
                  return (
                    <Box sx={{ p: 2 }} key={value}>
                      <TextField
                        variant="filled"
                        required
                        fullWidth
                        color="primary"
                        {...car[key[0]]}
                        onChange={onChange}
                      >
                        {statuses.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Box>
                  );
                } else {
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
                }
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
        </Paper>
      </Grid>
    </Grid>
  );
}
