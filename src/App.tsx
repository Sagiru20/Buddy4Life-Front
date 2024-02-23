import { ThemeProvider } from "@mui/material/styles";
import { appTheme } from "./Components/AppTheme";
import Navbar from "./Components/Navbar";

function App() {
    return (
        <ThemeProvider theme={appTheme}>
            <Navbar />
        </ThemeProvider>
    );
}

export default App;
