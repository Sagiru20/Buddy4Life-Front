import { Box, Button } from "@mui/material";

function PageNotFound() {
    return (
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="70vh">
            <Box
                sx={{
                    width: "60%",
                    mb: 10,
                }}
                component="img"
                src="/src/assets/page_not_found.png"
            />

            <Button variant="contained">Go Back To Safety</Button>
        </Box>
    );
}

export default PageNotFound;
