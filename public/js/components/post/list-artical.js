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

    // 修改文章标题的方法
    editATitle(aid,ajax,usermanager,tools){
	layer.prompt({
	    formType:0,
	    value:'',
	    title:'输入新的文章标题:',
	    maxlength:20,
	},function(value,index,elem){
	    layer.close(index);
	    layer.msg('保存中...');
	    var token=usermanager.getToken();
	    var pd={
		usertoken:token,
		aid:aid,
		title:value,
	    }
	    pd=JSON.stringify(pd);
	    ajax.post('/savearticaltitle',pd,(data)=>{
		console.dir(data);
		if(data.state!='1')
		    layer.msg('修改标题失败');
		else layer.msg('修改成功');
	    },(e)=>{
		console.dir(e);
		layer.msg('修改失败');
	    })
	})
    }
    
    init(bid,ajax,usermanager,tools,clickartical,click_edit_title){
	var token = usermanager.getToken();
	this.usermanager=usermanager;
	this.tools=tools;
	this.ajax=ajax;
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
               id="artical-item-title-id-`+i+`"></p>
          <div class="artical-item-title-editor"
                id='artical-item-title-editor-id-`+i+`'>
          <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
          </div>   </div>
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
		var edit=document
		    .getElementById('artical-item-title-editor-id-'+i)
		    .onclick=()=>{
			// 防止事件穿透
			event.stopPropagation();
			click_edit_title(artical.aid);
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
