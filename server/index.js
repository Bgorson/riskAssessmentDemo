const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const PORT = 4000;
const mongoose = require ('mongoose')

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

mongoose.connect("mongodb://127.0.0.1:27017/todos", {useNewUrlParser:true})
const connection = mongoose.connection;

connection.once('open', function(){
  console.log("MongoDB database connection established")
})

app.listen(PORT, () =>
  console.log('Express server is running on localhost:',PORT)
);