import { useState, useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';  
import { selectedChatState, messagesListState, newMessageState } from '../globalState';
import { socket } from '../socketConnection';
import moment from 'moment';
import { Grid, TextField, Fab } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

function ChatField() {
    const selectedChat = useRecoilValue(selectedChatState);
    const setNewMessage = useSetRecoilState(newMessageState)
    const [messagesList, setMessagesList] = useRecoilState(messagesListState);
    const [textInput, setTextInput] = useState('');
    const [fieldDisabled, setfieldDisabled] = useState(false)
    const [buttonDisabled, setbuttonDisabled] = useState(true)

    useEffect(() => {
        if(selectedChat.username === undefined) {
            setbuttonDisabled(true);
            setTextInput('');
            setfieldDisabled(true);
        }else {
            setfieldDisabled(false);
        }
    },[selectedChat])

    const sendMessage = (event) => {
        event.preventDefault();
        if(buttonDisabled) return;
        
        const text = textInput.trim(); 

        const message = {'text': text, date: moment().format(), 'sentByMe': true};

        const newMessagesList = messagesList.map(item => {
            if(item.username === selectedChat.username) return {'username': item.username, 'messages': [...item.messages, message]};
            else return item;
        });
        setNewMessage({type: 'sentByMe'})
        setMessagesList(newMessagesList)
        socket.emit('sendMessage', selectedChat.username, text);
        setTextInput('');
        setbuttonDisabled(true);
    }

    const handleTextInputChange = event => {
        const text = event.target.value;
        setTextInput(text);
        if(text.trim() === '') setbuttonDisabled(true)
        else setbuttonDisabled(false)
    };

    return (
        <Grid container component="form" onSubmit={sendMessage} style={{padding: '25px'}}>
            <Grid item xs={11}>
                <TextField id="outlined-basic-email" label="Type Something" fullWidth value={textInput} onChange={handleTextInputChange} disabled={fieldDisabled} />
            </Grid>
            <Grid item xs={1} align="right">
                <Fab type="submit" color="primary" aria-label="add" disabled={buttonDisabled}><SendIcon /></Fab>
            </Grid>
        </Grid>
    );
}

export default ChatField;
