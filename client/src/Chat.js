import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";  
import { usernameState, avatarColorState, loginnedUsersState } from "./globalState";
import { socket } from './socketConnection';

import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import Fab from "@mui/material/Fab";
import SendIcon from "@mui/icons-material/Send";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

function Chat() {
    const [username, setUsername] = useRecoilState(usernameState);
    const avatarColor = useRecoilValue(avatarColorState);
    const [loginnedUsers, setloginnedUsers] = useRecoilState(loginnedUsersState);

    socket.on('loginnedUsersChange', connectedUsers => {
        const loginnedUsers = connectedUsers.filter(user => user.username != username);
        setloginnedUsers(loginnedUsers);
        console.log(loginnedUsers)
    })

    const logout = () => {
        socket.emit('logout');
        setUsername('');
    }

    return (
        <ThemeProvider theme={theme} >
            <Grid container component={Paper} sx={{height: "100vh"}}>
                <Grid item xs={3} sx={{borderRight: "1px solid #e0e0e0"}}>
                    <List>
                        <ListItem >
                            <ListItemIcon>
                                <Avatar alt="user" sx={{bgcolor: avatarColor}}/>
                            </ListItemIcon>
                            <ListItemText primary={username}></ListItemText>
                            <ListItemText align="right">
                                <Button
                                    type="submit"
                                    size="medium"
                                    variant="contained"
                                    color="error"
                                    onClick={logout}
                                >
                                    Logout
                                </Button>
                            </ListItemText> 
                        </ListItem>
                    </List>
                    <Divider />
                    <Grid item xs={12} style={{padding: "10px"}}>
                        <TextField id="outlined-basic-email" label="Search" variant="outlined" fullWidth />
                    </Grid>

                    <Divider />

                    <Typography component="h3" variant="h6" align="center" sx={{marginTop: 1}}>
                        Connected users:
                    </Typography>

                    <List>
                        {loginnedUsers.map(user => {
                            return (
                                <ListItem button key={user.username}>
                                    <ListItemIcon>
                                        <Avatar alt={user.username} sx={{bgcolor: user.avatarColor}} />
                                    </ListItemIcon>
                                    <ListItemText primary={user.username} />
                                    <ListItemText secondary="online" align="right"></ListItemText>
                                </ListItem>
                            )
                        })}
                    </List>
                </Grid>
                <Grid item xs={9}>
                    <List sx={{ height: "85vh", overflowY: "auto"}}>
                        <ListItem key="1">
                            <Grid container>
                                <Grid item xs={12}>
                                    <ListItemText align="right" primary="Hi"></ListItemText>
                                </Grid>
                                <Grid item xs={12}>
                                    <ListItemText align="right" secondary="09:30"></ListItemText>
                                </Grid>
                            </Grid>
                        </ListItem>
                        <ListItem key="2">
                            <Grid container>
                                <Grid item xs={12}>
                                    <ListItemText align="left" primary="Hi2"></ListItemText>
                                </Grid>
                                <Grid item xs={12}>
                                    <ListItemText align="left" secondary="09:31"></ListItemText>
                                </Grid>
                            </Grid>
                        </ListItem>
                        <ListItem key="3">
                            <Grid container>
                                <Grid item xs={12}>
                                    <ListItemText align="right" primary="Hi3"></ListItemText>
                                </Grid>
                                <Grid item xs={12}>
                                    <ListItemText align="right" secondary="10:30"></ListItemText>
                                </Grid>
                            </Grid>
                        </ListItem>
                    </List>
                    <Divider />
                    <Grid container style={{padding: "20px"}}>
                        <Grid item xs={11}>
                            <TextField id="outlined-basic-email" label="Type Something" fullWidth />
                        </Grid>
                        <Grid item xs={1} align="right">
                            <Fab color="primary" aria-label="add"><SendIcon /></Fab>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}

export default Chat;
