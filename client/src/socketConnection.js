import io from 'socket.io-client'

export let socket;
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    socket = io.connect('http://localhost:3001')
} else {
    socket = io('/');
}