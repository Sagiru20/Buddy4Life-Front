import * as React from "react";
import { useState, useEffect } from "react";
import { Button, Modal, Box, Typography, TextField, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import useUserService, { IGetUserResponse } from "../../services/user-services";
import { uploadPhoto } from "../../services/file-services";
import { useDropzone } from "react-dropzone";

export interface UserProfileModalProps {
    isOpen: boolean;
    closeModal: () => void;
}

const UserProfileModal: React.FC<UserProfileModalProps> = ({ isOpen, closeModal }) => {
    const initUser: IGetUserResponse = {
        _id: "Loading...",
        email: "Loading...",
        firstName: "Loading...",
        lastName: "Loading...",
    };
    const { getUser, updateUser } = useUserService();

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

    const enableEdit = () => {
        setIsEditing(true);
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

    return (
        <Modal
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
                    border: "2px solid #000",
                    borderRadius: "10px",
                    p: 4,
                }}
            >
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    User Profile
                </Typography>
                <IconButton
                    onClick={closeModal}
                    aria-label="Delete"
                    color="primary"
                    sx={{ position: "absolute", top: 8, right: 8 }}
                >
                    <CloseIcon></CloseIcon>
                </IconButton>
                <Box component="form" noValidate sx={{ mt: 1 }}>
                    {!isEditing && <Button onClick={enableEdit}>Edit</Button>}

                    <Box
                        {...getRootProps()}
                        sx={{
                            border: 1,
                            borderColor: "gray",
                            borderRadius: 2,
                            padding: 2,
                            width: 200,
                            height: 100,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            cursor: "pointer",
                            backgroundColor: acceptedFiles.length > 0 ? "#ddd" : "white",
                        }}
                    >
                        {acceptedFiles.length === 0 && user?.imageUrl == null && (
                            <>
                                <Typography variant="body2" color="text.secondary">
                                    Press to upload \ Drag & drop an image here
                                </Typography>
                            </>
                        )}
                        {user?.imageUrl !== null && acceptedFiles.length === 0 && (
                            <img
                                src={user?.imageUrl}
                                style={{ width: "100%", height: "100%", objectFit: "fill" }}
                            />
                        )}
                        {acceptedFiles.length > 0 && (
                            <img
                                src={URL.createObjectURL(acceptedFiles[0])}
                                alt="Uploaded image"
                                style={{ width: "100%", height: "100%", objectFit: "fill" }}
                            />
                        )}
                        <input {...getInputProps()} />
                    </Box>

                    <>
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
                        <Button onClick={handleSave}>Save</Button>
                    </>
                </Box>
            </Box>
        </Modal>
    );
};

export default UserProfileModal;
