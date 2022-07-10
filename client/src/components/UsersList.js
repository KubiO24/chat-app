import React from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";  
import { usernameState, loginnedUsersListState, selectedChatState } from "../globalState";
import { socket } from '../socketConnection';

import { List, ListItem, ListItemIcon, ListItemText, Avatar } from "@mui/material";

function UsersList() {
    const [loginnedUsers, setLoginnedUsers] = useRecoilState(loginnedUsersListState);
    const setSelectedChat = useSetRecoilState(selectedChatState);
    const username = useRecoilValue(usernameState);

    socket.on('loginnedUsersChange', connectedUsers => {
        const loginnedUsers = connectedUsers.filter(user => user.username !== username);
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
