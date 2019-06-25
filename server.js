"use strict"

const port = process.env.PORT || 3000

var app = require('express')();
var server = require('http').Server(app);
var bodyParser = require('body-parser')
var io = require('socket.io')(server);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/chat.css', function (req, res) {
    res.sendFile(__dirname + '/chat.css');
});

app.get('/favicon.ico', function (req, res) {
    res.sendFile(__dirname + '/favicon.ico');
});

app.get('/chat.js', function (req, res) {
    res.sendFile(__dirname + '/chat.js');
});

io.listen(server);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))



app.post('/messages', (req, res) => {
    try {
        io.emit('message', req.body);
        res.sendStatus(200);
    }
    catch (error) {
        res.sendStatus(500);
        return console.log('Error:  ', error);
    }
    finally {
        console.log('Message Posted')
    }

})

io.on('connection', (socket) => {
    console.log('A person has connected')
})

server.listen(port, () => {
    console.log('Server is running on port:  ', server.address().port);
});