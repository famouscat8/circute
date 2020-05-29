const express=require("express")
const router=express.Router()
const dbtools=require("../tools/db-redis")
const utoken=require("../tools/token_tools")

// 发布帖子api
// 数据格式{token:usertoken;post:postobject};
router.post("/sendpost",(req,res)=>{
    var token=req.body.token;
    utoken.verify(token,utoken.secret)
	.then(decode=>{
	    
	    console.log("api:/sendpost:verify token success"
			+decode);
	    console.dir(decode);
	    var uid=decode.uid;
	    savePost(req.body.post, res, uid);
	}).catch(e=>{
	    console.log("api:/sendpost:verify token error"+e);
	    res.json({state:"-1",e:e});
	})
    
})

// 帖子总数,先读取帖子总数,作为id,然后postnum马上加一
// 使用帖子的创建时间作为score维护一个postisd字段
// 里面包含所有的帖子id，并且以时间排列
// save post object on redis
// post object:{title:"",time:"",content:"",tags:[],}
function savePost(post,res,ownid){
    var t_post = post;
    var postid = 0;
    if(!t_post)
	res.json({state:"-1",e:"post can not be null!"});
    else{
	dbtools.get("postnum").then(pid=>{
	    postid=pid;
	    dbtools.incrby("postnum",1).then(r=>{
		// the object will save on redis;
		var postobject={
		    owner:"user:"+ownid,
		    pid:""+pid,
		    content:"content:"+postid,
		    comment:"comment:"+postid,
		    start:0,
		    collect:0,
		    view:0,
		    share:0,
		    time:t_post.time,
		    tags:JSON.stringify(t_post.tags),
		    imgs:JSON.stringify(t_post.imgs),
		};
		
		dbtools.hmset("post:"+postid,postobject)
		  .then(r=>{
		      // 帖子内容对象
		      var conobject={
			  title:t_post.title,
			  content:t_post.content};
		      dbtools.hmset("content:"+postid,
				    conobject).then(r=>{
					
	dbtools.zadd("post:"+postid,t_post.time,"postids")
					    .then(r=>{
		res.json({state:"1",e:null,r:r});
					    })
					    .catch(e=>{
						res.json({state:"-1",e:e});
					    });
					
					
					
					
				}).catch(e=>{res.json({
				    state:"-1",e:e,m:"error0"
				});});
		  }).catch(e=>{res.json({state:"-1",e:e,
					 m:"error1"})});
	    }).catch(e=>{res.json({state:"-1",e:e,
				   m:"error2"})});
	}).catch(e=>{res.json({state:"-1",e:e,m:"error3"})});
    }
}



module.exports=router;
