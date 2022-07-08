import { useRecoilState, useRecoilValue } from 'recoil';  
import { usernameState, avatarColorState } from '../globalState';
import { socket } from '../socketConnection';

import { Button, List, ListItem, ListItemIcon, ListItemText, Avatar } from "@mui/material";

function User() {
    const [username, setUsername] = useRecoilState(usernameState);
    const avatarColor = useRecoilValue(avatarColorState);

    const logout = () => {
        socket.emit('logout');
        setUsername('');
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