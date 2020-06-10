const list_trash = document.createElement("template");

list_trash.innerHTML=`<div class="trash-test">
Welcome to Trash View</div>`;
var mlistTrash = null;
class ListTrash extends HTMLElement{
    constructor(){
	super();
	this.appendChild(list_trash.content.cloneNode(true));
	mlistTrash = this;
    }
    init(){
	
    }
}

window.customElements.define('list-trash',ListTrash);
