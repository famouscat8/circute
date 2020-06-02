(function(){
    requirejs.config({
	baseUrl:"js/",
	paths:{
	    "jquery"        :"libs/jquery",
	    "katex"         : "libs/editor.md/lib/katex",
	    "editormd"      :"libs/editor.md/editormd.amd",
	    "marked"        :"libs/editor.md/lib/marked.min",
	    "prettify"      :"libs/editor.md/lib/prettify.min",
	    "raphael"        :"libs/editor.md/lib/raphael.min",
	    "underscore"     :"libs/editor.md/lib/underscore.min",
	    "flowchart"      :"libs/editor.md/lib/flowchart.min",
	    "jqueryflowchart":"libs/editor.md/lib/jquery.flowchart.min",
	    "sequenceDiagram":"libs/editor.md/lib/sequence-diagram.min",
	    // "imageDialog"   :"libs/editor.md/plugins/image-dialog/image-dialog"
	    // "languages":"libs/editor.md/languages/en",
	    // "linkDialog":"libs/editor.md/plugins/link-dialog/link-dialog",
	    // "referenceDialog":"libs/editor.md/plugins/reference-link-dialog/reference-link-dialog",
	    // "codeblockDialog":"libs/editor.md/plugins/code-block-dialog/code-block-dialog",
	    // "tableDialog":"libs/editor.md/plugins/table-dialog/table-dialog",
	    // "emojiDialog":"libs/editor.md/plugins/emoji-dialog/emoji-dialog",
	    // "gotolineDialog":"libs/editor.md/plugins/goto-line-dialog/goto-line-dialog",
	    // "helpDialog":"libs/editor.md/plugins/help-dialog/help-dialog",
	    // "htmlentitiesDialog":"libs/editor.md/plugins/html-entities-dialog/html-entities-dialog",
	    // "preformattedtextDialog":"libs/editor.md/plugins/preformatted-text-dialog/preformatted-text-dialog"
	}
    })
    
    var deps2 = [
	"editormd",
	"imageDialog",
	"languages",
	"linkDialog",
	"referenceDialog",
	"codeblockDialog",
	"tableDialog",
	"emojiDialog",
	"gotolineDialog",
	"helpDialog",
	"htmlentitiesDialog",
	"preformattedDialog"
    ];
    
    var deps = [
	"editormd",
	"image-dialog",
	"libs/editor.md/languages/en",
	"libs/editor.md/plugins/link-dialog/link-dialog",
	"libs/editor.md/plugins/reference-link-dialog/reference-link-dialog",
	"libs/editor.md/plugins/code-block-dialog/code-block-dialog",
	"libs/editor.md/plugins/table-dialog/table-dialog",
	"libs/editor.md/plugins/emoji-dialog/emoji-dialog",
	"libs/editor.md/plugins/goto-line-dialog/goto-line-dialog",
	"libs/editor.md/plugins/help-dialog/help-dialog",
	"libs/editor.md/plugins/html-entities-dialog/html-entities-dialog",
	"libs/editor.md/plugins/preformatted-text-dialog/preformatted-text-dialog"
	
    ];

    require([deps2 ,"editormd"],
	      ($,editormd)=>{
		  var test = editormd("editor", {
		      markdown: "haha",
		      path: "editor.md/lib/",
		      width: "100%",
		      height: "100%",
		      emoji: true,
		      
		  })
		  
	      })
})()
