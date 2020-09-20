const express = require("express")
const nodemailer = require("./server/tools/mailer")
const path = require("path")
const app = express()
const port = 80;

const indexRouter = require("./server/routers/index")
const signup      = require("./server/api/signup")
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
// api  修改用户信息
const changeuser  = require("./server/api/changeuser")
// api 返回邮箱验证码
const getemailtoken = require("./server/api/getemailtoken")
// api 返回用户文集
const getbooks    = require("./server/api/getbooks")
// api 新建文集
const createbooks = require('./server/api/createbooks')
// api 新建文章
const createartical=require('./server/api/createartical')
// api 返回文集对应的文章
const getarticals = require('./server/api/getarticals')
// api 保存文章
const saveartical = require('./server/api/saveartical')
// api 修改artical title
const savearticaltitle=require('./server/api/savearticaltitle')
// api 发布文章
const upartical=require('./server/api/upartical')
// api 文章系统
const setpost = require("./server/api/setpost")

// api 粉丝系统
const fans = require('./server/api/fans')

const bodyparser  = require("body-parser")
// 返回某用户的个人信息
const getuser     = require("./server/api/getuser")
// 返回指定k链接的title
const geturltitle = require('./server/api/geturltitle')

// tools:
// szu power manager
const szupowermanager = require("./server/api/szupowermanager")
// return check code
const checkcode = require("./server/api/checkcode")



// 上传文件至服务器
const upload = require("./server/api/upload")

app.use(bodyparser.urlencoded({extende:true}))
app.use(bodyparser.json())

var logger  = (req, res, next)=>{
    var ipAddress;
    // ipAddress = req.headers['X-Forwarded-For'] &&
    // 	req.headers['X-Forwarded-For']
    ipAddress =req&&req.headers&&req.headers['x-forwarded-for'];
    if(!ipAddress)
	ipAddress = req.connection.remoteAddress;
    console.log("request ip address:"+ ipAddress)
    
    if(req.url != "/test") {
	console.log("request for:"+req.url);
	next();
    }else{
	console.log("request test:");
	var token = req.query.token;
	if(token == null) res.json({state:"0"})
	token_tools.verify(token, "mysecret").then(decode=>{
	    console.dir("return :"+decode);
	    res.json({state: "1"});
	    next();
	}).catch(e=>{
	    console.dir("return error");
	    res.json({state: "-1"});
	})
    }
}

app.use(logger)
// 挂载静态资源
app.use(express.static("public"))
app.use("/", indexRouter)
//app.get("/mail", mail)
app.post("/login", login)
app.post("/uploadtoken",uploadToken)
app.post("/verifytoken", verifytoken.router)
app.post("/sendpost", sendpost)
app.post("/post",post)
app.post("/sts",sts)
app.post("/getpost",getpost)
app.post("/getuser", getuser)
app.post("/changeuser",changeuser)
app.post("/signup",signup)
app.post("/getemailtoken", getemailtoken)
app.post("/getbooks",getbooks)
app.post('/createbooks',createbooks)
app.post('/getarticals',getarticals)
app.post('/saveartical',saveartical)
app.post('/savearticaltitle',savearticaltitle)
app.post('/createartical',createartical)
app.post('/upartical',upartical)
app.post('/fans',fans)
app.post('/setpost',setpost)
app.post('/geturltitle',geturltitle)
app.post("/szupowermanager",szupowermanager)
app.post("/upload",upload)

app.get("/checkcode",checkcode)
app.get("/viewpost.html",viewpost)
app.get("/test", (req, res) =>res.send("haha :)"))
app.get("/login.html", (req, res)=>{
    res.sendFile("/root/test/web/html/login/login.html");
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
app.get("/signup.html",(req,res)=>{
    res.sendFile("/root/test/web/html/signup/signup.html");
})
app.get("/szupowermanager.html",(req,res)=>{
    res.sendFile("/root/test/web/html/tools/szupowermanager.html");
})
app.get("/buble.html",(req,res)=>{
    res.sendFile("/root/test/web/html/buble/buble.html");
})


app.listen(port,()=>{
    console.log(`Example app listening on port ${port}!`);
})
