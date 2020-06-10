const list_settings = document.createElement("template");

list_settings.innerHTML=`<div class="settings-test">
Welcome to Settings View</div>`;
var mlistSettings = null;
class ListSettings extends HTMLElement{
    constructor(){
	super();
	this.appendChild(list_settings.content.cloneNode(true));
	mlistSettings = this;
    }
    init(){
	
    }
}

window.customElements.define('list-settings',ListSettings);
