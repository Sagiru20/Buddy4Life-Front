import { createTheme } from "@mui/material/styles";
import { lightGreen, orange } from "@mui/material/colors";

export const appTheme = createTheme({
    palette: {
        mode: "light",
        primary: lightGreen,
        secondary: orange,
        contrastThreshold: 2,
    },
});
