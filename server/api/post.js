// 从服务器向客户端返回帖子数据的api
const express=require("express")
const router=express.Router()
const dbtools =require("../tools/db-redis")
const tools=require('../tools/tools')


// t_posts:postid时间排列
// return: Promise:post object
async function getposts(t_posts){
    // 返回给客户端的数据
    var rposts=[];	
    var posts=t_posts;
    var rpost={};
    for(var i=0;i<posts.length;i++){
	var postid=posts[i];
	var p=await dbtools.hgetall(postid)
	    .catch(e=>{return e;});
	if(p.type!=4){
	    var content=await dbtools.hgetall(p.content)
		.catch(e=>{return e;});
	    content.content=tools
		.substring(content.content,120);
	    p.content=content;
	    var comment=await dbtools.hgetall(p.comment)
		.catch(e=>{return e;});
	    p.comment=comment;
	}else if(p.type==4){
	    console.dir([i,p]);
	    p.content=tools.substring(p.content,120);
	    var starnum=await dbtools.zcard(p.star);
	    var collectnum=await dbtools.zcard(p.collect);
	    var commentnum=await dbtools.zcard(p.comment);
	    p.star=starnum||0;
	    p.collect=collectnum||0;
	    p.comment=commentnum||0;
	}
	
	var owner=await dbtools.hgetall(p.owner)
	    .catch(e=>{return e;});
	p.owner=owner;
	rposts.push(p);
    }
    return rposts;
}

// 返回帖子数据的api
// 客户端请求数据格式
// {page:int;pagesize}
router.post("/post",(req,res)=>{
    var rd=req.body;
    var index = rd.index;
    var pagesize = rd.pagesize;
    console.dir(rd);
    loop1(index,pagesize,res);
})


// data2client:发送给用户的缓存数据
function loop1(index,pagesize,res){
    var dp=['articalups','postids'];
    dbtools.zunionstore('data2client',2,'articalups','postids')
	.then(sum=>{
	    loop2(index,pagesize,sum,res);
	}).catch(e=>{
	    error(e,res);
	})
}

function loop2(index,pagesize,sum,res){
    if(!Boolean(index))loop3(0 ,pagesize-1,pagesize,res);
    else{
	var getIndex = dbtools.zrank("data2client",index);
	var getLength=dbtools.zcard("data2client");
	Promise.all([getIndex,getLength]).then(rs=>{
	    var start= rs[1]-rs[0];
	    loop3(start,start+pagesize-1,pagesize,res);
	}).catch(es=>{
	    error(es,res);
	})
    }
}

function loop3(start,end,pagesize,res){
    console.dir([start,end]);
    dbtools.zrevrange("data2client",start,end).then(obj=>{
	console.dir(obj);
    	getposts(obj).then(post=>{
    	    res.json({state:"1",posts:post,sum:pagesize});
    	}).catch(e=>{
	    error(e,res);
    	});
    }).catch(e=>{
	error(e,res);
    })
}

function error(e,res){
    console.log('post.js:');
    console.dir(e);
    res.json({state:'-1',e:e,m:'null'});
}

module.exports = router;

