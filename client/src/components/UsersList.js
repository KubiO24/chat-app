import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";  
import { usernameState, avatarColorState, loginnedUsersState } from "../globalState";
import { socket } from '../socketConnection';

import { List, ListItem, ListItemIcon, ListItemText, Avatar } from "@mui/material";

function UsersList() {
    const [username, setUsername] = useRecoilState(usernameState);
    const [loginnedUsers, setloginnedUsers] = useRecoilState(loginnedUsersState);

    socket.on('loginnedUsersChange', connectedUsers => {
        const loginnedUsers = connectedUsers.filter(user => user.username != username);
        setloginnedUsers(loginnedUsers);
    })

    return (
        <List>
            {loginnedUsers.map(user => {
                return (
                    <ListItem button key={user.username}>
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
