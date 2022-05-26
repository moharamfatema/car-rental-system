import { React, useState } from "react";
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
import {
  useParams,
  useNavigate,
  useLocation,
  Navigate,
} from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
export default function CarSearch() {
  const validYear = /^(19|20)[\d]{2}$/;
  const statuses = [
    {
      value: "",
      label: "Status",
    },
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
      value: "",
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
    setCar((oldcar) => ({
      ...oldcar,
      brand: {
        ...oldcar["brand"],
        value: car.brand.value.trim(),
      },
    }));

    setCar((oldcar) => ({
      ...oldcar,
      model: {
        ...oldcar["model"],
        value: car.model.value.trim(),
      },
    }));

    if (car.year.value.trim() && !validYear.test(car.year.value)) {
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
  const url = "https://localhost:80/carrental/carsearch.php"; // TODO
  const onSubmit = (e) => {
    e.preventDefault();
    let searchkeys = {};
    Object.entries(car).map((key, value) => {
      if (car[key[0]].value.trim() !== "") {
        searchkeys[car[key[0]].name] = car[key[0]].value;
      }
    });
    if (Object.keys(searchkeys).length === 0) {
      setErrorMsg("Please enter at least one value to search with!");
      setOpen("true");
      console.log("Empty entries");
    } else if (validate()) {
      console.log("OK");
      console.log(searchkeys);
      fetch(url, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(searchkeys),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res["error"] === "no results") {
            setErrorMsg("No Results!");
            setOpen("true");
            console.log(res["error"]);
          } else {
            console.log(res);
            // navigate("/" + location.search);
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
          Please Enter The Values You'd Like To Search For
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
                  Search
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