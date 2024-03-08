import { createTheme } from "@mui/material/styles";
import { lightGreen, lightBlue } from "@mui/material/colors";

export const appTheme = createTheme({
    palette: {
        mode: "light",
        primary: lightGreen,
        secondary: lightBlue,
        contrastThreshold: 2,
        background: {
            default: "#E3F4F4",
        },
    },
});
