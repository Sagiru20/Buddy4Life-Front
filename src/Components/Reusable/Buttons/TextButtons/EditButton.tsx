import { Edit } from "@mui/icons-material";
import { Button } from "@mui/material";

const EditButton = ({ functionality, editingComm }) => {
    return (
        <Button
            startIcon={<Edit />}
            disabled={editingComm}
            sx={{
                color: "hsl(238, 40%, 52%)",
                fontWeight: 500,
                textTransform: "capitalize",
            }}
            onClick={() => {
                functionality();
            }}
        >
            Edit
        </Button>
    );
};

export default EditButton;
