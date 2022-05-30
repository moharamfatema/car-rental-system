import React , {useState} from "react";
import {
  Paper,
  Grid,
  Divider,
  Button,
  Box,
  TextField,
  MenuItem,
} from "@mui/material";
export default function Reservation(props) {
  const statuses = [
    {
      value:"reserved",
      label:"Reserved",
    },
    {
      value: "rented",
      label: "Rented",
    },
    {
      value: "returned",
      label: "Returned",
    },
  ];
  const initialStatusIdx = () => {
    switch (props.booking_status) {
      case "rented":
        return 1;
      case "reserved":
        return 0;
      case "returned":
        return 2;
      default:
          return -1;
      }
  };
  const [booking_status, setStatus] = useState({
    ...statuses[initialStatusIdx()],
    label: "Booking Status",
  });


  const urlstatusupdate = "http://localhost:80/carrental/updateReservationStatus.php";
  const payurl =  "http://localhost:80/carrental/pay.php";
  const Pay = () => {
    if (sessionStorage.getItem("customerId") !== null) {
      return (
        <Grid item sx={{ p: 2 }} key="reserveBtn">
          <Button
            variant="contained"
            fullWidth
            onClick={(e) => {
              fetch(payurl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({...props, reservation_id:props['reservation_id']}),
              });
            }}
          >
            Pay
          </Button>
        </Grid>
      );
    }
  };
  const UpdateStatus = ({ value }) => {

      return (
        <div key={"booking_status"}>
          <Grid item sx={{ p: 2 }} >
            <Box marginBottom={2}>
              <TextField
                variant="filled"
                fullWidth
                color="primary"
                select
                name="booking_status"
                label="Booking Status"
                {...booking_status}
                onChange={(e) => {
                  setStatus({ ...booking_status, value: e.target.value });
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
                    reservation_id: props["reservation_id"],
                    booking_status: booking_status,
                  }),
                });
              }}
            >
              Update Status
            </Button>
          </Grid>
          <Divider />
        </div>
      );
  };
  
  return (
    <Paper>
      <Grid container direction={'column'} maxWidth={'100vw'}>
      {Object.entries(props).map(([key, value]) => {
          if (key === "booking_status") {
            return <UpdateStatus value={value} />;
          } else if (key === "payment_status") {
            return <Pay value={value} />;
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
        {<Pay />}
      </Grid>
    </Paper>
  );
}
