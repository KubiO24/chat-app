const express = require('express');
const app = express();
const path = require("path");
const server = require('http').createServer(app)
const cors = require('cors');
const { Server } = require('socket.io');
const PORT = process.env.PORT || 3001;

app.use(cors());

const io = new Server(server, {
    cors: {
        origin: '*', 
        methods: ['GET', 'POST']
    }
})


app.use(express.static(path.resolve(__dirname, "./client/build")));


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
            return;
        }

        const user = connectedUsers.find(user => user.id == socket.id);
        user.username = username;
        user.avatarColor = avatarColor;

        const loginnedUsers = connectedUsers.filter(user => user.username != '');
        socket.broadcast.emit('loginnedUsersChange', connectedUsers);
        
        callback({
            status: 'ok',
            loginnedUsers: loginnedUsers
        });          
    });

    socket.on('sendMessage', (username, message) => {
        const thisUsername = connectedUsers.find(user => user.id == socket.id).username;
        const userId = connectedUsers.find(user => user.username == username).id;
        io.to(userId).emit('receiveMessage', thisUsername, message);
    })

    socket.on('logout', args => {
        const user = connectedUsers.find( (user) => user.id == socket.id );
        user.username = '';
        updateLoginnedUsers();
    })

    socket.on('disconnect', () => {
        connectedUsers = connectedUsers.filter(user => user.id != socket.id);
        updateLoginnedUsers();
        console.log(`Socket.io disconnected with id: ${socket.id}`);
    })

    const updateLoginnedUsers = () => {
        const loginnedUsers = connectedUsers.filter(user => user.username != '');
        socket.broadcast.emit('loginnedUsersChange', loginnedUsers);
    }
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));