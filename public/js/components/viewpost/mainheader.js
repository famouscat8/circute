// 帖子主控件头部作者信息显示

const _mainheader=document.createElement('template')

_mainheader.innerHTML=`<div class="main-header-container">
  <div class="main-header-avatar-container">
    <img src="https://circute2-1259491699.cos.ap-beijing.myqcloud.com/1n2HbD.jpg"
     class="main-header-avatar"/>
  </div>
  <div class="main-header-message">
    <p class="main-header-username">FAMOUSCAT</p>
    <p class="main-header-upto">签名</p>
  </div>
   </div>`;


class MainHeader extends HTMLElement{
    constructor(){
	super();
	this.appendChild(_mainheader.content.cloneNode(true));
    }
    
}

window.customElements.define('main-header',MainHeader);
