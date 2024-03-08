import { useEffect, useState } from "react";
import { Container, Stack } from "@mui/material";
import Comment from "./Comment";
import AddComment from "./AddComment";
import { IComment, IPost } from "../Models";
import { createComment, editComment, deleteComment } from "../services/comments-service";

interface Props {
    post: IPost;
}

function CommentSection({ post }: Props) {
    const [comments, setComments] = useState<IComment[]>([]);

    const addComment = async (text: string) => {
        const createdComment = await createComment(post._id, text);
        if (createdComment) {
            setComments([createdComment, ...comments]);
        } else {
            console.error("Error creating comment");
        }
    };

    const updateComment = async (commentId: string, text: string) => {
        const editedComment = await editComment(post._id, commentId, text);
        if (editedComment) {
            setComments(comments.map((comment) => (comment._id === commentId ? editedComment : comment)));
        } else {
            console.error("Error editing comment");
        }
    };

    const removeComment = async (commentId: string) => {
        await deleteComment(post._id, commentId);
        setComments(comments.filter((comment) => comment._id !== commentId));
    };

    useEffect(() => {
        // Order the ecomments from the newest to the oldest
        setComments(
            [...post.comments].sort(
                (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            )
        );
    }, []);

    return (
        <Container>
            <Stack spacing={3}>
                <AddComment handleSubmit={addComment} />

                {comments?.map((comment) => (
                    <Comment
                        key={comment._id}
                        comment={comment}
                        handleDelete={removeComment}
                        handleEdit={updateComment}
                    />
                ))}
            </Stack>
        </Container>
    );
}

export default CommentSection;