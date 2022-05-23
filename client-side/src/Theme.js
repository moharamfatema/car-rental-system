import { createTheme } from "@mui/material/styles";

let theme = createTheme({
  palette: {
    mode: "dark",
  },
});

export function get_theme() {
  return theme;
}
