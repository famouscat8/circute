const express = require("express");
const nodemailer = require("./server/tools/mailer");
const path = require("path")
const app = express();
const port = 3000;

const indexRouter = require("./server/routers/index")
const mail = require("./server/api/signup")
const login= require("./server/api/login")
// 返回qiniu云uploadToken
const uploadToken = require("./server/api/uploadToken")
const token_tools = require("./server/tools/token_tools")
const verifytoken = require("./server/api/verifytoken")
// api 用户上传帖子
const sendpost    = require("./server/api/sendpost")
// api 用户获取帖子
const getpost     = require("./server/api/post")
// api tenxunyun temple token 
const sts         = require("./server/api/sts")
const bodyparser = require("body-parser")

app.use(bodyparser.urlencoded({extende:true}));
app.use(bodyparser.json())


var verify_token = (req, res, next)=>{
    
    if(req.url != "/test") {
	console.log("请求连接 :"+req.url);
	next();
    }else{
	console.log("请求/test");
	var token = req.query.token;
	if(token == null) res.json({state:"0"})
	token_tools.verify(token, "mysecret").then(decode=>{
	    console.dir("返回结果:"+decode);
	    res.json({state: "1"});
	    next();
	}).catch(e=>{
	    console.dir("返回错误:"+e);
	    res.json({state: "-1"});
	})
	
    }
}
app.use(verify_token)
// 挂载静态资源
app.use(express.static("public"))
app.use("/", indexRouter)
app.get("/mail", mail)
app.post("/login", login)
app.post("/uploadtoken",uploadToken)
app.post("/verifytoken", verifytoken.router)
app.post("/sendpost", sendpost)
app.post("/post",getpost)
app.post("/sts",sts)

app.get("/test", (req, res) =>res.send("haha :)"))
app.get("/login.html", (req, res)=>{
    res.sendFile("/root/test/web/html/login.html");
})
app.get("/post.html", (req, res)=>{
    res.sendFile("/root/test/web/html/post.html");
})
app.get("/wenku.html",(red,res)=>{
    res.sendFile("/root/test/web/html/tools/wenku.html");
})


app.listen(port,()=>{
    console.log(`Example app listening on port ${port}!`);
})
