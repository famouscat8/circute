const express = require("express");
const router  = express.Router();
const User    = require('../tools/dbaction/user');
const Artical = require('../tools/dbaction/artical');


// 文章api,实现对文章操作接口
router.post('/artical',(req,res)=>{
    var rd     = req.body;
    var action = rd.action;
    var token  = rd.token;
    
    
})



module.exports = router;
