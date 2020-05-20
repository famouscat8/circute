// 操作redis数据库的工具类
const redis = require("redis")

var config = {
    redis_port: 6379,
    redis_hostname: "localhost"
}

const _createClient = ()=>{
    // 如果使用redis.createClient()表示使用默认配置
    const client = redis.createClient(config.redis_port,
				      config.redis_hostname);
    client.on("error", err=>{
	console.log("redis error:" + err);
	
    });
    client.on("ready", ()=>{
	console.log("redis ready");
    })
    return client;
};

const redisClient = _createClient();

function setItem(key, value, exprires){
    redisClient.set(key, value);
    if (exprires){
	redisClient.expireA(key, exprires);
    }
}


async function getItem(key){
    return new Promise((resolve, reject) => {
	redisClient.get(key, (err, val)=>{
	    if(err) reject(err)
	    resolve(val)
	})
    })
}

async function hget(key, subkey){
    return new Promise((resolve, reject)=>{
	redisClient.hget(key, subkey, (err, data)=>{
	    if(err) reject(err)
	    resolve(data)
	})
    })
}

async function hgetall(key){
    return new Promise((resolve, reject)=>{
	redisClient.hgetall(key, (err, object)=>{
	    if(err) reject(err)
	    resolve(object)
	})
    })
}

async function hdel(key){
    return new Promise((resolve, reject)=>{
	redisClient.hdel(key, (err, res)=>{
	    if(err) reject(err)
	    resolve(res)
	})
    })
}
async function hmset(key, object){
    return new Promise((resolve, reject)=>{
	redisClient.hmset(key, object, (err, res)=>{
	    if(err) reject(err)
	    resolve(res)
	})
    })
}
async function hmget(key, subkeys){
    return new Promise((resolve, reject)=>{
	redisClient.hmget(key, subkeys, (err, object)=>{
	    if(err) reject(err)
	    resolve(object)
	})
    })
}

async function exists(key){
    return new Promise((resolve, reject)=>{
	redisClient.exists(key, (err, res)=>{
	    if(err) reject(err)
	    resolve(res)
	})
    })
}

async function get(key){
    return new Promise((resolve, reject)=>{
	redisClient.get(key, (err, data)=>{
	    if(err) reject(err)
	    resolve(data)
	})
    })
}

module.exports = {
    redisClient,
    setItem,
    getItem,
    hget,
    hgetall,
    hdel,
    hmset,
    hmget,
    exists,
    get
}
