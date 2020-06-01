const usermessage = document.createElement("template");

usermessage.innerHTML = `<div class="usermessage-vital">
          <button href="javascript:;"
             class="usermessage-vital-change">修改</button>
	  <img class="avatar"></img>
          <div class="usermessage-vital-table">
             <div class="file-container">
	     <a href="javascript:;"
	           class="file">更换头像
	     <input type="file"
		   name="pcavatar"
		   id="avatarfile"
		   onchange="reChangeUserAvatar(this)"
		   accept="image/*"></a></div>
             <div class="usermessage-vital-setting">
                <div class="usermessage-vital-userinfo">
                  <p class="usermessage-vital-userinfo-title">
                  个人信息:</p>
                  <p class="usermessage-vital-userinfo-username">
                  用户名:</p>
                  <input type="text" 
                  class="usermessage-vital-userinfo-username-input">
                  
                  <p class="usermessage-vital-userinfo-nickname">
                  昵称:</p>
                  <input type="text" 
                  class="usermessage-vital-userinfo-nickname-input">
                </div>
             </div>
          </div>
      <p class="usermessage-vital-username">username</p></div>`;

function reChangeUserAvatar(obj){
    var files = obj.files;
    console.dir(files);
    mUserMessage.getAvatar(files[0]);
    var reader = new FileReader();
    reader.onloadstart = e=>{
	console.log("load start");
    }
    reader.onprogress  = e=>{
	console.log("progress:" + e);
    }
    reader.onabort     = e=>{
	console.log("abort:"+e);
    }
    reader.onerror     = e=>{
	console.log("error:"+e);
    }
    reader.onload      = e=>{
	var img = document.getElementsByClassName("avatar")[0];
	img.src = e.target.result;
    }
    reader.readAsDataURL(files[0]);
    
}

var mUserMessage;
class UserMessage extends HTMLElement{
    constructor(){
	super();
	this.appendChild(usermessage.content.cloneNode(true));
	mUserMessage = this;
    }
    
    // 接收用户选择的头像文件
    getAvatar(avatarobject){
	this.avatar = avatarobject;
    }
    
    // 初始化显示用户基本信息
    initUserMessage(user_object,ajax,mycos,usermanager){

	var user = user_object;
	this.avatarurl = user.avatarurl;
	$(".avatar").attr("src",user.avatarurl);
	$(".usermessage-vital-username").text(user.nickname);
	$(".usermessage-vital-userinfo-username-input")
	    .val(user.username);
	$(".usermessage-vital-userinfo-nickname-input")
	    .val(user.nickname);
	var clickNum = 1;
	var btnText  = ["修改","保存 "];
	$(".usermessage-vital-change").click(()=>{
	    if(clickNum == 0){
		clickNum =1;
		$(".usermessage-vital-change").text("修改");
		var index_layer = layer.load(1,{shade:[0.5,"#000"]});
		saveAvatar(this.avatar,mycos,proData=>{
		    console.dir(proData);
		}).then(data=>{
		    console.dir(data);
		    layer.msg("success");
		    saveUser(index_layer,data.Location);
		}).catch(e=>{
		    layer.msg("error:");
		    console.log("error:"+e);
		    console.dir(e);
		});
	    }else{
		$(".usermessage-vital-table").slideToggle();
		$(".usermessage-vital-username").fadeToggle();
		clickNum =0;
		$(".usermessage-vital-change").text("保存");
	    }
	});

	function saveAvatar(avatarobject,mycos,progress){
	    if(avatarobject==null) return Promise.resolve("1");
	    return new Promise((resolve,reject)=>{
		if(mycos == null) reject("error"); 
		mycos.putObject(avatarobject,(err,data)=>{
		    if(err)reject(err);
		    resolve(data);
		},proData=>{
		    progress(proData);
		});

	    });
	}

	// 保存用户信息
	function saveUser(index_layer,avatarurl){
	    var token    = usermanager.getToken();
	    var username =
		$(".usermessage-vital-userinfo-username-input")
		.val();
	    var nickname =
		$(".usermessage-vital-userinfo-nickname-input")
		.val();
	    var co = null;
	    if(Boolean(avatarurl)==false){
		co = {
		    usertoken: token,
		    changeto:{
			username: username,
			nickname: nickname,
		    }};
	    }else{
		co = {
		    usertoken: token,
		    changeto:{
			username: username,
			nickname: nickname,
			avatarurl:"https://"+avatarurl,
		    }};
	    }
	    
	    var success  = data=>{
		console.dir(data);
		$(".usermessage-vital-table").slideToggle();
		$(".usermessage-vital-username").fadeToggle();

		layer.close(index_layer);
		if(data.state=="-1")
		    layer.msg("保存失败:"+e);
		layer.msg("保存成功");
	    };
	    
	    var error= e=>{
		console.dir(e);
		$(".usermessage-vital-table").toggle();
		$(".usermessage-vital-username").toggle();
		layer.close(index_layer);
		layer.msg("保存失败:"+e);
	    };
	    ajax.post("/changeuser",
		      JSON.stringify(co),success,error);
	}

    }
}
window.customElements.define('user-message',UserMessage);
