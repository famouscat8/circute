// post 界面左边界面切换工厂

class Base{
    constructor(className){
	this.rootView = document
	    .getElementsByClassName(className)[0];
    }
    init(childViewClassName){
	this.rootView.innerHTML=
	    `<div class="`+childViewClassName+`"></div>`;
    }
}

class Artical extends Base{
    constructor(className){
	super(className);
    } 
    init(booksname='我的文章'){
	super.init("artical");
	var articalView = document
	    .getElementsByClassName("artical")[0];
	articalView.innerHTML=
	    `<div class="artical-list-header">
            `+booksname+`</div><list-artical></list-artical>`;
    }
}

class Books extends Base{
    constructor(className){
	super(className);
    } 
    init(){
	super.init("books");
	var booksView = document
	    .getElementsByClassName("books")[0];
	booksView.innerHTML=
	    `<div class="books-list-header">
            我的文集</div><list-books></list-books>`;
    }
}

class Draft extends Base{
    constructor(className){
	super(className);
    }
    init(){
	super.init("draft");
	var draftView = document
	    .getElementsByClassName('draft')[0];
	draftView.innerHTML=`<div class="draft-list-header">
        我的草稿</div>test`;
    }
}

class Trash extends Base{
    constructor(className){
	super(className);
    }
    init(){
	super.init("trash");
	var booksView = document
	    .getElementsByClassName("trash")[0];
	booksView.innerHTML=
	    `<div class="trash-list-header">
            回收站</div><list-trash></list-trash>`;
    }
}

class Settings extends Base {
    constructor(className){
	super(className);
    }
    init(){
	super.init("settings");
	var booksView = document
	    .getElementsByClassName("settings")[0];
	booksView.innerHTML=
	    `<div class="settings-list-header">
            设置</div><list-settings></list-settings>`;
    }
}
