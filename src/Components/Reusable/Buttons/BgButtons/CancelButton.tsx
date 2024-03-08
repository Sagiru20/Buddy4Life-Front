import React, { useState } from "react";
import { Button } from "@mui/material";

interface Props {
    commentText: string;
    setCommentText: React.Dispatch<React.SetStateAction<string>>;
    isEditingComm: boolean;
    setIsEditingComm: React.Dispatch<React.SetStateAction<boolean>>;
}

const CancelButton = ({ commentText, setCommentText, isEditingComm, setIsEditingComm }: Props) => {
    const [text] = useState<string>(commentText);

    return (
        <Button
            size="medium"
            variant="contained"
            sx={{
                bgcolor: "hsl(211, 10%, 45%)",
                "&:hover": { bgcolor: "hsl(211, 10%, 45%)" },
            }}
            onClick={(e) => {
                e.preventDefault();
                setCommentText(text);
                setIsEditingComm(!isEditingComm);
            }}
        >
            Cancel
        </Button>
    );
};

export default CancelButton;
