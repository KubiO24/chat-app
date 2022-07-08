import { socket } from '../socketConnection';

import ChatMessage from './ChatMessage';

import { List } from "@mui/material";

function Chat() {
    

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
