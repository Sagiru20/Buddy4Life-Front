import { Button, Stack, Typography, Dialog, DialogTitle, DialogContent } from "@mui/material";

interface Props {
    isOpen: boolean;
    onClose: (toDelete: boolean) => void;
}

const ConfirmDelete = ({ isOpen, onClose }: Props) => {
    return (
        <Dialog open={isOpen} onClose={onClose}>
            <DialogContent sx={{ maxWidth: "430px" }}>
                <DialogTitle sx={{ p: "0", marginBottom: "20px" }}>Delete comment</DialogTitle>

                <Typography
                    component="p"
                    sx={{
                        marginBottom: "20px",
                        color: "hsl(211, 10%, 45%)",
                    }}
                >
                    Are you sure you want to delete this comment? This will remove the comment and it can't be
                    undone.
                </Typography>

                <Stack direction="row" display="flex" justifyContent="space-between">
                    <Button
                        variant="contained"
                        disableElevation
                        sx={{
                            bgcolor: "hsl(211, 10%, 45%)",
                            "&:hover": { bgcolor: "hsl(211, 10%, 45%)" },
                        }}
                        onClick={() => {
                            onClose(false);
                        }}
                    >
                        No, cancel
                    </Button>

                    <Button
                        variant="contained"
                        disableElevation
                        sx={{
                            bgcolor: "hsl(358, 79%, 66%)",
                            "&:hover": { bgcolor: "hsl(358, 79%, 66%)" },
                        }}
                        onClick={() => {
                            onClose(true);
                        }}
                    >
                        Yes, delete
                    </Button>
                </Stack>
            </DialogContent>
        </Dialog>
    );
};

export default ConfirmDelete;
