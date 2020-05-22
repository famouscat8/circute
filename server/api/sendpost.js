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
//	    res.json({state:"1",decode:decode,e:null})
	}).catch(e=>{
	    console.log("api:/sendpost:verify token error"+e);
	    res.json({state:"-1",e:e});
	})
    
})


// 帖子总数,先读取帖子总数,作为id,然后postnum马上加一
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
		    owner:"userid:"+ownid,
		    content:"content:"+postid,
		    comment:"comment:"+postid,
		    start:"1000",
		    share:"1000",
		    tags:JSON.stringify(post.tags)};
		
		dbtools.hmset("post:"+postid,postobject)
		    .then(r=>{
			res.json({state:"1",e:null});
		    }).catch(e=>{res.json({state:"-1",e:e})});
	    }).catch(e=>{res.json({state:"-1",e:e})});
	}).catch(e=>{res.json({state:"-1",e:e})});
    }
}



module.exports=router;
