import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { blue } from "@mui/material/colors";
import { LockOutlined, Visibility, VisibilityOff } from "@mui/icons-material";
import {
    Avatar,
    Box,
    Button,
    CssBaseline,
    FormControl,
    Grid,
    IconButton,
    InputAdornment,
    Link,
    Paper,
    TextField,
    Typography,
} from "@mui/material";
import { backendClient } from "../../services/BackendClient";
import useUserService, { IUser } from "../../services/user-services";
import DogParkImage from "../../assets/dog_park.jpg";

export default function RegisterSide() {
    const navigate = useNavigate();
    const { registerUser } = useUserService(backendClient);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleFirstNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFirstName(event.target.value);
    };

    const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLastName(event.target.value);
    };

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        register();
    };

    const register = async () => {
        const user: IUser = {
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName,
        };

        try {
            await registerUser(user);
            navigate("/signin");
        } catch (error) {
            console.log("Register failed: " + error);
        }
    };

    return (
        <Grid container component="main" sx={{ height: "100vh" }}>
            <CssBaseline />

            <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    backgroundImage: `url(${DogParkImage})`,
                    backgroundRepeat: "no-repeat",
                    backgroundColor: (t) =>
                        t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: "cover",
                    backgroundPosition: "left",
                }}
            />

            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <Box
                    sx={{
                        my: 8,
                        mx: 4,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: "secondary.light" }}>
                        <LockOutlined />
                    </Avatar>

                    <Typography component="h1" variant="h5">
                        Register
                    </Typography>

                    <Grid container justifyContent="center" spacing={1}>
                        <Grid item>
                            <span>Already have an account?</span>
                        </Grid>

                        <Grid item>
                            <Link component={RouterLink} to="/signin" variant="body1" color={blue[500]}>
                                Sign In
                            </Link>
                        </Grid>
                    </Grid>

                    <Box sx={{ mt: 1 }}>
                        <form onSubmit={handleSubmit}>
                            <FormControl fullWidth margin="normal">
                                <TextField
                                    label="First Name"
                                    value={firstName}
                                    onChange={handleFirstNameChange}
                                    required
                                />
                            </FormControl>

                            <FormControl fullWidth margin="normal">
                                <TextField
                                    label="Last Name"
                                    value={lastName}
                                    onChange={handleLastNameChange}
                                    required
                                />
                            </FormControl>

                            <FormControl fullWidth margin="normal">
                                <TextField
                                    label="Email"
                                    value={email}
                                    onChange={handleEmailChange}
                                    required
                                    type="email"
                                    helperText="Enter a valid email address"
                                    error={!email.match(/^[^@]+@[^@]+\.[^@]+$/) && email !== ""}
                                />
                            </FormControl>

                            <FormControl fullWidth margin="normal">
                                <TextField
                                    label="Password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    required
                                    type={showPassword ? "text" : "password"}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={handleClickShowPassword}>
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                    helperText="Password must be at least 6 characters long"
                                    error={password.length < 6 && password !== ""}
                                />
                            </FormControl>

                            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                                Register me!
                            </Button>
                        </form>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
}
