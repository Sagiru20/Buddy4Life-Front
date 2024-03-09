import { MouseEvent } from "react";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import { PostsOwnerShip } from "../Models";

interface Props {
    ownership: PostsOwnerShip;
    setOwnership: React.Dispatch<React.SetStateAction<PostsOwnerShip>>;
}

export default function PostsOwnershipToggleButton({ ownership, setOwnership }: Props) {
    const handleChange = (event: MouseEvent<HTMLElement>, newValue: string) => {
        event.preventDefault();
        if (newValue === null) {
            newValue =
                ownership === PostsOwnerShip.ALL_POSTS ? PostsOwnerShip.ALL_POSTS : PostsOwnerShip.MY_POSTS;
        }

        setOwnership(newValue as PostsOwnerShip);
        setOwnership(newValue as PostsOwnerShip);
    };

    return (
        <ToggleButtonGroup
            size="large"
            color="secondary"
            value={ownership}
            exclusive
            onChange={handleChange}
            aria-label="Post type"
        >
            <ToggleButton value="All Posts">All Posts</ToggleButton>
            <ToggleButton value="My Posts">My Posts</ToggleButton>
        </ToggleButtonGroup>
    );
}
