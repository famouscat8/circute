class VideoPlayer extends HTMLElement{
    constructor(){
	super();
	var container = document
	    .createElement("div");
	var player = document.createElement("div");
	player.className="f-video";
	var title = document
	    .createElement("small");
	title.className="title";
	
	container.appendChild(player);
	container.appendChild(title);
	this.appendChild(container);
	
	var url = this.getAttribute("src");
	var t= this.getAttribute("t");
	const sources = {
	    hd:{
		play_url:url,
	    },
	    sd:{
		play_url:url,
	    },
	}
	console.dir(sources);
	Griffith.createPlayer(player).render({sources});
	title.innerText =t;
	
    }
}


window.customElements.define("video-player",VideoPlayer);
