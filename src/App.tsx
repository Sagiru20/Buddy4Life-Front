import { ThemeProvider } from "@mui/material/styles";
import { appTheme } from "./Components/AppTheme";
import Navbar from "./Components/Navbar";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Posts from "./Components/Pages/Posts";
import Breeds from "./Components/Pages/Breeds";
import PageNotFound from "./Components/Pages/PageNotFound";
import { Box, CssBaseline } from "@mui/material";
import Post from "./Components/Pages/Post";
import SignIn from "./Components/Pages/SignIn";
import RegisterSide from "./Components/Pages/Register";

function App() {
    return (
        <ThemeProvider theme={appTheme}>
            <CssBaseline />
            <Box>
                <BrowserRouter>
                    <Navbar />

                    <Routes>
                    <Route path="/register" element={<RegisterSide />} />
                        <Route path="/login" element={<SignIn />} />
                        <Route path="/" element={<Outlet />}>
                            <Route index element={<Navigate to="posts" />} />
                            <Route path="posts" element={<Posts />} />
                            <Route path="posts/:id" element={<Post />} />
                            <Route path="breeds" element={<Breeds />} />
                            <Route path="*" element={<PageNotFound />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </Box>
        </ThemeProvider>
    );
}

export default App;
