import { useEffect } from 'react';
import { socket } from '../socketConnection';
import { useRecoilState, useRecoilValue } from "recoil";  
import { loginnedUsersListState, selectedChatState, messagesListState, newMessageState } from "../globalState";
import ChatMessage from './ChatMessage';
import { List, Box, Typography } from "@mui/material";

function Chat() {
    const loginnedUsers = useRecoilValue(loginnedUsersListState);
    const selectedChat = useRecoilValue(selectedChatState);
    const [messagesList, setMessagesList] = useRecoilState(messagesListState);
    const [newMessage, setNewMessage] = useRecoilState(newMessageState);

    // Connecting or disconnecting user from chat
    useEffect(() => {
        const newMessagesList = loginnedUsers.map(user => {
            const index = messagesList.findIndex(item => {
                return item.username == user.username;
            });

            if(index == -1) {
                return {'username': user.username, 'messages': []}
            }else {
                return messagesList[index];
            }
        });
        console.log(newMessagesList)
        setMessagesList(newMessagesList)
    },[loginnedUsers])

    
    useEffect(() => {
        socket.on('receiveMessage', (senderUsername, message) => {
            setNewMessage({'username': senderUsername, 'message': message})
        });                      
    },[socket])
            
    useEffect(() => {   
        if(newMessage.username == undefined || newMessage.message == undefined) return;

        const message = {'text': newMessage.message, 'sentByMe': false};

        if(messagesList.length == 0) {
            setMessagesList([
                {
                    'username': newMessage.username,
                    'messages': [message]
                }
            ]);
            return
        }

        const newMessagesList = messagesList.map(item => {
            if(item.username == newMessage.username) return {'username': item.username, 'messages': [...item.messages, message]};
            else return item;
        });
        setMessagesList(newMessagesList)
    },[newMessage])
            
    return (
        <>
            {selectedChat.username != '' ?
                <List sx={{ height: "85vh", overflowY: "auto"}}>
                    {messagesList.map(item => {
                        if(item.username != selectedChat.username) return false;
                        
                        return item.messages.map((message, id) => {
                            return <ChatMessage key={id} message={message.text} sentByMe={message.sentByMe}/>                 
                        })
                    })}   
                </List>
            
            :
                <Box sx={{ height: "85vh", overflowY: "auto"}}>
                    <Typography component="h3" variant="h5" align='center' mt='40vh' color='grey.400' >
                        Select user to chat with from user list
                    </Typography> 
                </Box>
            }
        </>
        
    );
}

export default Chat;
