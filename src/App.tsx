import { Navigate, Outlet, useRoutes } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { appTheme } from "./Components/AppTheme";
import RequireAuth from "./Components/RequireAuth";
import SignIn from "./Components/Pages/SignIn";
import Register from "./Components/Pages/Register";
import Navbar from "./Components/Navbar";
import PageNotFound from "./Components/Pages/PageNotFound";
import Posts from "./Components/Pages/Posts";
import Breeds from "./Components/Pages/Breeds";
import Post from "./Components/Pages/Post";

const Layout = () => (
    <>
        <Navbar />
        <Outlet />
    </>
);

function Routes() {
    const element = useRoutes([
        { path: "/signin", element: <SignIn /> },
        { path: "/register", element: <Register /> },
        {
            element: <RequireAuth />,
            children: [
                {
                    path: "/",
                    element: <Layout />,
                    children: [
                        {
                            index: true,
                            element: <Navigate to="posts" />,
                        },
                        { path: "posts", element: <Posts /> },
                        { path: "posts/:id", element: <Post /> },
                        { path: "breeds", element: <Breeds /> },
                    ],
                },
            ],
        },
        { path: "*", element: <PageNotFound /> },
    ]);

    return element;
}

function App() {
    return (
        <ThemeProvider theme={appTheme}>
            <CssBaseline />
            <Routes />
        </ThemeProvider>
    );
}

export default App;
