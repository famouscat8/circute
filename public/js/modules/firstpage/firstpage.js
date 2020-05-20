define(["dataService", "jquery"], function(dataService, $){

    function documentready() {
	$(document).ready(function(){
	    alert("document is ready!")
	})
    }

    return { documentready }
})
