const express = require('express');
const passport = require('passport')
const parserBody = require('body-parser')
const mongo = require('mongoose')

const authRout = require('./routes/auth')
const tasksRout = require('./routes/tasks')
const fileRouter = require("./routes/file")
const orderRout = require("./routes/orders")

const prioritiesRout = require('./routes/priorities')
const keys = require('./config/keys')
const multer = require('multer');

const app = express()


mongo.connect(keys.mongoURI, {useNewUrlParser: true, useUnifiedTopology: true,})
.then(()=> console.log('all is good'))
.catch((e)=> console.log(e))


app.use(parserBody.urlencoded({extended : true}));
app.use(parserBody.json())

app.use('/api/auth', authRout)
app.use('/api/tasks', tasksRout)
app.use('/api/priorities', prioritiesRout)
app.use("/api/files", fileRouter)
app.use("/api/orders", orderRout)
app.use(require('cors')())
app.use(require('morgan')('dev'))

app.use(passport.initialize())

require('./midleware/passport')(passport)
app.use(express.static('./public'));

app.use(multer);

app.use(express.static(__dirname));
//app.use(express.static('public'));

module.exports = app