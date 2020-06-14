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

function set(key, value){
    return new Promise((resolve,reject)=>{
	redisClient.set(key, value, (err,val)=>{
	    if(err)reject(err)
	    resolve(val)
	})
    })
}


function get(key){
    return new Promise((resolve, reject) => {
	redisClient.get(key, (err, val)=>{
	    if(err) reject(err)
	    resolve(val)
	})
    })
}






function hget(key, subkey){
    return new Promise((resolve, reject)=>{
	redisClient.hget(key, subkey, (err, data)=>{
	    if(err) reject(err)
	    resolve(data)
	})
    })
}



function hset(key,subkey,string){
    return new Promise((resolve, reject)=>{
	redisClient.hset(key,subkey,string,(err,data)=>{
	    if(err)reject(err)
	    resolve(data)
	})
    })
}



function hgetall(key){
    return new Promise((resolve, reject)=>{
	redisClient.hgetall(key, (err, object)=>{
	    if(err) reject(err)
	    resolve(object)
	})
    })
}

function hdel(key){
    return new Promise((resolve, reject)=>{
	redisClient.hdel(key, (err, res)=>{
	    if(err) reject(err)
	    resolve(res)
	})
    })
}

function hmset(key, object){
    return new Promise((resolve, reject)=>{
	redisClient.hmset(key, object, (err, res)=>{
	    if(err) reject(err)
	    resolve(res)
	})
    })
}

function hmget(key, subkeys){
    return new Promise((resolve, reject)=>{
	redisClient.hmget(key, subkeys, (err, object)=>{
	    if(err) reject(err)
	    resolve(object)
	})
    })
}

function hincrby(key,subkey,num){
    return new Promise((resolve,reject)=>{
	redisClient.hincrby(key,subkey,num,(err,res)=>{
	    if(err)reject(err)
	    resolve(res);
	})
    })
}

function exists(key){
    return new Promise((resolve, reject)=>{
	redisClient.exists(key, (err, res)=>{
	    if(err) reject(err)
	    resolve(res)
	})
    })
}

function get(key){
    return new Promise((resolve, reject)=>{
	redisClient.get(key, (err, data)=>{
	    if(err) reject(err)
	    resolve(data)
	})
    })
}

function incrby(key, num){
    return new Promise((resolve, reject)=>{
	redisClient.incrby(key,num,(err,re)=>{
	    if(err)reject(err)
	    resolve(re)
	})
    })
}

function zadd(key,score,subkey){
    return new Promise((resolve, reject)=>{
	redisClient.zadd([key,score,subkey],(err,re)=>{
	    if(err)reject(err)
	    resolve(re);
	})
    })
}

function zrem(key, subkey){
    return new Promise((resolve,reject)=>{
	redisClient.zrem(key,subkey,(err,re)=>{
	    if(err)reject(err)
	    resolve(re);
	})
    })
}

function zrangebyscore(key,min,max){
    return new Promise((resolve,reject)=>{
	redisClient.zrangebyscore(key,min,max,(err,obj)=>{
	    if(err)reject(err)
	    resolve(obj)
	})
    })
}

function zunionstore(destination,num,...keys){
    return new Promise((resolve,reject)=>{
	redisClient.zunionstore(destination,num,
				keys[0],keys[1],(err,r)=>{
				    if(err)reject(err)
				    resolve(r)
				})
    })
}

function zrange(key,min,max){
    return new Promise((resolve,reject)=>{
	redisClient.zrange(key,min,max,(err,obj)=>{
	    if(err)reject(err)
	    resolve(obj)
	})
    })
}

function zrevrange(key,min,max){
    return new Promise((resolve,reject)=>{
	redisClient.zrevrange(key,min,max,(err,obj)=>{
	    if(err)reject(err)
	    resolve(obj)
	})
    })
}

function zscore(key,subkey){
    return new Promise((resolve,reject)=>{
	redisClient.zscore(key,subkey,(err,obj)=>{
	    if(err)reject(err)
	    resolve(obj);
	})
    })
}

function expire(key, time){
    return new Promise((resolve,reject)=>{
	redisClient.expire(key,time,(err,r)=>{
	    if(err)reject(err)
	    resolve(r)
	})
    })
}
module.exports = {
    redisClient,
    set,
    get,
    hget,
    hset,
    hgetall,
    hdel,
    hmset,
    hmget,
    hincrby,
    exists,
    get,
    incrby,
    zadd,
    zrem,
    zrangebyscore,
    zrange,
    zrevrange,
    zscore,
    zunionstore,
    expire,
}
