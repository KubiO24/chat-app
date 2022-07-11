import { useRecoilValue } from 'recoil';  
import { avatarColorState, selectedChatState } from '../globalState';

import { Grid, ListItem, ListItemIcon, Avatar, ListItemText, Box } from "@mui/material";

function ChatMessage(props) {
    const avatarColor = useRecoilValue(avatarColorState);
    const selectedChat = useRecoilValue(selectedChatState);

    return (
        <ListItem sx={[props.sentByMe ? {justifyContent: 'right'} : {justifyContent: 'left'}, {mt: '-10px'}]}>
            {props.sentByMe ? 
                <Box 
                    sx={{
                        display: 'flex',
                        alignItems: 'flex-end',
                        pt: '5px',
                        pb: '5px',
                        backgroundColor: 'grey.300',
                        borderRadius:'20px',
                        maxWidth: 'fit-content'
                    }}
                >
                    <Box pl={3}>
                        <ListItemText align='right' primary={props.message} sx={{overflowWrap: 'anywhere'}}></ListItemText>
                        <ListItemText align='right' secondary="09:30" sx={{mb: '2px'}}></ListItemText>
                    </Box>

                    <ListItemIcon sx={{ml: 2}}>
                        <Avatar alt="user" sx={{bgcolor: avatarColor, mb: '7px'}}/>
                    </ListItemIcon>
                </Box>
            : 
                <Box 
                    sx={{
                        display: 'flex',
                        alignItems: 'flex-end',
                        pt: '5px',
                        pb: '5px',
                        backgroundColor: 'grey.300',
                        borderRadius:'20px',
                        maxWidth: 'fit-content'
                    }}
                >
                    <ListItemIcon sx={{ml: 2}}>
                        <Avatar alt="user" sx={{bgcolor: selectedChat.color, mb: '7px'}}/>
                    </ListItemIcon>
                    
                    <Box pr={3} >
                        <ListItemText align='left' primary={props.message} sx={{overflowWrap: 'anywhere'}} ></ListItemText>
                        <ListItemText align='left' secondary="09:30" sx={{mb: '2px'}}></ListItemText>
                    </Box>
                </Box>
            }
        </ListItem>
        
    );
}

export default ChatMessage;
