// 保存文章到服务器

const express = require('express')
const router  = express.Router()
const dbtools = require('../tools/db-redis')
const User    = require('../tools/dbaction/user')    
const Artical = require('../tools/dbaction/artical')

// 保存文章到用户的数据中
// 注意检查该文章是否用户的文章
router.post('/saveartical',(req,res)=>{
    var rd=req.body;
    var token=rd.usertoken;
    var aid=rd.aid;
    var content=rd.content;
    
    saveArtical(token,aid,content).then(r=>{
	res.json({state:'1',r:r});
    }).catch(e=>{
	console.dir(['saveartical.js:',e]);
	res.json({state:'-1',e:e});
    })
    
})

async function saveArtical(token,aid,content){
    var decode = await User.verifyToken(token);
    console.dir(decode);
    if(!Boolean(decode)||!Boolean(decode.uid))
	return 'user id error';
    var hasPer = await Artical.hasPermission(decode.uid,aid);
    if(!hasPer) return 'Permission deny';
    
    var setContent = await Artical.setContent(aid,content);
    return [decode,hasPer,setContent];
}


module.exports=router
