var testeditor;

$(()=>{
    // 上传文件到服务器的函数
    // uploadConfig:上传配置{uploadurl,uploadtoken,action}
    function ajaxUpload2(uploadConfig,files,callback){
	console.log("post2.js>start upload");
	var formData=new FormData();
	formData.append("file", files[0]);
	formData.append("upload_token",uploadConfig.uploadtoken);
	$.ajax({
	    url:uploadConfig.uploadurl,
	    type:"POST",
	    data:formData,
	    processData:false,
	    contentType:false,
	    dataType:"json",
	    success:data=>{
		console.log("result:",data);
		callback(data);
		console.dir(data);
	    },
	    complete:(data)=>{}
	})
	return false;
    }
    
    // 上传文件到服务器的函数
    function qiniuUpload(file,key,uploadtoken,callback){
	// 图片上传前压缩
	let options={
	    quality:0.92,
	    noCompressIfLarger:true,
	};
	var observer={
	    next(res){
		console.dir(res);
	    },error(err){
		console.dir(err);
	    },complete(res){
		console.dir(res);
		console.log(res.fileUrl);
	    }
	};
	var config={
	    useCdnDomain:false,
	    region:qiniu.region.z2,
	    retryCount:3,
	    uphost:null,
	    // 分片上传的并发请求
	    concurrentRequestLimit:3,
	    // Md5校验
	    checkByMD5:false,
	    // 是否全部直传
	    forceDirect:false,
	};
	var putExtra={
	    // 原文件名
	    fname:"",
	    // 自定义变量
	    params:{},
	    mimeType:["image/png","image/jpeg","image/gif"]
	};
	// key:文件资源名
	qiniu.compressImage(file,options).then(data=>{
	    var observable=qiniu.upload(file,key,uploadtoken,putExtra,config);
	    // 开始上传文件
	    var subscription=observable.subscribe(observer);
	})
    }
    
    function tenxuncos(file){
	var cos=new COS({
	    SecretId:"AKIDoOhjRKiKErPhiSsB6l8KFtGPIuGKp2bt",
	    SecretKey:"HH2WikW3QZS7VcF9pTggQVO0MUK6KHxM",
	});
	cos.putObject({
	    Bucket:"circute-1259491699",
	    Region:"ap-guangzhou",
	    Key:"test",
	    StorageClass:"STANDARD",
	    Body:file,
	    onProgress:progressData=>{
		console.dir(progressData);
	    }
	},(err,data)=>{
	    console.dir(err);
	    console.dir(data);
	})
    }
    
    // 生成代码片段c，插入markdown
    function uploadUrlCallback(data){
	var url=data.hash;
	var link=url;
	if(!url)return false;
	var alt="";
	var cm=testeditor;
	var cursor=cm.getCursor();
	if(url.endsWith(".mp4")){
	    // var videoHtml='<video class="video-js" controls preload="auto" width="100%" poster="" data-setup=\'{"aspectRatio":"16:9"}\'><source src="'+url+'"type=\'video/mp4\'>'+'<p class="vjs-no-js">To view this video please enable javascript</p></video>';
	    // videoHtml="\n"+videoHtml+"\n";
	    // cm.replaceSection(videoHtml);
	    cm.setCursor(cursor.line,cursor.ch+2);
	    return;
	}
	// 以下是对图片上传结果的处理，应用原image-load插件的代码
	var altAttr=(alt!=="")?"\""+alt+"\"":"";
	if(link===""||link==="http://") cm.replaceSection("!["+alt+"]("+url+altAttr+")");
	else cm.replaceSection("[!["+alt+"]("+url+altAttr+")]("+link+altAttr+")");
	if(alt==="")cm.setCursor(cursor.line,cursor.ch+2);
    }
    // 通过api: /uploadtoken获取用户上传token,
    // 上传图片视频等资源
    // api return:
    // {state:"-1or1",e:error mag or null,
    // uploadtoken:"token or null"}
    // state: "-1" usertoken 验证失败(过期或token无效)重新登陆
    // state: "1"  usertoken 验证成功 返回uploadtoken
    // 从本地获取用户token经服务器判断是否有效
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
	    // 取得用户token,验证并获取uploadtoken
	    var usertoken = localStorage.getItem("token");
	    var uploadConfig={};

	    getUploadToken(usertoken)
		.then(data=>{		// 获取uploadtoken
		    uploadConfig=data.uploadconfig;
		    console.dir(data.uploadconfig);
		}).catch(e=>{
		    layer.msg("身份过期，请重新登录");
		    console.log("post.js something error:");
		});

	    var codeEditor=$(".CodeMirror-wrap")[0];
	    codeEditor.ondragenter=e=>{
		e.preventDefault();
		e.stopPropagation();
		console.log("dragenter");
		return false;
	    };
	    codeEditor.ondragover=e=>{
		e.preventDefault();
		e.stopPropagation();
		console.log("dragover");
		return false;
	    };
	    codeEditor.ondrop=e=>{
		e.preventDefault();
		e.stopPropagation();
		console.log("drop");
		var files=e.dataTransfer.files // 获取到用户的文件
		console.dir(files);
		// ajaxUpload是Ajax上传文件的函数
		// uploadConfig包含上传文件所需的参数,uploadUrlCallback是
		// 上传成功后的回调函数，用于将生成代码片段插入markdown
		//ajaxUpload(uploadConfig,files,uploadUrlCallback);
		// qiniuUpload(files[0],files[0].name,
		// 	    uploadConfig.uploadtoken,
		// 	    uploadUrlCallback);
		tenxuncos(files[0]);
	    }
	    
	    
	},
	
	// 自定义工具栏
	toolbarIcons: ()=>{
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



