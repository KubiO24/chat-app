import { useRecoilState, useSetRecoilState } from "recoil";
import {
    usernameState,
    avatarColorState,
    loginnedUsersListState,
    selectedChatState,
    messagesListState,
    newMessageState,
} from "../globalState";
import { socket } from "../socketConnection";

import {
    Grid,
    Button,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Avatar,
} from "@mui/material";

function User() {
    const [username, setUsername] = useRecoilState(usernameState);
    const [avatarColor, setAvatarColor] = useRecoilState(avatarColorState);
    const setLoginnedUsersList = useSetRecoilState(loginnedUsersListState);
    const setSelectedChat = useSetRecoilState(selectedChatState);
    const setMessagesList = useSetRecoilState(messagesListState);
    const setNewMessage = useSetRecoilState(newMessageState);

    const logout = () => {
        socket.emit("logout");
        setUsername("");
        setAvatarColor("000000");
        setLoginnedUsersList([]);
        setSelectedChat({});
        setMessagesList([]);
        setNewMessage({});
    };

    return (
        <>
            <List sx={{ width: "100%" }}>
                <ListItem>
                    <ListItemIcon sc={{ maxWidth: "10%" }}>
                        <Avatar alt="user" sx={{ bgcolor: avatarColor }} />
                    </ListItemIcon>

                    <ListItemText
                        align="left"
                        primary={username}
                        sx={{
                            marginRight: 1,
                            overflow: "hidden",
                        }}
                    />

                    <Button
                        type="submit"
                        size="medium"
                        variant="contained"
                        color="error"
                        onClick={logout}
                        sx={{ paddingX: 3 }}
                    >
                        Logout
                    </Button>
                </ListItem>
            </List>
        </>
    );
}

export default User;
