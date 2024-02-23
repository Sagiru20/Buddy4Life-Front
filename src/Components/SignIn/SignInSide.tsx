import { FormEvent } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import DogParkImage from "../../assets/dog_park.jpg";
import GoogleIcon from "@mui/icons-material/Google";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { blue, red } from "@mui/material/colors";
import { appTheme } from "../AppTheme";

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

export default function SignInSide() {
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get("email"),
            password: data.get("password"),
        });
    };

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
                                <Link href="#" variant="body2" color={blue[500]}>
                                    Sign Up
                                </Link>
                            </Grid>
                        </Grid>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
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
                            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                                Sign In
                            </Button>
                            <Divider>OR</Divider>
                            <Button
                                fullWidth
                                variant="contained"
                                color="googleRed"
                                startIcon={<GoogleIcon />}
                                sx={{ mt: 2 }}
                            >
                                Sign In With Google
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}
