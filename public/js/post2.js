// 发布帖子界面

var testeditor;
var imgs = [];

$(()=>{
    
    var edmdtoolbarIcons=()=>{
	return ["undo","redo",
		"|","bold",
		"del","italic",
		"quote","ucwords",
		"uppercase","lowercase",
		"|","h1","h2","h3","h4","|",
		"list-ul","list-ol","hr","|",
		"link","reference-link","image",
		"code","preformatted-text","code-block",
		"table","datetime","emoji","html-entities",
		"pagebreak","|","goto-line","watch","preview",
		"fullscreen","search","|","help","info"];
    };
    
    var edmdonload=()=>{
	var codeEditor=$(".CodeMirror-wrap")[0];
	codeEditor.ondragenter=e=>{
	    e.preventDefault();e.stopPropagation();
	    return false;
	};
	codeEditor.ondragover=e=>{
	    e.preventDefault();e.stopPropagation();
	    return false;
	};
	codeEditor.ondrop=e=>{
	    e.preventDefault();e.stopPropagation();
	    var files=e.dataTransfer.files // 获取到用户的文件
	    tenxuncos(files[0], uploadUrlCallback);
	}
    };
    
    function sts(){
	return new Promise((resolve,reject)=>{
	    $.ajax({
		type:"POST",
		contentType:"application/json;charset=UTF-8",
		url:"/sts",
		data:JSON.stringify(
		    {action:["name/cos:GetService"]}),
		success:r=>{
		    resolve(r);
		},error:e=>{
		    reject(e);},
	    });
	})
    }

    function test1(tmpkeys,file,call){
	var loading_index=layer.load(1,{shade:[0.1,"#fff"]});
	var mycos = new MyCOS(tmpkeys);
	// proData:
	// {loaded:int, total:int,speed:float,precent: float}
	function progress(proData){
	    console.log("post2.js->pro");
	    console.dir(proData);
	};
	// data: {Location:url, statusCode: int}
	// err : {}
	function callback(err, data){
	    layer.close(loading_index);
	    if(err)layer.msg(JSON.stringify(err));
	    else{
		var url = "https://" + data.Location;
		call(url);	
		imgs.push(url);
	    } 
	};
	mycos.putObject(file,callback,progress);
    }

    // @param: file:file object
    // @param: callback: callback after upload
    // upload file to tenxunyun...
    function tenxuncos(file,callback){
	sts().then(tmpkeys=>{
	    console.dir(tmpkeys);
	    test1(tmpkeys,file,callback);
	}).catch(err=>{
	    console.log("post2.js-> create cos token error");
	    console.dir(err);
	})
    }
    
    // 生成代码片段c，插入markdown
    function uploadUrlCallback(data){
	var url=data;
	var link=url;
	if(!url)return false;
	var alt="";
	var cm=testeditor;
	var cursor=cm.getCursor();
	
	// 以下是对图片上传结果的处理，应用原image-load插件的代码
	var altAttr=(alt!=="")?"\""+alt+"\"":"";
	if(link===""||link==="http://")
	    cm.replaceSelection("!["+alt+"]("+url+altAttr+")");
	else cm.replaceSelection("!["+alt+"]("+url+altAttr+")");
	if(alt==="")cm.setCursor(cursor.line,cursor.ch+2);
    }
    
    
    testeditor = editormd("editor", {
	placeholder:
	"本编辑器支持markdown编辑，左边编写，右边预览",
	width: "100%",
	path: "js/libs/editor.md/lib/",
	saveHTMLToTextarea:false,
	emoji:true,taskList:true,
	tocm: true,tex:true,
	// for@link and table of contents
	atlink: true,toc: true,	
	// disable decode the html
	// for email address auto link
	htmlDecode:false,emailLink:true, 	
	lineNumbers: true,tabSize: 4,
	flowChart:true,	// 流程图支持 默认关闭
	sequenceDiagram:true,	// 时序图支持 默认关闭
	onload:edmdonload,	// 图片上传成功后的处理
	toolbarIcons: edmdtoolbarIcons,	// 自定义工具栏
    });

    var ajax    = new MyAjax();
    var usermanager = new UserManager();
    var myBooks = new Books("leftside-list");
    var myTrash = new Trash("leftside-list");
    var mySettings = new Settings("leftside-list");
    var btn_books_listen = (obj)=>{
	myBooks.init();
	mlistBooks.init(ajax,usermanager);
    };
    var btn_trash_listen = ()=>{
	myTrash.init();
    };
    var btn_settings_listen = ()=>{
	mySettings.init();
    };

    var btn_books = document
	.getElementsByClassName("left-bar-books")[0];
    var btn_trash = document
	.getElementsByClassName("left-bar-trash")[0];
    var btn_settings = document
	.getElementsByClassName("left-bar-settings")[0];
    btn_books.onclick=btn_books_listen;
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
		window.location="http://49.232.164.187:3000";
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



