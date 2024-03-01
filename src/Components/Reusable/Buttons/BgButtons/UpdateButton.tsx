import { Button } from "@mui/material";

const UpdateButton = ({ commentText, editingComm, setEditingComm }) => {
    return (
        <Button
            sx={{
                float: "right",
                bgcolor: "hsl(238, 40%, 52%)",
                color: "#FFF",
                p: "8px 25px",
                "&:hover": {
                    bgcolor: "hsl(239, 57%, 85%)",
                },
            }}
            onClick={() => {
                !commentText.trim()
                    ? alert("If  you want to remove the comment text, just delete the comment.")
                    : setEditingComm(!editingComm);
            }}
        >
            Update
        </Button>
    );
};

export default UpdateButton;
