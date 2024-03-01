import { Button, Card, CardMedia, CardContent, CardActions, Typography, Divider, Stack } from "@mui/material";
import { styled } from "@mui/system";

const EllipsisTypography = styled(Typography)({
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    WebkitLineClamp: 3,
    textOverflow: "ellipsis",
});

interface Props {
    name: string;
    breed: string;
    age: number;
    description: string;
}

export default function PostCard({ name, breed, age, description }: Props) {
    return (
        <Card sx={{ width: 345, borderRadius: 3 }}>
            <CardMedia component="img" alt="Dog Image" height="140" image="/src/assets/dog_image.jpg" />

            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {name != null ? name : "Dog Name"}
                </Typography>

                <Stack
                    direction="row"
                    divider={<Divider orientation="vertical" flexItem sx={{ ml: 2, mr: 2, borderWidth: 1 }} />}
                    spacing={1}
                    sx={{ mb: 1 }}
                >
                    <Typography variant="body1">{breed != null ? breed : "Breed"}</Typography>
                    <Typography variant="body1">{age != null ? age : 12}</Typography>
                </Stack>

                <EllipsisTypography variant="body2" color="text.secondary">
                    {description != null ? description : "Description"}
                </EllipsisTypography>
            </CardContent>

            <CardActions>
                <Button size="small" sx={{ fontWeight: "bold" }}>
                    Read More
                </Button>
            </CardActions>
        </Card>
    );
}
