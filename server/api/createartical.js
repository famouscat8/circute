const express= require('express')
const dbtools= require('../tools/db-redis')
const router = express.Router()
const User   = require('../tools/dbaction/user')
const Artical= require("../tools/dbaction/artical")


// 新建artical api
router.post('/createartical',(req,res)=>{
    var rd=req.body;
    var token = rd.usertoken;
    var title=rd.title;
    var bid = rd.bid;
    
    saveArtical(token,title,bid).then(r=>{
	console.dir(r);
	res.json({state:'1',m:'create artical success'});
    }).catch(e=>{
	error(e,res);
    })
})


async function saveArtical(token,title,bid,){
    if(!Boolean(title)||!Boolean(bid))
	return 'title or bid can not be null';
    var time   = new Date().getTime();
    var decode = await User.verifyToken(token)
	.catch(e=>{return e;});
    var artical={
	ownbooks : bid,
	owner    : decode.uid,
	title    : title,
	time     : time,
    }
    var save = await Artical.save(artical);
    return [decode,save];
}


function error(e,res){
    console.dir(['createartical.js:',e]);
    res.json({state:"-1",e:e})
}

module.exports=router
