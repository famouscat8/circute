const tftp = require("tftp2");
const { read, write } = tftp("127.0.0.1", 6969)
const fs = require("fs");


read("re.txt").pipe(fs.createWriteStream("/tmp/demo.txt"))


console.dir(tftp)

const server = tftp.createServer();


server.on("get", async (req,send)=>{
    const {filename, mode, address, port} = req;
    
    await send(fs.readFileSync(filename))
})
