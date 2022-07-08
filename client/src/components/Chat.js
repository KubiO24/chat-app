import { useRecoilValue } from 'recoil';  
import { usernameState } from '../globalState';
import { socket } from '../socketConnection';

import ChatMessage from './ChatMessage';

import { Grid, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";

function Chat() {
    const username = useRecoilValue(usernameState);

    return (
        <List sx={{ height: "85vh", overflowY: "auto"}}>
            <ChatMessage message='Hi' sentByMe={false}/>
            <ChatMessage message='Hi123' sentByMe={true}/>
            <ChatMessage message='Hi123' sentByMe={true}/>
            <ChatMessage message='Hi123' sentByMe={false}/>
            <ChatMessage message='Hi' sentByMe={false}/>
            <ChatMessage message='Hi123' sentByMe={true}/>
            <ChatMessage message='Hi123' sentByMe={true}/>
            <ChatMessage message='Hi123' sentByMe={false}/>
            <ChatMessage message='Hi' sentByMe={false}/>
            <ChatMessage message='Hi123' sentByMe={true}/>
            <ChatMessage message='Hi123' sentByMe={true}/>
            <ChatMessage message='Hi123' sentByMe={false}/>
            <ChatMessage message='Hi' sentByMe={false}/>
            <ChatMessage message='Hi123' sentByMe={true}/>
            <ChatMessage message='Hi123' sentByMe={true}/>
            <ChatMessage message='Hi123' sentByMe={false}/>
            
        </List>
    );
}

export default Chat;
