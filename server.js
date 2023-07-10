const express = require('express');
const routes = require('./routes');
const database = require('./src/config/db');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();
const oneDay = 1000 * 60 * 60 * 24;

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

app.listen(3000, () => console.log('Acesse: http://localhost:3000/'));
