var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

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

var model = mongoose.model('user',user);

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('login',{title:'Login'});
});

router.post('/',function (req,res,next) {
    var userID = req.body.userID;
    var userPassword = req.body.userPassword;
    var session = req.session;
    console.log(userID);
    console.log(userPassword);
    model.find({id:userID,password:userPassword},function (err,data) {
        if(err) throw err;
        if(data.length==0) {
            res.json({success: false, msg: '해당 유저가 존재하지 않습니다.'});
        }else{
            session.userID = userID;
            var userName = model.find({id:userID},{name:1});
            console.log(userName);
            res.redirect('/');
        }
    });

});

/*var la;
var lo;
navigator.geolocation.getCurrentPosition(function(please){
    la = please.coords.latitude;
    lo = please.coords.longitude;
});*/
//console.log(la+" "+lo);

module.exports = router;
