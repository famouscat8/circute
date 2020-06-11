// 显示文集对应文章的组件
const list_artical = document.createElement('template');

list_artical.innerHTML=`<div class="artical-list"></div>`;

var mlistArtical=null;

class ListArtical extends HTMLElement{
    constructor(){
	super();
	this.appendChild(list_artical.content.cloneNode(true));
	mlistArtical=this;
    }
    
    init(bid,ajax,usermanager,tools,clickartical){
	var token = usermanager.getToken();
	var pd = {
	    usertoken:token,
	    bid: bid,
	    action: 'get articals by bid',
	};

	// 显示文章列表的方法
	function display(articals){
	    var list=document
		.getElementsByClassName('artical-list')[0];
	    for(var i=0;i<articals.length;i++){
		var artical=articals[i];
		var item=document.createElement('div');
		item.className='artical-list-item';
		list.appendChild(item);
		item.innerHTML=`
                 <div class="artical-item-main">
            <p class="artical-item-title"
               id="artical-item-title-id-`+i+`"></p></div>
                 <div class="artical-item-footer">
              <small class="artical-item-time" 
                     id="artical-item-time-id-`+i+`"></small></div>`
		
		var title=document
		    .getElementById('artical-item-title-id-'+i)
		    .innerText=artical.title;
		var time=document
		    .getElementById('artical-item-time-id-'+i)
		    .innerText=tools.getDateDiff(artical.time);
		item.onclick=()=>{
		    clickartical(artical.aid,artical.content);
		}
	    }

	    var newartical=document.createElement('div');
	    newartical.innerHTML=`      
      <button class="artical-item-newartical-btn">
      <i class="fa fa-plus" aria-hidden="true"></i>
      <p class="artical-item-newartical-p">新建文章</p></button>`;
	    newartical.className="artical-item-newartical";
	    list.appendChild(newartical);
	    document
		.getElementsByClassName(
		    'artical-item-newartical-btn')[0]
		.onclick=null;
	};
	
	function success(data){
	    console.dir(data);
	    if(data.state=="1")
		display(data.articals);
	};
	
	function error(e){
	    console.dir(e);
	};
	ajax.post('/getarticals',JSON.stringify(pd),success,error);
    }
}

window.customElements.define('list-artical',ListArtical);
