const express = require('express');
const app = express();
const http = require('http').createServer(app);
const server = require('./src/controllers/chat');
const sequelize = require('./src/config/db');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const routes = require('./routes')

const oneDay = 1000 * 60 * 20;

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

// Configurar o Socket.IO
server.configureSocket(http);

app.use(routes);

sequelize.sync().then(() => {
  http.listen(3000, () => {
    console.log('Servidor ouvindo na porta 3000');
  });
}).catch((error) => {
  console.log('Erro na conexão com o banco de dados:', error);
});
