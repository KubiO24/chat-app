import { useState } from "react";

import User from "./User";
import SearchBar from "./SearchBar";
import UsersList from "./UsersList";

import { Drawer, Container, Grid, Divider, Typography, Button } from "@mui/material";

const drawerWidth = 300;

const NavDrawer = (props) => {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <User />

            <Divider />

            <SearchBar />

            <Divider />

            <Typography component="h3" variant="h6" align="center" color="grey.800" sx={{ marginTop: 1 }}>
                Connected users:
            </Typography>

            <UsersList />
        </div>
    );

    return (
        <Container
            sx={{
                width: drawerWidth,
                height: "100vh",
                position: "absolute",
                left: 0,
                top: 0,
            }}
        >
            <Button
                type="submit"
                size="medium"
                variant="contained"
                onClick={handleDrawerToggle}
                sx={{
                    display: { xs: "block", sm: "block", md: "none" },
                    position: "absolute",
                    left: 20,
                    top: 20,
                    px: 3,
                    zIndex: 1,
                }}
            >
                Menu
            </Button>

            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    display: { xs: "block", sm: "block", md: "none" },
                    "& .MuiDrawer-paper": {
                        boxSizing: "border-box",
                        width: drawerWidth,
                    },
                }}
            >
                {drawer}
            </Drawer>

            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: "none", sm: "none", md: "block" },
                    "& .MuiDrawer-paper": {
                        boxSizing: "border-box",
                        width: drawerWidth,
                    },
                }}
                open
            >
                {drawer}
            </Drawer>
        </Container>
    );
};

export default NavDrawer;
