// import SignIn from "./Components/SignIn/SignInSide";
import RegisterSide from "./Components/Register/RegisterSide"
import { ThemeProvider } from "@mui/material/styles";
import { appTheme } from "./Components/AppTheme";

function App() {
    return (
        <ThemeProvider theme={appTheme}>
            <RegisterSide />
        </ThemeProvider>
    );
}

export default App;
