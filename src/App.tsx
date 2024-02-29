import { ThemeProvider } from "@mui/material/styles";
import { appTheme } from "./Components/AppTheme";
import Navbar from "./Components/Navbar";
import SignInSide from "./Components/Pages/SignInSide";
import { RouterProvider, createBrowserRouter, BrowserRouter, Router, Routes, Route } from "react-router-dom";
import RegisterSide from "./Components/Register/RegisterSide";
import Posts from "./Components/Pages/Posts";
import Breeds from "./Components/Pages/Breeds";


function App() {

    const router = createBrowserRouter([
        {
          path: "/login",
          element: <SignInSide />,
        },
        {
          path: "/register",
          element: <RegisterSide />,
        },
        {
          element: <Navbar />,
          path: "/",
          children: [
            {
              path: "/posts",
              element: <Posts />,
            },
            {
              path: "/breeds",
              element: <Breeds />,
            },
          ],
        },
      ]);
   

    return (
        <ThemeProvider theme={appTheme}>
             {/* <BrowserRouter>
                <Navbar>
                    <Routes>
                        <Route path="/explore"> 
                        <Route path="posts" element={<Posts />} />
                        <Route path="breeds" element={<Breeds />} />
                        </Route>
                    </Routes>
                </Navbar>        
                <Routes>
                {/* <Route path="/explore" element={<Navbar />} /> 
                <Route path="/explore"> 
                  <Route path="posts" element={<Posts />} />
                  <Route path="breeds" element={<Breeds />} />
                  <Route path="myposts" element={<Breeds />} />
                </Route> */}
                {/* <Route index path="login" element={<SignInSide />} /> */}
                {/* <Route path="register" element={<RegisterSide />} /> */}
                {/* </Routes> */}
            
            {/* </BrowserRouter> */} 
            <RouterProvider router={router} />
        </ThemeProvider>
    );
}

export default App;
