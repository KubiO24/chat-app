import React from "react";
import { useRecoilState } from "recoil";  
import { usernameState, loginnedUsersListState, selectedChatState } from "../globalState";
import { socket } from '../socketConnection';

import { List, ListItem, ListItemIcon, ListItemText, Avatar } from "@mui/material";

function UsersList() {
    const [username, setUsername] = useRecoilState(usernameState);
    const [loginnedUsers, setLoginnedUsers] = useRecoilState(loginnedUsersListState);
    const [selectedChat, setSelectedChat] = useRecoilState(selectedChatState);

    socket.on('loginnedUsersChange', connectedUsers => {
        const loginnedUsers = connectedUsers.filter(user => user.username != username);
        setLoginnedUsers(loginnedUsers);
    })

    return (
        <List>
            {loginnedUsers.map(user => {
                return (
                    <ListItem button key={user.username} onClick={() => setSelectedChat({'username': user.username, 'color': user.avatarColor})}>
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
