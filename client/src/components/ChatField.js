import { useState, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';  
import { usernameState, selectedChatState, messagesListState } from '../globalState';
import { socket } from '../socketConnection';

import { Grid, TextField, Fab } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

function ChatField() {
    const username = useRecoilValue(usernameState);
    const selectedChat = useRecoilValue(selectedChatState);
    const [messagesList, setMessagesList] = useRecoilState(messagesListState);
    const [textInput, setTextInput] = useState('');
    const [fieldDisabled, setfieldDisabled] = useState(false)
    const [buttonDisabled, setbuttonDisabled] = useState(true)

    useEffect(() => {
        if(selectedChat == '') {
            setbuttonDisabled(true);
            setTextInput('');
            setfieldDisabled(true);
        }else {
            setfieldDisabled(false);
        }
    },[selectedChat])

    const sendMessage = () => {
        const text = textInput.trim();

        const message = {'text': text, 'sentByMe': true};

        if(messagesList.length == 0) {
            setMessagesList([
                {
                    'username': selectedChat,
                    'messages': [message]
                }
            ]);
            return
        }

        const newMessagesList = messagesList.map(item => {
            if(item.username == selectedChat) return {'username': item.username, 'messages': [...item.messages, message]};
            else return item;
        });
        console.log(newMessagesList)
        setMessagesList(newMessagesList)
        socket.emit('sendMessage', selectedChat, text);
    }

    const handleTextInputChange = event => {
        const text = event.target.value;
        setTextInput(text);
        if(text.trim() == '') setbuttonDisabled(true)
        else setbuttonDisabled(false)
    };

    return (
        <Grid container style={{padding: "20px"}}>
            <Grid item xs={11}>
                <TextField id="outlined-basic-email" label="Type Something" fullWidth value= {textInput} onChange={handleTextInputChange} disabled={fieldDisabled} />
            </Grid>
            <Grid item xs={1} align="right">
                <Fab onClick={sendMessage} color="primary" aria-label="add" disabled={buttonDisabled}><SendIcon /></Fab>
            </Grid>
        </Grid>
    );
}

export default ChatField;
