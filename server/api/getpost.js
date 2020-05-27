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
	    var pcontentid  =data.content;
	    var userid      =data.owner;
	    //var comment
	    var content_data=dbtools.hgetall(pcontentid);
	    var user_data   =dbtools.hgetall(userid);
	    Promise.all([user_data,content_data]).then(
		values=>{
		    data.owner=values[0];
		    data.content=values[1];
		    res.json({state:"1",e:null,post:data});
		},reason=>{
		    res.json({state:"-1",e:reason,post:null});
		}
	    );
	}).catch(e=>{
	    res.json({state:"-1",e:e,post:null});
	})
    
})

module.exports=router
