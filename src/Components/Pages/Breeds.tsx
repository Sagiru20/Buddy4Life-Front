import { useState, useEffect } from "react";
import { Box, Container, Grid } from "@mui/material";
import { IBreed } from "../../Models";
import { getBreeds } from "../../DogBreedApi";
import BreedCard from "../BreedCard";

function Breeds() {
    const [breeds, setBreeds] = useState<IBreed[]>([]);

    useEffect(() => {
        const fetchBreeds = async () => {
            try {
                const breeds = await getBreeds();
                breeds && setBreeds(breeds);
            } catch (error) {
                console.error("Error fetching breeds:", error);
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
            <Container>
                <Grid container spacing={12} display="flex">
                    {breeds.map((breed, index) => (
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
                            <BreedCard breed={breed} />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
}

export default Breeds;
