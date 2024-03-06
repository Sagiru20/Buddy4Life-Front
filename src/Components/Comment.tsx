import { useState } from "react";
import { Avatar, Card, Stack } from "@mui/material";
import { Box } from "@mui/system";
import ConfirmDelete from "./ConfirmDelete";
import Username from "./Reusable/Username";
import CreatedAt from "./Reusable/CreatedAt";
import CommentText from "./Reusable/Comment/CommentText";
import EditableCommentField from "./Reusable/Comment/EditableCommentField";
import EditButton from "./Reusable/Buttons/TextButtons/EditButton";
import DeleteButton from "./Reusable/Buttons/TextButtons/DeleteButton";
import UpdateButton from "./Reusable/Buttons/BgButtons/UpdateButton";
import { IComment } from "../Models";

const Comment = ({ _id, text, updatedAt }: IComment) => {
    // const userName = user.username;
    const userName = "Annonuymus";
    const ava = "/static/images/avatar/2.jpg";

    // const [clicked, setClicked] = useState(false);
    const [editingComm, setEditingComm] = useState(false);
    const [commentText, setCommentText] = useState(text);
    const [openModal, setOpenModal] = useState(false);

    const handleOpen = () => {
        setOpenModal(true);
    };

    const handleClose = () => {
        setOpenModal(false);
    };

    return (
        <>
            <ConfirmDelete onOpen={openModal} onClose={handleClose} id={_id} />

            <Card style={{ backgroundColor: "#f5f5f5" }}>
                <Box sx={{ p: 2 }}>
                    <Stack spacing={2} direction="row">
                        <Box sx={{ width: "100%" }}>
                            <Stack spacing={2} direction="row" justifyContent="space-between" alignItems="center">
                                <Stack spacing={2} direction="row" alignItems="center">
                                    <Avatar src={ava} />

                                    <Username userName={userName} />

                                    <CreatedAt createdAt={updatedAt} />
                                </Stack>

                                {userName === "Annonuymus" && (
                                    <Stack direction="row" spacing={1}>
                                        <DeleteButton functionality={() => handleOpen()} />

                                        <EditButton
                                            functionality={() => setEditingComm(!editingComm)}
                                            editingComm={editingComm}
                                        />
                                    </Stack>
                                )}
                            </Stack>

                            {editingComm ? (
                                <>
                                    <EditableCommentField
                                        commentText={commentText}
                                        setCommentText={setCommentText}
                                        placeHolder="Don't leave this blank!"
                                    />

                                    <UpdateButton
                                        commentText={commentText}
                                        editingComm={editingComm}
                                        setEditingComm={setEditingComm}
                                    />
                                </>
                            ) : (
                                <CommentText commentText={commentText} />
                            )}
                        </Box>
                    </Stack>
                </Box>
            </Card>
        </>
    );
};
export default Comment;
