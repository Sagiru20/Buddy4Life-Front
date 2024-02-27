import * as React from 'react';
import { useState } from 'react';
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

interface AddPostData {
  category: /*'Rehome' | 'Adopt';*/ string
  title: string;
  breed?: string;
  gender?: /*'Male' | 'Female';*/ string
  city: string;
  name?: string; 
  age?: number; 
  weight?: number; 
  height?: number;
  color?: string;
  image?: File;
}

interface AddPostProps {
  onSubmit: (data: AddPostData) => void;
}

const AddPost: React.FC<AddPostProps> = ({ onSubmit }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState<AddPostData>({
    category: 'Rehome', // Default category
    title: '',
    breed: '',
    gender: '',
    city: '',
    name: '',
    age: 0 ,
    weight: 0,
    height: 0,
    color: '',
    image: undefined,
  });

  const [showErrors, setShowErrors] = useState(false);


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
    const hasAllRequiredFields = requiredFields.every((field) => !!formData[(field as keyof AddPostData)]);
    console.log("value of required is " + hasAllRequiredFields)
  
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

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, category: event.target.value, gender: undefined});
  };

  const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, gender: event.target.value });
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  const steps = [
    {
      label: 'Let\'s get started',
      content: (
        <>
        <Typography variant="body2" sx={{ mr: 1 }} marginTop={2}>
                      Would you like to Rehome or adopt a new dog?
        </Typography>
          <FormControl component="fieldset">
            <RadioGroup aria-label="category" name="category" value={formData.category} onChange={handleCategoryChange}>
              <FormControlLabel value="Rehome" control={<Radio />} label="Rehome" />
              <FormControlLabel value="Adopt" control={<Radio />} label="Adopt" />
            </RadioGroup>
          </FormControl>
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
        </>
      ),
      requiredFields: ['title'],
    },
    {
      label: 'Tell us about your dog',
      content: formData.category === 'Rehome'
      ? (
        <>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            value={formData.name}
            error={formData.name == '' && showErrors}
            onChange={handleInputChange}
          />
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
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
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
            error={formData.age !== undefined && formData.age !== 0}
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
      )
      :
       (
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
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
            </TextField>
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
        requiredFields: formData.category === 'Rehome'? ['gender', 'breed', 'name'] : ['gender', 'breed'],
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
          // <Modal open={true} aria-labelledby="modal-modal-title"
          // aria-describedby="modal-modal-description"
          // sx={{
          //   display: 'flex',
          //   alignItems: 'center',
          //   justifyContent: 'center',
          // }}   >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
          // </Modal>
        );
      };
              
export default AddPost;