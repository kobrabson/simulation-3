// require('dotenv').config();
const express = require('express');
// const session = require('express-session');
// const massive = require('massive');
const app = express();
const ctrl = require('./controller');



app.use(express.json());

// endpoints

app.listen(SERVER_PORT, ()=> console.log(`Connected to port ${SERVER_PORT}`))