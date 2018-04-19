var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var users = require('./model/users.js')
var cards = require('./model/cards.js')
var path = require('path')

app.use(express.static(path.join(__dirname, '/dist')))

app.all('*', function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    next();
})

let getUserInfo = (user)=>{
    return users.findOne({
        where: {
            phone: user.phone
        }
    });
}

app.post('/login', urlencodedParser, function(req, res){
    let user = req.body;
    getUserInfo(user).then(result => {
        let response = {};
        if(!result){
            response.error = '没有该用户!';
        }else if(result.dataValues.password != user.password){
            response.error = '密码错误!';
        }else{
            response = {success: 'ok', data: result.dataValues}
        }
        setTimeout(()=>{
            res.status(200).json(response);
        }, 3000)
    })
})
app.post('/register', urlencodedParser, (req, res)=>{
    console.log('res');
    let user = req.body;
    getUserInfo(user).then(result =>{
        let response = {};
        if(result){
            response.error = '用户已存在!';
        }else{
            users.create(user).then(result =>{
                if(result.dataValues){
                    response = {success: 'ok', data: result.dataValues};
                }else{
                    response.error = '系统繁忙!';
                }
            })
        }
        res.status(200).json(response);
    })
})
app.post('/cards', urlencodedParser, (req, res)=>{
    let pagination = {};
    pagination.limit = parseInt(req.body.limit) || 10;    
    pagination.offset = (req.body.page - 1) * pagination.limit;
    //offset 从多少条开始
    //limit 显示几条
    cards.findAndCountAll(pagination).then(result=>{
        res.status(200).json({success: 'ok', data: result.rows, count: Math.ceil(result.count/pagination.limit)});
    })
})
// mysql 连接
// var mysql = require('mysql');
// var connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '123123',
//     database: 'node'
// });

// connection.connect();

// app.get('/', function(req, res){
//     var sql = 'SELECT * FROM USERS';
//     connection.query(sql, function(err, result){
//         if(err){
//             return;
//         }
//         res.header("Access-Control-Allow-Origin", "*");
//         res.write(JSON.stringify(result));
//         res.end();
//     })
// });

// app.post('/login', urlencodedParser, function(req, res){
//     res.header("Access-Control-Allow-Origin", "*");
//     res.write('123');
//     console.log(req.body);
//     console.log(typeof req.body);
//     console.log(req.body.username);
//     res.end();
// });

//mongodb 连接
// var MongoClient = require('mongodb').MongoClient;
// var DB_CONN_STR = 'mongodb://127.0.0.1:27017/test';

// var findData = function(db, callback){
//     var collection = db.collection('node');
//     collection.find().toArray(function(err, result){
//         if(err){
//             console.log(err)
//             return;
//         }
//         callback(result);
//     })
// }

// MongoClient.connect(DB_CONN_STR, function(err, db){
//     console.log('conn');
//     findData(db, function(res){
//         console.log(res);
//         db.close();
//     });
// });

var server = app.listen(8089, function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log('地址:', host, port)
})