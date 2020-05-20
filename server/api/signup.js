



const express= require("express")
const router = express.Router()
const mailer = require("../tools/mailer")
const dbtools= require("../tools/db-redis")
const app    = express();


var bodyparser = require("body-parser")
app.use(bodyparser.urlencoded({extende: true}));
app.use(bodyparser.json())

// 使用get接受和发送数据
// router.get("/mail", async (ctx) => {
//     var email = ctx.query.email;
//     var user_name ="殇月空间";
//     var pass = ctx.query.pass;
//     console.log( "注册成功" + "email:" + email +
// 	"pass:" + pass );
    
//     var code = "123456";
//     var isLive = "no";

//     var mail = {
// 	from: "<3142362556@qq.com>",
// 	subject: "注册殇月空间",
// 	to: email,
// 	text: "使用" +
// 	    code +
// 	    "作为你的验证码注册殇月空间" +
// 	    "你的密码是" +
// 	    pass
//     };

//     await mailer.sendSignupMail(mail);
    
// })

router.post("/mail", (req, res)=>{
    var result = req.body;
    res.send(JSON.stringify(result));
})

module.exports = router
