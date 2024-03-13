import { Avatar, Box, Button, Card, Stack } from "@mui/material";
import { useState } from "react";
import EditableCommentField from "./Reusable/Comment/EditableCommentField";
import useAuth from "../hooks/useAuth";

interface Props {
    handleSubmit: (text: string) => void;
}

const AddComment = ({ handleSubmit }: Props) => {
    const { auth } = useAuth();
    const [commentText, setCommentText] = useState("");

    return (
        <Card style={{ backgroundColor: "#f5f5f5" }}>
            <Box sx={{ p: 2 }}>
                <Stack direction="row" spacing={2} alignItems="flex-start">
                    <Avatar src={auth.userInfo?.imageUrl} />

                    <EditableCommentField
                        text={commentText}
                        setCommentText={setCommentText}
                        placeHolder="Add a comment"
                    />

                    <Button
                        size="large"
                        variant="contained"
                        color="secondary"
                        disabled={commentText.length === 0 || !commentText.trim()}
                        onClick={(e) => {
                            !commentText.trim() ? e.preventDefault() : handleSubmit(commentText.trim());
                            setCommentText("");
                        }}
                    >
                        Send
                    </Button>
                </Stack>
            </Box>
        </Card>
    );
};

export default AddComment;
