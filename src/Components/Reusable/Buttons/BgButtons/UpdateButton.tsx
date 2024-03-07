import React from "react";
import { Button } from "@mui/material";

interface Props {
    text: string;
    setCommentText: React.Dispatch<React.SetStateAction<string>>;
    isEditingComm: boolean;
    setIsEditingComm: React.Dispatch<React.SetStateAction<boolean>>;
    onEdit: (text: string) => void;
}

const UpdateButton = ({ text, setCommentText, isEditingComm, setIsEditingComm, onEdit }: Props) => {
    return (
        <Button
            size="medium"
            variant="contained"
            color="secondary"
            disabled={text.length === 0 || !text.trim()}
            onClick={(e) => {
                !text.trim() ? e.preventDefault() : onEdit(text.trim());
                setCommentText(text.trim());
                setIsEditingComm(!isEditingComm);
            }}
        >
            Update
        </Button>
    );
};

export default UpdateButton;
