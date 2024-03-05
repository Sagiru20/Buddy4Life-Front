import { FormEvent } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { FormControl, Input, InputAdornment, IconButton } from "@mui/material";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Divider from "@mui/material/Divider";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import DogParkImage from "../../assets/dog_park.jpg";
import GoogleIcon from "@mui/icons-material/Google";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { blue, red } from "@mui/material/colors";
import { appTheme } from "../AppTheme";
import { IUser, loginUser, googleSignin } from "../../services/user-services";
import { useNavigate } from "react-router-dom";
import { CredentialResponse, GoogleLogin } from '@react-oauth/google'

declare module "@mui/material/styles" {
    interface Palette {
        googleRed: Palette["primary"];
    }

    interface PaletteOptions {
        googleRed?: PaletteOptions["primary"];
    }
}

declare module "@mui/material/Button" {
    interface ButtonPropsColorOverrides {
        googleRed: true;
    }
}

const signInTheme = createTheme(appTheme, {
    palette: {
        googleRed: appTheme.palette.augmentColor({
            color: red,
            name: "googleRed",
        }),
    },
});



function SignIn() {

    const navigate = useNavigate();


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

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
    
        // TODO send the data and register
        console.log('Email:', email);
        console.log('Password:', password);
        signInUser()
    
    };
    
    const signInUser = async () => {

        const user: IUser = {
            email: email,
            password: password,
        }
        
        try {

            await loginUser(user)
            navigate('/user')

        } catch (error) {

            console.log("login failed: "+ error)
        }
         
    };

    const onGoogleLoginSuccess = async (credentialResponse: CredentialResponse) => {
        console.log(credentialResponse)
        try {
            const res = await googleSignin(credentialResponse)
            console.log(res)
        } catch (e) {
            console.log(e)
        }
    }

const onGoogleLoginFailure = () => {
        console.log("Google login failed")
    }

    return (
        <ThemeProvider theme={signInTheme}>
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
                        backgroundColor: (t) => (t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900]),
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
                                <Link href="/register" variant="body2" color={blue[500]} >
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
                                error={!email.match(/^[^@]+@[^@]+\.[^@]+$/) && email !== ''}
                                />
                            </FormControl>
                            <FormControl fullWidth margin="normal">
                                <TextField
                                label="Password"
                                value={password}
                                onChange={handlePasswordChange}
                                required
                                type={showPassword ? 'text' : 'password'}
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
                                error={password.length < 6 && password !== ''}
                                />
                            </FormControl>
                            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                                Sign in
                            </Button>
                            </form>
                        </Box>                           
                        <Grid container>
                            <Grid item xs>
                                <Link
                                    href="#"
                                    variant="body1"
                                    color={blue[400]}
                                    style={{ fontSize: "14px", fontWeight: "bold", textDecoration: "none" }}
                                >
                                    Forgot password?
                                </Link>
                            </Grid>
                        </Grid>
                        <Divider>OR</Divider>
                         <Box sx={{ mt: 3 }}>
                           <GoogleLogin onSuccess={onGoogleLoginSuccess} onError={onGoogleLoginFailure} />
                        </Box>
                        
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}

export default SignIn;
