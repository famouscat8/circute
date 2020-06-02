const express = require("express")
const router  = express.Router()
const dbtool  = require("../tools/db-redis")
const jwt     = require("jsonwebtoken")
const token_tool = require("../tools/token_tools")
const md5     = require("md5");

// logda: {email:email, pass: password, type: type}
// 登录的类型 type==2 ==> email login
// type == 1 ==> userid login
router.post("/login",(req, res)=>{
    var logda = req.body;
    if(!logda)
	res.json({state: "-6", e:null,m:"email can not be null"});
    else if(logda.type == "2")
	loginWithEmail(logda,res);
    else
	res.json({state: "-7", e:null,m:"不支持使用其他方式登录"});
})

function loginWithEmail(logda,res){
    var key = "user:email:"+logda.email;
    dbtool.get(key).then(uid=>{
	if(uid)loop1(logda,uid,res);
	else res.json({state: "-4",e:null,m:"用户不存在" });
    }).catch(e=>{
	res.json({state: "-1", e:e,m:"no such user"});
    })
}

function loop1(logda,uid,res){
    var pass = md5(logda.pass);
    dbtool.hgetall("user:"+uid).then(user=>{
	if(pass == user.psd)
	    createUserToken(user,uid,res);
	else 
	    res.json({state: "-3",e:null,m: "账号或密码错误"});
    }).catch(e=>{
	res.json({state: "-2",e:e,m: "系统错误,请联系站长"});
    })
}

// 生成usertoken
function createUserToken(user,uid, res){
    let content = {uid:uid};
    var options={expiresIn:3600};
    token_tool.create(content,options).then(token=>{
	res.json({state: "1",user:user,token:token});
    }).catch(e=>{
	res.json({state: "-5",e:null,m:"create token error"});
	console.log("login.js:create token error");
	console.dir(e);
    });
}

module.exports = router
