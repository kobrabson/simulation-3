require('dotenv').config();
const express = require('express');
const session = require('express-session');
const massive = require('massive');
const app = express();
const ctrl = require('./controller');

const {CONNECTION_STRING, SESSION_SECRET, SERVER_PORT} = process.env;


app.use(session({
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 48},
    secret: SESSION_SECRET
}))

massive({
    connectionString: CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false
    }
    }).then( db => {
        app.set('db', db)
        console.log('connected to db')
    }).catch( err => console.log(err))

app.use(express.json());

// endpoints
app.post('/auth/login', ctrl.login)
app.post('/auth/register', ctrl.register)
app.get('/auth/logout', ctrl.logout)
app.get('/auth/user', ctrl.getUser)

app.listen(SERVER_PORT, ()=> console.log(`Connected to port ${SERVER_PORT}`))