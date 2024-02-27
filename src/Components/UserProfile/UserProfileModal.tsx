import * as React from 'react';
import { useState } from 'react'; 
import {
  Button,
  Modal,
  Box,
  Typography,
  TextField,
} from '@mui/material';

export interface User {
  firstName: string;
  lastName: string;
  email: string;
}

export interface UserProfileModalProps {
    isOpen: boolean;
    user: User;
}

const UserProfileModal: React.FC<UserProfileModalProps> = ({ user, isOpen }) => {

    const [editedFirstName, setEditedFirstName] = useState(user.firstName);
    const [editedLastName, setEditedLastName] = useState(user.lastName);
    const [editedEmail, setEditedEmail] = useState(user.email);
    const [isEditing, setIsEditing] = useState(false)
  

  const enableEdit = () => {
    setIsEditing(true); 
  };

  const updateUser = (updatedUser: User) => {

    //TODO: save updated user in DB 
    console.log('Updated user:', updatedUser);
    
  };

  const handleSave = () => {

    const updatedUser: User = {
      firstName: editedFirstName,
      lastName: editedLastName,
      email: editedEmail,
    };

    updateUser(updatedUser);
    setIsEditing(false); 
  };

  return (
    <Modal
      open={ isOpen }
    //   onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', border: '2px solid #000',borderRadius: '10px', p: 4 }}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          User Profile
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>

          {!isEditing && <Button onClick={ enableEdit }>Edit</Button>}
          
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
                onChange={(e) => setEditedEmail(e.target.value)}
              />
              <Button onClick={handleSave}>Save</Button>
            </>
        </Box>
      </Box>
    </Modal>
  );
};

export default UserProfileModal;