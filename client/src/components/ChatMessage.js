import { Grid, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";

function ChatMessage(props) {
    let align = 'center';
    props.sentByMe ? align = 'right' : align = 'left';
    
    return (
        <ListItem>
                <Grid container>
                    <Grid item xs={12}>
                        <ListItemText align={align} primary={props.message}></ListItemText>
                    </Grid>
                    <Grid item xs={12}>
                        <ListItemText align={align} secondary="09:30"></ListItemText>
                    </Grid>
                </Grid>
            </ListItem>
    );
}

export default ChatMessage;
