// import SignIn from "./Components/SignIn/SignInSide";
// import RegisterSide from "./Components/Register/RegisterSide"
import { ThemeProvider } from "@mui/material/styles";
import { appTheme } from "./Components/AppTheme";
import UserProfileButton from "./Components/UserProfile/UserProfileButton";

function App() {

    return (
        <ThemeProvider theme={appTheme}>
            <div>
            <UserProfileButton />
            </div>
            
            
        </ThemeProvider>
    );
}

export default App;
