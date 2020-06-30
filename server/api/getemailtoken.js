// 用户通过邮箱注册时,向邮箱发送token
// 并存储到redis中,并设置过期时间和错误次数
const express   = require("express")
const router    = express.Router()
const dbtools   = require("../tools/db-redis")
const mailtools = require("../tools/mailer")
const randomCode= require("../tools/randomcode")
const User      = require("../tools/dbaction/user")


// api req.body:{email: string, type:int}
router.post("/getemailtoken",(req,res)=>{
    var data = req.body;
    var email= data.email;
    var user = new User();
    user.postSignupTokenToEmail(email).then(r=>{
	console.dir(r);
	res.json({state:"1"});
    }).catch(e=>{
	error(e,res);
    })
    
})

function error(e,res){
    console.dir([e,res]);
    res.json({state:"-1",e:e,m:"email can not be null"});
}

module.exports = router
