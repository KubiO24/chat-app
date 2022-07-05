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
        
io.on('connection', socket => {
    console.log(`Socket.io connected with id: ${socket.id}`);

    socket.on('disconnect', () => {
        console.log(`Socket.io disconnected with id: ${socket.id}`);
    })
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));