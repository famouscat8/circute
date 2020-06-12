const express=require('express')
const token_tools=require('../tools/token_tools')
const dbtools=require('../tools/db-redis')
const router=express.Router();

router.post('/upartical',(req,res)=>{
    var rd=req.body;
    var token=rd.usertoken;
    var aid=rd.aid;
    token_tools.verify(token,token_tools.secret).then(decode=>{
	loop1(decode.uid,aid,res);
    }).catch(e=>{
	res.json({state:"-1",e:null,m:'verify token error'});
    })
})

function loop1(uid,aid,res){
    dbtools.hget('artical:'+aid,'owner').then(owner=>{
	if(owner==('user:'+uid))
	    loop2(aid,res);
	else error('想啥呢?',res);
    }).catch(e=>{
	error(e,res);
    })
}

function loop2(aid,res){
    var akey='artical:'+aid;
    var time=new Date().getTime();
    var setIsUp=dbtools.hset(akey,'isup',1);
    var add2Up =dbtools.zadd('articalups',time,akey);
    Promise.all([setIsUp,add2Up]).then(rs=>{
	res.json({state:'1',e:null,m:'up success'});
    }).catch(es=>{
	error(es,res);
    })
}

function error(e,res){
    res.json({state:"-1",e:e,m:''});
}



module.exports = router


