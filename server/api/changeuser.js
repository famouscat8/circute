// api 修改用户信息
const express  = require("express")
const router   = express.Router()
const dbtools  = require("../tools/db-redis")
const tokentool= require("../tools/token_tools")

// api 修改用户信息
// req.body:{usertoken:token,
// changeto:{username:string,nickname:string}}
router.post("/changeuser",(req,res)=>{
    var token    = req.body.usertoken;
    var changeto = req.body.changeto;
    tokentool.verify(token, tokentool.secret).then(decode=>{
	var uid = decode.uid;
	changeUser(uid, changeto,res);
    }).catch(e=>{
	res.json({state:"-1", e:e,m:"verify token error,log again"});
    })
    
})

// 修改用户数据
function changeUser(uid, changeto,res){
    dbtools.hmset("user:"+uid,changeto).then(data=>{
	res.json({state: "1",e:null});
    }).catch(e=>{
	res.json({state:"-1",e:e});
    })
}

module.exports = router
