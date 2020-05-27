// 腾讯对象存储返回临时密钥
var STS = require("qcloud-cos-sts")
var express=require("express")
var app = express();
var router=express.Router();

var config={
    secretId:"AKIDoOhjRKiKErPhiSsB6l8KFtGPIuGKp2bt",
    secretKey:"HH2WikW3QZS7VcF9pTggQVO0MUK6KHxM",
    proxy:"",
    durationSeconds:1800,    // 密钥有效期
    bucket:"circute2-1259491699",    // 桶
    region:"ap-beijing",    // 桶位置
    // 文件对象存放路径前缀
    allowPrefix:"test/",
    // 权限列表
    allowActions:[
	// 简单上传
	"name/cos:PutObject",
	"name/cos:PostObject",
	// 分片上传
	"name/cos:InitiateMultipartUpload",
	"name/cos:ListMultipartUploads",
	"name/cos:UploadPart",
	"name/cos:CompleteMultipartUpload"
    ]
};


// 支持跨域访问
router.post("*",(req,res,next)=>{
    res.header("Content-type","application/json");
    res.header("Access-Control-Allow-Origin","http://127.0.0.1:3000");
    res.header("Access-Control-Allow-Headers","origin,accept,content-type");
    if(req.method.toUpperCase()==="OPTINS")
	res.end();
    else
	next();
});


// 返回临时密钥
router.post("/sts",(req,res,next)=>{
    // var scope =[{
    // 	action:"*",
    // 	bucket:config.bucket,
    // 	region:config.region,
    // }];
    //var policy = STS.getPolicy(scope);
    var policy ={
	version:"2.0",
	statement:[{
	    action:"*",
	    effect:"allow",
	    resource:"*",
	}]
    };
    console.dir(policy);
    STS.getCredential({
	secretId:config.secretId,
	secretKey:config.secretKey,
	durationSeconds:config.durationSeconds,
	policy:policy,
    },(err,tmpkeys)=>{
	if(err)res.json({state: "-1",tmpkeys:null,e:err});
	else {
	    res.json(tmpkeys);
	    console.log("success");
	    console.dir(tmpkeys);
	}
    })
})

// app.all("*", (req,res,next)=>{
//     res.writeHead(404);
//     res.json({state:"-1",e:404,m:"404,page not fond!"});
// })

module.exports=router;
