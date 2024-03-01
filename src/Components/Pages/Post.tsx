import { Box, Card, CardMedia, CardContent, Container, Grid, Typography, Stack } from "@mui/material";
import Core from "../Core";

const post_fields = {
    Name: "Macy",
    Breed: "Alaskan",
    Gender: "Female",
    Age: 12,
    Weight: 34,
    Height: 41,
    Color: "Brown",
};

function Post() {
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
                                image="/src/assets/dog_image.jpg"
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
                                        letterSpacing: ".2rem",
                                        color: "inherit",
                                        textDecoration: "none",
                                        mb: 3,
                                    }}
                                >
                                    Post Title
                                </Typography>

                                <Stack direction="column" spacing={2}>
                                    {Object.entries(post_fields).map(([key, value]) => (
                                        <Box display="flex" flexDirection="row" justifyContent="space-between">
                                            <Typography variant="body1" component="div" sx={{ fontWeight: 600 }}>
                                                {key}:
                                            </Typography>
                                            <Typography variant="body1">{value}</Typography>
                                        </Box>
                                    ))}
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
                                    <Typography variant="body1">
                                        Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots
                                        in a piece of classical Latin literature from 45 BC, making it over 2000 years
                                        old. Richard McClintock, a Latin professor at Hampden-Sydney College in
                                        Virginia, looked up one of the more obscure Latin words, consectetur, from a
                                        Lorem Ipsum passage, and going through the cites of the word in classical
                                        literature, discovered the undoubtable source. Lorem Ipsum comes from sections
                                        1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and
                                        Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of
                                        ethics, very popular during the Renaissance. The first line of Lorem Ipsum,
                                        "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. The
                                        standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those
                                        interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by
                                        Cicero are also reproduced in their exact original form, accompanied by English
                                        versions from the 1914 translation by H. Rackham.
                                    </Typography>
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
                                    Comments
                                </Typography>

                                <Core />
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default Post;
