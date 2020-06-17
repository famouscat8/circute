// 粘贴图片的插件
(function(){
    var factory = function(exports){
	var $          = jQuery;
	var pluginName = "paste-image";
	//  图片粘贴的方法;将图片上传至云服务器
	exports.fn.imagePaste = function(ajax){
	    var _this       = this;
	    var cm          = _this.cm;
	    var settings    = _this.settings;
	    var editor      = _this.editor;
	    var classPrefix = _this.classPrefix;
	    var id          = _this.id;
	    // var cursor=cm.getCursor();
	    // cm.replaceSelection("![]("+url+")");
	    // cm.setCursor(cursor.line,cursor.ch+2);
	    
	    function upload(file){
		function uploadCallBack(err,back){
		    console.dir([err,back]);
		    if(err){
			layer.msg("上传失败");
			console.dir(err);
		    }else{
			_this.executePlugin(
			    "imageDialog",
			    "image-dialog/image-dialog");
			var url="https://"+back.Location;
			setTimeout(()=>{
			    $("."+classPrefix+"image-dialog")
				.find("input[data-url]")
				.val(url);
			},500);
		    }
		};
		function uploadPro(pro){
		    layer.msg("上传中:"+
			      pro.percent*100+"%",{
				  offset:"t",
			      });
		};
		
		var pd=JSON.stringify({
		    action:["name/cos:GetService"],
		})
		ajax.post("/sts",pd,temkey=>{
		    var cos=new MyCOS(temkey);
		    cos.putObject(file,
				  uploadCallBack,uploadPro);
		    
		},e=>{
		    layer.msg("get upload token error");
		    console.dir(["get upload token error:",e]);
		});
	    }
	    
	    // 文件拖拽上传
	    var wrap=$(".CodeMirror-wrap")[0];
	    wrap.ondragenter=function(e){
		e.preventDefault();
		e.stopPropagation();
		return false;
	    }
	    wrap.ondragover=function(e){
		e.preventDefault();
		e.stopPropagation();
		return false;
	    }
	    wrap.ondrop=function(e){
		e.preventDefault();
		e.stopPropagation();
		var file=e.dataTransfer.files[0];
		console.dir(file);
		upload(file);
	    }
	    console.dir(mirror_wrap);
	    
	    // 监听剪贴板
	    $("#"+id).on("paste",function(e){
		var items=(e.clipboardData||
			   e.originalEvent.clipboardData)
		    .items;
		if(items&&items[0].type.indexOf('image')>-1){
		    var file=items[0].getAsFile();
		    console.dir(file);
		    upload(file);
		}
	    });
	    
	}
    }
    factory(window.editormd);
})();
