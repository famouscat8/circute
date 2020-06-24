// api根据postid articalid token实现帖子文章点赞功能
const express=require('express')
const router=express.Router()
const dbtools=require('../tools/db-redis')
const token_tools=require('../tools/token_tools')

// rd:{type:int,usertoken:token,id:int,action:int}
router.post('/setpost',(req,res)=>{
    var rd=req.body;
    var token=rd.usertoken;
    var id=rd.id;
    var action=rd.action;
    token_tools.verify(token,token_tools.secret).then(decode=>{
	loop1(decode.uid,rd,res);
    }).catch(e=>{
	error(e,res);
    });
})

function loop1(uid,rd,res){
    var action = rd.action;
    if(action == 1)//点赞帖子
	loop2(uid,rd,res);
    if(action == 2)//收藏帖子
	loop3(uid,rd,res);
    if(action == 3)//评论帖子
	loop4(uid,rd,res);
    if(action == 4)//查看帖子
	loop5();
    if(action == 5)//取消点赞帖子
	loop6(uid,rd,res);
    if(action == 6)//取消收藏帖子
	loop7();
    if(action == 7)//返回帖子的社交信息
	loop8(uid,rd,res);
    if(action == 8)//设置帖子tags
	loop9(uid,rd,res);
    if(action == 9)//返回帖子tags
	loop10(uid,rd,res);
    
}


// 点赞帖子： 在帖子的点赞记录表中添加自己的uid
// 在自己的点赞记录表中添加帖子id
// artical:star:id
// user:id:star
function loop2(uid,rd,res){
    var sub = rd.type==4?'artical':'post';
    var time= new Date().getTime();
    var key1= sub+':star:'+rd.id;
    var key2= 'user:'+uid;
    var addUid2Post=dbtools.zadd(key1,time,key2);
    var addPost2Uid=dbtools.zadd(key2+':star',time,sub+':'+rd.id);
    Promise.all([addUid2Post,addPost2Uid]).then(rs=>{
	success(res);
    }).catch(es=>{
	error(es,res);
    })
}

function loop3(){}
function loop4(){}
function loop5(){
    console.dir(['jajaj']);
}

// 取消点赞
function loop6(uid,rd,res){
    var sub = rd.type==4?'artical':'post';
    var key1= sub+':star:'+rd.id;
    var key2= 'user:'+uid;
    var delUidFPost=dbtools.zrem(key1,key2);
    var delPostFUid=dbtools.zrem(key2+':star',sub+':'+rd.id);
    Promise.all([delUidFPost,delPostFUid]).then(rs=>{
	res.json({state:'1',m:'action,success'});
    }).catch(es=>{
	error(e,res);
    })
    
}
function loop7(){}

// 查询帖子社交信息
function loop8(uid,rd,res){
    if(rd.type==4){
	var key1='artical:collect:'+rd.id;
	var key2='artical:star:'+rd.id;
	var getStarNum=dbtools.zcard(key2);
	var getCollectNum=dbtools.zcard(key1);
	var isStar=dbtools.zscore(key2,'user:'+uid);
	var isCollect=dbtools.zscore(key1,'user:'+uid);
	Promise.all([getStarNum,
		     getCollectNum,isStar,isCollect])
	    .then(rs=>{
		res.json({
		    state:'1',
		    isstar:Boolean(rs[2]),
		    iscollect:Boolean(rs[3]),
		    starnum: rs[0],
		    collectnum: rs[1],
		});
	    }).catch(es=>{
		error(es,res);
	    })
    }
}


function loop9(uid,rd,res){
    //rd:{tags:[tag1,tag2,tag3,tag4...]
    
    async function test(){
	var tags = rd.tags;
	var time = new Date().getTime();
	var key1 = rd.type ==
	    4?'artical:'+rd.id:'post:'+rd.id;
	var keys = [key1+":tags",];
	
	if(!Boolean(tags))
	    error('tags can not be null',res);
	else{
	    var tagid = await dbtools.get("tagsnum")
		.catch(e=>{error(e,res)});
	    
	    // increase tagsnum
	    var step1 = await dbtools
		.incrby("tagsnum",rd.tags.length)
		.catch(e=>{error(e,res)});

	    for(var i=0;i<rd.tags.length;i++){
		var id = tagid + i;
		keys.push(time);
		keys.push(rd.tags[i]);
		var tag_o = {
		    time: time,
		    name: rd.tags[i],
		}
		var step3 = await dbtools
		    .hmset("tag:"+id,tag_o)
		    .catch(e=>{error(e,res)});
		var step4 = await dbtools
		    .zadd("tag:"+id+":object",time,key1)
		    .catch(e=>{error(e,res)});
	    }

	    // add tags to artical
	    var step2 = await dbtools.zadds(keys)
		.catch(e=>{error(e,res)});
	    
	}// else end
    }
    
    test().then(r=>{
	console.dir(r);
	success(res);
    }).catch(e=>{error(e,res)});
}

function loop10(uid,rd,res){}


function success(res){
    res.json({state:'1',m:'action success'});
}

function error(e,res){
    console.dir(['setpost.js:',e]);
    res.json({state:'-1',e:e});
}



module.exports=router
