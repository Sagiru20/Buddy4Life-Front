import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import UserProfileModal from "./UserProfileModal";
import { getCurrentUserInfo, IUser } from "../../services/user-services";

const user: IUser = {
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@example.com",
};

function UserProfileButton() {
    const handleOpen = async () => {
        setOpen(true);
    };

    useEffect(() => {
        const getUser = async () => {
            //TODO delete const id
            const id = "65de3b1b1499886e7acc5843";
            const user = await getCurrentUserInfo(id);
            setCurrentUser(user);
        };

        getUser();
    }, []);

    const [open, setOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState(user);

    return (
        <div>
            <Button onClick={handleOpen}>Open Profile</Button>
            <UserProfileModal isOpen={open} user={currentUser} />
        </div>
    );
}

export default UserProfileButton;
