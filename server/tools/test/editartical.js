// 手动改变artical属性

const dbtools=require('../../tools/db-redis')


function test1(){
    dbtools.get('articalnum').then(articalnum=>{
	loop1(articalnum);
    }).catch(e=>{
	error(e);
    })
    
}

function loop1(num){
    for(var i=0;i<num;i++){
	var key="artical:"+i;
	console.dir([key]);
	var addcomment=dbtools
	    .hset(key,'comment','artical:comment:'+i);
	var addstar =dbtools
	    .hset(key,'star','artical:star:'+i);
	var addcollect = dbtools
	    .hset(key,'collect','artical:collect:'+i);
	Promise.all([addcollect,addcomment,addstar,])
	    .then(rs=>{
		console.dir(rs);
	    }).catch(es=>{
		console.dir(es);
	    })
    }
}

function error(e,res){
    console.log('editartical.js');
    console.dir(e);
}


function test2(){
    dbtools.get('postnum').then(num=>{
	loop4(num);
    }).catch(e=>{error(e);});
}

function loop4(num){
    for(let i=0;i<num;i++){
	dbtools.hget('post:'+i,'type').then(type=>{
	    console.dir([i,type]);
	    if(type==3){
		dbtools.hset('post:'+i,'type','0').then(r=>{
		    console.dir(r);
		}).catch(e=>{error(e);});
	    }
	})
    }
}


test1();
