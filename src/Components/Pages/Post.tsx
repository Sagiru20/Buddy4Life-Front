import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import EditButton from "../Reusable/Buttons/TextButtons/EditButton";
import PostFormModal from "../Posts/PostFormModal";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import usePostService from "../../services/posts-services";

import {
    Box,
    Card,
    CardMedia,
    CardContent,
    Container,
    CircularProgress,
    Grid,
    Typography,
    Stack,
} from "@mui/material";
import PageNotFound from "./PageNotFound";
import CommentSection from "../CommentSection";
import { IPost } from "../../Models";

function Post() {
    const { id } = useParams<{ id: string }>();
    const backendPrivateClient = useAxiosPrivate();
    const { getPost } = usePostService(backendPrivateClient);

    const [post, setPost] = useState<IPost | null>(null);
    const [loading, setLoading] = useState(true);
    const [showPostFormModal, setShowPostFormModal] = useState(false);
    const [isPostChanged, setIsPostChanged] = useState(false);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const post = await getPost(id!);
                post && setPost(post);
            } catch (error) {
                console.error("Error fetching posts: ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [id, isPostChanged]);

    if (loading) {
        return (
            <Box sx={{ display: "flex" }}>
                <Typography>Loading...</Typography>
                <CircularProgress />
            </Box>
        );
    }

    if (!post) {
        return <PageNotFound />;
    }

    const renderPostData = () => {
        setShowPostFormModal(false);
        setIsPostChanged(!isPostChanged);
        setLoading(true);
    };

    return (
        <Box
            sx={{
                mt: 5,
                mb: 5,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <Container>
                <Grid container direction="row" spacing={4} justifyContent="center">
                    <Grid item xs={5} sx={{ display: "flex", flexDirection: "column" }}>
                        <Card sx={{ borderRadius: 3, height: "100%" }}>
                            <CardMedia
                                component="img"
                                alt="Dog Image"
                                image={post?.imageUrl ?? "/src/assets/dog_image.jpg"}
                                sx={{ height: "100%", width: "100%" }}
                            />
                        </Card>
                    </Grid>

                    <Grid item xs={7} sx={{ display: "flex", flexDirection: "column" }}>
                        <Card sx={{ borderRadius: 3, height: "100%" }}>
                            <CardContent>
                                <Typography
                                    gutterBottom
                                    variant="h5"
                                    component="div"
                                    sx={{
                                        fontFamily: "monospace",
                                        fontWeight: 600,
                                        letterSpacing: ".1rem",
                                        color: "inherit",
                                        textDecoration: "none",
                                        mb: 2,
                                    }}
                                >
                                    {post.title}
                                </Typography>

                                <EditButton
                                    functionality={() => setShowPostFormModal(true)}
                                    editingComm={false}
                                />
                                <PostFormModal
                                    isOpen={showPostFormModal}
                                    postId={id}
                                    closeModal={renderPostData}
                                />

                                <Typography variant="body1" component="div" sx={{ mb: 1 }}>
                                    {/* TODO: Call backend to get owner name */}
                                    Created by {post.ownerId}, last modified:{" "}
                                    {post.updatedAt.toLocaleString()}
                                </Typography>

                                <Stack direction="column" spacing={2}>
                                    {Object.entries(post.dogInfo).map(
                                        ([key, value]) =>
                                            key !== "_id" && (
                                                <Box
                                                    display="flex"
                                                    flexDirection="row"
                                                    justifyContent="space-between"
                                                    key={key}
                                                >
                                                    <Typography
                                                        variant="body1"
                                                        component="div"
                                                        sx={{ fontWeight: 600 }}
                                                    >
                                                        {key}:
                                                    </Typography>

                                                    <Typography variant="body1">{value ?? "-"}</Typography>
                                                </Box>
                                            )
                                    )}
                                    <Box
                                        display="flex"
                                        flexDirection="row"
                                        justifyContent="space-between"
                                        key="city"
                                    >
                                        <Typography variant="body1" component="div" sx={{ fontWeight: 600 }}>
                                            city:
                                        </Typography>

                                        <Typography variant="body1">{post.city ?? "-"}</Typography>
                                    </Box>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12}>
                        <Card sx={{ borderRadius: 3 }}>
                            <CardContent>
                                <Typography
                                    gutterBottom
                                    variant="h5"
                                    component="div"
                                    sx={{
                                        fontFamily: "monospace",
                                        fontWeight: 600,
                                        letterSpacing: ".2rem",
                                        color: "inherit",
                                        textDecoration: "none",
                                        mb: 3,
                                    }}
                                >
                                    Description
                                </Typography>

                                <Box>
                                    <Typography variant="body1">{post.description}</Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12}>
                        <Card sx={{ borderRadius: 3 }}>
                            <CardContent>
                                <Typography
                                    gutterBottom
                                    variant="h5"
                                    component="div"
                                    sx={{
                                        fontFamily: "monospace",
                                        fontWeight: 600,
                                        letterSpacing: ".2rem",
                                        color: "inherit",
                                        textDecoration: "none",
                                        mb: 3,
                                    }}
                                >
                                    Comments ({post?.comments?.length})
                                </Typography>

                                <CommentSection post={post} />
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default Post;
