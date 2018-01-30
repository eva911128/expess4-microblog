var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
// var SessionStore = require('express-mysql-session');//将session存放到数据库,暂时未用，储存在服务器内存
/*大概的意思就是 flash 是 session 中一个用于存储信息的特殊区域。消息写入
到 flash 中，在跳转目标页中显示该消息。flash 是配置 redirect 一同使用的，
以确保消息在目标页面中可用。
 */
var flash = require('connect-flash');

var index = require('./routes/index');
var users = require('./routes/users');
var commonMethods = require('./common');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('microblogbyvoid'));
app.use(session({
    secret:'microblogbyvoid',
    name:'mySessionId',
    resave:false,// 是否每次都重新保存会话，建议false
    saveUninitialized:false, //是否自动保存未初始化的会话，建议false
    // store: new SessionStore({
    //     host: 'localhost',
    //     port: 3306,
    //     user: 'root',
    //     password: 'yd123456',
    //     database: 'test'
    // })
 }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());

//注意放置位置，不要放到路由后面
app.use(function(req,res,next){
    console.log('app.user.local------------------------------');
    res.locals.user = req.session.user;
    res.locals.post = req.session.post;
    console.log('res.locals.user============='+JSON.stringify(res.locals.user));
    console.log('res.locals.post============='+JSON.stringify(res.locals.post));
    console.log('res.locals.id============='+JSON.stringify(req.session.id));

    var error = req.flash('error');
    res.locals.error = error.length?error:null;

    var success = req.flash('success');
    res.locals.success = success.length? success:null;

    next();
})

app.use(function(req,res,next){
    if(req.url == '/register' || req.url == '/login') {
        commonMethods.checkNotLogin(req,res,next);
    }else if(req.url == '/logout') {
        commonMethods.checkLogin(req,res,next);
    }else{
        next();
    }
})
app.use('/', index);
app.use('/users', users);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

/*
express-session配置
secret:一个字符串，作为服务器端生成session的签名
name:返回客户端key的名称，默认为connect.sid。
resave：（是否允许）当客户端并行发送多个请求时，其中给一个请求在另一个请求结束时对session进行修改覆盖并保存。默认为true
saveUninitialized:初始化session时是否保存到存储。默认true
cookies：设置返回到前端key的属性，默认值为{ path: ‘/', httpOnly: true, secure: false, maxAge: null }

方法：
session.destroy():删除session，当检测到客户端关闭时调用。
session.reload()：当session有修改时，刷新session。
session.regenerate()：将已有session初始化。
session.save()：保存session

 http://www.jb51.net/article/114232.htm
*/