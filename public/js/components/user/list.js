// 显示帖子列表的组件

const list = document.createElement("template");

list.innerHTML=`	
	<div class="list-container ">
	  <p class="hr-3"/>
	  <div class="item">
	    <div class="title-container">
	      <p class="title">为什么我说补码不存在?</p>
	    </div>
	    <div class="sort-container">
	      <p class="sort">TEST SORT SORT</p>
	    </div>
	    <div class="item-footer">
	      <div class="time-container">
		<p class="time">TIME TEST</p>
	      </div>
	      <div class="star-container">
		<p class="star">STAR TEST</p>
	      </div>
	      <div class="collect-container">
		<p class="collect">COLLECT TEST</p>
	      </div>
	    </div>
	  </div>`;

var mlist;
class MyList extends HTMLElement{
    constructor(){
	super();
	this.appendChild(list.content.cloneNode(true));
	//this.test();
	mlist=this;
    }
    test(){
	$('.time-container').text("diajsdsiaj哈哈");
    }
}


window.customElements.define('my-list',MyList);










