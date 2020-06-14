const express= require("express")
const router = express.Router()
const mailer = require("../tools/mailer")
const dbtools= require("../tools/db-redis")
const md5    = require("md5")
//const crypto = require("crypto")

// 注册界面:绝对不能将用户密码明文存储
// req.body:{token:string,email:string,type:int,password:string}
router.post("/signup", (req, res)=>{
    var data = req.body;
    var token= data.token;
    var email= data.email;
    var pass = md5(data.password);
    dbtools.get("email:signup:"+email).then(r=>{
	if(token == r)
	    loop2(email,pass,res);
	else
	    error(null,'token verify error',res);
    }).catch(e=>{
	error(e,'token can not be null',res);
    })
})

function loop2(email, pass,res){
    dbtools.get("usernum").then(uid=>{
	loop3(email,pass,uid,res);
    }).catch(e=>{
	error(e,'get uid error',res);
    });
}

function loop3(email,pass,uid,res){
    var time = new Date().getTime();
    var user = {
	nickname : "Anonym",
	uimg     : "https://s1.ax1x.com/2020/05/22/YOkjTs.png",
	avatarurl: "",
	username : "Anonym",
	psd      : pass,
	uid      : uid,
	time     : time,
    };
    var addUserNum = dbtools.incrby("usernum",1);
    var saveUser   = dbtools.hmset("user:"+uid,user);
    var saveEmail  = dbtools.set("user:email:"+email,uid);
    Promise.all([addUserNum,saveUser,saveEmail]).then(r=>{
	success('signup success',res);
    }).catch(reasons=>{
	error(reasons,"请稍后重试",res);
    });
}


function success(m,res){
    res.json({state:"1",m:m,});
}

function error(e,m,res){
    console.log('signup.js:');
    res.json({state:'-1',e:e,});
}

module.exports = router
