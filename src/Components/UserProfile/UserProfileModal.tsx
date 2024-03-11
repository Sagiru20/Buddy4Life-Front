import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import {
    Avatar,
    Badge,
    Button,
    Modal,
    Box,
    Typography,
    TextField,
    IconButton,
    Stack,
    styled,
} from "@mui/material";
import { Edit as EditIcon, Close as CloseIcon } from "@mui/icons-material";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";
import useUserService, { IEditUser } from "../../services/user-services";
import { uploadPhoto } from "../../services/file-services";
import { IUserInfo } from "../../Models";

export interface UserProfileModalProps {
    isOpen: boolean;
    closeModal: () => void;
}

function UserProfileModal({ isOpen, closeModal }: UserProfileModalProps) {
    const { auth, setAuth } = useAuth();
    const [oldUserDetails, setOldUserDetails] = useState<IUserInfo | undefined>(auth.userInfo);

    const backendPrivateClient = useAxiosPrivate();
    const { updateUser } = useUserService(backendPrivateClient);

    const [file, setFile] = useState<File | null>(null);

    const [editedFirstName, setEditedFirstName] = useState<string>();
    const [editedLastName, setEditedLastName] = useState<string>();
    const [isEditing, setIsEditing] = useState<boolean>(false);

    useEffect(() => {
        if (auth.userInfo?.firstName && auth.userInfo?.lastName) {
            setOldUserDetails(auth.userInfo);
            setEditedFirstName(auth.userInfo.firstName);
            setEditedLastName(auth.userInfo.lastName);
        }
    }, [auth?.userInfo]);

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

    const handleCancel = async () => {
        console.log(oldUserDetails);
        if (oldUserDetails !== undefined) {
            setEditedFirstName(oldUserDetails.firstName);
            setEditedLastName(oldUserDetails.lastName);
        }
        setIsEditing(false);
    };

    const handleSave = async () => {
        let imageUrl = null;

        if (file != null) {
            imageUrl = await uploadPhoto(file!);
        } else {
            imageUrl = auth.userInfo?.imageUrl;
        }

        if (auth.userInfo?._id && editedFirstName && editedLastName) {
            const updatedUser: IEditUser = {
                firstName: editedFirstName,
                lastName: editedLastName,
                ...(imageUrl != null && { imageUrl: imageUrl }),
            };

            await updateUser(auth.userInfo._id, updatedUser);
            setAuth({ ...auth, userInfo: { ...auth.userInfo, ...updatedUser } });
        }
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

    function getImageSrc() {
        if (!isEditing || (isEditing && acceptedFiles.length === 0)) return auth.userInfo?.imageUrl;

        if (isEditing && acceptedFiles.length > 0) {
            return URL.createObjectURL(acceptedFiles[0]);
        }
    }

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
                    color="error"
                    sx={{ position: "absolute", top: 8, right: 8 }}
                >
                    <CloseIcon />
                </IconButton>

                <Box component="form" noValidate sx={{ mt: 1 }}>
                    <Box {...getRootProps()} display="flex" justifyContent="center" sx={{ mb: 2 }}>
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
                                <StyledAvatar src={getImageSrc()} />
                            </Badge>
                        ) : (
                            <StyledAvatar src={getImageSrc()} />
                        )}

                        <input {...getInputProps()} />
                    </Box>

                    <Box display="flex" justifyContent="center" sx={{ mb: 4 }}>
                        <Typography variant="h6" alignSelf="center">
                            {auth.userInfo?.email}
                        </Typography>
                    </Box>

                    <Stack spacing={3} direction="column">
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="firstName"
                            label="First Name"
                            value={editedFirstName}
                            disabled={!isEditing}
                            onChange={(e) => setEditedFirstName(e.target.value)}
                            InputLabelProps={{ shrink: !!editedFirstName }}
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="lastName"
                            label="Last Name"
                            value={editedLastName}
                            disabled={!isEditing}
                            onChange={(e) => setEditedLastName(e.target.value)}
                            InputLabelProps={{ shrink: !!editedFirstName }}
                        />

                        {isEditing ? (
                            <Stack spacing={3} direction="row" sx={{ alignSelf: "end" }}>
                                <Button
                                    variant="contained"
                                    size="medium"
                                    onClick={handleCancel}
                                    sx={{
                                        bgcolor: "hsl(211, 10%, 45%)",
                                        "&:hover": { bgcolor: "hsl(211, 10%, 45%)" },
                                    }}
                                >
                                    Cancel
                                </Button>

                                <Button
                                    variant="contained"
                                    size="medium"
                                    onClick={handleSave}
                                    color="secondary"
                                >
                                    Save
                                </Button>
                            </Stack>
                        ) : (
                            <Button
                                variant="contained"
                                size="medium"
                                onClick={() => {
                                    setIsEditing(true);
                                }}
                                sx={{
                                    alignSelf: "flex-end",
                                    width: "30%",
                                    backgroundColor: "hsl(238, 40%, 52%)",
                                    "&:hover": { opacity: 0.8, backgroundColor: "hsl(238, 40%, 52%)" },
                                }}
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
