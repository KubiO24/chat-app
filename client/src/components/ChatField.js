import { useState, useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { selectedChatState, messagesListState, newMessageState } from "../globalState";
import { socket } from "../socketConnection";
import moment from "moment";
import { Box, TextField, Fab } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

function ChatField() {
    const selectedChat = useRecoilValue(selectedChatState);
    const setNewMessage = useSetRecoilState(newMessageState);
    const [messagesList, setMessagesList] = useRecoilState(messagesListState);
    const [textInput, setTextInput] = useState("");
    const [buttonDisabled, setbuttonDisabled] = useState(true);

    useEffect(() => {
        if (selectedChat.username === undefined) {
            setbuttonDisabled(true);
            setTextInput("");
        } else {
            setbuttonDisabled(false);
        }
    }, [selectedChat]);

    const sendMessage = (event) => {
        event.preventDefault();
        if (buttonDisabled) return;

        const text = textInput.trim();

        const message = { text: text, date: moment().format(), sentByMe: true };

        const newMessagesList = messagesList.map((item) => {
            if (item.username === selectedChat.username)
                return { username: item.username, messages: [...item.messages, message] };
            else return item;
        });
        setNewMessage({ type: "sentByMe" });
        setMessagesList(newMessagesList);
        socket.emit("sendMessage", selectedChat.username, text);
        setTextInput("");
        setbuttonDisabled(true);
    };

    const handleTextInputChange = (event) => {
        const text = event.target.value;
        setTextInput(text);
        if (text.trim() === "") setbuttonDisabled(true);
        else setbuttonDisabled(false);
    };

    return (
        <Box
            component="form"
            onSubmit={sendMessage}
            align="left"
            sx={{
                padding: "25px",
                display: "inline-flex",
                justifyContent: "left",
                width: { xs: "100%", sm: "100%", md: "95%", lg: "100%" },
                overflow: "hidden",
            }}
        >
            <Box sx={{ width: "90%" }}>
                <TextField
                    id="outlined-basic-email"
                    label="Type Something"
                    fullWidth
                    value={textInput}
                    onChange={handleTextInputChange}
                />
            </Box>
            <Box
                sx={{
                    width: { xs: "30%", sm: "20%", md: "10%" },
                    display: "flex",
                    justifyContent: "left",
                    marginLeft: "10px",
                }}
            >
                <Fab type="submit" color="primary" aria-label="add" disabled={buttonDisabled}>
                    <SendIcon />
                </Fab>
            </Box>
        </Box>
    );
}

export default ChatField;
