// 从网站获取验证码，保存到../source 中

const axios = require("axios")
const Fs    = require("fs")
const Qs    = require("qs")

async function downloadCheckCodeImg(filename){
    var path = "/root/test/web/server/api/szupowermanager/source/" + filename;
    let writer = Fs.createWriteStream(path);
    
    var url = "https://card.szu.edu.cn/Account/GetCheckCodeImg/Flag="+
	(new Date().getTime());
    let rep = await axios({
	url,
	method:"GET",
	headers: {
	    "Referer": "https://card.szu.edu.cn",
	},responseType: "stream",
    });
    rep.data.pipe(writer);

    return new Promise((resolve,reject)=>{
	writer.on("finish",resolve);
	writer.on("error",reject);
    })
}


for(let i=1000;i<2000;i++){
    downloadCheckCodeImg(i+".gif").then(r=>{
	console.dir(["success",i]);
    }).catch(e=>{
	console.dir(["error",i]);
    })
}
