import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';  
import { usernameState, selectedChatState } from '../globalState';
import { socket } from '../socketConnection';

import { Grid, TextField, Fab } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

function ChatField() {
    const username = useRecoilValue(usernameState);
    const selectedChat = useRecoilValue(selectedChatState);
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
        const message = textInput.trim();
        socket.emit('sendMessage', selectedChat, message);
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
