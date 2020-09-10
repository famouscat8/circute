const im = require("imagemagick")
const fs = require("fs")





async function imagemagick(inputurl,outputurl){
    return new Promise((await function(resolve,reject){
	im.convert([inputurl,"-colorspace","gray","-normalize",
		    "-threshold","50%","-negate","-resize","200", outputurl],
		   (e,std)=>{
		       if(e) reject(e);
		       resolve(std);
		   })
    }))
}



function test(){
    for(let i = 0;i<100;i++){
	var url = "/root/test/web/server/api/szupowermanager/source/"+i+".gif";
	var ourl="/root/test/web/server/api/szupowermanager/test/"+i+".gif";
	imagemagick(url,ourl).then(r=>{
	    console.dir(r);
	}).catch(e=>{
	    fs.unlink(ourl,(e)=>{
		if(e)console.dir(e)
		
		else console.dir("delete success");
	    })
	    console.dir(e);
	})

    }
}



test();
