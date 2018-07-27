var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
//var connection = require('../public/javascripts/dbconnection');

var user = mongoose.Schema({
    name : String,
    id : String,
    password : String,
    address : String,
    phoneNumber : String,
    emergencyInfo : String,
    gender : String,
    disabilityType : String,
    disabilityGrade : String
});

var model = mongoose.model('user2',user);

/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('signup', { title: 'Signup' });
});

router.post('/',function (req,res,next) {
    console.log(req.body);
    model.find({id:req.body.id},function(err,data){
        //console.log('State==> data : '+data);
        if(data.length==0){
            var newUser = new model({
                name: req.body.name,
                id: req.body.id,
                password: req.body.password,
                address : req.body.address,
                phoneNumber : req.body.phoneNumber,
                emergencyInfo : req.body.emergencyInfo,
                gender : req.body.gender,
                disabilityType : req.body.disabilityType,
                disabilityGrade : req.body.disabilityGrade
            });
            newUser.save(function (err,newUser) {
                if(err) return console.error(err);
                else {
                    console.dir(newUser);
                    res.redirect('/');
                }
            });
        }
        else{
            console.log('id is already exist.');
            res.redirect('/signup');
        }
    });
   /* var name = req.body.name;
    var nickname = req.body.nickname;
    var id = req.body.id;
    var password = req.body.password;
    var confirmPW = req.body.confirmPW;

    var sql = 'INSERT INTO users (id, password, name, nickname) VALUES(?, ? ,? ,?)';
    var parms = [id,password,name,nickname];
    if(password!=confirmPW){
        console.log('비밀 번호를 다시 입력하시오');
        res.redirect('/signup');
    } else {
        connection.query(sql, parms, function (err, rows, fields) {
            if (err) {
                console.log(err);
            } else {
                console.log(rows.insertId);
                res.redirect('/login');
            }
        });
    }*/
});


module.exports = router;
