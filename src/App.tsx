import SignIn from "./Components/SignIn/SignInSide";
import AddPost from "./Components/Posts/AddPost";
import { ThemeProvider } from "@mui/material/styles";
import { appTheme } from "./Components/AppTheme";
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {

    return (
        <ThemeProvider theme={appTheme}>
            <BrowserRouter>
                <Routes>
                    <Route path="login" element={<SignIn />} />
                    <Route path="addpost" element={<AddPost />} />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
