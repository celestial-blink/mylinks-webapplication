var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let hbs=require('hbs');
// let conf=require('dotenv');
// conf.config();
let {getConection}=require('./conection/mongoConnection');
getConection().then(res=>{
  console.log("conectado");
}).catch(err=>{
  console.log(err.message,"error aqui");
})

hbs.registerPartials(__dirname+"/views/partials");
hbs.registerPartials(__dirname+"/views/forms");
hbs.registerHelper('json',(value)=>{
 return JSON.stringify(value)
});
hbs.registerHelper('urls', (data,key)=>{
  let n=parseInt(key);
  return data.split(">")[n];
});
hbs.registerHelper('split',(text,expression,key)=>{
  let n=parseInt(key);
  let date=new Date(text).toISOString();
  let data=date.split(expression)[n];
  return data;
});
hbs.registerHelper('propertyUser',(data)=>{
  return data[0].user;
});
hbs.registerHelper('likes',(value,word)=>{
  return `${value}-${word}`;
});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));

app.use('/', indexRouter);
app.use('/inicio', indexRouter);
app.use('/users', usersRouter);
app.use("/pruebas",require('./routes/pruebas'));
app.use("/login",require('./routes/login'));
app.use("/crud",require('./routes/crud'));
app.use("/getdata",require('./routes/getdata'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
