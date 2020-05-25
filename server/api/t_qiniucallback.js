const express=require("express")
const router=express.Router();
var app = express();

router.post("/t_qiniucallback",(req,res)=>{
    var data=req.body;
    console.log("test");
    console.dir(data);
    res.json({state:"1",e:null});
})

module.exports = router
