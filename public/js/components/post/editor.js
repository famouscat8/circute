// 编辑器插件化
const _editor = document.createElement('template');

_editor.innerHTML=`
	<div class="myeditor">
	  <div class="editor test-editormd" id="editor">
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
		    "|","list-ul","list-ol","hr","|",
		    "link","reference-link","image",
		    "code","preformatted-text","code-block",
		    "table","datetime","emoji",
		    "html-entities","pagebreak",
		    "|","goto-line","watch","preview",
		    "fullscreen","search","|","help","info"];
	};
	this.editor_md=null;

    }
    
    // 将当前修改保存至服务器
    saveArtical(){
	layer.msg("保存中...");
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
	
	meditorMd.editor_md = editormd("editor", {
	    placeholder:
	    "本编辑器支持markdown编辑，左边编写，右边预览",
	    width: "100%",delay:0,
	    path: "js/libs/editor.md/lib/",
	    saveHTMLToTextarea:false,
	    emoji:true,taskList:true,
	    tocm: true,tex:true,
	    atlink: true,toc: true,	
	    htmlDecode:true,emailLink:true, 	
	    lineNumbers: true,tabSize: 4,
	    flowChart:true,	// 流程图支持 默认关闭
	    sequenceDiagram:true,
	    onload:function(){meditorMd.onload(this,ajax)},
	    toolbarIcons: this.editorIcons,
	});

    }// init end


    markedrender(){
	var marked=editormd.$marked;
	console.dir(editormd);
	console.dir(editormd.markedRenderer);
	console.dir(editormd.$marked);
	console.dir(editormd.$marked.options);
    }
    onload(editor_md,ajax){
	var pluginUrl="js/libs/editor.md/plugins/famouscat-plugins";
	var keyMap={
	    'Ctrl-S':function(cm){meditorMd.saveArtical()}
	}
	meditorMd.markedrender();
	editor_md.addKeyMap(keyMap);
	editormd.loadPlugin(pluginUrl+"/paste-image",
			    function(){
				meditorMd.editor_md
				    .imagePaste(ajax);
			    });
	editormd.loadPlugin(pluginUrl+"/linkcard",
			    function(){
				meditorMd.editor_md
				    .linkCard(editor_md);
			    });
	
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
