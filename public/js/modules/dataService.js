define(function (){
    let msg = "circuitdemo.com"
    
    function getMsg() {
	return msg.toUpperCase()
    }
    
    return { getMsg }
})
