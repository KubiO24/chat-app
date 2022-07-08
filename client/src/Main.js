import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";  
import { usernameState, avatarColorState, loginnedUsersState } from "./globalState";
import { socket } from './socketConnection';
import User from './components/User';
import SearchBar from './components/SearchBar';
import UsersList from './components/UsersList';
import Chat from './components/Chat';

import { Grid, Divider, TextField, Typography, Fab } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

function Main() {
    const [username, setUsername] = useRecoilState(usernameState);

    return (
        <Grid container sx={{height: "100vh", bgColor: 'white'}}>
            <Grid item xs={3} sx={{borderRight: "1px solid #e0e0e0"}}>
                <User />

                <Divider />

                <SearchBar />
                

                <Divider />

                <Typography component="h3" variant="h6" align="center" sx={{marginTop: 1}}>
                    Connected users:
                </Typography>

                <UsersList />
            </Grid>
            <Grid item xs={9}>
                <Chat />

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
    );
}

export default Main;
