//  主页列表控件
// 负责将后端帖子数据渲染到主页 帖子列表
const main_list = document.createElement("template");

main_list.innerHTML=`<div class="card-main"></div>`;


class MainList extends HTMLElement{
    constructor(){
	super();
	this.appendChild(main_list.content.cloneNode(true));
	
    }
    
}
window.customElements.define('main-list',MainList);
