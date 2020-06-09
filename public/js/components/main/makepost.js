//发布帖子组件
const makepost = document.createElement('template');

makepost.innerHTML=`<div class="makepost-container b-p-07rem">
  <div class="makepost-title-container">
    <p class="makepost-title">社区小贴</p>
  </div>
  <p class="hr-2"/>
  <div class="makepost-main-container">
    <p class="makepost-main">
      CIRCUTE 是一个主张友好,文明的技术交流社区
CIRCUTE 是一个主张友好,文明的技术交流社区
CIRCUTE 是一个主张友好,文明的技术交流社区</p>
    
  </div>
  <p class="hr-2"/>

  <div class="makepost-footer-container">
    <button class="makepost-sendpost">
<i class="fa fa-commenting-o" aria-hidden="true"></i>
发帖交流</button>
    <button class="makepost-sign">
<i class="fa fa-flag-o" aria-hidden="true"></i>
签到打卡</button>
  </div>
</div>`;


var mMakePost=null;
class MakePost extends HTMLElement{
    constructor(){
	super();
	this.appendChild(makepost.content.cloneNode(true));
	mMakePost=this;
	
	var send_btn = document
	    .getElementsByClassName("makepost-sendpost")[0];
	send_btn.onclick=()=>{
	    location.href+="post.html";
	};
    }
    
}

window.customElements.define('make-post',MakePost);
