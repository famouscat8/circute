const express = require("express")
const router  = express.Router();
const token_tools = require("../tools/token_tools")
const dbtools = require("../tools/db-redis")

// 新建文集api
// req: {usertoken: token,books:books_name,action}
router.post("/createbooks",(req,res)=>{
    var rd = req.body;
    var token = rd.usertoken;
    var books_name = rd.books;
    token_tools.verify(token,token_tools.secret).then(decode=>{
	loop1(decode.uid,books_name,res);
    }).catch(e=>{
	res.json({state:"-1",e:e,m:"token verify error!"});
    })
})

function loop1(uid, bname,res){
    // 为当前操作分配books id 和 artical id
    var getbooksid = dbtools.get("booksnum");
    var getarticalid = dbtools.get("articalnum");
    Promise.all([getbooksid,getarticalid]).then(results=>{
	loop2(uid,bname,results,res);
	console.dir(results);
    }).catch(reasons=>{
	res.json({state:"-1",
		  e:reasons,
		  m:"get books or artical num error!"});
    })
}

function loop2(uid,bname,baid,res){
    var aid  = baid[1];
    var bid  = baid[0];
    var time = new Date().getTime();
    var bkey = "books:"+bid;
    var akey = "artical:"+aid;
    // 将这个文集和对应用户关联
    var bukey = "books:user:"+uid;
    // 存储books信息
    var bikey = bkey+":info";
    var booksinfo = {
	img       : '',
	booksname : bname,
	bid       : bid,
	articalnum: 1,
	time      : time,
	owner     : 'user:'+uid,
    };
    
    var articalinfo={
	ownbooks: bkey,
	aid     : aid,
	title   : "默认文章",
	content : '',
	time    : time,
	owner   : 'user:'+uid,
	type    :4,
    }
    
    var addbooksid = dbtools.incrby("booksnum",1);
    var addarticalid = dbtools.incrby("articalnum",1);
    var addartical = dbtools.hmset(akey,articalinfo);
    var addbooks   = dbtools.zadd(bkey,time,akey);
    var addbooksinfo = dbtools.hmset(bikey,booksinfo);
    var addbooks2user = dbtools.zadd(bukey,time,bid);
    Promise.all([addbooksid,addarticalid,
		 addartical,addbooks,
		 addbooksinfo,addbooks2user])
	.then(results=>{
	    console.dir(results);
	    res.json({state:'1',e:null,m:'success'});
	}).catch(reasons=>{
	    res.json({state:"-1",e:e,m:"something error!"});
	})
}

module.exports = router
