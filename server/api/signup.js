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
    console.dir(pass);
    // 验证token
    dbtools.get("email:signup:"+email).then(r=>{
	if(token == r)
	    loop2(email,pass,res);
	else
	    res.json({state:"-1",m:"token verify error"});
    }).catch(e=>{
	res.json({state:"-1",m:"token can not be null"});
    })
})

function loop2(email, pass,res){
    dbtools.get("usernum").then(uid=>{
	loop3(email,pass,uid,res);
    }).catch(e=>{
	res.json({state:"-1",e:e,m:"get uid error"});
    });
}

function loop3(email,pass,uid,res){
    var user = {
	nickname : "nickname__test",
	uimg     : "https://s1.ax1x.com/2020/05/22/YOkjTs.png",
	avatarurl: "",
	username : "username__test",
	psd      : pass,
    };
    var addUserNum = dbtools.incrby("usernum",1);
    var saveUser   = dbtools.hmset("user:"+uid,user);
    var saveEmail  = dbtools.set("user:email:"+email,uid);
    Promise.all([addUserNum,saveUser,saveEmail]).then(r=>{
	res.json({state:"1",e:null,m:"恭喜你,注册成功"});
    }).catch(reasons=>{
	res.json({state:"-1",e:reasons,m:"稍后重试"});
    });
}

module.exports = router
