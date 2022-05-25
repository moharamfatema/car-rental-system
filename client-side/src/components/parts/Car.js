import React from "react";

import { Paper, Grid, Divider } from "@mui/material";

export default function Car(props) {
  return (
    <Paper>
      <Grid container direction={"column"} maxWidth={"100vw"}>
        {Object.entries(props).map(([key, value]) => (
          <div key={key}>
            <Grid item>
              <h3>
                {key}: {value}
              </h3>
            </Grid>
            <Divider />
          </div>
        ))}
      </Grid>
    </Paper>
  );
}
