import { useState, MouseEvent } from "react";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";

export default function ColorToggleButton() {
    const [alignment, setAlignment] = useState("AllPosts");

    const handleChange = (event: MouseEvent<HTMLElement>, newAlignment: string) => {
        setAlignment(newAlignment);
    };

    return (
        <ToggleButtonGroup
            size="large"
            color="secondary"
            value={alignment}
            exclusive
            onChange={handleChange}
            aria-label="Post type"
        >
            <ToggleButton value="AllPosts">All Posts</ToggleButton>
            <ToggleButton value="MyPosts">My Posts</ToggleButton>
        </ToggleButtonGroup>
    );
}
