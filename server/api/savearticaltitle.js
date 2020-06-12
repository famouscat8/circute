const express=require('express')
const router = express.Router()
const token_tools=require('../tools/token_tools')
const dbtools=require('../tools/db-redis')

router.post('/savearticaltitle',(req,res)=>{
    var rd=req.body;
    var token=rd.usertoken;
    var aid=rd.aid;
    var title=rd.title;
    token_tools.verify(token,token_tools.secret).then(decode=>{
	loop1(decode.uid,aid,title,res);
    }).catch(e=>{
	res.json({state:"-1",e:null,m:'verify token error'});
    })
})

function loop1(uid,aid,title,res){
    dbtools.hget('artical:'+aid,'owner').then(owner=>{
	if(owner==('user:'+uid))
	    loop2(aid,title,res);
	else res.json({state:'-2',e:null,m:'想屁吃呢?'})
    }).catch(e=>{
	error(e,res);
    })
}

function loop2(aid,title,res){
    dbtools.hset('artical:'+aid,'title',title).then(r=>{
	res.json({state:'1',e:null,});
    }).catch(e=>{
	error(e,res);
    })
}

function error(e,res){
    console.log('savearticaltitle.js:');
    console.dir(e);
    res.json({state:'-1',e:e,m:'something error'});
}

module.exports=router
