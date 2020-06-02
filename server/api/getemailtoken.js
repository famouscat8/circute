// 用户通过邮箱注册时,向邮箱发送token
// 并存储到redis中,并设置过期时间和错误次数
const express   = require("express")
const router    = express.Router()
const dbtools   = require("../tools/db-redis")
const mailtools = require("../tools/mailer")
const randomCode= require("../tools/randomcode")

// api req.body:{email: string, type:int}
router.post("/getemailtoken",(req,res)=>{
    var data = req.body;
    var email= data.email;
    if(!Boolean(email))error(res);
    else loop1(email,res);
})

function loop1(email,res){
    dbtools.get("user:email:"+email).then(r=>{
	console.dir(r);
	if(r!=null){
	    res.json({state:"-2",e:null,m:"邮箱已经注册过啦"});
	    console.log("tgiouhgtuhuisdfhdsuih");
	}else loop2(email,res);
    }).catch(e=>{
	res.json({state:"-1",e:e,m:"something error"});
    })
}

function loop2(email,res){
    var code = randomCode.createCode(5);
    var html = "<h2>感谢注册CIRCUTE</h2>  宁的验证码是:"+code;
    var key  = "email:signup:"+email;
    // 将code 添加到redis set email:signup:string code
    dbtools.set(key, code).then(r=>{
	dbtools.expire(key,300).then(r=>{
	    loop3(email,html,res);
	}).catch(e=>{
	    res.json({state:"-1",e:e,m:"设置过期时间错误"});
	})
    }).catch(e=>{
	console.dir(e);
	res.json({state:'-1',e:e,m:"create random code error"});
    })
}

// 发送验证码到用户邮箱
function loop3(email,html,res){
    mailtools.sendSignupMail(email,html).then(info=>{
	res.json({state:"1",e:null});
    }).catch(e=>{
	console.dir(e);
	res.json({state:"-1",e:e,m:"send random code error"});
    })
}

function error(res){
    res.json({state:"-1",e:null,m:"email can not be null"});
}

module.exports = router
