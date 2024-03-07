import { useState } from "react";
import { Avatar, Box, Card, Stack, Typography } from "@mui/material";
import ConfirmDelete from "./ConfirmDelete";
import CommentText from "./Reusable/Comment/CommentText";
import EditableCommentField from "./Reusable/Comment/EditableCommentField";
import EditButton from "./Reusable/Buttons/TextButtons/EditButton";
import DeleteButton from "./Reusable/Buttons/TextButtons/DeleteButton";
import UpdateButton from "./Reusable/Buttons/BgButtons/UpdateButton";
import CancelButton from "./Reusable/Buttons/BgButtons/CancelButton";
import { IComment } from "../Models";

interface Props {
    comment: IComment;
    handleDelete: (commentId: string) => void;
    handleEdit: (commentId: string, text: string) => void;
}

const Comment = ({ comment, handleDelete, handleEdit }: Props) => {
    const userName = "Annonuymus";
    const ava = "/static/images/avatar/2.jpg";

    const [isEditingComm, setIsEditingComm] = useState(false);
    const [commentText, setCommentText] = useState(comment.text);
    const [openModal, setOpenModal] = useState(false);

    const handleOpen = () => {
        setOpenModal(true);
    };

    const handleClose = (toDelete: boolean) => {
        if (toDelete) handleDelete(comment._id);
        setOpenModal(false);
    };

    const onEdit = (text: string) => {
        handleEdit(comment._id, text);
    };

    return (
        <>
            <ConfirmDelete isOpen={openModal} onClose={handleClose} />

            <Card style={{ backgroundColor: "#f5f5f5" }}>
                <Box sx={{ p: 2 }}>
                    <Stack spacing={2} direction="row">
                        <Box sx={{ width: "100%" }}>
                            <Stack
                                spacing={2}
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                            >
                                <Stack spacing={2} direction="row" alignItems="center">
                                    {/* TODO: Call backend to get author image */}
                                    <Avatar src={ava} />

                                    <Typography fontWeight="bold" sx={{ color: "hsl(212, 24%, 26%)" }}>
                                        {/* TODO: Call backend to get author name */}
                                        {userName}
                                    </Typography>

                                    <Typography sx={{ color: "hsl(211, 10%, 45%)" }}>
                                        {comment.updatedAt.toLocaleString()}
                                    </Typography>
                                </Stack>

                                {/* TODO: Check if user is the author of the comment */}
                                {userName === "Annonuymus" && (
                                    <Stack direction="row" spacing={1}>
                                        <DeleteButton functionality={() => handleOpen()} />

                                        <EditButton
                                            functionality={() => setIsEditingComm(!isEditingComm)}
                                            editingComm={isEditingComm}
                                        />
                                    </Stack>
                                )}
                            </Stack>

                            {isEditingComm ? (
                                <>
                                    <EditableCommentField
                                        text={commentText}
                                        setCommentText={setCommentText}
                                        placeHolder="Don't leave this blank!"
                                    />

                                    <Stack
                                        direction="row"
                                        spacing={1}
                                        sx={{
                                            float: "right",
                                            mt: 2,
                                        }}
                                    >
                                        <CancelButton
                                            commentText={commentText}
                                            setCommentText={setCommentText}
                                            isEditingComm={isEditingComm}
                                            setIsEditingComm={setIsEditingComm}
                                        />

                                        <UpdateButton
                                            text={commentText}
                                            setCommentText={setCommentText}
                                            isEditingComm={isEditingComm}
                                            setIsEditingComm={setIsEditingComm}
                                            onEdit={onEdit}
                                        />
                                    </Stack>
                                </>
                            ) : (
                                <CommentText text={commentText} />
                            )}
                        </Box>
                    </Stack>
                </Box>
            </Card>
        </>
    );
};
export default Comment;
