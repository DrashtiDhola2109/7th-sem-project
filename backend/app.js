
var express = require('express');
var path = require('path');

const dbConnection = require('./middlewares/dbConnection')
var schemare = require('./models/Zoneschema');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/', usersRouter);


app.listen(3000,()=>{console.log('listening on http://localhost:3000');});

module.exports = app;
