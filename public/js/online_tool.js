
function online_tool() {
    var xmlhttp;

    if(window.XMLHttpRequest){
	xmlhttp = new XMLHttpRequest();
    } else {
	xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.onreadystatechange = function() {
	if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
	    document.getElementById("mymain").innerHTML =
		xmlhttp.responseText;
//	    alert(xmlhttp.responseText);

	}
    }
    xmlhttp.open("GET", "/test", true);
    xmlhttp.send();

    
    
}
