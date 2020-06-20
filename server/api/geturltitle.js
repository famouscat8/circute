// 工具api 返回指定链接的title

const express=require('express')
const router=express.Router()
const token_tools=require('../tools/token_tools.js')
const dbtools=require('../tools/db-redis')
const jsdom = require('jsdom')
const { JSDOM } = jsdom;
const http=require('http')
const https=require("https")

//redis查询并返回url对应的title
router.post("/geturltitle",(req,res)=>{
    var rd=req.body;
    var token=rd.usertoken;
    var url=rd.url;
    
    token_tools.verify(token,token_tools.secret)
	.then(decode=>{
	    loop1(url,res);
	}).catch(e=>{
	    error(e,res);
	})
    
})

function loop1(url,res){
    dbtools.hget('titleofurl',url).then(title=>{
	if(!Boolean(title))loop10(url,res);
	else res.json({state:'1',url:url,title:title});
    }).catch(e=>{
	error(e,res);
    })
}

// 验证url合法性
function loop10(url,res){
    var i1=url.indexOf("https://");
    var i2=url.indexOf("http://");
    if(i1!=0&&i2!=0){
	error("url invalied",res);
    }else if(i1==0){//https链接
	loop20(url,res);
    }else if(i2==0){//http链接
	loop2(url,res);
    }
}

function loop20(url,res){
    var options={
	hostname:url.substring(8,url.length),
	rejectUnauthorized:false,
    }
    console.dir(options);
    https.get(options,(re)=>{
	var html='';
	re.on("data",data=>{
	    html+=data;
	})
	re.on("end",()=>{
	    loop3(url,html,res);;
	})
    }).on("error",e=>{
	error(e,res);
    })
}

function loop2(url,res){
    http.get(url,(re)=>{
    	var html='';
    	re.on("data",data=>{
    	    html+=data;
    	})
    	re.on('end',()=>{
	    loop3(url,html,res);
    	})
    }).on('error',(e)=>{
	error(e,res);
    });
}

function loop3(url,html,res){
    console.dir(html.substring(0,100));
    const dom = new JSDOM(html);
    try{
	var title = dom.window
	    .document.querySelector("title")
	    .textContent;
	
    }catch{
	var title='';
    }
    dbtools.hset('titleofurl',url,title).then(r=>{
	res.json({state:'1',url:url,title:title});
    }).catch(e=>{
	error(e,res);
    })
}

function error(e,res){
    console.dir(["geturltitle.js:",e]);
    res.json({state:'-1',e:e});
}
module.exports=router
