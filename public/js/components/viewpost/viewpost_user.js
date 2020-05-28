const tem2 = document.createElement('template');
tem2.innerHTML=`<div class="puser" id="user">
	  <div class="usercontainer" id="container">
	    <div class="useravatar" id="useravatar">
	      <img class="avatar" id="avatar"/>
	    </div>
	    <div class="usermessage" id="usermessage">
	      <div class="userqu" id="userqu">
		<p class="pusername">FAMOUSCAT</p>
		<p class="usersign">我想带一人回云深不知处</p>
	      </div>
	      <div class="userstar" id="userstar">just for test</div>
	    </div>
	  </div>
	</div>`;

class Viewpost_User extends HTMLElement{
    constructor(){
	super();
	this.appendChild(tem2.content.cloneNode(true));
	
    }
}

window.customElements.define('viewpost-user', Viewpost_User);





