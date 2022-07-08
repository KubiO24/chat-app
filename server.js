const express = require('express');
const app = express();
const server = require('http').createServer(app)
const cors = require('cors');
const { Server } = require('socket.io');
const PORT = 3001 || process.env.PORT;

app.use(cors());

const io = new Server(server, {
    cors: {
        origin: '*', 
        methods: ['GET', 'POST']
    }
})

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

let connectedUsers = [];
        
io.on('connection', socket => {
    console.log(`Socket.io connected with id: ${socket.id}`);
    connectedUsers.push({
        username: '',
        avatarColor: '000000',
        id: socket.id
    })

    socket.on("login", (username, avatarColor, callback) => {
        if( connectedUsers.find(user => user.username == username ) != undefined) {
            console.log(connectedUsers)
            callback({
                status: 'error',
                message: 'User with given username is already connected.'
            })
        }else {
            const user = connectedUsers.find(user => user.id == socket.id);
            user.username = username;
            user.avatarColor = avatarColor;
            const loginnedUsers = connectedUsers.filter(user => user.username != '' && user.username != username);
            callback({
                status: 'ok',
                loginnedUsers: loginnedUsers
            });    
        }   
    });

    io.emit('userJoined', 1);

    socket.on('logout', args => {
        const user = connectedUsers.find( (user) => user.id == socket.id );
        user.username = '';
    })

    socket.on('disconnect', () => {
        connectedUsers = connectedUsers.filter(user => user.id != socket.id);
        console.log(`Socket.io disconnected with id: ${socket.id}`);
    })
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));