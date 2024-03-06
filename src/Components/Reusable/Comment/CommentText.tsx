import { Typography } from "@mui/material";

const CommentText = ({ commentText }) => {
    return <Typography sx={{ color: "hsl(211, 10%, 45%)", p: "20px 0" }}>{commentText}</Typography>;
};

export default CommentText;
