const axios = require("axios")
const express = require("express")
const router  = express.Router()
const Qs    = require("qs")
const Fs    = require("fs")


// action:
// 1: get check code
// 2: login, get login token
// 3: get power message using login token

router.post("/szupowermanager",(req,res)=>{
    var dat = req.body;
    var action= dat && dat.action;
    var login = dat && dat.login;
    var search = dat && dat.search;
    console.dir(action);
    if(action){
	if(action === "1"){ // get check code
	    loop1(res);
	}else if(action === "2"){ // get login token
	    loop2(login,res);
	}else if(action === "3"){ // get power manager
	    loop3(search, res);
	}
    }else{
	res.json({
	    state: "-1",
	    e: "action can not be null",
	});
    }
    
})


function loop3(search,res){
    getPowerMessage(search).then(r=>{
	res.json({
	    state:"1",
	    data: r.data,
	})
    }).catch(e=>{
	res.json({
	    state:"-1",
	    e:e,
	})
    })
}

// action==2
// handle for geting login token...
function loop2(login,res){
    // {username:,password:,checkcode:,signtype:,cookies:,};
    getLoginToken(login).then(r=>{
	var cookies = r.headers["set-cookie"][0];
	console.dir(cookies);
	res.json({
	    state:"1",
	    logintoken:cookies.split(";")[0],
	});
    }).catch(e=>{
	res.json({
	    state:"-1",
	    e:e,
	    m:"get login token error",
	});
    });
}

// action==1
// handle for geting check code...
function loop1(res){
    getCheckCode().then(rep=>{
	console.dir("success");
	var checkCodeBuffer = rep.data._readableState.buffer.tail.data;
	var cookies = rep.headers['set-cookie'];
	res.json({
	    state: "1",
	    data: checkCodeBuffer,
	    cookie: cookies,
	})
    }).catch(e=>{
	res.json({
	    state:"-1",
	    e:e,
	    m: "can not get check code...",
	})
    })
}

async function getPowerMessage(search){
    var url = "https://card.szu.edu.cn/AutoPay/YktPowerFee/Get_Account_Info";
    let rep = await axios({
	url,
	method: "POST",
	headers: {
	    "Referer": "https://card.szu.edu.cn",
	    "Cookie" : search.cookies,
	},data:{
	    app_id: "0030000000002501",
	    area: "4",
	    area_name: '深圳大学新斋区',
	    building_num: "18120",
	    building_name: "红豆斋",
	    floor_name: "",
	    room_num: "218",
	    room_name: "",
	},
    });
    console.dir(rep);
    return rep;
}

async function getLoginToken(login){
    var url = "https://card.szu.edu.cn/Account/MiniCheckIn";
    let rep = await axios({
	url,
	method: "POST",
	headers: {
	    "Referer": "https://card.szu.edu.cn",
	    "Cookie" : login.cookies,
	},data:{
	    signtype: login.signtype,
	    username: login.username,
	    password: login.password,
	    checkcode: login.checkcode,
	    isUsedKeyPad: false,
	}
    })
    console.dir(rep);
    return rep;
}

async function getCheckCode(){
    var url = "https://card.szu.edu.cn/Account/GetCheckCodeImg/Flag="+
	(new Date().getTime());
    let response = await axios({
	url,
	method:"GET",
	headers: {
	    "Referer": "https://card.szu.edu.cn",
	    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36",
	},responseType:"stream",
    });
    console.dir(response);
    return response;
}

module.exports = router;
