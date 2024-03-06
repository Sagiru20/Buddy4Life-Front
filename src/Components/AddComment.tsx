import { Avatar, Card, Stack } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import EditableCommentField from "./Reusable/Comment/EditableCommentField";
import SendButton from "./Reusable/Buttons/BgButtons/SendButton";

const AddComment = () => {
    const [commentTxt, setCommentTxt] = useState();

    return (
        <Card style={{ backgroundColor: "#f5f5f5" }}>
            <Box sx={{ p: 2 }}>
                <Stack direction="row" spacing={2} alignItems="flex-start">
                    <Avatar src="/static/images/avatar/2.jpg" />

                    <EditableCommentField
                        commentText={commentTxt}
                        setCommentText={setCommentTxt}
                        placeHolder="Add a comment"
                    />

                    <SendButton commentTxt={commentTxt} setCommentTxt={setCommentTxt} />
                </Stack>
            </Box>
        </Card>
    );
};

export default AddComment;
