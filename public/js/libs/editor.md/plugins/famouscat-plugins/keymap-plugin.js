// editormd 设置快捷键的插件
(function(){
    var factory = function(exports){
	var $          = jQuery;
	var pluginName = "keymap-plugin";
	exports.fn.keyMapPlugin = function(editor_md,ajax){
	    var _this       = this;
	    var cm          = _this.cm;
	    var settings    = _this.settings;
	    var editor      = _this.editor;
	    var classPrefix = _this.classPrefix;
	    var id          = _this.id;
	    
	    editor_md.addKeyMap({
		"Ctrl-L":function(cm){
		    _this.executePlugin(
			"linkcardDialog",
			"famouscat-plugins/linkcard-dialog"
		    );
		}
	    });
	    
	}
    }
    factory(window.editormd);
})();
