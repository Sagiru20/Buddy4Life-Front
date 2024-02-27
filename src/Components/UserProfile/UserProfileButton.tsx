import { Button } from '@mui/material';
import { useState } from 'react';
import UserProfileModal from "./UserProfileModal"





const user = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@example.com',
  };



  export default function userProfileButton() {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    // const handleClose = () => setOpen(false);

    return (
        <div>
            <Button onClick={handleOpen}>Open Profile</Button>
            <UserProfileModal isOpen={open}user={user} />
        </div>
        
    );

}

