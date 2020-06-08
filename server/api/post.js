// 从服务器向客户端返回帖子数据的api
const express=require("express")
const router=express.Router()
const dbtools =require("../tools/db-redis")

// t_posts:postid时间排列
// return: Promise:post object
async function getposts(t_posts){
    // 返回给客户端的数据
    var rposts=[];	
    // 接受postsid时间排列;
    var posts=t_posts;
    var posts_len=posts.length;
    var rpost={};
    for(var i=0;i<posts_len;i++){
	var postid=posts[i]; // post:12
	// 根据帖子id查询帖子
	var p=await dbtools.hgetall(postid)
	    .catch(e=>{return e;});
	var content=await dbtools.hgetall(p.content)
	    .catch(e=>{return e;});
	var owner=await dbtools.hgetall(p.owner)
	    .catch(e=>{return e;});
	var comment=await dbtools.hgetall(p.comment)
	    .catch(e=>{return e;});
	p.content=content;
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
    dbtools.zrange("postids",0,-1).then(obj=>{
	getposts(obj).then(post=>{
	    res.json({state:"1",posts:post,});
	}).catch(e=>{
	    res.json({state:"-1",e:e,m:"查找帖子错误"});
	});
    }).catch(e=>{
	res.json({state:"-1",e:e,m:"获取帖子时序错误"});
    })
})

module.exports = router;

