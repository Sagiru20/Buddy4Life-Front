import {
    Button,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Tooltip,
    Typography,
    Divider,
    Stack,
    styled,
} from "@mui/material";
import { Gender } from "../Models";

const EllipsisTypography = styled(Typography)({
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    WebkitLineClamp: 1,
    textOverflow: "ellipsis",
});

interface Props {
    name: string;
    breed: string;
    gender: Gender;
    age: number;
    description: string;
}

export default function PostCard({ name, breed, gender, age, description }: Props) {
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
                    <Typography variant="body1">
                        {gender != null ? gender.charAt(0).toUpperCase() + gender.slice(1).toLowerCase() : "Gender"}
                    </Typography>

                    <Typography variant="body1">{age != null ? age : 12}</Typography>

                    <Tooltip title={breed}>
                        <Typography
                            variant="body1"
                            style={{
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                            }}
                        >
                            {breed != null ? breed : "Breed"}
                        </Typography>
                    </Tooltip>
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
