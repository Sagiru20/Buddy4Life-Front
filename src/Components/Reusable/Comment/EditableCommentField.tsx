import React from "react";
import { TextField } from "@mui/material";

interface Props {
    text: string;
    setCommentText: React.Dispatch<React.SetStateAction<string>>;
    placeHolder: string;
}

const EditableCommentField = ({ text, setCommentText, placeHolder }: Props) => {
    return (
        <TextField
            multiline
            fullWidth
            minRows={4}
            id="outlined-multilined"
            placeholder={placeHolder}
            value={text}
            onChange={(e) => {
                setCommentText(e.target.value);
            }}
            sx={{ mt: 2 }}
        />
    );
};

export default EditableCommentField;
