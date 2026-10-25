/* D 版小工具：封面後才顯示頂欄；獲獎照片加上圖說（雜誌攝影專題）。內容仍由 site.json 產生。 */
(function(){
  var cover=document.querySelector('.cover');
  if(cover&&'IntersectionObserver' in window){
    new IntersectionObserver(function(es){document.body.classList.toggle('past-cover',!es[0].isIntersecting);},{rootMargin:'-60px 0px 0px 0px'}).observe(cover);
  }
  var aw=document.querySelector('[data-render="awards"]'),n=0;
  function caps(){
    if(!aw||aw.querySelector('.cap'))return;
    var ps=aw.querySelectorAll('.tl-photo');if(!ps.length)return;
    ps.forEach(function(b){var im=b.querySelector('img');n++;var c=document.createElement('span');c.className='cap';c.innerHTML='<b>'+(n<10?'0':'')+n+'</b>';c.appendChild(document.createTextNode(im?im.alt:''));b.appendChild(c);});
  }
  if(aw){new MutationObserver(caps).observe(aw,{childList:true});caps();}
})();
