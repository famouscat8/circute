// 从服务器向客户端返回帖子数据的api
const express=require("express")
const router=express.Router()
const dbtools =require("../tools/db-redis")


// 删除字符串空格换行
function msubstring(string,len){
    return string.replace(/\ +/g, "")
	.replace(/[ ]/g, "")
	.replace(/[\r\n]/g, "")
	.replace(/[\n]/g, "")
	.replace(/[\r]/g, "")
	.substring(0,len);
}

// t_posts:postid时间排列
// return: Promise:post object
async function getposts(t_posts){
    // 返回给客户端的数据
    var rposts=[];	
    var posts=t_posts;
    var posts_len=posts.length;
    var rpost={};
    for(var i=0;i<posts_len;i++){
	var postid=posts[i];
	var p=await dbtools.hgetall(postid)
	    .catch(e=>{return e;});
	if(p.type!=4){
	    var content=await dbtools.hgetall(p.content)
		.catch(e=>{return e;});
	    content.content=msubstring(content.content,120);
	    p.content=content;
	}else if(p.type==4){
	    p.content=msubstring(p.content,120);
	}
	var owner=await dbtools.hgetall(p.owner)
	    .catch(e=>{return e;});
	var comment=await dbtools.hgetall(p.comment)
	    .catch(e=>{return e;});
	p.owner=owner;
	p.comment=comment;
	rposts.unshift(p);
    }
    return rposts;
}

// 返回帖子数据的api
// 客户端请求数据格式
// {page:int;}
router.post("/post",(req,res)=>{
    var reqdata=req.body;
    loop1(res);
})


// data2client:发送给用户的缓存数据
function loop1(res){
    var dp=['articalups','postids'];
    dbtools.zunionstore('data2client',2,'articalups','postids')
	.then(sum=>{
	    loop2(sum,res);
	}).catch(e=>{
	    error(e,res);
	})
}

function loop2(sum,res){
    dbtools.zrange("data2client",0,-1).then(obj=>{
    	getposts(obj).then(post=>{
    	    res.json({state:"1",posts:post,sum:sum,});
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

