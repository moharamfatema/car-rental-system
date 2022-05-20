import React from "react";
import Login from "./Login";

import Signup from "./Signup";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box, Tabs, Tab, Paper, Grid } from "@mui/material";
import PropTypes from "prop-types";

export default function Home() {
  const theme = createTheme({
    palette: {
      mode: "dark",
    },
  });

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

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item style={{padding: "30px"}}>
            <h1> Your Rental Car Is One Click Away</h1>
        </Grid>
        <Grid item xs={4}>
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
    </ThemeProvider>
  );
}
