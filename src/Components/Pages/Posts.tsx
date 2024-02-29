import PostCard from "../PostCard";
import PostsTypeToggleButton from "../PostsTypeToggleButton";
import { Autocomplete, Box, Container, Divider, Grid, TextField, Stack } from "@mui/material";

const posts = [
    { name: "Macy", breed: "Alaskan", age: 12, description: "Description for Card 1" },
    { name: "Macy", breed: "Alaskan", age: 12, description: "Description for Card 1" },
    { name: "Macy", breed: "Alaskan", age: 12, description: "Description for Card 1" },
    { name: "Macy", breed: "Alaskan", age: 12, description: "Description for Card 1" },
    { name: "Macy", breed: "Alaskan", age: 12, description: "Description for Card 1" },
    { name: "Macy", breed: "Alaskan", age: 12, description: "Description for Card 1" },
    { name: "Macy", breed: "Alaskan", age: 12, description: "Description for Card 1" },
    { name: "Macy", breed: "Alaskan", age: 12, description: "Description for Card 1" },
    { name: "Macy", breed: "Alaskan", age: 12, description: "Description for Card 1" },
    { name: "Macy", breed: "Alaskan", age: 12, description: "Description for Card 1" },
    { name: "Macy", breed: "Alaskan", age: 12, description: "Description for Card 1" },
];

const category = ["Rehome", "Adopt"];
const breeds = ["Breed 1", "Breed 2", "Breed 3", "Breed 4", "Breed 5"];
const cities = ["Tel Aviv", "Raanana", "Jerusalem", "Herzliya"];

function Posts() {
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
            <Box display="flex" marginBottom={5}>
                <PostsTypeToggleButton />
            </Box>

            <Stack direction="row" spacing={8} justifyContent="center" sx={{ mb: 5, width: "100%" }}>
                <Autocomplete
                    disablePortal
                    id="category-autocomplete"
                    options={category}
                    sx={{ width: 200 }}
                    renderInput={(params) => <TextField {...params} label="Category" variant="outlined" />}
                />

                <Autocomplete
                    disablePortal
                    id="breed-autocomplete"
                    options={breeds}
                    sx={{ width: 200 }}
                    renderInput={(params) => <TextField {...params} label="Breed" variant="outlined" />}
                />

                <Autocomplete
                    disablePortal
                    id="city-autocomplete"
                    options={cities}
                    sx={{ width: 200 }}
                    renderInput={(params) => <TextField {...params} label="City" variant="outlined" />}
                />
            </Stack>

            <Container>
                <Divider flexItem sx={{ mb: 5 }} />
                <Grid container spacing={12} display="flex">
                    {posts.map((post) => (
                        <Grid item xs={12} sm={12} md={6} lg={4} xl={4} display="flex" justifyContent="center">
                            <PostCard
                                name={post.name}
                                breed={post.breed}
                                age={post.age}
                                description={post.description}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
}

export default Posts;
