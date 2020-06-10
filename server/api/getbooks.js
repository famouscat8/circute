const express = require("express")
const router  = express.Router()

// api 返回用户文集
// req: {usertoken,action: action}
router.post("/getbooks",(req,res)=>{
    var rd = req.body;
    console.dir(rd);
    res.json({state:"1",books:
	      ['最好的我们','忽而今夏',
	       '四月是你的谎言','English Book',
	       '高等数学','Book 6',
	       'Book 6','Book 7']});
    
})

module.exports = router
