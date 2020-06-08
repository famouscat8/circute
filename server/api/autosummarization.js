const autoSummar = require("../tools/autosummarization")
const dbtools    = require("../tools/db-redis")

dbtools.zrange("postids",0,-1).then(postids=>{
    loop1(postids).then(posts=>{
	for(let i=0;i<posts.length;i++){
	    console.dir(posts[i].content.content);
	    if(posts[i].content)
		autoSummar
		.getSummar(50, posts[i].content.content).then(r=>{
		    console.dir(postids[i]);
		    loop2(postids[i],r.Summary);
		}).catch(e=>{
		    console.dir(e);
		})
	}
    }).catch(e=>{
	console.dir(e);
    });
}).catch(e=>{
    console.log("error: ");
    console.dir(e);
});

function loop2(postid,sort){
    dbtools.hset(postid,"sort",sort).then(r=>{
	console.dir(r);
    }).catch(e=>{
	console.dir(e);
    })
}

async function loop1(postids){
    var posts = [];
    for (var i=0;i<postids.length;i++){
	var post = await dbtools.hgetall(postids[i]).catch(e=>{
	    return e;
	});
	var content=await dbtools.hgetall(post.content).catch(e=>{
	    return e;
	});
	post.content = content;
	posts.unshift(post);
    }
    return posts;
}

var test = "test test dsadsadsdsax dsjiaohjdcsa https://baidu.com  指定摘要的长度上限（默认值为200） 注：为保证摘要的可读性，最终生成的摘要长度会低于指定的长度上限。";



