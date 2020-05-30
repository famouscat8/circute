const express = require("express")
const router  = express.Router();
const token   = require("../tools/token_tools")
const dbtools = require("../tools/db-redis")

// api 返回已登录用户的信息
// 用户帖子时序表: zadd userid:id:posts
// 先判断当前用户token是否有效
// 有效就返回当前用户信息
// userid: uid 为不安全数据,用户可能恶意修改该数据
// 应当使用usertoken 中解析出来的uid (deocde.uid)
// req.body: {usertoken:token,userid: uid,type:int }
router.post("/getuser",(req,res)=>{
    let rdata = req.body;
    //res.json({state:"1", e:null,m:"hello world! :) "})
    // 验证token
    token.verify(rdata.usertoken,token.secret).then(decode=>{
	// token 验证成功
	let uid =  decode.uid;
	// if(uid != rdata.userid)
	//     res.json({state:"-1",e:null,m:"想屁吃呢???"});
	// else getUserMessageLoop(uid, res);
	getUserMessageLoop(uid, res);
    }).catch(e=>{
	res.json({state:"-1",e:e,m:"Usertoken invalid,log in again"});
    })
})

// 流程2: 返回用户相关信息
// @param uid: the id of user
//        res: something return to user 
function getUserMessageLoop(uid,res){
    //获取用户基本信息
    var getuserdata = dbtools.hgetall("user:"+uid);
    // 获取用户所有帖子id, 时间倒序
    var getuserposts= dbtools.zrange("user:"+uid+":posts",0,-1);
    
    Promise.all([getuserdata,getuserposts]).then(datas=>{
	getUserPost(datas).then(posts=>{
	    res.json({state:"1", user:datas[0],posts:posts});
	}).catch(e=>{
	    res.json({state:"-1",e:e,m:"get user post error"});
	})
    }).catch(reasons=>{
	console.dir(reasons);
	res.json({state:"-1",e:reasons,m:"something error"});
    })
    
}

// 流程3: 根据帖子id返回帖子对象
// @param datas[userobject,postids]:
async function getUserPost(datas){
    var postids = datas[1];
    var posts   =[];
    for(var i=0;i<postids.length;i++){
	var postid  = postids[i];
	var post    = await dbtools.hgetall(postid)
	    .catch(e=>{return e;});
	var content = await dbtools.hgetall(post.content)
	    .catch(e=>{return e;});
	var owner   = await dbtools.hgetall(post.owner)
	    .catch(e=>{return e});
	var comment = await dbtools.hgetall(post.comment)
	    .catch(e=>{return e});

	post.content=content;
	post.owner  =owner;
	post.comment=comment;
	
	posts.unshift(post);
    }
    return posts;
}
module.exports = router
