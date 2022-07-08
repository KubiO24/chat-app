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
        id: socket.id
    })

    socket.on("login", (username, callback) => {
        if( connectedUsers.find(user => user.username == username ) != undefined) {
            callback({
                status: 'error',
                message: 'User with given username is already connected.'
            })
        }

        const user = connectedUsers.find( (user) => user.id == socket.id );
        user.username = username;
        callback({
            status: 'ok'
        });    
    });

    io.emit('userJoined', 1);

    socket.on('disconnect', () => {
        connectedUsers = connectedUsers.filter(user => user.id != socket.id);
        console.log(`Socket.io disconnected with id: ${socket.id}`);
    })
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));