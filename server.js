const express = require('express');
const routes = require('./routes');
const database = require('./src/config/db');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const oneDay = 1000 * 60 * 20;
// const oneDay = 1000;

app.set('view engine', 'ejs');
app.set('views', './src/views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser());
app.use(session({
    secret: '123456',
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false
}));

app.use(routes);

io.on('connection', (socket) => {
    console.log('Novo cliente conectado:', socket.id);

    socket.on('chat message', (data) => {
        // Processar a mensagem recebida e realizar as ações necessárias
        // ...

        // Enviar a mensagem para todos os clientes conectados, incluindo o remetente
        io.emit('chat message', data);
    });

    socket.on('disconnect', () => {
        console.log('Cliente desconectado:', socket.id);
    });
});

app.listen(3000, () => console.log('Acesse: http://localhost:3000/'));
