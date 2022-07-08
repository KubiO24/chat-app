import { useRecoilValue } from 'recoil';  
import { usernameState } from '../globalState';
import { socket } from '../socketConnection';

import Grid from "@mui/material/Grid";

import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";

function Chat() {
    const username = useRecoilValue(usernameState);

    return (
        <List sx={{ height: "85vh", overflowY: "auto"}}>
            <ListItem key="1">
                <Grid container>
                    <Grid item xs={12}>
                        <ListItemText align="right" primary="Hi"></ListItemText>
                    </Grid>
                    <Grid item xs={12}>
                        <ListItemText align="right" secondary="09:30"></ListItemText>
                    </Grid>
                </Grid>
            </ListItem>
            <ListItem key="2">
                <Grid container>
                    <Grid item xs={12}>
                        <ListItemText align="left" primary="Hi2"></ListItemText>
                    </Grid>
                    <Grid item xs={12}>
                        <ListItemText align="left" secondary="09:31"></ListItemText>
                    </Grid>
                </Grid>
            </ListItem>
            <ListItem key="3">
                <Grid container>
                    <Grid item xs={12}>
                        <ListItemText align="right" primary="Hi3"></ListItemText>
                    </Grid>
                    <Grid item xs={12}>
                        <ListItemText align="right" secondary="10:30"></ListItemText>
                    </Grid>
                </Grid>
            </ListItem>
        </List>
    );
}

export default Chat;
