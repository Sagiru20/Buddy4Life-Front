import { Typography } from "@mui/material";

const Username = ({ userName }: { userName: string }) => {
    return (
        <Typography fontWeight="bold" sx={{ color: "hsl(212, 24%, 26%)" }}>
            {userName}
        </Typography>
    );
};

export default Username;
