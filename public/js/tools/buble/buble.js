function isSupportFileApi(){
    if(window.File&&window.FileList&&window.FileReader&&window.Blob)
	return true;
    return false;
}


isSupportFileApi();


function handleUpload(){
    var files = document.querySelector("input[type=file]").files;
    var file = files[0];
    
    for(var i = 0;i<files.length;i++){
	
    }
    var reader;
    console.dir(file);

    !!file &&  (reader = new FileReader(),
		   reader.readAsArrayBuffer(file),
		   reader.onload = function(){
		       console.dir(this);
		       upload(this.result,file.name)
		   },reader.onabort = function(){
		       console.dir("read file abort");
		   },reader.onerror = function(){
		       console.dir("read file error");
		   },reader.onloadstart = function(){
		       console.dir("read file start");
		   },reader.onloadend = function(){
		       console.dir("read file end");
		   },reader.onprogress = function(e){
		       e.loaded;
		       console.dir(["onprogress:", e.loaded]);
		   });

    function upload(binary, filename){
	console.dir([binary,filename])
	
	var form = new FormData();
	console.dir(form)
	form.append("data",file);
	form.append("name", "Test");
	form.append("md5", "test");
	
	var xhr = new XMLHttpRequest();
	xhr.open("POST", "/upload");


	// xhr.overrideMimeType("application/octet-stream");
	// xhr.setRequestHeader("Content-Type", "multipart/form-data");
	
	xhr.send(form)
	
	xhr.onload = function(){
	    console.dir(xhr.response);
	    var res = JSON.parse(xhr.response);
	    if(res.status === 'success')
		console.dir("upload success")
	    else
		console.dir("upload error")
	    
	}
	
    }
}

