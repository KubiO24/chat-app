import { useRecoilValue } from "recoil";
import { selectedChatState } from "./globalState";
import NavDrawer from "./components/NavDrawer";
import Chat from "./components/Chat";
import ChatField from "./components/ChatField";

import { Container, Box, Grid, Divider } from "@mui/material";

const Main = () => {
    const selectedChat = useRecoilValue(selectedChatState);
    return (
        <Box sx={{ bgColor: "white", display: "flex", height: "100vh" }}>
            <NavDrawer />

            <Box sx={{ display: { xs: "none", sm: "none", md: "block" }, width: 398, height: "100vh" }}/>

            <Box item sx={{ width: "100%", overflow: "hidden" }}>
                <Chat />

                {selectedChat.username !== undefined && selectedChat.username !== "" ? (
                    <>
                        <Divider />

                        <ChatField />
                    </>
                ) : undefined}
            </Box>
        </Box>
    );
};

export default Main;
