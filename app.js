var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')

// 导入接口路由文件
var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');
var validatorRouter = require('./routes/validator');
var saveSubmitRouter = require('./routes/savaSubmit');
var getArticleRouter = require('./routes/getArticle');
var updatePersonalInfoRouter = require('./routes/updatePersonalInfo');
var getAllArticleRouter = require('./routes/getAllArticle');
var deleteArticleRouter = require('./routes/deleteArticle');
var getArticleDetailsRouter = require('./routes/getArticleDetails');
var imgAddRouter = require('./routes/imgAdd');
var submitCommentRouter = require('./routes/submitComment');
var mailValidateRouter = require('./routes/mailValidate');
const { OctetStreamParser } = require('formidable');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 挂载接口路由对象
app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/validator', validatorRouter);
app.use('/saveSubmit', saveSubmitRouter);
app.use('/getArticle', getArticleRouter);
app.use('/updatePersonalInfo', updatePersonalInfoRouter);
app.use('/getAllArticle', getAllArticleRouter);
app.use('/deleteArticle', deleteArticleRouter);
app.use('/getArticleDetails', getArticleDetailsRouter);
app.use('/imgAdd', imgAddRouter);
app.use('/submitComment', submitCommentRouter);
app.use('/mailValidate', mailValidateRouter);

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
process.env.port = 3000;

module.exports = app;
