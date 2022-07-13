import { useRecoilState, useRecoilValue } from "recoil";  
import { usernameState, loginnedUsersListState, selectedChatState, unreadMessagesState } from "../globalState";
import { socket } from '../socketConnection';

import { List, ListItem, ListItemIcon, ListItemText, Avatar } from "@mui/material";

function UsersList() {
    const [loginnedUsers, setLoginnedUsers] = useRecoilState(loginnedUsersListState);
    const [selectedChat, setSelectedChat] = useRecoilState(selectedChatState);
    const [unreadMessages, setUnreadMessages] = useRecoilState(unreadMessagesState);
    const username = useRecoilValue(usernameState);

    socket.on('loginnedUsersChange', connectedUsers => {
        const loginnedUsers = connectedUsers.filter(user => user.username !== username);
        setLoginnedUsers(loginnedUsers);
    })

    const selectChat = (data) => {
        setSelectedChat(data);
        setUnreadMessages(unreadMessages.filter(item => item !== data.username));
    }

    return (
        <List>
            {loginnedUsers.map(user => {
                return (
                    <ListItem 
                        key={user.username} 
                        button 
                        onClick={() => selectChat({'username': user.username, 'color': user.avatarColor})}
                        sx={ 
                            selectedChat.username === user.username ? 
                            {
                                backgroundColor: 'grey.400',

                                "&:hover": {
                                    backgroundColor: 'grey.400'
                                }
                            } 
                            : unreadMessages.includes(user.username) ? 
                            {
                                backgroundColor: '#ff8080',

                                "&:hover": {
                                    backgroundColor: '#ff6060'
                                }
                            }
                            : undefined   
                        }   
                        
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
