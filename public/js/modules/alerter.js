define(["dataService", "jquery"], function(dataService, $) {
    let name = "Tom2"
    
    function showMsg() {
//	$("main").css("background", "gray")
	alert(dataService.getMsg() + "," + name)
	

    }
    return {showMsg}
    
})
