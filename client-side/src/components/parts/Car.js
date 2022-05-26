import React, { useState } from "react";

import {
  Paper,
  Grid,
  Divider,
  Button,
  Box,
  TextField,
  MenuItem,
} from "@mui/material";

export default function Car(props) {
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
  const initialStatusIdx = () => {
    if (props.Status === "Active") {
      return 0;
    } else {
      return 1;
    }
  };
  const [status, setStatus] = useState({
    ...statuses[initialStatusIdx()],
    label: "Status",
  });
  const getDisplayProps = () => {
    var displayProps = {...props};
    if (props.plate_number) {
      displayProps["Plate Number"] = displayProps["plate_number"];
      delete displayProps["plate_number"];
    }
    return displayProps;
  };
  const urlstatusupdate = "http://localhost:80/carrental/updateCarStatus.php";
  const carreserveurl = "http://localhost:80/carrental/reserveCar.php";
  const Reserve = () => {
    if (sessionStorage.getItem("customerId") !== null) {
      return (
        <Grid item sx={{ p: 2 }} key="reserveBtn">
          <Button
            variant="contained"
            fullWidth
            onClick={(e) => {
              fetch(carreserveurl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(props),
              });
            }}
          >
            Make Reservation
          </Button>
        </Grid>
      );
    }
  };
  const UpdateStatus = ({ value }) => {
    if (sessionStorage.getItem("isAdmin") === "True") {
      return (
        <div key={"Status"}>
          <Grid item sx={{ p: 2 }} >
            <Box marginBottom={2}>
              <TextField
                variant="filled"
                fullWidth
                color="primary"
                select
                name="status"
                label="Status"
                {...status}
                onChange={(e) => {
                  setStatus({ ...status, [value]: e.target.value });
                }}
              >
                {statuses.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
            <Button
              fullWidth
              variant="contained"
              onClick={(e) => {
                fetch(urlstatusupdate, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    plate_number: props["Plate Number"],
                    status: status,
                  }),
                });
              }}
            >
              Update Car Status
            </Button>
          </Grid>
          <Divider />
        </div>
      );
    } else {
      return (
        <div key={"Status"}>
          <Grid item sx={{ p: 2 }}>
            <p>
              {"Status"}: {value}
            </p>
          </Grid>
          <Divider />
        </div>
      );
    }
  };

  return (
    <Paper>
      <Grid container direction={"column"} maxWidth={"100vw"}>
        {Object.entries(getDisplayProps()).map(([key, value]) => {
          if (key === "Status") {
            return <UpdateStatus value={value} />;
          } else {
            return (
              <div key={key}>
                <Grid item sx={{ p: 2 }}>
                  <p>
                    {key}: {value}
                  </p>
                </Grid>
                <Divider />
              </div>
            );
          }
        })}
        {<Reserve />}
      </Grid>
    </Paper>
  );
}
