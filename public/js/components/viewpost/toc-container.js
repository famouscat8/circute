const _toc_container = document.createElement("template")

_toc_container.innerHTML=
    `<div class="toc-container">
      <p>目录:</p> <div class="toc"></div></div>`;

var mtocContainer=null;
class TocContainer extends HTMLElement{
    constructor(){
	super();
	this.appendChild(_toc_container.content.
			 cloneNode(true));
	mtocContainer=this;
    }
}


window.customElements.define("toc-container",TocContainer);

