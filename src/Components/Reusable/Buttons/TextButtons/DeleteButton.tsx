import { Delete } from "@mui/icons-material";
import { Button } from "@mui/material";

interface Props {
    functionality: () => void;
}

const DeleteButton = ({ functionality }: Props) => {
    return (
        <Button
            startIcon={<Delete />}
            sx={{
                color: "hsl(358, 79%, 66%)",
                fontWeight: 500,
                textTransform: "capitalize",
            }}
            onClick={functionality}
        >
            Delete
        </Button>
    );
};

export default DeleteButton;
