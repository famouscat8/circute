var testeditor;

$(()=>{
    testeditor = editormd("editor", {
	placeholder:
	"本编辑器支持markdown编辑，左边编写，右边预览",
	width: "80%",
	height: 500,
	//syncScrolling: "single",
	path: "js/libs/editor.md/lib/",
	// theme:"dark",
	// previewTheme:"dark",
	// editorTheme: "pastel-on-dark",
	saveHTMLToTextarea:false,
	
	emoji:true,
	taskList:true,
	tocm: true,
	tex:true,
	atlink: true,		// for@link
	toc: true,		// table of contents
	htmlDecode:false, 	// disable decode the html
	emailLink:true, 	// for email address auto link
	lineNumbers: true,
	tabSize: 4,
	
	// 流程图支持 默认关闭
	flowChart:true,
	// 时序图支持 默认关闭
	sequenceDiagram:true,
	// 图片上传成功后的处理
	onload:()=>{
	    console.log("test");
	},
	
	// 自定义工具栏
	toolbarIcons: function(){
	    return ["undo","redo","|","bold",
		    "del","italic","quote","ucwords",
		    "uppercase","lowercase","|","h1",
		    "h2","h3","h4","|",
		    "list-ul","list-ol","hr","|",
		    "link","reference-link","image","code",
		    "preformatted-text","code-block","table","datetime",
		    "emoji","html-entities","pagebreak","|","goto-line",
		    "watch","preview","fullscreen","search","|","help","info"];
	},
    });
    //testeditor.fullscreen();
});

// 发布帖子的函数
function sendPost(){
    var index_layer=layer.load(1,{shade:[0.1,"#fff"]});
    var token = localStorage.getItem("token");
    var localtime=new Date().getTime();
    var tags=$(".input-tags").val().split(" ");
    var title=$(".input-title").val();
    var markdown=testeditor.getMarkdown();
    var post={
	title:title,
	time:localtime,
	content:markdown,
	tags:tags,
    };
    $.ajax({
	type:"POST",
	contentType:"application/json;charset=UTF-8",
	url:"/sendpost",
	data:JSON.stringify({token:token,post:post}),
	success:r=>{
	    console.dir(r);
	    layer.close(index_layer);
	    if(r.state=="1"){
		layer.msg("发布成功");
		window.location="http://192.168.0.111:3000/";
	    }else{
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
		  ()=>{sendPost();},
		  ()=>{layer.msg("取消成功，哈哈哈");});
});




// 通过api: /uploadtoken获取用户上传token,
// 上传图片视频等资源
// api return:
// {state:"-1or1",e:error mag or null,
// uploadtoken:"token or null"}
// state: "-1" usertoken 验证失败(过期或token无效)重新登陆
// state: "1"  usertoken 验证成功 返回uploadtoken
// 从本地获取用户token经服务器判断是否有效
var usertoken = localStorage.getItem("token");
function getUploadToken(t_usertoken){
    //服务端检测token是否有效
    return new Promise((resolve, reject)=>{
	$.ajax({
	    type:"POST",
	    contentType:"application/json;charset=UTF-8",
	    url:"/uploadtoken",
	    data:JSON.stringify({usertoken: t_usertoken}),
	    success:r=>{
		if(r.state=="1")
		    resolve(r);
		reject(r);
	    },error:e=>{
		console.log("post.js error:"+e);
		reject(e);
	    }
	});
    });
}

getUploadToken("token")
    .then(data=>{		// 获取uploadtoken
	console.log("uploadtoken:" + data.uploadtoken);
    }).catch(e=>{
	console.log("post.js something error:");
    });

