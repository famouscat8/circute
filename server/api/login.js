const express = require("express")
const router  = express.Router()
const dbtool  = require("../tools/db-redis")
const jwt     = require("jsonwebtoken")
const token_tool = require("../tools/token_tools")

var app = express();

router.post("/login",(req, res)=>{
    var login_data = req.body;
    if(!login_data)
	res.json({state: "-1", e: "error userid"});
    
    // 前端数据: {userid: userid, pass: password, type: type}
    // 登录的类型 type==2 ==> email login
    // type == 1 ==> userid login
    
    if(login_data.type == "2"){	//用户使用邮箱登录
	dbtool.get("user:email:"+login_data.userid)
	    .then(uid=>{
		console.log("uid:"+uid);
		// 根据uid查用户信息
		if(uid)
		    dbtool.hgetall("user:"+uid).then(user=>{
			// 登录成功
			if(login_data.pass == user.psd){
			    // 要生成的token主题信息
			    let content = {uid:uid};
			    token_tool.create(content,
					      {
						  expiresIn:3600,
					      })
				.then(token=>{
				    res.json({state: "1",
					      user: user,
					      token: token});
				    console.log(
					"create token for:"
					    +user.email
					    +"token:"+token);
				}).catch(e=>{
				    res.json({state: "-5",
					      e:"create token error"});
				    console.log(
					"login.js:create token error");
				    console.dir(e);
				});
			} else {
			    console.log(user.psd);
			    console.log(login_data.pass);
			    res.json({state: "-3",
				      e: "账号或密码错误"});
			}
		    }).catch(e=>{
			res.json({state: "-2",
				  e: "系统错误,请联系站长"});
		    })
		else
		    res.json({state: "-4",e:"用户不存在" });
	    }).catch(e=>{
		console.log("search for uid error:"+e);
		res.json({state: "-1", e: e});
	    })
    } else {
	res.json({state: "-1", e: "不支持使用其他方式登录"});
    }
})

module.exports = router
