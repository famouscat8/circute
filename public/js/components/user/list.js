// 显示帖子列表的组件

const list = document.createElement("template");
list.innerHTML=`<div class="list-container"></div>`;

var mlist;
class MyList extends HTMLElement{
    constructor(){
	super();
	this.appendChild(list.content.cloneNode(true));
	mlist=this;
    }
    initList(post_data){
	// post_data = [{post},{post}];
	var posts = post_data;
	var list_container = document
	    .getElementsByClassName("list-container")[0];

	for(var i=0;i<post_data.length;i++){
	    var post = posts[i];
	    var list_item = document.createElement("div");
	    list_item.className="item";
	    list_item.innerHTML=`<p class="hr-3"/>
               <div class="title-container">
                  <p class="item-title">TITLE </p>
	       </div>
	       <div class="sort-container">
	          <p class="item-sort">TEST SORT SORT</p>
	       </div>
	    <div class="item-footer">
	      <div class="time-container">
		<p class="item-time">TIME TEST</p>
	      </div>
	      <div class="star-container">
		<p class="item-star">STAR TEST</p>
	      </div>
	      <div class="collect-container">
		<p class="item-collect">COLLECT TEST</p>
	      </div>`;
	    list_container.appendChild(list_item);
	    var title = document
		.getElementsByClassName("item-title")[i];
	    var sort  = document
		.getElementsByClassName("item-sort")[i];
	    var time  = document
		.getElementsByClassName("item-time")[i];
	    var star = document
		.getElementsByClassName("item-star")[i];
	    var collect=document
		.getElementsByClassName("item-collect")[i];
	    
	    title.innerText= post.content.title;
	    sort.innerText = post.content.content;
	    time.innerText = "time:"+post.time;
	    star.innerText = " star:"+post.start;
	    
	    
	}
	
    }
}


window.customElements.define('my-list',MyList);










