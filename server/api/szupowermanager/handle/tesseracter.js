const Tesseract = require("tesseract.js")

Tesseract.recognize("/root/test/web/server/api/szupowermanager/handle/0.gif","eng",{
    logger:m=>{
	console.dir(m);
    }
}).then(data=>{
    console.dir(data);
})
