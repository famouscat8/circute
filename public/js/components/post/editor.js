// 编辑器插件化
const _editor = document.createElement('template');

_editor.innerHTML=`
	<div class="myeditor">
	  <div class="editor" id="editor">
	    <textarea id="testtest"></textarea>
	  </div>
	</div>`;


var meditorMd = null;
class EditorMd extends HTMLElement{
    constructor(){
	super();
	this.appendChild(_editor.content.cloneNode(true));
	meditorMd=this;
	this.editorIcons=()=>{
	    return ["undo","redo",
		    "|","bold",
		    "del","italic",
		    "quote","ucwords",
		    "uppercase","lowercase",
		    "|",
		    "list-ul","list-ol","hr","|",
		    "link","reference-link","image",
		    "code","preformatted-text","code-block",
		    "table","datetime","emoji","html-entities",
		    "pagebreak","|","goto-line","watch","preview",
		    "fullscreen","search","|","help","info"];
	};
	this.editor_md=null;

    }
    
    // 将当前修改保存至服务器
    saveArtical(){
	var token = this.usermanager.getToken();
	var pd={
	    usertoken: token,
	    aid      : this.aid,
	    content  : this.editor_md.getMarkdown(),
	};
	
	function success(data){
	    console.dir(data);  
	    if(data.state=="1")
		layer.msg('保存成功');
	    else layer.msg('保存失败');
	};
	function error(e){
	    console.dir(e);
	    layer.msg('保存失败');
	};
	this.ajax.post('/saveartical',
		       JSON.stringify(pd),
		       success,error);
    }
    
    init(ajax,usermanager){
	this.ajax=ajax;
	this.usermanager=usermanager;
	this.editor_md = editormd("editor", {
	    placeholder:
	    "本编辑器支持markdown编辑，左边编写，右边预览",
	    width: "100%",
	    path: "js/libs/editor.md/lib/",
	    saveHTMLToTextarea:false,
	    emoji:true,taskList:true,
	    tocm: true,tex:true,
	    atlink: true,toc: true,	
	    htmlDecode:false,emailLink:true, 	
	    lineNumbers: true,tabSize: 4,
	    flowChart:true,	// 流程图支持 默认关闭
	    sequenceDiagram:true,
	    onload:function(){meditorMd.getFile(this,ajax)},
	    toolbarIcons: this.editorIcons,	// 自定义工具栏
	});

    }// init end
    
    // 
    getFile(editor_md,ajax){
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
	    var files=e.dataTransfer.files;
	    console.dir(files);
	    meditorMd.uploadFile(files[0],'',ajax);
	}
	var keyMap={'Ctrl-S':function(cm){meditorMd.saveArtical()}}
	editor_md.addKeyMap(keyMap);
    }


    // 插入内容到editormd
    updateEditor(url){
	if(!url)return;
	var cm=this.editor_md;
	var cursor=cm.getCursor();
	cm.replaceSelection("![]("+url+")");
	cm.setCursor(cursor.line,cursor.ch+2);
    }

    // 上传文件到服务器
    uploadFile(file,callback,ajax){
	function success(temkey){
	    //var loading_index=layer.load(1,{shade:[0.1,"#fff"]});
	    var mycos = new MyCOS(temkey);
	    mycos.putObject(file,function(err,back){
		var url='https://'+back.Location;
		meditorMd.updateEditor(url);
	    },function(pro){
		console.dir(pro);
	    });
	};
	function error(e){
	    console.dir(e);
	};
	var pd=JSON.stringify({action:['name/cos:GetService']});
	ajax.post('/sts',pd,success,error);
    }

    
    getEditor(){
	return this.editor_md; 
    }
    
    // 设置当前正在编辑的文章的id
    setAid(aid){
	this.aid=aid;
    }

    
}


window.customElements.define('editor-md',EditorMd);
