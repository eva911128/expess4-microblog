/**
 * Created by Administrator on 2018/1/23.
 */
var mysql = require('mysql');
var db = {};
db.query = function(sql,fun) {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'yd123456',
        database: 'test'
    });
    connection.connect(function(err){
        if(err) {
            console.log(err);
            return false;
        }
        console.log('开启连接')
    })

    connection.query(sql,function(err,rows){
        if(err) {
            console.log(err);
            return ;
        }
        fun(rows);
    })

    connection.end(function(err){
        if(err){
            console.log(err);
            return;
        }
        console.log('连接关闭---')
    })

}


module.exports = db;

