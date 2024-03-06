import { TextField } from "@mui/material";

const EditableCommentField = ({ commentText, setCommentText, placeHolder }) => {
    return (
        <TextField
            multiline
            fullWidth
            minRows={4}
            id="outlined-multilined"
            placeholder={placeHolder}
            value={commentText}
            onChange={(e) => {
                setCommentText(e.target.value);
            }}
        />
    );
};

export default EditableCommentField;
