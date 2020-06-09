// 首页精品帖子组件

const art_post = document.createElement("template");
art_post.innerHTML=`<div class="artpost-container b-p-06rem">
  <div class="artpost-title-container">
    <p class="artpost-title">精品帖子</p>
<i class="fa fa-fire" aria-hidden="true"></i>

  </div>
  <p class="hr-2"/>
  <div class="artpost-main">
  </div>
</div>`;

var mArtPost = null;
class ArtPost extends HTMLElement{
    constructor(){
	super();
	this.appendChild(art_post.content.cloneNode(true));
	mArtPost = this;
    }
    // 传入posts 5个帖子
    init(posts){
	console.log("artpost.js-->test");
	var list = document.getElementsByClassName("artpost-main")[0];
	
	for(var i=0;i<5;i++){
	    var post = posts[i];
	    var item = document.createElement("div");
	    item.className="artpost-main-item";
	    item.innerHTML=`
<div class="artpost-item-title-container">
  <p class="artpost-item-title"/>
</div>
<div class="artpost-item-postmessage-container">
<small>
<i class="fa fa-user-o" aria-hidden="true"></i>
</small>
  <small class="artpost-item-username">
</small>
<small>
<i class="fa fa-thumbs-o-up" aria-hidden="true"></i>
</small>
  <small class="artpost-item-star">0ds</small>
<small>
<i class="fa fa-heart-o" aria-hidden="true"></i>
</small>
  <small class="artpost-item-collect">0</small>
</div>`;
	    list.appendChild(item);
	    var username = document
		.getElementsByClassName("artpost-item-username")[i];
	    username.innerText+=post.owner.nickname;
	    var title = document
	    .getElementsByClassName("artpost-item-title")[i];
	    title.innerText=post.content.title;
	    var star = document
		.getElementsByClassName("artpost-item-star")[i];
	    star.innerText=post.start;
	    var collect = document
		.getElementsByClassName("artpost-item-collect")[i];
	    collect.innerText=post.collect;
	}
    }
}

window.customElements.define('art-post',ArtPost);

