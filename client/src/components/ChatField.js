import { useRecoilValue } from 'recoil';  
import { usernameState } from '../globalState';
import { socket } from '../socketConnection';

import { Grid, TextField, Fab } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

function ChatField() {
    const username = useRecoilValue(usernameState);

    return (
        <Grid container style={{padding: "20px"}}>
            <Grid item xs={11}>
                <TextField disabled id="outlined-basic-email" label="Type Something" fullWidth />
            </Grid>
            <Grid item xs={1} align="right">
                <Fab disabled color="primary" aria-label="add"><SendIcon /></Fab>
            </Grid>
        </Grid>
    );
}

export default ChatField;
