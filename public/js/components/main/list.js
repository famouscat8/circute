//  主页列表控件
// 负责将后端帖子数据渲染到主页 帖子列表
const main_list = document.createElement("template");
main_list.innerHTML=`<div class="card-main"></div>`;

var mMainList=null;
class MainList extends HTMLElement{
    constructor(){
	super();
	this.appendChild(main_list.content.cloneNode(true));
	mMainList = this;
    }
    
    init(posts,tools,$){
	var list=document.getElementsByClassName("card-main")[0];
	function type3(post,i){
	    console.log("type3");
	    var item = document.createElement("div");
	    item.className="list-items-3";
	    item.innerHTML=`<div class="list-item-3-img-container"
     id="list-item-3-img-container-id-">
  <img class="list-item-3-img" id="list-item-3-img-id-`+i+`"/>
</div>
<div class="list-item-3-main">
  <div class="list-item-3-title-container">
    <p class="list-item-3-title"
       id="list-item-3-title-id-`+i+`">
  </div>
  <div class="list-item-3-postmessage-container">
    <small class="list-item-3-tag">签到</small>
    <small class="list-item-3-username"
       id="list-item-3-username-id-`+i+`"></small>
    <small class="list-item-3-time"
       id="list-item-3-time-id-`+i+`"></small>
  </div>
</div>`;
	    list.appendChild(item);
	    var title = document
		.getElementById("list-item-3-title-id-"+i);
	    title.innerText=post.content.title;
	    var username = document
		.getElementById("list-item-3-username-id-"+i);
	    username.innerText=post.owner.nickname;
	    var time = document
		.getElementById("list-item-3-time-id-"+i);
	    time.innerText=tools.getDateDiff(post.time);
	    var user_avatar=document
		.getElementById("list-item-3-img-id-"+i);
	    user_avatar.src=post.owner.avatarurl;
	    user_avatar.onerror=()=>{
		var img=event.srcElement;
		img.src="https://s1.ax1x.com/2020/06/02/tN6ZJx.jpg";
		
		img.onerror=null;
	    }

	    var hr=document.createElement('p');
	    hr.className=
		"hr-list-items b-m-top-05rem b-m-bottom-1rem";
	    list.appendChild(hr);

	}
	
	function type1(post,i){
	    var item = document.createElement("div");
	    item.className='list-items';
	    item.innerHTML=
		`<div class="list-items-conner">`+
		`<img class="list-items-img"
           id="list-items-img-id-`+i+`"/></div>
             <div class="list-items-content">`+
		`<a class="list-items-title" 
             id="list-items-title-id-`+i+`"></a>
            <a class="list-items-post"`+
		` id="list-items-post-id-`+i+`"></a>
          <div class="list-items-user">
          <p class="list-items-username"
          id="list-items-username-id-`+i+`"></p>
          <p class="list-items-postime"
          id="list-items-postime-id-`+i+`"></p>
          </div>
         </div>`;
	    
	    list.appendChild(item);
	    var title= post.content.title;
	    var sort = post.content.content;
	    var uname= post.owner.nickname;
	    var time = tools.getDateDiff(post.time);
	    var star = post.start;
	    var colle= post.collect;
	    var pid  = post.pid;
	    var imgsArray=JSON.parse(post.imgs);

	    // 设置帖子图片
	    var img = document
		.getElementById("list-items-img-id-"+i);
	    img.src=imgsArray[0];
	    img.onerror=()=>{
		var img=event.srcElement;
		img.src=
		    "https://s1.ax1x.com/2020/06/02/tN6ZJx.jpg";
		img.onerror=null;
	    }
	    
	    var t = document
		.getElementById("list-items-title-id-"+i);
	    t.innerText=title;
	    t.href=location.href+"viewpost.html?pid="+pid;
	    document
		.getElementById("list-items-post-id-"+i)
		.innerText=sort;
	    document
		.getElementById("list-items-username-id-"+i)
		.innerText=uname;
	    document
		.getElementById("list-items-postime-id-"+i)
		.innerHTML="&nbsp;&bull;&nbsp;"+time;
	    
	    var hr=document.createElement('p');
	    hr.className=
		"hr-list-items b-m-top-05rem b-m-bottom-1rem";
	    list.appendChild(hr);

	}
	
	for(var i=0;i<posts.length;i++){
	    var post = posts[i];
	    // type == 1 普通帖子
	    // type == 2 教程
	    // type == 3 签到
	    var type = post.type;
	    if(type==3){
		type3(post,i);
	    }else if(!Boolean(type)){
		type1(post,i);
	    }
	}
    }
    
}

window.customElements.define('main-list',MainList);
