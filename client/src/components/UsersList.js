import { useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
    usernameState,
    loginnedUsersListState,
    selectedChatState,
    unreadMessagesState,
    userFilterState,
} from "../globalState";
import { socket } from "../socketConnection";

import {
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Avatar,
} from "@mui/material";

function UsersList() {
    const [loginnedUsers, setLoginnedUsers] = useRecoilState(
        loginnedUsersListState
    );
    const [selectedChat, setSelectedChat] = useRecoilState(selectedChatState);
    const [unreadMessages, setUnreadMessages] =
        useRecoilState(unreadMessagesState);
    const username = useRecoilValue(usernameState);
    const userFilter = useRecoilValue(userFilterState);
    const [filteredUsers, setFilteredUsers] = useState([]);

    socket.on("loginnedUsersChange", (connectedUsers) => {
        const loginnedUsers = connectedUsers.filter(
            (user) => user.username !== username
        );
        setLoginnedUsers(loginnedUsers);
    });

    useEffect(() => {
        setFilteredUsers(
            loginnedUsers.filter((item) =>
                item.username.toLowerCase().includes(userFilter.toLowerCase())
            )
        );
    }, [loginnedUsers, userFilter]);

    const selectChat = (data) => {
        setSelectedChat(data);
        setUnreadMessages(
            unreadMessages.filter((item) => item !== data.username)
        );
    };

    return (
        <List>
            {filteredUsers.map((user) => {
                return (
                    <ListItem
                        key={user.username}
                        button
                        onClick={() =>
                            selectChat({
                                username: user.username,
                                color: user.avatarColor,
                            })
                        }
                        sx={
                            selectedChat.username === user.username
                                ? {
                                      backgroundColor: "grey.400",

                                      "&:hover": {
                                          backgroundColor: "grey.400",
                                      },
                                  }
                                : unreadMessages.includes(user.username)
                                ? {
                                      backgroundColor: "#ff9999",

                                      "&:hover": {
                                          backgroundColor: "#ff8080",
                                      },
                                  }
                                : undefined
                        }
                    >
                        <ListItemIcon>
                            <Avatar
                                alt={user.username}
                                sx={{ bgcolor: user.avatarColor }}
                            />
                        </ListItemIcon>
                        <ListItemText
                            primary={user.username}
                            sx={{
                                width: "100%",
                                marginRight: 1,
                                overflow: "hidden",
                            }}
                        />
                        <ListItemText
                            secondary="online"
                            align="right"
                            sx={{ marginRight: 1 }}
                        />
                    </ListItem>
                );
            })}
        </List>
    );
}

export default UsersList;
