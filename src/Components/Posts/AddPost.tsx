import * as React from 'react';
import { useState, useEffect } from 'react';
import {
  Step,
  Stepper,
  StepLabel,
  Button,
  Typography,
  TextField,
  MenuItem,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Box,
  Modal
} from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { createPost } from "../../services/posts-services"


export interface PostData {
  title: string;
  description: string;
  breed?: string;
  gender?: /*'male' | 'female';*/ string
  city: string;
  name?: string; 
  age: number; 
  weight?: number; 
  height?: number;
  color?: string;
  // image?: File;
}

export interface IDogInfo {
  name: string;
  breed: string;
  //TODO change to Gender
  gender: string;
  age: number;
  weight?: number;
  height?: number;
  color?: string;
}

export interface IPostData {
  title: string;
  description: string;
  dogInfo: IDogInfo;
  city?: string;
  imageUrl?: string;
}

// interface AddPostProps {
//   onSubmit: (data: PostData) => void;
// }

export default function AddPost() {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState<PostData>({
    title: '',
    description: '',
    city: '',
    breed: '',
    gender: '',
    name: '',
    age: 0 ,
    weight: 0,
    height: 0,
    color: '',
    // image: undefined,
  });

  const [showErrors, setShowErrors] = useState(false);

  // const [breeds, setBreeds] = useState([]);

  // useEffect(() => {
  //   const fetchBreeds = async () => {
  //       dddd
  //   };
  //   fetchBreeds();
  // }, []);


  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpeg'],
    },
    onDrop: (acceptedFiles) => {
      setFormData({ ...formData, image: acceptedFiles[0] });
    },
  });

  const handleNext = () => {
    setShowErrors(false)
    const currentStep = steps[activeStep];
    const requiredFields = currentStep.requiredFields || []; 
    const hasAllRequiredFields = requiredFields.every((field) => !!formData[(field as keyof PostData)]);

    if (hasAllRequiredFields) {
      setActiveStep(activeStep + 1);
    } else {
      setShowErrors(true);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, gender: event.target.value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addPost()
  };

  const addPost = async () => {
    //TODO add Image Url!
    // const url = await uploadPhoto(imgSrc!);
    // console.log("upload returned:" + url);
    const dogInfoDetails: IDogInfo = {
        breed: formData.breed!!,
        gender: formData.gender!!,
        name: formData.name!!,
        age: formData.age,
        ...(formData.weight !== 0 && { weight: formData.weight }),
        ...(formData.height !== 0 && { height: formData.height }),
        ...(typeof formData.color === 'string' && formData.color !== '' && { color: formData.color }),
        // image: formData.image
    }

    const post: IPostData = {
      title: formData.title,
      description: formData.description,
      dogInfo: dogInfoDetails,
      city: formData.city      
    }

    const res = await createPost(post)
    console.log(res)
    // onSubmit(formData);
    console.log(res)
}

  const steps = [
    {
      label: 'Let\'s get started with some technical info:',
      content: (
        <>
          <TextField
            margin="normal"
            required
            fullWidth
            id="breed"
            label="Breed"
            name="breed"
            value={formData.breed}
            error={formData.breed == '' && showErrors}
            onChange={handleInputChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="gender"
            label="Gender"
            name="gender"
            select
            value={formData.gender || ''}
            error={formData.gender == '' && showErrors}
            onChange={handleGenderChange}
          >
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
          </TextField>
          <TextField
            margin="normal"
            required
            fullWidth
            id="age"
            label="Age"
            name="age"
            type="number"
            value={formData.age}
            error={(formData.age == undefined || formData.age == 0) && showErrors}
            onChange={handleInputChange}
          />
          <TextField
            margin="normal"
            fullWidth
            id="weight"
            label="Weight (kg)"
            name="weight"
            type="number"
            value={formData.weight}
            onChange={handleInputChange}
          />
          <TextField
            margin="normal"
            fullWidth
            id="height"
            label="Height (cm)"
            name="height"
            type="number"
            value={formData.height}
            onChange={handleInputChange}
          />
          <TextField
            margin="normal"
            fullWidth
            id="color"
            label="Color"
            name="color"
            value={formData.color}
            onChange={handleInputChange}
          />
          <TextField
            margin="normal"
            fullWidth
            id="city"
            label="City"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
          />
        </>
      ),
      requiredFields: ['gender', 'breed', 'age'],
    },
    {
      label: 'Tell us about your dog',
      content:
      (
        <>
        <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Dog's Name"
            name="name"
            value={formData.name}
            error={formData.name == '' && showErrors}
            onChange={handleInputChange}
          />
        <TextField
            margin="normal"
            required
            fullWidth
            id="title"
            label="Post Title"
            name="title"
            value={formData.title}
            error={formData.title == '' && showErrors}
            onChange={handleInputChange}
          />
          <TextField
            size="medium"
            margin="normal"
            required
            fullWidth
            multiline
            rows="6"
            id="description"
            label="describe your dog"
            name="description"
            value={formData.description}
            error={formData.description == '' && showErrors}
            onChange={handleInputChange}
          />
          
        </>
      ),
        requiredFields: ['title', 'description', 'name']
      },
      {
        label: 'Upload Dog\'s Image',
        content: (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200 }}>
          <Box {...getRootProps()} sx={{
            border: 1,
            borderColor: 'gray',
            borderRadius: 2,
            padding: 2,
            width: 200,
            height: 100,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            backgroundColor: acceptedFiles.length > 0 ? '#ddd' : 'white',
          }}>
            {acceptedFiles.length === 0 && (
              <>
                <Typography variant="body2" color="text.secondary">
                  Press to upload \ Drag & drop an image here
                </Typography>
              </>
            )}
            {acceptedFiles.length > 0 && (
              <img
                src={URL.createObjectURL(acceptedFiles[0])}
                alt="Uploaded image"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            )}
            <input {...getInputProps()} />
          </Box>
        </Box>
      ),
    },
  ]
        return (
          <Modal open={true} aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}   >
             <Box
              sx={{
                display: 'flex',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '80%', 
                maxWidth: '1000px', 
                maxHeight: '600px',
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 4,
                overflowY: 'auto'
              }}
            >
          {/* <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}> */}
          <Stepper activeStep={activeStep} alternativeLabel  sx={{ width: '100%' }}>
            {steps.map((step) => (
              <Step key={step.label}>
                <StepLabel>{step.label}</StepLabel>
                {activeStep === steps.indexOf(step) && (
                  <Box sx={{ padding: 2,  display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    {step.content}
                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
                    <Button variant="contained" disabled={activeStep === 0} onClick={handleBack}>
                      Back
                    </Button>
                    {activeStep === steps.length - 1 ? (
                      <Button variant="contained" onClick={handleSubmit}>
                        Create Post
                      </Button>
                    ) : (
                      <Button variant="contained" onClick={handleNext}>
                        Next
                      </Button>
                    )}
                    </Box>
                  </Box>
                )}
              </Step>
            ))}
          </Stepper>
          </Box>
          </Modal>
        );
      };