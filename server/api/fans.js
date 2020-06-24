// api 粉丝系统
// 根据action 返回用户粉丝,关注,关注数量,是否关注
const express=require("express")
const router = express.Router()
const dbtools=require('../tools/db-redis')
const token_tools=require("../tools/token_tools")

//{usertoen:token,action:int,other:id}
router.post('/fans',(req,res)=>{
    var rd=req.body;
    if(!rd || !rd.other || !rd.usertoken)
	error('reqdata can not be null',res);
    var token=rd.usertoken;
    token_tools.verify(token,token_tools.secret).then(decode=>{
	if(decode.uid==rd.other)
	    error('uid can not be other',res);
	else loop1(decode.uid,rd,res);
    }).catch(e=>{
	error(e,res);
    })
})

function loop1(uid,rd,res,){
    var action=rd.action;
    if(action==1){//关注某用户
	console.log("fans.js:action1")
	follow_user(uid,rd.other,res);
    }else if(action==2){//取消关注某用户
	unfollow_user(uid,rd.other,res);
    }else if(action==3){//查询某用户的所有粉丝
	
    }else if(action==4){//查询某用户的所有关注
	
    }else if(action==5){//查询某用户的粉丝数量
	
    }else if(action==6){//查询某用户的关注数量
	
    }else if(action==7){//查询两个用户之间的关系,是否单项关注
	isfans(uid,rd.other,res);
    }
}


// 查询两人的关系,其中返回relation:1表示
function isfans(uid,other,res){
    var key1='user:'+uid+':follows';
    var key2='user:'+uid+':fans';
    var isFollowHe=dbtools.zscore(key1,'user:'+other);
    var isMyFan=dbtools.zscore(key2,'user:'+other);
    Promise.all([isFollowHe,isMyFan]).then(rs=>{
	var t1=rs[0];
	var t2=rs[1];
	if(t1&&t2){//互粉
	    res.json({state:'1',relation:3});
	}else if(!t1&&t2){//他单项关注我
	    res.json({state:'1',relation:2});
	}else if(t1&&!t2){//我单项关注他
	    res.json({state:'1',relation:1});
	}else if(!t1&&!t2){//无关系
	    res.json({state:'1',relation:0});
	}
    }).catch(es=>{
	error(es,res);
    })
}

//取消关注一个用户:
// 1.将该用户从uid follow列表中移除
// 2.将uid从other fans 中移除
function unfollow_user(uid,other,res){
    var key1='user:'+uid+':follows';
    var key2='user:'+other+':fans';
    var remHeFan=dbtools.zrem(key2,'user:'+uid);
    var remMyFollower=dbtools.zrem(key1,'user:'+other);
    Promise.all([remHeFan,remMyFollower]).then(rs=>{
	success('unfollow success',res);
    }).catch(es=>{
	error(es,res);
    })
}

// 关注一个用户,自己的关注列表添加他的id,他的粉丝列表添加自己的id
function follow_user(uid,other,res){
    var time=new Date().getTime();
    var key1='user:'+uid+':follows';
    var key2='user:'+other+':fans';
    var add2MyFollows= dbtools.zadd(key1,time,'user:'+other);
    var add2HeFans= dbtools.zadd(key2,time,'user:'+uid);

    Promise.all([add2MyFollows,add2HeFans]).then(rs=>{
	success('follow successfully',res);
    }).catch(es=>{
	error(es,res);
    })
}

function success(m,res,){
    res.json({state:'1',e:null,m:m});
}
function error(e,res){
    console.log('fans.js:');
    console.dir(e);
    res.json({state:'-1',e:e});
}
module.exports = router
