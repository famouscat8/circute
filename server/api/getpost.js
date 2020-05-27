// api 根据postid返回帖子
const express   = require("express")
const router    = express.Router();
const dbtools   = require("../tools/db-redis")

// s_data:{token:usertoken,time:localtime,pid:postid}
router.post("/getpost",(req,res)=>{
    var s_data=req.body;
    console.dir(s_data);
    if(!s_data){
	res.json({state:"-1",post:null,m:'pid can not be null'});
	return;
    }
    dbtools.hgetall("post:"+s_data.pid)
	.then(data=>{
	    var pcontentid=data.content;
	    dbtools.hgetall(pcontentid)
		.then(content=>{
		    data.content=content;
		    res.json({state:"1",e:null,post:data});
		}).catch(e=>{
		    res.json({state:"-1",e:e,post:null});
		});
	}).catch(e=>{
	    res.json({state:"-1",e:e,post:null});
	})
})



module.exports=router
