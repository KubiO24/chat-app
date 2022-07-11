import { useEffect, useRef } from 'react';
import { useRecoilState, useRecoilValue } from "recoil";  
import { loginnedUsersListState, selectedChatState, messagesListState, newMessageState } from "../globalState";
import { socket } from '../socketConnection';
import moment from 'moment';
import { List, Typography } from "@mui/material";
import ChatMessage from './ChatMessage';

function Chat() {
    const loginnedUsers = useRecoilValue(loginnedUsersListState);
    const [selectedChat, setSelectedChat] = useRecoilState(selectedChatState);
    const [messagesList, setMessagesList] = useRecoilState(messagesListState);
    const [newMessage, setNewMessage] = useRecoilState(newMessageState);
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

        setNewMessage({type: 'userJoined'})
        setMessagesList(newMessagesList)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[loginnedUsers])

    
    // Receiving messaged from other users
    useEffect(() => {
        socket.on('receiveMessage', (senderUsername, message) => {
            setNewMessage({'username': senderUsername, 'message': message})
        });            

        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[socket])
            
    useEffect(() => {   
        if(newMessage.username === undefined || newMessage.message === undefined) return;

        const message = {'text': newMessage.message, date: moment().format(), 'sentByMe': false};

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
        if(bottomOfMessages.current === undefined) return;
        if(newMessage.type === 'userJoined') return
        if(newMessage.type === 'sentByMe' || newMessage.username === selectedChat.username) bottomOfMessages.current.scrollIntoView({ behavior: 'smooth' });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[messagesList])
            
    return (
        <List sx={{ height: "84vh", overflowY: "auto", mt:'20px'}}>
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
                                return <ChatMessage key={id} message={message.text} date={message.date} sentByMe={message.sentByMe}/>
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
