// import SignIn from "./Components/SignIn/SignInSide";
import { ThemeProvider } from "@mui/material/styles";
import { appTheme } from "./Components/AppTheme";
import AddPostParent from "./Components/Posts/AddPostParent"

function App() {
    return (
        <ThemeProvider theme={appTheme}>
            <AddPostParent />
        </ThemeProvider>
    );
}

export default App;
