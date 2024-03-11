import { useState, useEffect, MouseEvent } from "react";
import { Link, matchPath, useLocation, useNavigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import PetsIcon from "@mui/icons-material/Pets";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { blue } from "@mui/material/colors";
import PostFormModal from "./Posts/PostFormModal";
import UserProfileModal from "./UserProfile/UserProfileModal";
import {
    Typography,
    Tooltip,
    Toolbar,
    Tabs,
    Tab,
    Menu,
    MenuItem,
    IconButton,
    Button,
    Box,
    Avatar,
    AppBar,
} from "@mui/material";
import useAuth from "../hooks/useAuth";
import useLogout from "../hooks/useLogout";

const tabsTheme = createTheme({
    palette: {
        primary: blue,
    },
});

function useRouteMatch(patterns: readonly string[]) {
    const { pathname } = useLocation();

    for (let i = 0; i < patterns.length; i += 1) {
        const pattern = patterns[i];
        const possibleMatch = matchPath(pattern, pathname);
        if (possibleMatch !== null) {
            return possibleMatch;
        }
    }

    return null;
}

function MyTabs() {
    const pages = ["posts", "breeds"];
    const pagesPaths = pages.map((page) => "/" + page);

    const routeMatch = useRouteMatch(pagesPaths);
    const currentTab = routeMatch?.pattern?.path;
    const [defaultTab, setDefaultTab] = useState<string | boolean>("/posts");

    useEffect(() => {
        if (!currentTab) {
            setDefaultTab(false);
        }
    }, [currentTab]);

    return (
        <ThemeProvider theme={tabsTheme}>
            <Tabs
                value={currentTab || defaultTab}
                indicatorColor="primary"
                textColor="primary"
                sx={{ marginRight: 3 }}
            >
                {pages.map((page, index) => (
                    <Tab
                        key={index}
                        label={page}
                        value={pagesPaths[index]}
                        to={pagesPaths[index]}
                        component={Link}
                        sx={{ color: "white", fontWeight: "bold" }}
                    />
                ))}
            </Tabs>
        </ThemeProvider>
    );
}

function Navbar() {
    const { auth } = useAuth();
    const logout = useLogout();
    const navigate = useNavigate();
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const signOut = async () => {
        await logout();
        navigate("/signin");
    };

    const [showPostFormModal, setShowPostFormModal] = useState(false);
    const [showProfile, setShowProfile] = useState(false);

    return (
        <AppBar position="sticky">
            <Toolbar sx={{ justifyContent: "space-between" }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <PetsIcon sx={{ mr: 1 }} />

                    <Typography
                        variant="h5"
                        noWrap
                        component={Link}
                        to={"/posts"}
                        sx={{
                            mr: 2,
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    >
                        Buddy4Life
                    </Typography>

                    <MyTabs />

                    <Button
                        key="New Post"
                        variant="contained"
                        color="secondary"
                        startIcon={<AddCircleIcon />}
                        onClick={() => setShowPostFormModal(true)}
                    >
                        New Post
                    </Button>
                    <PostFormModal
                        isOpen={showPostFormModal}
                        closeModal={() => setShowPostFormModal(false)}
                    />
                </Box>

                <Box>
                    <Typography
                        variant="body1"
                        noWrap
                        component="span"
                        sx={{
                            mr: 1,
                            fontWeight: 500,
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    >
                        {auth?.userInfo?.firstName + " " + auth?.userInfo?.lastName}
                    </Typography>

                    <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu}>
                            <Avatar src={auth.userInfo?.imageUrl} />
                        </IconButton>
                    </Tooltip>

                    <Menu
                        sx={{ mt: "45px" }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >
                        <MenuItem key="profile" onClick={handleCloseUserMenu}>
                            <Typography onClick={() => setShowProfile(true)} textAlign="center">
                                Profile
                            </Typography>

                            <UserProfileModal isOpen={showProfile} closeModal={() => setShowProfile(false)} />
                        </MenuItem>

                        <MenuItem key="logout" onClick={handleCloseUserMenu}>
                            <Typography onClick={signOut} textAlign="center">
                                Logout
                            </Typography>
                        </MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
export default Navbar;
