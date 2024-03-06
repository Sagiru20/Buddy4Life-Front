import { Typography } from "@mui/material";

const CreatedAt = ({ createdAt }) => {
    return <Typography sx={{ color: "hsl(211, 10%, 45%)" }}>{createdAt}</Typography>;
};

export default CreatedAt;
