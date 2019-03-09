
const port=process.env.PORT || 3000
// var express = require('express');
// var bodyParser = require('body-parser')
var http = require('http');
// var app = express();
// var server = http.createServer(app);

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<h1>Hello World</h1>');
});

// var io = require('socket.io').listen(server);

// app.use(express.static(__dirname));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }))

// app.post('/messages', (req, res) => {
//     try {
//         io.emit('message', req.body);
//         res.sendStatus(200);
//     }
//     catch (error) {
//         res.sendStatus(500);
//         return console.log('Error:  ', error);
//     }
//     finally {
//         console.log('Message Posted')
//     }

// })

// io.on('connection', () => {
//     console.log('A person has connected')
// })

server.listen(port, () => {
    console.log('Server is running on port:  ', server.address().port);
});