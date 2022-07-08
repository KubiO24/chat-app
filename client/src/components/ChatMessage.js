import { useRecoilValue } from 'recoil';  
import { avatarColorState } from '../globalState';

import { Grid, ListItem, ListItemIcon, Avatar, ListItemText } from "@mui/material";

function ChatMessage(props) {
    const avatarColor = useRecoilValue(avatarColorState);

    return (
        <ListItem>

        {props.sentByMe ? 
            <>    
                <Grid container>
                    <Grid item xs={12}>
                        <ListItemText align='right' primary={props.message}></ListItemText>
                    </Grid>
                    <Grid item xs={12}>
                        <ListItemText align='right' secondary="09:30"></ListItemText>
                    </Grid>
                </Grid>

                <ListItemIcon sx={{ml: 2, mr: -1}}>
                    <Avatar alt="user" sx={{bgcolor: avatarColor}}/>
                </ListItemIcon>
            </>
        : 
            <>
                <ListItemIcon sx={{ml: 1}}>
                    <Avatar alt="user" sx={{bgcolor: 'red'}}/>
                </ListItemIcon>
                 
                <Grid container>
                    <Grid item xs={12}>
                        <ListItemText align='left' primary={props.message}></ListItemText>
                    </Grid>
                    <Grid item xs={12}>
                        <ListItemText align='left' secondary="09:30"></ListItemText>
                    </Grid>
                </Grid>
            </>
        }
        </ListItem>
        
    );
}

export default ChatMessage;
