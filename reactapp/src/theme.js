import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#4CAF50", // green
    },
    secondary: {
      main: "#FF9800", // orange
    },
  },
  typography: {
    fontFamily: "Roboto, Arial",
  },
});

export default theme;
