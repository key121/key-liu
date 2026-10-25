/* E 版互動（原生 JS，無外部函式庫）：
   拆字進場、翻牌換詞、捲動進度與段落編號、跑馬燈隨捲動加速、數字跳動、媒體列表游標預覽、獲獎橫向拖曳。
   設定「減少動態效果」時全部停用，直接顯示最終畫面。內容仍由 site.json 產生。 */
(function(){
  var R=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  var FINE=window.matchMedia&&matchMedia('(hover:hover) and (pointer:fine)').matches;
  var $$=function(s,r){return [].slice.call((r||document).querySelectorAll(s));};

  // 1. split letters
  function split(el){var t=el.textContent;el.textContent='';Array.from(t).forEach(function(c,i){var s=document.createElement('span');s.className='ch';s.style.setProperty('--i',i);s.textContent=c;el.appendChild(s);});}
  $$('.split, .e-head .e-en').forEach(split);
  setTimeout(function(){document.body.classList.add('loaded');},60);

  // 2. flap word
  var ws=$$('.flap .fw'),k=0;
  function flip(){
    if(document.hidden)return;
    var cur=ws[k];k=(k+1)%ws.length;var nx=ws[k];
    cur.classList.remove('on');cur.classList.add('out');nx.classList.remove('out');nx.classList.add('on');
    setTimeout(function(){cur.classList.remove('out');},600);
  }
  if(!R&&ws.length>1)setTimeout(function(){flip();setInterval(flip,2400);},3200);

  // 3. progress bar + marquee speed
  var bar=document.querySelector('.e-progress i'),tracks=$$('.mq-track'),lastY=window.scrollY,boost=0,ticking=false;
  function frame(){
    var y=window.scrollY,H=document.documentElement.scrollHeight-innerHeight;
    if(bar)bar.style.transform='scaleX('+(H>0?Math.min(1,y/H):0)+')';
    if(!R){boost=Math.max(boost*0.9,Math.min(Math.abs(y-lastY)/12,5));
      tracks.forEach(function(t){var a=t.getAnimations&&t.getAnimations()[0];if(a)a.playbackRate=1+boost;});}
    lastY=y;
    if(boost>0.02&&!R)requestAnimationFrame(frame);else ticking=false;
  }
  window.addEventListener('scroll',function(){if(!ticking){ticking=true;requestAnimationFrame(frame);}},{passive:true});
  frame();

  // 4. section index
  var idx=document.querySelector('.e-idx');
  if(idx&&'IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){idx.querySelector('b').textContent=e.target.dataset.idx;idx.querySelector('span').textContent=e.target.dataset.label;}});},{rootMargin:'-45% 0px -54% 0px'});
    $$('[data-idx]').forEach(function(s){io.observe(s);});
  }

  // 5. count-up numbers (once rendered)
  function countUp(){
    var els=$$('.stat-big');if(!els.length||R||!('IntersectionObserver' in window))return;
    var o=new IntersectionObserver(function(es){es.forEach(function(e){
      if(!e.isIntersecting)return;o.unobserve(e.target);
      var el=e.target,txt=el.textContent,m=txt.match(/\d+/);
      if(!m||/[–-]/.test(txt))return;
      var to=+m[0],t0=performance.now();
      (function step(t){var p=Math.min(1,(t-t0)/1100),v=Math.round(to*(1-Math.pow(1-p,3)));el.textContent=p<1?txt.replace(m[0],v):txt;if(p<1)requestAnimationFrame(step);})(t0);
    });},{threshold:.4});
    els.forEach(function(el){o.observe(el);});
  }
  var st=document.querySelector('[data-render="stats"]');
  if(st){var mo=new MutationObserver(function(){if(st.children.length){mo.disconnect();countUp();}});mo.observe(st,{childList:true});}

  // 6. press cursor preview (desktop pointer only)
  var peek=document.querySelector('.e-peek'),pg=document.querySelector('.e-press .press-grid');
  if(FINE&&peek&&pg&&!R){
    var pimg=peek.querySelector('img'),tx=0,ty=0,cx=0,cy=0,run=false;
    function loop(){cx+=(tx-cx)*.18;cy+=(ty-cy)*.18;peek.style.transform='translate3d('+(cx+24)+'px,'+(cy-90)+'px,0) rotate(-2deg)';if(run)requestAnimationFrame(loop);}
    pg.addEventListener('mouseover',function(e){var c=e.target.closest('.press-card');if(!c)return;var im=c.querySelector('.press-media img');if(!im){peek.classList.remove('on');return;}if(pimg.src!==im.src)pimg.src=im.src;peek.classList.add('on');if(!run){run=true;cx=tx;cy=ty;loop();}});
    pg.addEventListener('mousemove',function(e){tx=e.clientX;ty=e.clientY;});
    pg.addEventListener('mouseleave',function(){peek.classList.remove('on');run=false;});
  }

  // 7. drag-to-scroll award reels (mouse only; touch scrolls natively)
  var moved=false;
  document.addEventListener('pointerdown',function(e){
    var tl=e.target.closest('.v-e .tl');if(!tl||e.pointerType!=='mouse')return;
    var x0=e.clientX,s0=tl.scrollLeft;moved=false;
    function mv(ev){var dx=ev.clientX-x0;if(Math.abs(dx)>5){moved=true;tl.classList.add('drag');}tl.scrollLeft=s0-dx;}
    function up(){tl.classList.remove('drag');document.removeEventListener('pointermove',mv);document.removeEventListener('pointerup',up);}
    document.addEventListener('pointermove',mv);document.addEventListener('pointerup',up);
  });
  document.addEventListener('click',function(e){if(moved&&e.target.closest('.tl')){e.stopPropagation();e.preventDefault();moved=false;}},true);
  document.addEventListener('dragstart',function(e){if(e.target.closest&&e.target.closest('.tl'))e.preventDefault();});
})();
