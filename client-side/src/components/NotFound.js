import { Grid, Button } from "@mui/material";
import { get_theme } from "../Theme";
import { ThemeProvider } from "@mui/private-theming";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
    let navigate = useNavigate();
  return (
    <ThemeProvider theme={get_theme()}>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={12}>
          <h1> Oops!</h1>
          <h2 style={{color:"white", textAlign:"center"}}> You seem to have taken a wrong turn</h2>
        </Grid>
        <Grid item xs={4}>
            <Button 
            variant="contained" 
            color = "primary"
            fullWidth
            style={{fontSize:"larger"}}
            onClick={() => {navigate("/")}}>Back To Home page</Button>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
