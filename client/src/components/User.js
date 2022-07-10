import { useRecoilState, useSetRecoilState } from 'recoil';  
import { usernameState, avatarColorState, loginnedUsersListState, selectedChatState, messagesListState, newMessageState } from '../globalState';
import { socket } from '../socketConnection';

import { Button, List, ListItem, ListItemIcon, ListItemText, Avatar } from "@mui/material";

function User() {
    const [username, setUsername] = useRecoilState(usernameState);
    const [avatarColor, setAvatarColor] = useRecoilState(avatarColorState);
    const setLoginnedUsersList = useSetRecoilState(loginnedUsersListState);
    const setSelectedChat = useSetRecoilState(selectedChatState);
    const setMessagesList = useSetRecoilState(messagesListState);
    const setNewMessage = useSetRecoilState(newMessageState);

    const logout = () => {
        socket.emit('logout');
        setUsername('');
        setAvatarColor('000000');
        setLoginnedUsersList([]);
        setSelectedChat({});
        setMessagesList([]);
        setNewMessage({});
    }

    return (
        <List>
            <ListItem >
                <ListItemIcon>
                    <Avatar alt="user" sx={{bgcolor: avatarColor}}/>
                </ListItemIcon>
                <ListItemText primary={username}></ListItemText>
                <ListItemText align="right">
                    <Button
                        type="submit"
                        size="medium"
                        variant="contained"
                        color="error"
                        onClick={logout}
                    >
                        Logout
                    </Button>
                </ListItemText> 
            </ListItem>
        </List>
    );
}

export default User;