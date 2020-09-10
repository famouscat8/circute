const tesr = require("node-tesr")

tesr("/root/test/web/server/api/szupowermanager/test/1.gif",{
    l:"eng"  ,
    oem: "3",
    psm: "7",
},function(err,data){
    console.dir([err,data])
    
    
})
