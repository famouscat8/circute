// 编辑帖子界面

var imgs = [];

$(()=>{
    
    var ajax    = new MyAjax();
    var usermanager = new UserManager();
    var tools   = new Tools();
    var myBooks = new Books("leftside-list");
    var myArtical = new Artical('leftside-list');
    var myDraft = new Draft('leftside-list');
    var myTrash = new Trash("leftside-list");
    var mySettings = new Settings("leftside-list");
    
    meditorMd.init(ajax,usermanager);
    // 钩子:当修改文章标题按钮被点击时
    var click_edit_title=(aid)=>{
	mlistArtical.editATitle(aid,ajax,usermanager,tools,);
    }
    // 钩子:当文章被点击时,显示对应的文章内容在编辑器中
    var clickartical=(aid,artical)=>{
	meditorMd.setAid(aid);
	meditorMd.getEditor().setMarkdown(artical);
    }
    // 钩子:当文集被点击时,显示文集对应的文章
    var clickbooks = (bid,booksname)=>{
	myArtical.init(booksname);
	mlistArtical.init(bid,ajax,usermanager,tools,
			  clickartical,click_edit_title);
    };
    var btn_books_listen = (obj)=>{
	myBooks.init();
	mlistBooks.init(ajax,usermanager,tools,
			clickbooks,);
    };
    var btn_draft_listen = (obj)=>{
	myDraft.init();
    };
    var btn_trash_listen = ()=>{
	myTrash.init();
    };
    var btn_settings_listen = ()=>{
	mySettings.init();
    };
    btn_books_listen();
    var btn_books = document
	.getElementsByClassName("left-bar-books")[0];
    var btn_draft = document
	.getElementsByClassName("left-bar-draft")[0];
    var btn_trash = document
	.getElementsByClassName("left-bar-trash")[0];
    var btn_settings = document
	.getElementsByClassName("left-bar-settings")[0];
    btn_books.onclick=btn_books_listen;
    btn_draft.onclick=btn_draft_listen;
    btn_trash.onclick=btn_trash_listen;
    btn_settings.onclick=btn_settings_listen;




    
});

// 发布帖子的函数
function sendPost(t_editor,t_imgs){
    var index_layer=layer.load(1,{shade:[0.1,"#fff"]});
    var token = localStorage.getItem("token");
    var localtime=new Date().getTime();
    var tags=$(".input-tags").val().split(" ");
    var title=$(".input-title").val();
    var markdown=t_editor.getMarkdown();
    var post={
	title:title,
	time:localtime,
	content:markdown,
	tags:tags,
	imgs:t_imgs,
    };
    
    $.ajax({
	type:"POST",
	contentType:"application/json;charset=UTF-8",
	url:"/sendpost",
	data:JSON.stringify({token:token,post:post}),
	success:r=>{
	    layer.close(index_layer);
	    if(r.state=="1"){
		layer.msg("发布成功");
		window.location="/";
	    }else{
		console.dir(r);
		layer.msg("发布失败");
	    }
	},
	error:e=>{
	    console.dir(e);
	    layer.close(index_layer);
	    layer.msg("发布失败");
	}
    })
}

var title=localStorage.getItem("spost_title");
$(".input-title").val(title);

$(".btn-float").click(()=>{
    layer.confirm("确认发布这个帖子吗?",
		  {btn:["发布","取消"]},
		  ()=>{sendPost(testeditor,imgs);},
		  ()=>{layer.msg("取消成功，哈哈哈");});
});
