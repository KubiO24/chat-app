const express = require('express')
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

const app = express();

app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
})

io.on('connection', socket => {
    console.log(`Socket.io connected with id: ${socket.id}`);

    socket.on('disconnect', () => {
        console.log(`Socket.io disconnected with id: ${socket.id}`);
    })
});

const PORT = 3001 || process.env.PORT;

server.listen(PORT, () => console.log(`http://localhost:${PORT}`));