import { Container, Stack } from "@mui/material";
import Comment from "./Comment";
import AddComment from "./AddComment";
import { IComment } from "../Models";

interface Props {
    comments: IComment[];
}

function CommentSection({ comments }: Props) {
    return (
        <Container>
            <Stack spacing={3}>
                <AddComment />

                {comments?.map((comment) => {
                    return <Comment {...comment} />;
                })}
            </Stack>
        </Container>
    );
}

export default CommentSection;
