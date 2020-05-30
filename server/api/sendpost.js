const express=require("express")
const router=express.Router()
const dbtools=require("../tools/db-redis")
const utoken=require("../tools/token_tools")

// api 发布帖子
// usertoken:  用户登录token
// 客户端发布帖子之前服务器必须验证usertoken是否有效
// 数据格式{token:usertoken;post:postobject};
router.post("/sendpost",(req,res)=>{
    var token=req.body.token;
    utoken.verify(token,utoken.secret)
	.then(decode=>{
	    var uid=decode.uid;
	    savePost(req.body.post, res, uid);
	}).catch(e=>{
	    console.log("api:/sendpost:verify token error"+e);
	    res.json({state:"-1",e:e,m:"verify usertoken error"});
	})
})

// 帖子总数,先读取帖子总数,作为id,然后postnum马上加一
// 使用帖子的创建时间作为score维护一个postisd字段
// 里面包含所有的帖子id，并且以时间排列
// 同时将这帖子的post:id存入zadd userid:id:posts中,
// 用于记录本用户发布的所有帖子
// save post object on redis
// post object:{title:"",time:"",content:"",tags:[],imgs:[]}
function savePost(post,res,ownid){
    var t_post = post;
    if(!t_post)
	res.json({state:"-1",e:"post data can not be null!"});
    else{
	dbtools.get("postnum").then(pid=>{
	    dbtools.incrby("postnum",1).then(r=>{
		savePostOnRedis(pid,ownid,t_post,res);
	    }).catch(e=>{res.json({
		state:"-1",e:e,m:"increase postnum error"
	    })});
	}).catch(e=>{res.json({
	    state:"-1",e:e,m:"query postnum error"})});
    }
}

// post object:{title:"",time:"",content:"",tags:[],imgs:[]}
function savePostOnRedis(pid,ownerid,t_post,res){
    // the object will save on redis;
    var postobject={
	owner:"user:"+ownerid,
	pid:""+pid,
	content:"content:"+pid,
	comment:"comment:"+pid,
	start:0,
	collect:0,
	view:0,
	share:0,
	time:t_post.time,
	tags:JSON.stringify(t_post.tags),
	imgs:JSON.stringify(t_post.imgs),
    };
    var conobject = {
	title  : t_post.title,
	content: t_post.content,
    };
    
    // 保存帖子
    var setPost=dbtools.hmset("post:"+pid,postobject);
    //  保存帖子内容
    var setPostContent=dbtools.hmset("content:"+pid,conobject); 
    // 保存帖子时序
    var addTime=dbtools.zadd("postids",t_post.time,"post:"+pid);
    // 保存帖子id到相应用户的帖子列表中
    var addPostToUser=dbtools
	.zadd("user:"+ownerid+":posts",t_post.time,"post:"+pid);
    
    Promise.all([setPost,setPostContent,addTime,addPostToUser])
	.then(results=>{
	    res.json({
		state:"1",e:null,results:results,
	    });
	}).catch(reasons=>{
	    res.json({
		state:"-1",e:reasons,m:"something seen to be error"
	    });
	});
    
}


module.exports=router;
