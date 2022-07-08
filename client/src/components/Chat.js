import { socket } from '../socketConnection';
import { useRecoilState, useRecoilValue } from "recoil";  
import { selectedChatState } from "../globalState";
import ChatMessage from './ChatMessage';
import { List } from "@mui/material";

socket.on('receiveMessage', (senderUsername, message) => {
    console.log('User ' + senderUsername + ' sent message ' + message);
})

function Chat() {
    const selectedChat = useRecoilValue(selectedChatState);
 
    return (
        <>
            {selectedChat != '' ?
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
            
            :
                <List sx={{ height: "85vh", overflowY: "auto"}} />
            }
        </>
        
    );
}

export default Chat;
