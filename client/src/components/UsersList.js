import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";  
import { usernameState, loginnedUsersListState, selectedChatState } from "../globalState";
import { socket } from '../socketConnection';

import { List, ListItem, ListItemIcon, ListItemText, Avatar } from "@mui/material";

function UsersList() {
    const [loginnedUsers, setLoginnedUsers] = useRecoilState(loginnedUsersListState);
    const [selectedChat, setSelectedChat] = useRecoilState(selectedChatState);
    const username = useRecoilValue(usernameState);

    socket.on('loginnedUsersChange', connectedUsers => {
        const loginnedUsers = connectedUsers.filter(user => user.username !== username);
        setLoginnedUsers(loginnedUsers);
    })

    return (
        <List>
            {loginnedUsers.map(user => {
                return (
                    <ListItem 
                        key={user.username} 
                        button 
                        onClick={() => setSelectedChat({'username': user.username, 'color': user.avatarColor})}
                        sx={ selectedChat.username === user.username ? {
                            backgroundColor: 'grey.400',

                            "&:hover": {
                                backgroundColor: 'grey.400'
                            }
                        } : undefined }   
                        
                    >
                        <ListItemIcon>
                            <Avatar alt={user.username} sx={{bgcolor: user.avatarColor}} />
                        </ListItemIcon>
                        <ListItemText primary={user.username} />
                        <ListItemText secondary="online" align="right"></ListItemText>
                    </ListItem>
                )
            })}
        </List>
    );
}

export default UsersList;
