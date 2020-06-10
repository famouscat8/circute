const express = require("express")
const router  = express.Router()
const dbtools = require("../tools/db-redis")
const token_tools = require("../tools/token_tools")

// api 返回用户文集
// req: {usertoken,action: action}
router.post("/getbooks",(req,res)=>{
    var rd = req.body;
    var token = rd.usertoken;
    // res.json({state:"1",books:
    // 	      ['最好的我们','忽而今夏',
    // 	       '四月是你的谎言','English Book',
    // 	       '高等数学','Book 6',
    // 	       'Book 6','Book 7']});
    token_tools.verify(token,token_tools.secret).then(decode=>{
    	loop1(decode.uid,res);
    }).catch(e=>{
    	res.json({state:'-1',e:e,m:'verify token error'});
    })
})

function loop1(uid,res){
    var key = 'books:user:'+uid;
    dbtools.zrange(key,0,-1).then(bids=>{
	loop2(uid,bids,res);
    }).catch(e=>{
	res.json({state:'-1',e:e,m:"can not get your books"});
    })
}

function loop2(uid, bids,res){
    getbooks(bids).then(bookss=>{
	res.json({state:"1",bookss:bookss,e:null,});
    }).catch(e=>{
	res.json({state:"-1",e:e,m:"get books error"});
	console.dir(e);
    })
}


async function getbooks(bids){
    var bookss=[]
    for(var i=0;i<bids.length;i++){
	var key = 'books:'+bids[i]+':info';
	var books = await dbtools.hgetall(key).catch(e=>{return e;});
	bookss.unshift(books);
    }
    return bookss;
}

module.exports = router
