const app = require('express')();
const http = require('http').createServer(app)
const io = require('socket.io')(http, {
    cors: {
        origins: ['http://localhost:3000']
    }
});

//app.get('/', (req, res) => {
//    res.send('<hi>Hey Socket.io</hi>')
//});

let sockets = new Set();

io.on('connection', (socket) => {
    console.log('a user connected');
    sockets.add(socket);
    console.log(`sockets: ${sockets.size}`);

    socket.on('disconnect', () => {
        console.log('user disconnected');
        sockets.delete(socket);
        console.log(`sockets: ${sockets.size}`);
    })

    socket.on('my message', (msg) => {
        io.emit('my broadcast', `server: ${msg}`);
    });
});

http.listen(3000, () => {
    console.log('listening on *:3000')
});