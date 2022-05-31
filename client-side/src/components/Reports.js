import { Grid, Paper, TextField, Box, Stack, Button } from "@mui/material";
import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import NavBar from "./parts/NavBar";

export default function Reports() {
  const format = [
    { year: "numeric" },
    { month: "2-digit" },
    { day: "2-digit" },
  ];

  const join = (t, a, s) => {
    function format(m) {
      let f = new Intl.DateTimeFormat("en", m);
      return f.format(t);
    }
    return a.map(format).join(s);
  };
  const current = (offset = 0) => {
    return join(new Date().setDate(new Date().getDate() + offset), format, "-");
  };
  const navigate = useNavigate();
  const [reportOneInputs, setReportOneInputs] = useState({
    fromDate: {
      value: current(),
      name: "fromDate",
      label: "From",
      helperText: "",
      error: false,
      type: "date",
      required: true,
    },
    toDate: {
      value: current(5),
      name: "toDate",
      label: "To",
      helperText: "",
      error: false,
      type: "date",
      required: true,
    },
  });
  const [reportTwoInputs, setReportTwoInputs] = useState({
    fromDate: {
      value: current(),
      name: "fromDate",
      label: "From",
      helperText: "",
      error: false,
      type: "date",
      required: true,
    },
    toDate: {
      value: current(5),
      name: "toDate",
      label: "To",
      helperText: "",
      error: false,
      type: "date",
      required: true,
    },
    plateNumber: {
        value: "",
        name: "plateNumber",
        label: "Car Plate Number",
        helperText: "",
        error: false,
        type: "text",
        required: true,
      },
  });
  const [reportThreeInputs, setReportThreeInputs] = useState({
    customerId: {
        value: "",
        name: "customerId",
        label: "Customer ID",
        helperText: "",
        error: false,
        type: "text",
        required: true,
      },
  });
  const reportOneText =
    "All reservations within a specified period including all car and customer information.";
  const reportTwoText =
    "All reservations of any car within a specified period including all car information.";
    const reportThreeText =
      "All reservations of specific customer including customer information, car model and plate id.";
  const reportOneUrl =
    "https://localhost:80/carrental/All_reservations_within_period.php";
  const reportTwoUrl =
    "https://localhost:80/carrental/All_reservations_of_any_car_within_period.php";
    const reportThreeUrl =
    "https://localhost:80/carrental/All_reservations_of_specific_customer.php";
  if (sessionStorage.getItem("isAdmin") === "True") {
    return (
        <>
        <NavBar current="reports"/>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh" }}
        rowSpacing={3}
        direction='column'
      >
        <Grid item>
          <Paper style={{ padding: "15px" }}>
            <Stack spacing={3}>
              <Box>
                <p>{reportTwoText}</p>
              </Box>
              <Box>
                <TextField
                  fullWidth
                  {...reportTwoInputs.plateNumber}
                  onChange={(e) => {
                    setReportTwoInputs({
                      ...reportTwoInputs,
                      plateNumber: {
                        ...reportTwoInputs["plateNumber"],
                        value: e.target.value,
                      },
                    });
                  }}
                />
              </Box>
              <Box>
                <TextField
                  fullWidth
                  {...reportTwoInputs.fromDate}
                  onChange={(e) => {
                    setReportTwoInputs({
                      ...reportTwoInputs,
                      fromDate: {
                        ...reportTwoInputs["fromDate"],
                        value: e.target.value,
                      },
                    });
                  }}
                />
              </Box>
              <Box>
                <TextField
                  fullWidth
                  {...reportTwoInputs.toDate}
                  onChange={(e) => {
                    setReportTwoInputs({
                      ...reportTwoInputs,
                      toDate: {
                        ...reportTwoInputs["toDate"],
                        value: e.target.value,
                      },
                    });
                  }}
                />
              </Box>
              <Box>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={(e) => {
                    console.log("Report One:");
                    let inputs = {
                      FromDate: reportTwoInputs.fromDate.value,
                      ToDate: reportTwoInputs.toDate.value,
                      plateNumber: reportTwoInputs.plateNumber.value,
                    };
                    console.log(inputs);
                    fetch(reportTwoUrl, {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify(inputs),
                    })
                      .then((res) => res.json())
                      .then((res) => {
                        console.log(res);
                        navigate("/reservations", res);
                      });
                  }}
                >
                  Request Report
                </Button>
              </Box>
            </Stack>
          </Paper>
        </Grid>
        <Grid item>
          <Paper style={{ padding: "10px" }}>
            <Stack spacing={3}>
              <Box>
                <p>{reportOneText}</p>
              </Box>
              <Box>
                <TextField
                  fullWidth
                  {...reportOneInputs.fromDate}
                  onChange={(e) => {
                    setReportOneInputs({
                      ...reportOneInputs,
                      fromDate: {
                        ...reportOneInputs["fromDate"],
                        value: e.target.value,
                      },
                    });
                  }}
                />
              </Box>
              <Box>
                <TextField
                  fullWidth
                  {...reportOneInputs.toDate}
                  onChange={(e) => {
                    setReportOneInputs({
                      ...reportOneInputs,
                      toDate: {
                        ...reportOneInputs["fromDate"],
                        value: e.target.value,
                      },
                    });
                  }}
                />
              </Box>
              <Box>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={(e) => {
                    console.log("Report One:");
                    let inputs = {
                      FromDate: reportOneInputs.fromDate.value,
                      ToDate: reportOneInputs.toDate.value,
                    };
                    console.log(inputs);
                    fetch(reportOneUrl, {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify(inputs),
                    })
                      .then((res) => res.json())
                      .then((res) => {
                        console.log(res);
                        navigate("/reservations", res);
                      });
                  }}
                >
                  Request Report
                </Button>
              </Box>
            </Stack>
          </Paper>
        </Grid>
        <Grid item>
          <Paper style={{ padding: "15px" }}>
            <Stack spacing={3}>
              <Box>
                <p>{reportThreeText}</p>
              </Box>
              <Box>
                <TextField
                  fullWidth
                  {...reportThreeInputs.customerId}
                  onChange={(e) => {
                    setReportThreeInputs({
                      ...reportThreeInputs,
                      customerId: {
                        ...reportThreeInputs["customerId"],
                        value: e.target.value,
                      },
                    });
                  }}
                />
              </Box>
              <Box>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={(e) => {
                    console.log("Report Three:");
                    let inputs = {
                      CustomerId: reportThreeInputs.customerId.value,
                    };
                    console.log(inputs);
                    fetch(reportThreeUrl, {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify(inputs),
                    })
                      .then((res) => res.json())
                      .then((res) => {
                        console.log(res);
                        navigate("/reservations", res);
                      });
                  }}
                >
                  Request Report
                </Button>
              </Box>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
      </>
    );
  } else {
    return <Navigate to="/404" replace={true} />;
  }
}
