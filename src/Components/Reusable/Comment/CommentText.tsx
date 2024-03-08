import { Typography } from "@mui/material";

interface Props {
    text: string;
}

const CommentText = ({ text }: Props) => {
    return <Typography sx={{ color: "hsl(211, 10%, 45%)", p: "20px 0" }}>{text}</Typography>;
};

export default CommentText;
