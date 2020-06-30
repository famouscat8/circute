const express= require("express")
const router = express.Router()
const mailer = require("../tools/mailer")
const dbtools= require("../tools/db-redis")
const md5    = require("md5")
const UserBean = require("../tools/bean/user")
const User     = require("../tools/dbaction/user")

// 注册界面:绝对不能将用户密码明文存储
// req.body:{token:string,email:string,type:int,password:string}
router.post("/signup", (req, res)=>{
    var data = req.body;
    var token= data.token;
    var email= data.email;
    var pass = md5(data.password);
    
    var user = new User();
    var time = new Date().getTime();
    
    // userobject 为新注册用户添加一些属性
    // 其余使用默认属性
    var userobject={
    	psd      : pass,
    	time     : time,
	email    : email,
    }
    var userbean = new UserBean(userobject);
    console.dir(userobject);
    user.signup(email, token, userbean).then(r=>{
	res.json({state:'1'});
    }).catch(e=>{
	error(e,"error:",res);
    })

})


function error(e,m,res){
    console.dir(["signup.js:",e,m]);
    res.json({state:'-1',e:e,});
}

module.exports = router
