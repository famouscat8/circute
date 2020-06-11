const express = require('express')
const router  = express.Router();
const dbtools = require('../tools/db-redis')
const token_tools= require('../tools/token_tools')

// api 返回文集articals
// req.data:{usertoken:token,bid:bid}
router.post('/getarticals',(req,res)=>{
    var rd    = req.body;
    var token = rd.usertoken;
    var bid   = rd.bid;
    token_tools.verify(token,token_tools.secret).then(decode=>{
	loop1(bid,decode.uid,res);
    }).catch(e=>{
	res.json({state:"-1",e:e,m:"verify token error"});
    })
    
})

function loop1(bid,uid,res){
    var key='books:'+bid;
    dbtools.zrange(key,0,-1).then(aids=>{
	loop2(aids,res);
    }).catch(e=>{
	res.json({state:"-1",e:e,m:'get aids error'});
    })
}

function loop2(aids,res){
    getarticals(aids).then(articals=>{
	res.json({state:'1',e:null,articals:articals});
    }).catch(e=>{
	res.json({state:"-1",e:e,m:'get articals error'});
    })
}
async function getarticals(aids){
    var articals=[];
    for(var i=0;i<aids.length;i++){
	var artical=await dbtools.hgetall(aids[i])
	    .catch(e=>{return e});
	articals.unshift(artical);
    }
    return articals;
}





module.exports=router
