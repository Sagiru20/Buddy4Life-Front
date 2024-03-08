import { useRef, useState, useEffect } from "react";
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { blue } from "@mui/material/colors";
import {
    Avatar,
    Box,
    Button,
    CssBaseline,
    Divider,
    FormControl,
    IconButton,
    InputAdornment,
    Grid,
    Link,
    Paper,
    TextField,
    Typography,
} from "@mui/material";
import { googleSignin } from "../../services/user-services";
import { loginUser } from "../../BackendClient";
import { useAuth } from "../../hooks/useAuth";
import DogParkImage from "../../assets/dog_park.jpg";

function SignIn() {
    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/posts";

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const response = await loginUser(email, password);
        setAuth({ response._id, user, pwd, roles, accessToken });
        setEmail("");
        setPassword("");
        navigate(from, { replace: true });
    };

    const onGoogleLoginSuccess = async (credentialResponse: CredentialResponse) => {
        console.log(credentialResponse);
        try {
            const res = await googleSignin(credentialResponse);
            console.log(res);
        } catch (e) {
            console.log(e);
        }
    };

    const onGoogleLoginFailure = () => {
        console.log("Google login failed");
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
                        <LockOutlinedIcon />
                    </Avatar>

                    <Typography component="h1" variant="h5">
                        Sign in to Buddy4Life
                    </Typography>

                    <Grid container justifyContent="center" spacing={1}>
                        <Grid item>
                            <span>Don't have an account?</span>
                        </Grid>

                        <Grid item>
                            <Link href="/register" variant="body2" color={blue[500]}>
                                Sign Up
                            </Link>
                        </Grid>
                    </Grid>

                    <Box sx={{ mt: 1 }}>
                        <form onSubmit={handleSubmit}>
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
                                Sign in
                            </Button>
                        </form>

                        <Divider orientation="horizontal" flexItem>
                            OR
                        </Divider>

                        <Box display="flex" sx={{ mt: 1 }} justifyContent="center">
                            <GoogleLogin onSuccess={onGoogleLoginSuccess} onError={onGoogleLoginFailure} />
                        </Box>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
}

export default SignIn;
