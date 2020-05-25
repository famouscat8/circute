// 该api返回七牛云的上传token
const express = require("express")
const router  = express.Router()
var app = express();
// 七牛云api
var qiniu = require("qiniu");
// 返回七牛的token
var qiniu_tools = require("../tools/qiniu");

var options = {scope: "circute",};

// 客户端吧请求uploadtoken
// 将返回客户端上传文件到七牛云所需的参数
router.post("/uploadtoken", (req, res)=>{
    var uploadToken = qiniu_tools.uploadToken(options);
    var userinfo = req.body;
    var uploadurl="http://upload-z2.qiniup.com";
    console.log("test" + userinfo);
    
    if(!userinfo || !userinfo.usertoken)
	res.json({state:"-1",uploadconfig:null,e:"error userinfo"});
    res.json({state:"1",
	      uploadconfig:{
		  uploadurl:uploadurl,
		  uploadtoken:uploadToken,
	      }
	     });
    console.log("test for my test"+uploadToken);
})

module.exports = router
