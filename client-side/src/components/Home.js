import React, { useState } from "react";
import Login from "./parts/Login";

import Signup from "./parts/Signup";
import {
  Box,
  Tabs,
  Tab,
  Paper,
  Grid,
  BottomNavigation,
  Button,
} from "@mui/material";
import PropTypes from "prop-types";

import { useNavigate } from "react-router-dom";
export default function Home() {
  const [navBarValue, setNavBarValue] = useState(0);
  const navigate = useNavigate();

  function TabPanel(props) {
    const { children, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <span>{children}</span>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const [value, setValue] = React.useState(0);

  const handleChange = (_event, newValue) => {
    setValue(newValue);
  };
  if (sessionStorage.getItem("customerId") === null) {
    return (
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item style={{ padding: "30px" }}>
          <h1> Your Rental Car Is One Click Away</h1>
        </Grid>
        <Grid item xs={8} md={4}>
          <Paper>
            <Tabs
              value={value}
              onChange={handleChange}
              textColor="primary"
              indicatorColor="primary"
              variant="fullWidth"
            >
              <Tab label="Login" color="primary" />
              <Tab label="Sign Up" />
            </Tabs>
            <TabPanel value={value} index={0} {...a11yProps(0)}>
              <Login />
            </TabPanel>
            <TabPanel value={value} index={1} {...a11yProps(1)}>
              <Signup />
            </TabPanel>
          </Paper>
        </Grid>
      </Grid>
    );
  } else {
    return (
      <BottomNavigation
        showLabels
        value={navBarValue}
        onChange={(event, newValue) => {
          setNavBarValue(newValue);
        }}
        style = {{backgroundColor:'rgba(0,0,0,0.5)'}}
      >
        <Button
          variant="outlined"
          onClick={(e) => {
            sessionStorage.clear();
            console.log("Logging out");
            navigate("/", { replace: true });
          }}
        >
          Log Out
        </Button>
      </BottomNavigation>
      // <Navigate to="newcar" replacement={true} />
    );
  }
}
