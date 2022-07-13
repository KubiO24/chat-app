import { useRecoilValue } from "recoil";
import { selectedChatState } from "./globalState";
import User from './components/User';
import SearchBar from './components/SearchBar';
import UsersList from './components/UsersList';
import Chat from './components/Chat';
import ChatField from './components/ChatField';

import { Grid, Divider, Typography } from "@mui/material";

function Main() {
    const selectedChat = useRecoilValue(selectedChatState);
    return (
        <Grid container sx={{height: "100vh", bgColor: 'white'}}>
            <Grid item xs={3} sx={{borderRight: "1px solid #e0e0e0"}}>
                <User />

                <Divider />

                <SearchBar /> 

                <Divider />

                <Typography component="h3" variant="h6" align="center" color="grey.800" sx={{marginTop: 1}}>
                    Connected users:
                </Typography>

                <UsersList />
            </Grid>
            <Grid item xs={9}>
                <Chat />
                
                {selectedChat.username !== undefined && selectedChat.username !== '' ?
                    <>
                        <Divider />

                        <ChatField />
                    </>
                :
                    undefined
                }         
            </Grid>
        </Grid>
    );
}

export default Main;