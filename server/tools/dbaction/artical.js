// 实现对redis中Artical 对象的操作
const dbtools = require('../db-redis');


// 帖子属性:
// 1. 所属用户
// 2. id, title, 点赞对象，评论对象，收藏对象，查看对象，tags
class Artical{
    
    
#a_key="artical:";
#b_key="books:";
#a_num="articalnum";
#artical;
    
    constructor(){
	this.#artical={
	    aid     : null,
	    ownbooks: null,
	    owner   : 'user:'+null,
	    title   : null,
	    time    : null,
	    type    : 4,
	    star    : 'artical:star:'+null,
	    collect : 'artical:collect:'+null,
	    comment : 'artical:comment:'+null,
	    
	}
    }

    // 将artical保存至redis
    static async save(artical){
	if(!Boolean(artical)){
	    return 'artical can not be null';
	}
	var bid = artical.ownbooks;
	var aid = await dbtools.get('articalnum')
	    .catch(e=>{return e;});
	var addAid = await dbtools.incrby('articalnum',1)
	    .catch(e=>{return e;});
	var _artical = {
	    ownbooks: 'books:'+artical.ownbooks,
	    owner   : 'user:'+artical.owner,
	    title   : artical.title,
	    type    : 4,
	    aid     : aid,
	    time    : artical.time,
	    star    : 'artical:star:'+aid,
	    collect : 'artical:collect:'+aid,
	    comment : 'artical:comment:'+aid,
	}

	var add2Books = dbtools
	    .zadd('books:'+bid,artical.time,'artical:'+aid);
	var cArtical  = dbtools
	    .hmset('artical:'+aid,_artical);

	var action = await Promise.all([add2Books,cArtical]);
	return [aid,addAid,action];
    }


    // 保存文章内容
    static async setContent(aid,content){
	var time = new Date().getTime();
	var artical = {
	    content: content,
	    updateTime: time,
	}
	return new Promise((resolve,reject)=>{
	    dbtools.hmset('artical:'+aid,artical).then(r=>{
		resolve(r);
	    }).catch(e=>{reject(e);});
	})
    }

    // 设置帖子其他参数
    static async setParam(options){
	
    }

    // 判断某用户是否对文章有权限
    static hasPermission(uid,aid){
	return new Promise((resolve,reject)=>{
	    dbtools.hget('artical:'+aid,'owner').then(owner=>{
		if(owner == 'user:'+uid) resolve(true);
		reject(false);
	    }).catch(e=>{reject(e);});
	})
    }
    
    getArticalBean(){
	return new articalBean();
    }

    // 返回当前artical num
    getAidNum(){
	return new Promise((resolve,reject)=>{
	    dbtools.get('articalnum').then(aid=>{
		resolve(aid);
	    }).catch(e=>{reject(e);})
	})
    }

    // 根据aid返回artical 对应的star
    getStar(aid){
	return new Promise((resolve,reject)=>{
	});
    }

    getCollect(aid){
	
    }

    getComment(aid){
	
    }
    
    addStar(aid){
	
    }

    // 某用户收藏此文章
    // 在本文章的收藏列表添加该用户
    // 在用户的收藏列表添加该文章
    async addCollect(aid,uid){
	var add2A = await dbtools.zadd('artical:star:'+aid)
	    .catch(e=>{return e;});
	var user = new User();
	user.addStar(aid,uid).then(r=>{
	    resolve([add2A,r]);
	}).catch(e=>{
	    reject(e);
	})
    }
}

class articalBean{
    constructor(){
	
    }
}


module.exports = Artical;
