const express=require('express')
const dbtools=require('../tools/db-redis')
const token_tools=require('../tools/token_tools')
const router = express.Router()

router.post('/createartical',(req,res)=>{
    var rd=req.body;
    var token = rd.usertoken;
    var title=rd.title;
    var bid = rd.bid;
    token_tools.verify(token,token_tools.secret).then(decode=>{
	loop1(decode.uid,bid,title,res);
    }).catch(e=>{
	res.json({state:'-1',e:null,m:'verify token error'});
    })
})

// 查询出最新的aid号
function loop1(uid,bid,title,res){
    dbtools.get('articalnum').then(aid=>{
	dbtools.incrby('articalnum',1).then(r=>{
	    loop2(uid,bid,aid,title,res);
	}).catch(e=>{
	    error(e,res);
	})
    }).catch(e=>{
	error(e,res);
    })
}

function loop2(uid,bid,aid,title,res){
    var time = new Date().getTime();
    var artical={
	aid      : aid,
	ownbooks : bid,
	owner    : 'user:'+uid,
	title    : title,
	time     : time,
	type     : 4,
	star     : "artical:star:"+aid,
	collect  : "artical:collect:"+aid,
	comment  : "artical:comment:"+aid,
    }
    var akey='artical:'+aid;
    var bkey='books:'+bid;
    var bkey_info=bkey+':info';
    var createArtical=dbtools.hmset(akey,artical);
    var add2Books=dbtools.zadd(bkey,time,akey);
    var editBooksInfo=dbtools.hincrby(bkey_info,'articalnum',1);
    Promise.all([createArtical,add2Books.editBooksInfo])
	.then(rs=>{
	    res.json({state:'1',m:rs,e:null});
	}).catch(es=>{
	    error(es,res);
	})
}

function error(e,res){
    console.log('createartical.js:');
    console.dir(e);
    res.json({state:"-1",e:e})
}

module.exports=router
