// api 根据postid返回帖子
const express   = require("express")
const router    = express.Router();
const dbtools   = require("../tools/db-redis")

// s_data:{token:usertoken,time:localtime,pid:postid}
router.post("/getpost",(req,res)=>{
    var rd=req.body;
    if(!rd){
	res.json({state:"-1",post:null,m:'pid can not be null'});
	return;
    }
    var aid=rd.aid;
    var pid=rd.pid;
    if(!Boolean(aid))
	loop1('post:'+pid,res);
    else
	loop2('artical:'+aid,res);    
})

// 查询post
function loop1(pid,res){
    dbtools.hgetall(pid).then(post=>{
	var getContent=dbtools.hgetall(post.content);
	var getUser   =dbtools.hgetall(post.owner);
	Promise.all([getUser,getContent]).then(values=>{
	    post.owner=values[0];
	    post.content=values[1];
	    res.json({state:"1",post:post});
	},reason=>{
	    error(reason,res);
	});
    }).catch(e=>{
	error(e,res);
    })
}

// 查询artical
function loop2(aid,res){
    dbtools.hgetall(aid).then(artical=>{
	dbtools.hgetall(artical.owner).then(owner=>{
	    artical.owner=owner;
	    res.json({state:'1',artical:artical});
	}).catch(e=>{
	    error(e,res);
	})
    }).catch(e=>{
	error(e,res);
    })
}

function error(e,res){
    console.dir(e);
    res.json({state:'-1',e:e});
}

module.exports=router
