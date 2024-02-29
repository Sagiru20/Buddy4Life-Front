import { useState, MouseEvent } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import PetsIcon from "@mui/icons-material/Pets";
import { BrowserRouter } from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useNavigate } from "react-router-dom";
import { Route, Routes, Link, matchPath, useLocation } from "react-router-dom";

function useRouteMatch(patterns: readonly string[]) {
    const { pathname } = useLocation();
    console.log("found pathName is: " + pathname)
    for (let i = 0; i < patterns.length; i += 1) {
        const pattern = patterns[i];
        const possibleMatch = matchPath(pattern, pathname);
        if (possibleMatch !== null) {
            console.log("found possibleMatch: " + possibleMatch)
            return possibleMatch;
        }
    }

    return null;
}

function MyTabs() {
    const pages = ["Posts", "MyPosts", "Breeds"];

    const pagesPaths = pages.map((page) => "/" + page);

    // const routeMatch = useRouteMatch(["/Posts", "/MyPosts", "/Breeds"]);
    // const routeMatch = useRouteMatch(pages);
    const routeMatch = useRouteMatch(pagesPaths);
    const currentTab = routeMatch?.pattern?.path/*.split("/")[2]*/;
    console.log("current tab is: " + currentTab)

    return (
        <Tabs value={currentTab} >
            {pages.map((page, index) => (
                <Tab
                    key={index}
                    label={page}
                    value={pagesPaths[index]}
                    to={pagesPaths[index]}
                    component={Link}
                    sx={{ color: "white" }}
                />
            ))}
        </Tabs>
    );
}

function TabsRouter() {
    return (
        // <BrowserRouter>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                {/* <Routes>
                    <Route path="*" />
                </Routes> */}
                <MyTabs />
            </Box>
        // </BrowserRouter>
    );
}

const settings = ["Profile", "Account", "Dashboard", "Logout"];

function Navbar() {
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar>
            <Toolbar>
                <PetsIcon sx={{ mr: 1 }} />
                <Typography
                    variant="h5"
                    noWrap
                    component="a"
                    href="Posts"
                    sx={{
                        mr: 2,
                        display: { xs: "none", md: "flex" },
                        fontFamily: "monospace",
                        fontWeight: 700,
                        letterSpacing: ".3rem",
                        color: "inherit",
                        textDecoration: "none",
                    }}
                >
                    Buddy4Life
                </Typography>

                <TabsRouter />
                {/* <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                    {pages.map((page) => (
                        <Button key={page} sx={{ my: 2, color: "white", display: "block" }}>
                            <RouterLink to={`/${page}`}>{page}</RouterLink>
                        </Button>
                    ))}
                </Box> */}

                <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
                        {settings.map((setting) => (
                            <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                <Typography textAlign="center">{setting}</Typography>
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
export default Navbar;
