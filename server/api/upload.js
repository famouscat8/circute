const querystring = require("querystring")
const express = require("express")
const router  = express.Router()

router.post("/upload",(req,res)=>{
    req.setEncoding("binary");
    let body = "";

    // 边界字符串
    let boundary = req.headers['content-type'].split(";")[1].replace("boundary=","");
    
    // 接收post data流
    req.on("data",function(d){
	body += d;
    })
    
    req.on("end",function(){
	
	console.dir(body);
	
	let file = querystring.parse(body, "\r\t", ":")
	let fileInfo = file['Content-Disposition'].split(";");
	let fileName = "";
	let ext = "";

	console.dir(["file",file,"fileinfo",fileInfo]);
	
	for(let value in fileInfo){
	    if(fileInfo[value].indexOf("filename=") != -1){
		fileName = fileInfo[value].substring(10, fileInfo[value].length - 1);
		
		if(fileName.indexOf("\\") != -1){
		    fileName = fileName.substring(fileName.lastIndexOf("\\") + 1);
		}
		ext = fileName.substr(fileName.indexOf(".") + 1, fileName.length)
	    }
	}
	
    })
    
    
    res.json({status:"success"});
    
})

module.exports = router;


