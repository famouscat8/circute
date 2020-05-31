const express = require("express");
const nodemailer = require("./server/tools/mailer");
const path = require("path")
const app = express();
const port = 3000;

const indexRouter = require("./server/routers/index")
const mail        = require("./server/api/signup")
const login       = require("./server/api/login")
// 返回qiniu云uploadToken
const uploadToken = require("./server/api/uploadToken")
const token_tools = require("./server/tools/token_tools")
const verifytoken = require("./server/api/verifytoken")
// api 用户上传帖子
const sendpost    = require("./server/api/sendpost")
// api 返回帖子列表
const post        = require("./server/api/post")
// api 返回某条帖子
const getpost     = require("./server/api/getpost")
// api tenxunyun temple token 
const sts         = require("./server/api/sts")
// api 向客户端返回帖子
const viewpost    = require("./server/api/viewpost")
// api  修改ia用户信息
const changeuser  = require("./server/api/changeuser")

const bodyparser  = require("body-parser")
// 返回某用户的个人信息
const getuser     = require("./server/api/getuser")

app.use(bodyparser.urlencoded({extende:true}))
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
app.post("/post",post)
app.post("/sts",sts)
app.post("/getpost",getpost)
app.post("/getuser", getuser)
app.post("/changeuser",changeuser)

app.get("/viewpost.html",viewpost)
app.get("/test", (req, res) =>res.send("haha :)"))
app.get("/login.html", (req, res)=>{
    res.sendFile("/root/test/web/html/login.html");
})

app.get("/post.html", (req, res)=>{
    res.sendFile("/root/test/web/html/post.html");
})
app.get("/wenku.html",(req,res)=>{
    res.sendFile("/root/test/web/html/tools/wenku.html");
})
app.get("/user.html",(req,res)=>{
    res.sendFile("/root/test/web/html/user.html");
})
app.listen(port,()=>{
    console.log(`Example app listening on port ${port}!`);
})
