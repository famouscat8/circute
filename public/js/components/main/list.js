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
	this._posts=[];
    }

    // 渲染签到类型的帖子
    display_sign(post,i,list,tools){
	var item = document.createElement("div");
	item.className="list-items-3";
	item.innerHTML=`
        <div class="list-item-3-img-container"
                id="list-item-3-img-container-id-">
         <img class="list-item-3-img" id="list-item-3-img-id-`+i+`"/>
        </div>
        <div class="list-item-3-main">
         <div class="list-item-3-title-container">
           <p class="list-item-3-title"
                 id="list-item-3-title-id-`+i+`"/>
         </div>
         <div class="list-item-3-postmessage-container">
          <small class="list-item-3-tag">签到</small>
             <div class="list-item-3-username-container">
               <small><i class="fa fa-user" aria-hidden="true">
               </i></small>
               <small class="list-item-3-username"
                       id="list-item-3-username-id-`+i+`"></small>
             </div>
             <div class="list-item-3-time-container">
                <small>
                  <i class="fa fa-clock-o" aria-hidden="true"></i>
                </small>
                <small class="list-item-3-time"
                          id="list-item-3-time-id-`+i+`"></small>
             </div>
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
    }

    // 渲染普通帖子
    display_post(post,i,list,tools){
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
	try{
	    var imgurl=JSON.parse(post.imgs);
	    var imgsArray=imgurl;
	}catch{
	    console.log("error");
	    var imgsArray=["dsadaso"];
	}
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
    }

    // 渲染文章类型的帖子
    display_artical(post,i,list,tools){
	var item=document.createElement('div');
	item.className='list-item-artical';
	item.innerHTML=`
        <div class="list-item-artical-title-container">
         <p class="list-item-artical-title"
              id="list-item-artical-title-id-`+i+`"></p>
      </div>
<div class="list-item-artical-main-container">
<div class="list-item-artical-main-content">
  <p class="list-item-artical-content"
      id="list-item-artical-content-id-`+i+`"></p>
<div class="list-item-artical-footer-container">
  <div class="list-item-artical-time-container">
   <i class="fa fa-clock-o" aria-hidden="true"></i>
   <p class="list-item-artical-time-p"
       id="list-item-artical-time-id-`+i+`">-----</p>
  </div>
  <div class="list-item-artical-thumbs-container">
   <i class="fa fa-thumbs-o-up" aria-hidden="true"></i>
   <p class="list-item-artical-thumbs-p"
       id="list-item-artical-thumbs-id-`+i+`">-----</p>
  </div>
  <div class="list-item-artical-comment-container">
   <i class="fa fa-commenting-o" aria-hidden="true"></i>
   <p class="list-item-artical-comment-p"
       id="list-item-artical-comment-id-`+i+`">-----</p>
  </div>
</div></div>
  <div class="list-item-artical-img-container">
    <img src="https://circute2-1259491699.cos.ap-beijing.myqcloud.com/1n2HbD.jpg"
class="list-item-artical-img"
  id="list-item-artical-img-id-`+i+`"/>
  </div>
</div>`;
	list.appendChild(item);
	var title=document
	    .getElementById('list-item-artical-title-id-'+i)
	    .innerText=post.title;
	var content=document
	    .getElementById('list-item-artical-content-id-'+i)
	    .innerText=post.content;
	var time=document
	    .getElementById('list-item-artical-time-id-'+i)
	    .innerText=tools.getDateDiff(post.time);
	var star=document
	    .getElementById('list-item-artical-thumbs-id-'+i)
	    .innerText=post.star;
	var comment=document
	    .getElementById('list-item-artical-comment-id-'+i)
	    .innerText=post.comment;
	
	var img=document
	    .getElementById('list-item-artical-img-id-'+i);
	if(!Boolean(post.img))
	    img.style.display='none';
	item.onclick=()=>{
	    window.open('/viewpost.html?aid='+post.aid,'_blank');
	    console.dir(post);
	}
    }
    
    
    init(ajax,tools){
	var list=document.getElementsByClassName("card-main")[0];
	function success(data){
	    if(data.state=="1"){
		var posts = data.posts;
		console.dir(data);
		mMainList._sortPost(posts,list,tools);
	    }else if(data.state=="-1") console.log('list.js:error');
	};
	function error(e){
	    console.dir(e);
	};
	var pd={
	    index:'',
	    pagesize:10,
	};
	ajax.post('/post',JSON.stringify(pd),success,error);
    }
    
    // 分页加载,获取下一页
    getNextPage(ajax,tools){
	var list=document.getElementsByClassName("card-main")[0];
	function success(data){
	    if(data.state=="1"){
		var posts = data.posts;
		mMainList._sortPost(posts,list,tools);
	    }else if(data.state=='-1') console.dir(data.e);
	};
	function error(e){
	    console.dir(e);
	};
	var index=mMainList._posts[mMainList._posts.length-1];
	var aid=index.aid;
	var pid=index.pid;
	if(!aid)index='post:'+pid;
	else index='artical:'+aid;
	var pd={
	    index:index,
	    pagesize:10,
	};
	ajax.post("/post",JSON.stringify(pd),success,error);
    }
    
    // 帖子类型选择器
    _sortPost(posts,list,tools){
	for(var i=0;i<posts.length;i++){
	    var post = posts[i];
	    mMainList._posts.push(post);
	    var type = post.type|0;
	    if(type==3){
		mMainList.display_sign(post,'pid'+post.pid,
				       list,tools);
	    }else if(!Boolean(type)){
		mMainList.display_post(post,'pid'+post.pid,
				       list,tools);
	    }else if(type==4){
		mMainList.display_artical(post,'aid'+post.aid,
					  list,tools);
	    }
	}
    }
    
    
}

window.customElements.define('main-list',MainList);
