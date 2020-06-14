// index.html 的 js

$(()=>{
    var ajax = new MyAjax();
    var tools= new Tools();
    mMainList.init(ajax,tools);
    mcardFooter.init(mMainList.getNextPage,ajax,tools);
    
})




