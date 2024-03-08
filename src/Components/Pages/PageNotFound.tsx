import { Box, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

function PageNotFound() {
    return (
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="70vh">
            <Box
                sx={{
                    height: "50%",
                    mb: 10,
                }}
                component="img"
                src="/src/assets/page_not_found.png"
            />

            <Button variant="contained" component={RouterLink} to={"/posts"}>
                Go Back To Safety
            </Button>
        </Box>
    );
}

export default PageNotFound;
