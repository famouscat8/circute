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
            <p class="usermessage-vital-username">username</p>
	</div>`;


var mUserMessage;
class UserMessage extends HTMLElement{
    constructor(){
	super();
	this.appendChild(usermessage.content.cloneNode(true));
	mUserMessage = this;
    }
    // 初始化显示用户基本信息
    initUserMessage(user_object){
	var user = user_object;
	$(".avatar").attr("src",user.avatarurl);
	$(".usermessage-vital-username").text(user.nickname);
	$(".usermessage-vital-userinfo-username-input")
	    .val(user.username);
	$(".usermessage-vital-userinfo-nickname-input")
	    .val(user.nickname);
	var clickNum = 0;
	var btnText  = ["修改","保存"];
	$(".usermessage-vital-change").click(()=>{
	    
	    if(clickNum == 0){clickNum =1;
		$(".usermessage-vital-change")
		    .text(btnText[clickNum]);
		
		
	    }else{clickNum =0;
		$(".usermessage-vital-change")
		    .text(btnText[clickNum]);
		 }
	    $(".usermessage-vital-table").slideToggle();
	    $(".usermessage-vital-username").fadeToggle();
	});
    }
}
window.customElements.define('user-message',UserMessage);
