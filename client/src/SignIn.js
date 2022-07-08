import { useState } from 'react';
import { useRecoilState } from 'recoil';  
import { usernameState, avatarColorState } from './globalState';
import { socket } from './socketConnection';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Zoom from '@mui/material/Zoom';
import Alert from '@mui/material/Alert';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();
const colorArray = [
    '#FF6633', '#FFB399', '#FF33FF', '#C2C23E', '#00B3E6', 
    '#E6B333', '#3366E6', '#999966', '#6EFF6E', '#B34D4D',
    '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', 
    '#FF99E6', '#B9E815', '#FF1A66', '#E6331A', '#10E6B0',
    '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', 
    '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
    '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', 
    '#4D8066', '#809980', '#D6D64B', '#1AFF33', '#999933',
    '#FF3380', '#CCCC00', '#3CD11F', '#4D80CC', '#9900B3', 
    '#E64D66', '#4DB380', '#FF4D4D', '#43D1D1', '#6666FF'
];
const drawnColor = colorArray[Math.floor(Math.random()*colorArray.length)];
console.log("avatar color: " + drawnColor);


function SignIn() {  
    const [username, setUsername] = useRecoilState(usernameState);
    const [avatarColor, setAvatarColor] = useRecoilState(avatarColorState);
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const formUsername = data.get('username').trim();

        if(formUsername == '') return;
        
        socket.emit('login', formUsername, drawnColor, (response) => {
            if(response.status == 'ok') {
                setUsername(formUsername);
                setAvatarColor(drawnColor);
            }else {
                setError(true)
                setErrorMsg(response.message)
            }
        });      
    };


    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="sm" sx={{pt: 1}}>
                <Zoom in={error}>
                    <Alert variant="outlined" severity="error" onClose={() => {setError(false)}}>{errorMsg}</Alert>
                </Zoom>
            </Container>
            <Container maxWidth="xs">
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        border: 1,
                        borderRadius: 5,
                        padding: 5,
                        bgcolor: 'rgb(255, 255, 255)'
                    }}
                >
                    <Avatar sx={{ width: 64, height: 64, m: 1, bgcolor: drawnColor }} />
                        
                    <Typography component="h1" variant="h5">
                        Connect to chat
                    </Typography>

                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            autoFocus
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Connect
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default SignIn;
