import { useState, useEffect } from "react";
import { useSetRecoilState } from "recoil";
import {
    usernameState,
    avatarColorState,
    loginnedUsersListState,
} from "./globalState";
import { socket } from "./socketConnection";

import {
    Paper,
    Avatar,
    Button,
    Zoom,
    Alert,
    TextField,
    Box,
    Typography,
    Container,
} from "@mui/material";

function SignIn() {
    const setUsername = useSetRecoilState(usernameState);
    const setAvatarColor = useSetRecoilState(avatarColorState);
    const setloginnedUsers = useSetRecoilState(loginnedUsersListState);

    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [avColor, setAvColor] = useState("");

    useEffect(() => {
        const colorArray = [
            "#FF6633",
            "#FFB399",
            "#FF33FF",
            "#C2C23E",
            "#00B3E6",
            "#E6B333",
            "#3366E6",
            "#999966",
            "#6EFF6E",
            "#B34D4D",
            "#80B300",
            "#809900",
            "#E6B3B3",
            "#6680B3",
            "#66991A",
            "#FF99E6",
            "#B9E815",
            "#FF1A66",
            "#E6331A",
            "#10E6B0",
            "#66994D",
            "#B366CC",
            "#4D8000",
            "#B33300",
            "#CC80CC",
            "#66664D",
            "#991AFF",
            "#E666FF",
            "#4DB3FF",
            "#1AB399",
            "#E666B3",
            "#33991A",
            "#CC9999",
            "#B3B31A",
            "#00E680",
            "#4D8066",
            "#809980",
            "#D6D64B",
            "#1AFF33",
            "#999933",
            "#FF3380",
            "#CCCC00",
            "#3CD11F",
            "#4D80CC",
            "#9900B3",
            "#E64D66",
            "#4DB380",
            "#FF4D4D",
            "#43D1D1",
            "#6666FF",
        ];
        setAvColor(colorArray[Math.floor(Math.random() * colorArray.length)]);
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const formUsername = data.get("username").trim();

        if (formUsername === "") return;

        socket.emit("login", formUsername, avColor, (response) => {
            if (response.status === "ok") {
                setUsername(formUsername);
                setAvatarColor(avColor);
                const loginnedUsers = response.loginnedUsers.filter(
                    (user) => user.username !== formUsername
                );
                setloginnedUsers(loginnedUsers);
            } else {
                setError(true);
                setErrorMsg(response.message);
            }
        });
    };

    return (
        <>
            <Container maxWidth="sm" sx={{ pt: 1 }}>
                <Zoom in={error}>
                    <Alert
                        variant="outlined"
                        severity="error"
                        onClose={() => {
                            setError(false);
                        }}
                    >
                        {errorMsg}
                    </Alert>
                </Zoom>
            </Container>
            <Container maxWidth="sm" >
                <Paper
                    elevation={4}
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        borderRadius: 4,
                        padding: 5,
                        bgcolor: "rgb(255, 255, 255)",
                    }}
                >
                    <Avatar
                        sx={{
                            width: 64,
                            height: 64,
                            m: 1,
                            bgcolor: avColor,
                        }}
                    />

                    <Typography component="h1" variant="h5">
                        Connect to chat
                    </Typography>

                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{ mt: 1 }}
                    >
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
                </Paper>
            </Container>
        </>
    );
}

export default SignIn;
