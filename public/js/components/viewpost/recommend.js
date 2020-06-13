const _recommend = document.createElement('template')

_recommend.innerHTML=`	
         <div class="recommendread-main">
	  <div class="recommendread-title-container">
	    <p class="recommendread-title">相关阅读:</p>
	  </div>
	</div>`;


class RecommendRead extends HTMLElement{
    constructor(){
	super();
	this.appendChild(_recommend.content.cloneNode(true));
    }
    
    // 推荐阅读
    init(){}
}


window.customElements.define('recommend-read',RecommendRead);
