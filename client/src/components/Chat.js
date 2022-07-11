import { useState, useEffect, useRef } from 'react';
import { socket } from '../socketConnection';
import { useRecoilState, useRecoilValue } from "recoil";  
import { loginnedUsersListState, selectedChatState, messagesListState, newMessageState } from "../globalState";
import ChatMessage from './ChatMessage';
import { List, Box, Typography } from "@mui/material";

function Chat() {
    const loginnedUsers = useRecoilValue(loginnedUsersListState);
    const [selectedChat, setSelectedChat] = useRecoilState(selectedChatState);
    const [messagesList, setMessagesList] = useRecoilState(messagesListState);
    const [newMessage, setNewMessage] = useRecoilState(newMessageState);
    const [userMessages, setUserMessages] = useState([])
    const bottomOfMessages = useRef();

    // Connecting or disconnecting user from chat
    useEffect(() => {
        const newMessagesList = loginnedUsers.map(user => {
            const index = messagesList.findIndex(item => {
                return item.username === user.username;
            });

            if(index === -1) {
                return {'username': user.username, 'messages': []}
            }else {
                return messagesList[index];
            }
        });

        if(newMessagesList.find(user => user.username === selectedChat.username) === undefined) setSelectedChat({});

        setMessagesList(newMessagesList)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[loginnedUsers])

    
    useEffect(() => {
        socket.on('receiveMessage', (senderUsername, message) => {
            setNewMessage({'username': senderUsername, 'message': message})
        });            

        // eslint-disable-next-line react-hooks/exhaustive-deps          
    },[socket])
            
    useEffect(() => {   
        if(newMessage.username === undefined || newMessage.message === undefined) return;

        const message = {'text': newMessage.message, 'sentByMe': false};

        if(messagesList.length === 0) {
            setMessagesList([
                {
                    'username': newMessage.username,
                    'messages': [message]
                }
            ]);
            return
        }

        const newMessagesList = messagesList.map(item => {
            if(item.username === newMessage.username) return {'username': item.username, 'messages': [...item.messages, message]};
            else return item;
        });
        setMessagesList(newMessagesList)
        

        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[newMessage])

    useEffect(() => {
        setUserMessages(messagesList.filter(item => item.username === selectedChat.username));
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[messagesList])

    useEffect(() => {
        if(bottomOfMessages.current === undefined) return;
        bottomOfMessages.current.scrollIntoView({ behavior: 'smooth' });
        console.log(userMessages)
    },[userMessages])
            
    return (
        <List sx={{ height: "85vh", overflowY: "auto"}}>
            {selectedChat.username !== undefined && selectedChat.username !== '' ?
                <>
                    {messagesList.map(item => {
                        if(item.username !== selectedChat.username) return false;
                        
                        if(item.messages.length === 0) {
                            return (
                                <Typography key={'empty'} component="h5" variant="h5" align='center' mt='40vh' color='grey.400' >
                                    This conversation is empty
                                </Typography>
                            )
                        }else {
                            return item.messages.map((message, id) => {
                                return <ChatMessage key={id} message={message.text} sentByMe={message.sentByMe}/>
                            })
                        }
                    })}   
                    <div ref={bottomOfMessages}></div>
                </>
            :
                <Typography component="h5" variant="h5" align='center' mt='40vh' color='grey.400' >
                    Select user to chat with from user list
                </Typography> 
            }
        </List>
        
    );
}

export default Chat;
