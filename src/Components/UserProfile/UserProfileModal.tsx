import { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Avatar, Button, Modal, Box, Typography, TextField, IconButton, styled, Badge } from "@mui/material";
import { Edit as EditIcon, Close as CloseIcon } from "@mui/icons-material";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useUserService, { IGetUserResponse } from "../../services/user-services";
import { uploadPhoto } from "../../services/file-services";
import { Stack } from "@mui/system";

export interface UserProfileModalProps {
    isOpen: boolean;
    closeModal: () => void;
}

function UserProfileModal({ isOpen, closeModal }: UserProfileModalProps) {
    const initUser: IGetUserResponse = {
        _id: "Loading...",
        email: "Loading...",
        firstName: "Loading...",
        lastName: "Loading...",
    };
    const backendPrivateClient = useAxiosPrivate();
    const { getUser, updateUser } = useUserService(backendPrivateClient);

    const [user, setUser] = useState(initUser);
    const [file, setFile] = useState<File | null>(null);

    const [editedFirstName, setEditedFirstName] = useState(user.firstName);
    const [editedLastName, setEditedLastName] = useState(user.lastName);
    const [editedEmail, setEditedEmail] = useState(user.email);
    const [isEditing, setIsEditing] = useState(false);

    const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
        disabled: !isEditing,
        accept: {
            "image/png": [".png"],
            "image/jpeg": [".jpeg"],
        },
        onDrop: (acceptedFiles: File[]) => {
            if (isEditing) {
                setFile(acceptedFiles[0]);
            }
        },
        multiple: false,
    });

    useEffect(() => {
        initUserDetails();
    }, []);

    const initUserDetails = async () => {
        const currentUser = await getUser();
        if (currentUser !== undefined) {
            setUser(currentUser);
            setEditedFirstName(currentUser.firstName);
            setEditedLastName(currentUser.lastName);
            setEditedEmail(currentUser.email);
        }
    };

    const handleSave = async () => {
        let imageUrl = null;

        if (file != null) {
            imageUrl = await uploadPhoto(file!);
        } else {
            imageUrl = user.imageUrl;
        }

        const updatedUser: IGetUserResponse = {
            _id: user._id,
            email: editedEmail,
            firstName: editedFirstName,
            lastName: editedLastName,
            ...(imageUrl != null && { imageUrl: imageUrl }),
        };

        await updateUser(updatedUser);
        setUser(updatedUser);
        setIsEditing(false);
    };

    const StyledAvatar = styled(Avatar)(({ theme }) => ({
        width: theme.spacing(16),
        height: theme.spacing(16),
        borderRadius: "50%",
    }));

    const SmallAvatar = styled(Avatar)(({ theme }) => ({
        width: theme.spacing(5),
        height: theme.spacing(5),
        border: `2px solid ${theme.palette.background.paper}`,
    }));

    return (
        <Modal
            keepMounted
            open={isOpen}
            onClose={closeModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 400,
                    bgcolor: "background.paper",
                    borderRadius: "12px",
                    p: 3,
                }}
            >
                <Typography id="modal-title" variant="h5" sx={{ mb: 3 }}>
                    User Profile
                </Typography>

                <IconButton
                    onClick={closeModal}
                    aria-label="Delete"
                    color="primary"
                    sx={{ position: "absolute", top: 8, right: 8 }}
                >
                    <CloseIcon />
                </IconButton>

                <Box component="form" noValidate sx={{ mt: 1 }}>
                    <Box {...getRootProps()} display="flex" justifyContent="center" sx={{ mb: 5 }}>
                        {isEditing ? (
                            <Badge
                                overlap="circular"
                                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                                badgeContent={
                                    <SmallAvatar alt="Edit avatar">
                                        <EditIcon />
                                    </SmallAvatar>
                                }
                            >
                                <StyledAvatar src={user?.imageUrl} alt="User Avatar" />
                            </Badge>
                        ) : (
                            <StyledAvatar src={user?.imageUrl} alt="User Avatar" />
                        )}

                        <input {...getInputProps()} />
                    </Box>

                    <Stack spacing={3} direction="column">
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="firstName"
                            label="First Name"
                            name="firstName"
                            autoComplete="firstName"
                            value={editedFirstName}
                            disabled={!isEditing}
                            onChange={(e) => setEditedFirstName(e.target.value)}
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="lastName"
                            label="Last Name"
                            name="lastName"
                            autoComplete="lastName"
                            value={editedLastName}
                            disabled={!isEditing}
                            onChange={(e) => setEditedLastName(e.target.value)}
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            autoComplete="email"
                            value={editedEmail}
                            disabled={true}
                        />

                        {isEditing ? (
                            <Button
                                variant="contained"
                                size="medium"
                                onClick={handleSave}
                                color="secondary"
                                sx={{ alignSelf: "flex-end", width: "30%" }}
                            >
                                Save
                            </Button>
                        ) : (
                            <Button
                                variant="contained"
                                size="medium"
                                onClick={() => {
                                    setIsEditing(true);
                                }}
                                color="secondary"
                                sx={{ alignSelf: "flex-end", width: "30%" }}
                            >
                                Edit
                            </Button>
                        )}
                    </Stack>
                </Box>
            </Box>
        </Modal>
    );
}

export default UserProfileModal;
