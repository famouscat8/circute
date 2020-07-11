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

// 在指定文集下新增文章

// 删除指定文集下的文章
// 给指定文章点赞、取消点赞、收藏、取消收藏、
// 评论指定文章、删除指定文章的评论
// 返回指定文章的属性：点赞数、收藏数、评论数

module.exports = router;
