var express = require('express');
var router = express.Router();
var db = require('../dbConfig');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '首页' });
});

router.get('/register', function(req, res, next) {
    res.render('register', { title: '用户注册' });
});

router.get('/login', function(req, res, next) {
    res.render('login', { title: '用户登入' });

});
router.post('/login', function(req, res, next) {
  var name = req.body.username;
  var pwd = req.body.password;
  console.log(db)
    db.query('select * from user where name="'+name+'"',function(data){
        console.log(data)
        if(data) {
          
        }
    })
});
module.exports = router;
