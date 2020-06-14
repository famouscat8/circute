// 帖子主控件头部作者信息显示

const _mainheader=document.createElement('template')

_mainheader.innerHTML=`<div class="main-header-container">
  <div class="main-header-avatar-container">
    <img class="main-header-avatar"/>
  </div>
  <div class="main-header-message">
    <p class="main-header-username">FAMOUSCAT</p>
    <p class="main-header-upto">签名</p>
  </div>
   </div>`;

var mmainHeader=null;
class MainHeader extends HTMLElement{
    constructor(){
	super();
	this.appendChild(_mainheader.content.cloneNode(true));
	mmainHeader=this;
    }
    
    init(user){
	var username=document
	    .getElementsByClassName('main-header-username')[0]
	    .innerText=user.nickname;
	var avatar=document
	    .getElementsByClassName('main-header-avatar')[0]
	    .src=user.avatarurl;
	
    }
}

window.customElements.define('main-header',MainHeader);
