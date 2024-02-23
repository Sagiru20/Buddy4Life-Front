import SignIn from "./Components/SignIn/SignInSide";
import { ThemeProvider } from "@mui/material/styles";
import { appTheme } from "./Components/AppTheme";

function App() {
    return (
        <ThemeProvider theme={appTheme}>
            <SignIn />
        </ThemeProvider>
    );
}

export default App;
