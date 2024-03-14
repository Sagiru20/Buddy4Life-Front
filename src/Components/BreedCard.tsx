import { Card, CardMedia, CardContent, Typography, styled, Tooltip, CardActionArea } from "@mui/material";
import { IBreed } from "../Models";

const EllipsisTypography = styled(Typography)({
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    WebkitLineClamp: 3,
    textOverflow: "ellipsis",
});

interface Props {
    breed: IBreed;
}

export default function BreedCard({ breed }: Props) {
    return (
        <Card sx={{ width: 345, borderRadius: 3 }}>
            {breed.imgThumb != null ? (
                <CardActionArea href={breed.imgThumb} target="_blank">
                    <CardMedia
                        component="img"
                        alt="Dog Image"
                        height="140"
                        image={breed.imgThumb}
                        sx={{ cursor: "pointer" }}
                    />
                </CardActionArea>
            ) : (
                <CardMedia
                    component="img"
                    alt="Dog Image"
                    height="140"
                    image={breed.imgThumb}
                    sx={{ cursor: "pointer" }}
                />
            )}

            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {breed.breedName != null ? breed.breedName : "Breed Name"}
                </Typography>

                <Typography variant="body1">Origin: {breed.origin != null ? breed.origin : "-"}</Typography>

                <Typography variant="body1">
                    Life Span:{" "}
                    {breed.minLifeSpan != null && breed.maxLifeSpan != null
                        ? `${breed.minLifeSpan}-${breed.maxLifeSpan} years`
                        : "-"}
                </Typography>

                <Tooltip title={breed.breedDescription}>
                    <EllipsisTypography variant="body2" color="text.secondary">
                        {breed.breedDescription != null ? breed.breedDescription : "Description"}
                    </EllipsisTypography>
                </Tooltip>
            </CardContent>
        </Card>
    );
}
