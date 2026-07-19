require('dotenv').config();
const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const cors = require('cors');
const addTask = require('./controler');
const Router = require('./routers/Router');
const cookieParser = require("cookie-parser");
const connection = require('./connection/connection');


app.use(cookieParser());

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json())
app.use(express.static(path.join(__dirname , '../frontend')))
app.use(express.urlencoded({extended : true}))

connection()
app.use('/', Router)


app.listen(process.env.port , ()=> console.log('runing'))