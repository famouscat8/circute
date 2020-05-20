const express = require("express")
const router  = express.Router()
const token_tools = require("../tools/token_tools")


router.post("/verifytoken", (req, res)=>{
    var tokenobject = req.body;
    token_tools.verify(tokenobject.token, token_tools.secret)
	.then(decode=>{
	    console.log("verifytoken success:"+decode)
	    res.json({state: "1",decode:decode})
	}).catch(e=>{
	    console.log("verifytoken error:"+e);
	    res.json({state: "-1",e:e});
	})
})

module.exports = {
    router
}
