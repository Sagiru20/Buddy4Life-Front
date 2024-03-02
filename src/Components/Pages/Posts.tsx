import { useState, useEffect, ChangeEvent, SyntheticEvent } from "react";
import { IPost, IBreed, Gender } from "../../Models";
import { getPosts } from "../../BackendClient";
import { getBreeds } from "../../DogBreedApi";
import PostCard from "../PostCard";
import PostsTypeToggleButton from "../PostsTypeToggleButton";
import SearchIcon from "@mui/icons-material/Search";
import { Autocomplete, Box, Container, Divider, Grid, IconButton, TextField, Stack } from "@mui/material";

function Posts() {
    const [posts, setPosts] = useState<IPost[]>([]);
    const [breeds, setBreeds] = useState<IBreed[]>([]);

    const [gender, setGender] = useState<Gender | null>(null);
    const [breed, setBreed] = useState<string | null>(null);
    const [city, setCity] = useState<string>("");

    const handleGenderChange = (_event: SyntheticEvent<Element, Event>, newGender: Gender | null) => {
        setGender(newGender);
    };

    const handleBreedChange = (_event: SyntheticEvent<Element, Event>, newBreed: string | null) => {
        setBreed(newBreed);
    };

    const handleCityChange = (event: ChangeEvent<HTMLInputElement>) => {
        setCity(event.target.value);
    };

    const fetchPosts = async () => {
        try {
            const posts = await getPosts({ gender: gender, breed: breed, city: city });
            posts && setPosts(posts);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    useEffect(() => {
        const fetchBreeds = async () => {
            try {
                const breeds = await getBreeds();
                breeds && setBreeds(breeds);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        fetchBreeds();
    }, []);

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
                    id="gender-autocomplete"
                    options={Object.values(Gender)}
                    sx={{ width: 200 }}
                    onChange={handleGenderChange}
                    renderInput={(params) => <TextField {...params} label="Gender" variant="outlined" />}
                />

                <Autocomplete
                    disablePortal
                    id="breed-autocomplete"
                    options={breeds.map((breed) => breed.breedName)}
                    sx={{ width: 250 }}
                    onChange={handleBreedChange}
                    renderInput={(params) => <TextField {...params} label="Breed" variant="outlined" />}
                />

                <TextField
                    variant="outlined"
                    label="City"
                    id="city-textfield"
                    value={city}
                    onChange={handleCityChange}
                    sx={{ width: 200 }}
                />

                <IconButton
                    onClick={fetchPosts}
                    sx={{
                        width: "60px",
                        borderRadius: 1,
                        backgroundColor: "primary.main",
                        "&:hover": { backgroundColor: "primary.light" },
                    }}
                >
                    <SearchIcon />
                </IconButton>
            </Stack>

            <Container>
                <Divider flexItem sx={{ mb: 5 }} />
                <Grid container spacing={12} display="flex">
                    {posts.map((post, index) => (
                        <Grid
                            item
                            xs={12}
                            sm={12}
                            md={6}
                            lg={4}
                            xl={4}
                            key={index}
                            display="flex"
                            justifyContent="center"
                        >
                            <PostCard
                                name={post.dogInfo!.name!}
                                breed={post.dogInfo!.breed!}
                                gender={post.dogInfo!.gender!}
                                age={post.dogInfo!.age!}
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
