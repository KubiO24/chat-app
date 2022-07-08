import { useRecoilState } from 'recoil';  
import { usernameState } from './globalState';
import { socket } from './socketConnection';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
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


function SignIn() {  
    const [username, setUsername] = useRecoilState(usernameState);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const formUsername = data.get('username').trim();

        if(formUsername == '') return;

        socket.emit('login', formUsername, (response) => {
            if(response.status == 'ok') {
                setUsername(formUsername);
            }else {
                console.log(response.message)
            }
        });      
    };


    return (
        <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    border: 1,
                    borderRadius: 5,
                    padding: 5,
                }}
            >
                <Avatar sx={{ width: 64, height: 64, m: 1, bgcolor: 'error.main' }} />
                    
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
