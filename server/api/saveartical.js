// 保存文章到服务器

const express=require('express')
const router = express.Router()
const token_tools = require('../tools/token_tools')
const dbtools = require('../tools/db-redis')

// 保存文章到用户的数据中
// 注意检查该文章是否用户的文章
router.post('/saveartical',(req,res)=>{
    var rd=req.body;
    var token=rd.usertoken;
    var aid=rd.aid;
    var content=rd.content;
    token_tools.verify(token,token_tools.secret).then(decode=>{
	loop1(decode.uid,aid,content,res);
    }).catch(e=>{
	res.json({state:'-1',e:e,m:'verify token error'});
    })
})

// 判断该文章是否当前用户的
function loop1(uid,aid,content,res){
    dbtools.hget('artical:'+aid,'owner').then(owner=>{
	if(owner!=('user:'+uid))
	    res.json({state:"-1",e:null,m:'想屁吃呢?'});
	else loop2(aid,content,res);
    }).catch(e=>{
	res.json({state:'-1',e:e,m:'something error'});
    })
}


function loop2(aid,content,res){
    var artical = {
	content: content,
	time   : new Date().getTime(),
    }
    dbtools.hmset('artical:'+aid,artical).then(r=>{
	res.json({state:'1',e:null,m:'save success'});
    }).catch(e=>{
	res.json({state:"-1",e:e,m:'error'});
    })
}

module.exports=router
