import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
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
    Button,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import { IPost } from "../../Models";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import usePostService from "../../services/posts-services";
import PageNotFound from "./PageNotFound";
import PostFormModal from "../Posts/PostFormModal";
import CommentSection from "../CommentSection";
import useUserService from "../../services/user-services";

function Post() {
    const { auth } = useAuth();
    const { id } = useParams<{ id: string }>();
    const backendPrivateClient = useAxiosPrivate();
    const { getPost } = usePostService(backendPrivateClient);
    const { getUser } = useUserService(backendPrivateClient);

    const [post, setPost] = useState<IPost | null>(null);
    const [loading, setLoading] = useState(true);
    const [showPostFormModal, setShowPostFormModal] = useState(false);
    const [isPostChanged, setIsPostChanged] = useState(false);
    const [ownerName, setOwnerName] = useState<string | undefined>();

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

        const getOwnerDetails = async () => {
            try {
                const ownerDetails = await getUser(post?.ownerId);
                ownerDetails && setOwnerName(`${ownerDetails.firstName} ${ownerDetails.lastName}`);
            } catch (error) {
                console.error("Error fetching post owner details: ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
        getOwnerDetails();
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
                            <CardContent
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    paddingBottom: "16px !important",
                                }}
                            >
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

                                <PostFormModal
                                    isOpen={showPostFormModal}
                                    postId={id}
                                    closeModal={renderPostData}
                                />

                                <Typography variant="body1" component="div" sx={{ mb: 1 }}>
                                    Created by {ownerName}, last modified: {post.updatedAt.toLocaleString()}
                                </Typography>

                                <Stack direction="column" spacing={2} sx={{ mb: 3 }}>
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

                                {auth.userInfo?._id == post.ownerId && (
                                    <Button
                                        variant="contained"
                                        size="medium"
                                        startIcon={<Edit />}
                                        onClick={() => {
                                            setShowPostFormModal(true);
                                        }}
                                        sx={{
                                            display: "flex",
                                            alignSelf: "flex-end",
                                            backgroundColor: "hsl(238, 40%, 52%)",
                                            textTransform: "capitalize",
                                            "&:hover": {
                                                opacity: 0.8,
                                                backgroundColor: "hsl(238, 40%, 52%)",
                                            },
                                        }}
                                    >
                                        Edit Post
                                    </Button>
                                )}
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

                                <CommentSection post={post} renderCommentsCount={renderPostData} />
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default Post;
