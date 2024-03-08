import { Button } from "@mui/material";

const SendButton = ({ setCommentTxt, commentTxt }) => {
    return (
        <Button
            size="large"
            variant="contained"
            color="secondary"
            // onClick={(e) => {
            //     !commentTxt.trim() ? e.preventDefault() : addComment(commentTxt.trim());
            //     setCommentTxt("");
            // }}
        >
            Send
        </Button>
    );
};

export default SendButton;
