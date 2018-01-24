/**
 * Created by Administrator on 2018/1/23.
 */
var mysql = require('mysql');
var db = {};
db.query = function(sql,callback) {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'yd123456',
        database: 'test'
    });
    connection.connect(function(err){
        if(err) {
            callback(err);
        }
        console.log('开启连接')
    })

    connection.query(sql,function(err,rows){
        callback(err,rows);
    })

    connection.end(function(err){
        if(err){
            callback(err);
        }
        console.log('连接关闭---')
    })

}


module.exports = db;

