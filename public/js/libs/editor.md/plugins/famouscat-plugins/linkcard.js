(function(){
    var factory = function(exports){
	var $          = jQuery;
	var pluginName = "linkcard";
	exports.fn.linkCard = function(editor_md){
	    var _this       = this;
	    var cm          = _this.cm;
	    var settings    = _this.settings;
	    var editor      = _this.editor;
	    var classPrefix = _this.classPrefix;
	    var id          = _this.id;
	    
	    editor_md.addKeyMap({
		"Ctrl-L":function(cm){
		    var cursor=cm.getCursor();
		    cm.replaceSelection("[linkcard](http://)");
		    cm.setCursor(cursor.line,cursor.ch+18);
		}
	    });
	    
	    
	}
    }
    factory(window.editormd);
})();
