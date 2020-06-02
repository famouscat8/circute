var createCode = (length)=>{
    var code='';
    var chars=['a','b','c','d','e','f','f',
	       'h','i','j','k','l','m','n',
	       'o','p','q','r','s','t','u',
	       'v','w','x','y','z',"A","B",
	       "C","D","E","F",'G',"H","I",
	       "J",'K',"L","M",'N',"O","P",
	       'Q','R',"S",'T','U','V','W',
	       'X',"Y","Z","0",'1','2','3',
	       '4','5','6','7','8','9'];
    for(var i=0;i<length;i++){
	var charIndex = Math.floor(Math.random()*62);
	code+=chars[charIndex];
    }
    return code;
}

module.exports.createCode = createCode;
