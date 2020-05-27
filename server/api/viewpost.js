// 返回浏览帖子界面
const express=require("express")
const router=express.Router()

router.get("/viewpost.html",(req,res,next)=>{
    // 请求参数
    var data=req.query;
    res.sendFile("/root/test/web/html/viewpost.html");
    console.dir(data);
})

module.exports=router
