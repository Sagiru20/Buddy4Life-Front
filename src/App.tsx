import SignIn from "./Components/SignIn/SignInSide";
import AddPostParent from "./Components/Posts/AddPostParent";
import { ThemeProvider } from "@mui/material/styles";
import { appTheme } from "./Components/AppTheme";
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {

    return (
        <ThemeProvider theme={appTheme}>
            <BrowserRouter>
                <Routes>
                    <Route path="login" element={<SignIn />} />
                    <Route path="addpost" element={<AddPostParent />} />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
