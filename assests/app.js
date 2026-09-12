
/* =====================================================================
   AHA RESOURCES PVT: application JS (vanilla, no build step)
   ===================================================================== */
(function(){
"use strict";
const $=(s,c=document)=>c.querySelector(s), $$=(s,c=document)=>[...c.querySelectorAll(s)];
const esc=s=>String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]));
const BUSINESSES=window.BUSINESSES||[], GALLERY=window.GALLERY||[];
/* resolve embedded photo tokens (single-file build: one copy in window.PHOTOS) */
const PHOTOS=window.PHOTOS||{};
const R=s=>(typeof s==="string"&&s.startsWith("PH:"))?(PHOTOS[s.slice(3)]||s):s;
BUSINESSES.forEach(b=>{b.hero=R(b.hero);b.gallery=(b.gallery||[]).map(R);(b.offerings||[]).forEach(o=>o.img=R(o.img));});
GALLERY.forEach(p=>{p.src=R(p.src);});
$$("img[data-ph]").forEach(im=>{im.src=R("PH:"+im.dataset.ph);});
const money=(n,c)=> (c==="USD"?"$":"Rp ")+Number(n).toLocaleString("en-US");

/* ---------------- toast ---------------- */
let toastT;
function toast(msg){const t=$("#toast");t.innerHTML=msg;t.classList.add("show");clearTimeout(toastT);toastT=setTimeout(()=>t.classList.remove("show"),3600);}

/* ---------------- preloader ---------------- */
const pl=$("#preloader"), plFill=$("#plFill");
let plP=0; const plTick=setInterval(()=>{plP=Math.min(plP+Math.random()*22,96);plFill.style.width=plP+"%";},160);
function hidePreloader(){clearInterval(plTick);plFill.style.width="100%";document.body.classList.add("ready");$$(".count").forEach(el=>cio.observe(el));setTimeout(()=>pl.classList.add("done"),350);}
window.addEventListener("load",()=>setTimeout(hidePreloader,900));
setTimeout(hidePreloader,3800); // safety

/* ---------------- custom cursor ---------------- */
const dot=$("#cDot"), ring=$("#cRing");
let mx=innerWidth/2,my=innerHeight/2,rx=mx,ry=my;
addEventListener("mousemove",e=>{mx=e.clientX;my=e.clientY;dot.style.left=mx+"px";dot.style.top=my+"px";});
(function loop(){rx+=(mx-rx)*.14;ry+=(my-ry)*.14;ring.style.left=rx+"px";ring.style.top=ry+"px";requestAnimationFrame(loop);})();
document.addEventListener("mouseover",e=>{if(e.target.closest("a,button,.biz-card,.gal,.off"))ring.classList.add("hovering");});
document.addEventListener("mouseout",e=>{if(e.target.closest("a,button,.biz-card,.gal,.off"))ring.classList.remove("hovering");});

/* ---------------- header / progress / backtop / spy ---------------- */
const header=$("#siteHeader"), prog=$("#progress"), backTop=$("#backTop");
function onScroll(){
  const y=scrollY;
  header.classList.toggle("scrolled",y>40);
  backTop.classList.toggle("show",y>700);
  const h=document.documentElement.scrollHeight-innerHeight;
  prog.style.width=(h>0?(y/h*100):0)+"%";
}
addEventListener("scroll",onScroll,{passive:true});onScroll();
backTop.onclick=()=>scrollTo({top:0,behavior:"smooth"});

/* smooth in-page nav + drawer close */
const drawer=$("#drawer"), hamb=$("#hamb");
function closeDrawer(){drawer.classList.remove("open");hamb.classList.remove("open");}
hamb.onclick=()=>{drawer.classList.toggle("open");hamb.classList.toggle("open");};
/* ---------- SPA router: Home / About / Businesses / Investments / Gallery / Contact ---------- */
const ROUTES=["home","about","businesses","investments","gallery","contact"];
const TITLES={home:"AHA Resources Pvt | Connecting Resources, Creating Value",
about:"About · AHA Resources Pvt",businesses:"Our 11 Businesses · AHA Resources Pvt",
investments:"Investments · AHA Resources Pvt",gallery:"Gallery · AHA Resources Pvt",
contact:"Contact Us · AHA Resources Pvt"};
function setRoute(r,scroll){
  if(!ROUTES.includes(r))r="home";
  document.body.dataset.route=r;
  $$("[data-page]").forEach(el=>{
    const show=el.dataset.page.split(/\s+/).includes(r);
    if(show&&el.hidden){el.hidden=false;
      if(el.animate)el.animate([{opacity:0,transform:"translateY(16px)"},{opacity:1,transform:"none"}],
      {duration:650,easing:"cubic-bezier(.16,1,.3,1)"});
    }else el.hidden=!show;
  });
  $$("[data-route]").forEach(a=>a.classList.toggle("active",a.dataset.route===r));
  closeDrawer();
  if($("#bizView").classList.contains("open"))closeBiz();
  document.title=TITLES[r]||TITLES.home;
  const hsh="#/"+r;
  if(location.hash!==hsh)history.replaceState(null,"",hsh);
  window.scrollTo(0,0);
  if(scroll)setTimeout(()=>{const t=document.getElementById(scroll);if(t)t.scrollIntoView({behavior:"smooth"});},90);
  onScroll();
}
$$("[data-route]").forEach(a=>a.addEventListener("click",e=>{e.preventDefault();setRoute(a.dataset.route,a.dataset.scroll);}));
addEventListener("hashchange",()=>setRoute(location.hash.replace(/^#\/?/,"").split("?")[0]));
setRoute((location.hash||"").replace(/^#\/?/,"").split("?")[0]||"home");

/* ---------------- hero slideshow ---------------- */
const heroImgs=[
  {src:R("PH:island_aerial"),cap:"Heart Lagoon · Aerial"},
  {src:R("PH:komodo"),cap:"Komodo · Labuan Bajo"},
  {src:R("PH:raja_couple"),cap:"Raja Ampat"},
  {src:R("PH:beach_boats"),cap:"Jukung Boats · Sunrise"}
];
const heroBg=$("#heroBg"), heroDots=$("#heroDots");
let heroI=0, heroTimer;
heroImgs.forEach((h,i)=>{
  const d=document.createElement("div");d.className="hero-slide"+(i===0?" on":"");
  d.innerHTML=`<img src="${h.src}" alt="${esc(h.cap)}"/>`;heroBg.appendChild(d);
  const b=document.createElement("button");if(i===0)b.classList.add("on");
  b.setAttribute("aria-label",h.cap);b.onclick=()=>goHero(i,true);heroDots.appendChild(b);
});
function goHero(i,manual){
  heroI=(i+heroImgs.length)%heroImgs.length;
  $$(".hero-slide",heroBg).forEach((s,k)=>s.classList.toggle("on",k===heroI));
  $$("button",heroDots).forEach((b,k)=>{b.classList.remove("on");if(k===heroI){void b.offsetWidth;b.classList.add("on");}});
  const hCap=$("#heroCap"),hNum=$("#heroNum");
  if(hCap)hCap.textContent=heroImgs[heroI].cap;
  if(hNum)hNum.textContent=String(heroI+1).padStart(2,"0");
  if(manual){clearInterval(heroTimer);heroTimer=setInterval(()=>goHero(heroI+1),7000);}
}
heroTimer=setInterval(()=>goHero(heroI+1),7000);
const hTot=$("#heroTot");if(hTot)hTot.textContent=String(heroImgs.length).padStart(2,"0");

/* hero arch draw on load */
const arch=$("#archPath");
if(arch){const L=arch.getTotalLength();arch.style.strokeDasharray=L;arch.style.strokeDashoffset=L;
  setTimeout(()=>{arch.style.transition="stroke-dashoffset 2.4s cubic-bezier(.16,1,.3,1)";arch.style.strokeDashoffset="0";},1200);}

/* gold dust particles */
const cv=$("#particles"), ctx=cv.getContext("2d");
let parts=[];
function sizeCv(){cv.width=cv.offsetWidth;cv.height=cv.offsetHeight;}
sizeCv();addEventListener("resize",sizeCv);
for(let i=0;i<70;i++)parts.push({x:Math.random(),y:Math.random(),r:Math.random()*2.2+.6,s:Math.random()*.0009+.0002,o:Math.random()*.7+.15,ph:Math.random()*6.28});
(function drawP(t){
  ctx.clearRect(0,0,cv.width,cv.height);
  parts.forEach(p=>{
    p.y-=p.s; if(p.y<-.02){p.y=1.02;p.x=Math.random();}
    const tw=p.o*(0.6+0.4*Math.sin(t/900+p.ph));
    ctx.beginPath();ctx.arc(p.x*cv.width,p.y*cv.height,p.r,0,6.28);
    ctx.fillStyle=`rgba(212,169,78,${tw})`;ctx.fill();
  });
  requestAnimationFrame(drawP);
})(0);

/* ---------------- marquees ---------------- */
const mqItems=["Indonesia as Hub","International as Corridor","11 Integrated Verticals","Halal Tourism","Cruise Tourism","Motorcycle Tourism","Farm-to-Table","Blue Economy","PT PMA Facilitation","Profitability with Purpose"];
function fillMq(id){const el=document.getElementById(id);if(!el)return;const half=mqItems.map(t=>`<span>${esc(t)}</span>`).join("");el.innerHTML=half+half;}
fillMq("mq1");fillMq("mq2");

/* ---------------- reveal on scroll ---------------- */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target);}}),{threshold:.12});
$$(".rv,.rv-left,.rv-right,.rv-scale").forEach(el=>io.observe(el));
$$(".clip").forEach(el=>{if(el.parentElement)io.observe(el.parentElement)});
const jio=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");jio.unobserve(e.target);}}),{threshold:.25});
const journey=$("#journey");if(journey)jio.observe(journey);

/* ---------------- counters ---------------- */
const cio=new IntersectionObserver(es=>es.forEach(e=>{
  if(!e.isIntersecting)return;cio.unobserve(e.target);
  const el=e.target,to=+el.dataset.to,t0=performance.now(),dur=1600;
  (function step(t){const p=Math.min((t-t0)/dur,1),v=Math.round(to*(1-Math.pow(1-p,3)));
    el.textContent=v;if(p<1)requestAnimationFrame(step);})(t0);
}),{threshold:.5});
/* counters start observing when preloader lifts (see hidePreloader) */

/* ---------------- businesses: menus + grid ---------------- */
const catLabel={tourism:"Tourism",food:"Food & Farm",trade:"Trade",service:"Services"};
function minPrice(b){return Math.min(...b.offerings.map(o=>o.price));}
function renderMenus(){
  $("#bizDrop").innerHTML=BUSINESSES.map(b=>`<a href="#" data-biz="${b.slug}"><b>${b.no}</b>${esc(b.name)}</a>`).join("");
  $("#drawerBiz").innerHTML=BUSINESSES.map(b=>`<button data-biz="${b.slug}">${b.no} · ${esc(b.name)}</button>`).join("");
  $("#footBiz").innerHTML=BUSINESSES.slice(0,6).map(b=>`<button data-biz="${b.slug}">${esc(b.name)}</button>`).join("");
  document.addEventListener("click",e=>{
    const t=e.target.closest("[data-biz]");
    if(t){e.preventDefault();closeDrawer();openBiz(t.dataset.biz);}
  });
}
function bizCard(b){
  return `<article class="biz-card rv in" data-cat="${b.cat}" data-open="${b.slug}" tabindex="0" role="button" aria-label="${esc(b.name)}">
    <div class="biz-sheen"></div>
    <div class="biz-media"><span class="biz-no">${b.no}</span><span class="biz-cat">${catLabel[b.cat]||b.cat}</span>
    <img loading="lazy" src="${b.hero}" alt="${esc(b.name)}"/></div>
    <div class="biz-body"><div class="k">${esc(b.eyebrow)}</div><h3>${esc(b.name)}</h3><p>${esc(b.tagline)}</p>
    <div class="biz-foot"><div class="biz-price">From <b>${money(minPrice(b),b.currency)}</b></div>
    <span class="biz-go">Explore <i>→</i></span></div></div></article>`;
}
function renderFeat(){const f=$("#featGrid");if(!f)return;
  f.innerHTML=BUSINESSES.slice(0,6).map(bizCard).join("");
  $$(".biz-card",f).forEach(c=>{
    c.addEventListener("click",()=>openBiz(c.dataset.open));
    c.addEventListener("keydown",e=>{if(e.key==="Enter")openBiz(c.dataset.open);});
  });
}
/* homepage ecosystem index (brand labels -> business pages) */
const ECO_LABELS=[["travel-tourism","Travel & Tourism"],["hospitality","Hospitality & Accommodation"],
["restaurants","Restaurants & Café"],["retail","Retail & Mini Mart"],["automotive","Automotive Services"],
["agriculture","Agriculture & Farm Ventures"],["fisheries","Fisheries & Aquaculture"],
["international-trade","Import, Export & International Trade"],["healthcare","Healthcare & Pharmacy"],
["legal-corporate","Legal, Corporate & Business Consultancy"],["training","Corporate & Professional Training"]];
function renderEco(){const box=$("#ecoList");if(!box)return;
  box.innerHTML=ECO_LABELS.map(([slug,label],i)=>{
    const b=BUSINESSES.find(x=>x.slug===slug)||{};
    return `<button class="eco-row rv" data-biz="${slug}"><span class="n">${String(i+1).padStart(2,"0")}</span>`
    +`<span><b>${label}</b><i>${esc(b.tagline||"")}</i></span><span class="a">→</span></button>`;
  }).join("");
  $$("#ecoList .eco-row").forEach(el=>io.observe(el));
}
function renderGrid(){
  $("#bizGrid").innerHTML=BUSINESSES.map(bizCard).join("");
  /* tilt */
  if(matchMedia("(hover:hover)").matches){
    $$(".biz-card").forEach(card=>{
      card.addEventListener("mousemove",e=>{
        const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
        card.style.transform=`perspective(900px) rotateY(${x*7}deg) rotateX(${-y*7}deg) translateY(-6px)`;
      });
      card.addEventListener("mouseleave",()=>card.style.transform="");
    });
  }
  $$(".biz-card").forEach(c=>{
    c.addEventListener("click",()=>openBiz(c.dataset.open));
    c.addEventListener("keydown",e=>{if(e.key==="Enter")openBiz(c.dataset.open);});
  });
}
renderMenus();renderGrid();renderFeat();renderEco();
/* filters */
$("#filters").addEventListener("click",e=>{
  const btn=e.target.closest(".fbtn");if(!btn)return;
  $$(".fbtn").forEach(b=>b.classList.remove("on"));btn.classList.add("on");
  const f=btn.dataset.f;
  $$(".biz-card").forEach(c=>{
    const show=f==="all"||c.dataset.cat===f||(f==="services"&&c.dataset.cat==="service");
    c.classList.remove("hide");
    if(!show){c.classList.add("hide");}
    else{c.style.animation="none";void c.offsetWidth;c.style.animation="popTick .5s cubic-bezier(.16,1,.3,1)";}
  });
});

/* ---------------- gallery ---------------- */
let galShown=12, galCat="all", galList=[];
function renderGal(){
  const g=$("#galGrid");
  const pool=galCat==="all"?GALLERY:GALLERY.filter(p=>p.cat===galCat);
  galList=pool.slice(0,galShown);
  g.innerHTML=galList.map((p,i)=>`<figure class="gal rv in" data-i="${i}">
    <img loading="lazy" src="${p.src}" alt="${esc(p.alt)}"/><span class="plus">+</span><figcaption>${esc(p.alt)}</figcaption></figure>`).join("");
  $$(".gal",g).forEach(el=>el.onclick=()=>openLb(+el.dataset.i));
  $("#galMore").style.display=galShown>=pool.length?"none":"";
  $("#galMore").innerHTML=`View All ${pool.length} Photos <span class='arr'>→</span>`;
}
renderGal();
$("#galMore").onclick=()=>{galShown=(galCat==="all"?GALLERY:GALLERY.filter(p=>p.cat===galCat)).length;renderGal();};
$("#galFilters").addEventListener("click",e=>{
  const b=e.target.closest("[data-gf]");if(!b)return;
  $$("#galFilters .fbtn").forEach(x=>x.classList.remove("on"));b.classList.add("on");
  galCat=b.dataset.gf;galShown=12;renderGal();
});

/* lightbox */
const lb=$("#lightbox"), lbImg=$("#lbImg"), lbCap=$("#lbCap");
let lbI=0;
function openLb(i){lbI=i;const p=(galList.length?galList:GALLERY)[i];lbImg.src=p.src;lbImg.alt=p.alt;lbCap.textContent=p.alt;lb.classList.add("open");document.body.style.overflow="hidden";}
function closeLb(){if(!lb.classList.contains("open"))return;lb.classList.remove("open");if(!$("#bizView").classList.contains("open"))document.body.style.overflow="";}
lb.addEventListener("click",e=>{if(e.target.closest("[data-close]")||e.target===lb)closeLb();});
addEventListener("keydown",e=>{
  if(e.key==="Escape"){closeLb();closeModal();if($("#bizView").classList.contains("open"))closeBiz();}
  if(lb.classList.contains("open")){const _gl=galList.length?galList:GALLERY;if(e.key==="ArrowRight")openLb((lbI+1)%_gl.length);if(e.key==="ArrowLeft")openLb((lbI-1+_gl.length)%_gl.length);}
});

/* ---------------- testimonials ---------------- */
const testis=$$(".testi");let tI=0,tTimer;
function goT(i){tI=(i+testis.length)%testis.length;testis.forEach((t,k)=>t.classList.toggle("on",k===tI));}
function tAuto(){clearInterval(tTimer);tTimer=setInterval(()=>goT(tI+1),6000);}
$("#tNext").onclick=()=>{goT(tI+1);tAuto();};$("#tPrev").onclick=()=>{goT(tI-1);tAuto();};tAuto();

/* ---------------- forms ---------------- */
function bookingRef(){return "AHA-"+Date.now().toString(36).toUpperCase().slice(-6);}
function saveBooking(b){try{const k="aha_bookings",a=JSON.parse(localStorage.getItem(k)||"[]");a.unshift(b);localStorage.setItem(k,JSON.stringify(a.slice(0,30)));}catch(e){}}
$("#centralForm").addEventListener("submit",e=>{
  e.preventDefault();
  const f=e.target, ref=bookingRef();
  saveBooking({ref,vertical:f.querySelector("select").value,name:f.querySelectorAll("input")[2]?.value||"",at:new Date().toISOString(),via:"central"});
  toast(`✓ <b>Booking received: ${ref}.</b><br/>Our team responds within 6 hours. No payment required now.`);
  f.reset();
});
$("#newsForm").addEventListener("submit",e=>{e.preventDefault();const em=e.target.querySelector("input").value;toast(`✓ Subscribed: <b>${esc(em)}</b>. Corridor updates on the way.`);e.target.reset();});
$$(".news-card .more").forEach(m=>m.parentElement.parentElement.addEventListener("click",()=>toast("Full story coming soon in our media room. Subscribe below for updates.")));
$("#year").textContent=new Date().getFullYear();

/* ---------------- business detail overlay ---------------- */
const bv=$("#bizView");
let currentBiz=null, searchState={date:"",guests:"2"};
function openBiz(slug){
  const b=BUSINESSES.find(x=>x.slug===slug);if(!b)return;currentBiz=b;searchState={date:"",guests:"2"};
  bv.innerHTML=`
  <button class="bv-close" onclick="window.__closeBiz()">← All Businesses</button>
  <div class="bv-hero"><img class="bg" src="${b.hero}" alt="${esc(b.name)}"/>
    <div class="wrap bv-in"><div class="bv-no">${b.no} · ${esc(b.eyebrow)}</div>
      <h2>${esc(b.name)}</h2><div class="bv-tag">${esc(b.tagline)}</div>
      <div style="display:flex;gap:10px;margin-top:22px;flex-wrap:wrap">
        <button class="btn btn-gold" onclick="document.getElementById('bv-book').scrollIntoView({behavior:'smooth'})">Book Now <span class="arr">→</span></button>
        <button class="btn btn-ghost" onclick="document.getElementById('bv-overview').scrollIntoView({behavior:'smooth'})">Overview</button>
      </div></div></div>
  <div class="bv-tabs">
    <button class="on" data-t="bv-overview">Overview</button><button data-t="bv-gallery">Gallery</button>
    <button data-t="bv-book">Book (${b.offerings.length})</button><button data-t="bv-more">Ecosystem</button>
  </div>
  <div class="wrap">
    <div class="bv-sec" id="bv-overview"><div class="bv-grid2">
      <div><span class="eyebrow">${esc(b.eyebrow)}</span>
        <p class="lead" style="margin-top:18px;color:var(--ink);font-weight:300;font-size:17px">${esc(b.intro)}</p>
        <p style="margin-top:14px;font-size:13px;letter-spacing:.14em;color:var(--gold-dark);text-transform:uppercase">◈ ${esc(b.location||"Indonesia")}</p>
        <div class="hl-chips">${(b.highlights||[]).map(h=>`<span>✓ ${esc(h)}</span>`).join("")}</div>
        <div class="opp-box"><h4>${esc(b.opportunity?.title||"Future Opportunity")}</h4><p>${esc(b.opportunity?.body||"")}</p></div>
      </div>
      <div><h3 style="font-family:var(--font-d);font-size:26px;color:var(--navy)">${esc(b.services?.title||"Services")}</h3>
        <ul class="svc-list">${(b.services?.items||[]).map(s=>`<li>${esc(s)}</li>`).join("")}</ul></div>
    </div></div>
    <div class="bv-sec" id="bv-gallery" style="padding-top:0">
      <span class="eyebrow">Gallery</span>
      <h3 style="font-family:var(--font-d);font-size:32px;color:var(--navy);margin:12px 0 22px">A closer look</h3>
      <div class="bv-gal">${(b.gallery||[]).map((g,i)=>`<img loading="lazy" src="${g}" alt="${esc(b.name)} ${i+1}" data-g="${i}"/>`).join("")}</div>
    </div>
    <div class="bv-sec" id="bv-book" style="padding-top:0">
      <span class="eyebrow">Live Booking</span>
      <h3 style="font-family:var(--font-d);font-size:32px;color:var(--navy);margin:12px 0 6px">${esc(b.bookingTitle||("Book "+b.name))}</h3>
      <p style="color:var(--muted);font-weight:300;font-size:14px">${esc(b.bookingSubtitle||"Free cancellation · Pay at destination · 6-hour response.")}</p>
      <div class="book-bar">
        <div><label>${b.bookingMode==="range"?"Check-in / Start":"Date"}</label><input type="text" onfocus="(this.type='date')" id="bkDate" placeholder="Select date"/></div>
        <div><label>${esc(b.guestLabel||"Guests")}</label><input id="bkGuests" value="2" placeholder="2"/></div>
        <div><label>${esc(b.offeringsLabel||"Options")} (${b.offerings.length})</label><select id="bkSort"><option value="pop">Sort: Recommended</option><option value="lo">Price: Low → High</option><option value="hi">Price: High → Low</option><option value="rate">Top Rated</option></select></div>
        <div><button class="btn btn-navy" id="bkSearch" style="padding:14px 28px">Search →</button></div>
      </div>
      <div class="off-grid" id="offGrid"></div>
    </div>
    <div class="bv-sec" id="bv-more" style="padding-top:0">
      <span class="eyebrow">Keep Exploring</span>
      <h3 style="font-family:var(--font-d);font-size:32px;color:var(--navy);margin:12px 0 6px">Other Businesses in the Ecosystem</h3>
      <div class="other-biz">${BUSINESSES.filter(x=>x.slug!==b.slug).slice(0,4).map(o=>`<button data-biz="${o.slug}"><img loading="lazy" src="${o.hero}" alt="${esc(o.name)}"/><span>${o.no} · ${esc(o.name)}</span></button>`).join("")}</div>
      <div style="text-align:center;margin:34px 0 20px"><button class="btn btn-line" onclick="window.__closeBiz()">← Back to all 11 businesses</button></div>
    </div>
  </div>`;
  bv.classList.add("open");bv.setAttribute("aria-hidden","false");
  bv.scrollTop=0;document.body.style.overflow="hidden";
  $$(".bv-tabs button",bv).forEach(t=>t.onclick=()=>{
    $$(".bv-tabs button",bv).forEach(x=>x.classList.remove("on"));t.classList.add("on");
    document.getElementById(t.dataset.t).scrollIntoView({behavior:"smooth"});
  });
  $$(".bv-gal img",bv).forEach(img=>img.onclick=()=>{
    lbImg.src=img.src;lbCap.textContent=currentBiz.name;lb.classList.add("open");
  });
  $("#bkSearch").onclick=()=>{
    searchState.date=$("#bkDate").value;searchState.guests=$("#bkGuests").value||"2";
    renderOffs();
    toast(`✓ Availability checked${searchState.date?` for <b>${esc(searchState.date)}</b>`:""} · <b>${esc(searchState.guests)} guest(s)</b> · ${currentBiz.offerings.length} options.`);
  };
  $("#bkSort").onchange=renderOffs;
  renderOffs();
}
window.__closeBiz=closeBiz;
function closeBiz(){bv.classList.remove("open");bv.setAttribute("aria-hidden","true");document.body.style.overflow="";closeLb();}
function renderOffs(){
  const b=currentBiz,sort=$("#bkSort")?.value||"pop";
  let offs=[...b.offerings];
  if(sort==="lo")offs.sort((a,c)=>a.price-c.price);
  if(sort==="hi")offs.sort((a,c)=>c.price-a.price);
  if(sort==="rate")offs.sort((a,c)=>c.rating-a.rating);
  if(sort==="pop")offs.sort((a,c)=>(c.popular?1:0)-(a.popular?1:0));
  $("#offGrid").innerHTML=offs.map(o=>`
    <div class="off"><div class="om"><img loading="lazy" src="${o.img}" alt="${esc(o.name)}"/>${o.badge?`<span class="badge">${esc(o.badge)}</span>`:""}</div>
    <div class="ob"><h4>${esc(o.name)}</h4><div class="od">${esc(o.desc)}</div>
      <ul>${(o.features||[]).map(f=>`<li>${esc(f)}</li>`).join("")}</ul>
      <div class="orow"><div class="rating"><b>${o.rating.toFixed(1)}</b>${o.reviews} reviews</div>
      <div class="pr">${o.oldPrice?`<s>${money(o.oldPrice,b.currency)}</s>`:""}<b>${money(o.price,b.currency)}</b> <span>/ ${esc(o.unit||"person")}</span></div></div>
      <button class="btn btn-gold" data-off="${o.id}">Reserve →</button></div></div>`).join("");
  $$("#offGrid [data-off]").forEach(btn=>btn.onclick=()=>openBookModal(btn.dataset.off));
}

/* ---------------- booking modal ---------------- */
const veil=$("#bookVeil"), bkBody=$("#bkBody"), bkTitle=$("#bkTitle"), bkSub=$("#bkSub");
function openBookModal(offId){
  const b=currentBiz,o=b.offerings.find(x=>x.id===offId);if(!o)return;
  bkTitle.textContent="Reserve: "+o.name;
  bkSub.textContent=`${b.name} · ${money(o.price,b.currency)} / ${o.unit||"person"}${searchState.date?` · ${searchState.date}`:""} · ${searchState.guests} guest(s)`;
  bkBody.innerHTML=`
    <div style="display:grid;grid-template-columns:110px 1fr;gap:16px;align-items:center;margin-bottom:20px">
      <img src="${o.img}" alt="" style="width:110px;height:84px;object-fit:cover"/>
      <div><b style="font-family:var(--font-d);font-size:19px;color:var(--navy)">${esc(o.name)}</b>
      <div style="font-size:12px;color:var(--muted)">${esc(o.desc).slice(0,90)}…</div></div></div>
    <form id="bkForm" class="form-light" style="display:grid;gap:12px">
      <div class="f-grid" style="margin:0">
        <div class="field"><label>Name *</label><input required placeholder="Full name"/></div>
        <div class="field"><label>Phone *</label><input required placeholder="Phone / WhatsApp"/></div>
      </div>
      <div class="field"><label>Email *</label><input required type="email" placeholder="Email address" style="width:100%;background:#fff;border:1px solid var(--line);padding:15px 16px;font-size:14px;outline:none;color:var(--ink)"/></div>
      <div class="field"><label>Notes</label><textarea placeholder="Requests: halal meals, airport pickup, honeymoon…" style="width:100%;background:#fff;border:1px solid var(--line);padding:15px 16px;font-size:14px;outline:none;color:var(--ink);min-height:90px"></textarea></div>
      <div style="background:var(--gold-wash);border:1px solid var(--line-gold);padding:14px 18px;font-size:13px;color:var(--navy)">Total estimate: <b style="font-family:var(--font-d);font-size:22px">${money(o.price*(+searchState.guests||1),b.currency)}</b> <span style="color:var(--muted)">· free cancellation · pay at destination</span></div>
      <button class="btn btn-gold" style="width:100%;justify-content:center">Confirm Reservation <span class="arr">→</span></button>
      <p style="font-size:11px;color:var(--faint);text-align:center">Stored locally &amp; sent to our team · Response within 6 hours · No payment now</p>
    </form>`;
  veil.classList.add("open");
  $("#bkForm").addEventListener("submit",e=>{
    e.preventDefault();
    const f=e.target,ref=bookingRef();
    saveBooking({ref,biz:b.slug,off:o.id,name:f.querySelectorAll("input")[0].value,at:new Date().toISOString()});
    bkBody.innerHTML=`<div class="confirm-box"><div class="tick-big">✓</div>
      <h4>Booking Confirmed!</h4>
      <p style="font-size:13px;color:var(--muted);margin-top:8px">${esc(b.name)} · ${esc(o.name)}<br/>${searchState.date?esc(searchState.date)+" · ":""}${esc(searchState.guests)} guest(s)</p>
      <div class="ref">REF · ${ref}</div>
      <p style="font-size:12px;color:var(--muted)">A confirmation is on its way. Our team will reach out within 6 hours.</p>
      <button class="btn btn-navy" data-close style="margin-top:18px">Done ✓</button></div>`;
  });
}
function closeModal(){veil.classList.remove("open");}
veil.addEventListener("click",e=>{if(e.target===veil||e.target.closest("[data-close]"))closeModal();});
document.addEventListener("click",e=>{if(e.target.closest("#bkBody [data-close]"))closeModal();});


/* ---------- cinematic hero: scroll + mouse parallax (inside app scope) ---------- */
if(!window.matchMedia||!matchMedia("(prefers-reduced-motion:reduce)").matches){
const homeSec=$("#home"), susImg=$(".sus>img");
let hyT=0,hyC=0,mxT=0,myT=0,mxC=0,myC=0,heroRaf=0;
function heroPose(){
  heroRaf=0;
  if(!homeSec||homeSec.hidden)return;
  const h=homeSec.offsetHeight||innerHeight;
  hyT=Math.min(Math.max(scrollY/h,0),1);
  hyC+=(hyT-hyC)*.14;mxC+=(mxT-mxC)*.08;myC+=(myT-myC)*.08;
  homeSec.style.setProperty("--hy",hyC.toFixed(3));
  homeSec.style.setProperty("--mx",mxC.toFixed(3));
  homeSec.style.setProperty("--my",myC.toFixed(3));
  if(susImg){const r=susImg.getBoundingClientRect();
    susImg.style.transform="translate3d(0,"+(-(r.top+r.height/2-innerHeight/2)*.08).toFixed(1)+"px,0)";}
  if(Math.abs(hyT-hyC)>.0004||Math.abs(mxT-mxC)>.0004||Math.abs(myT-myC)>.0004)heroRaf=requestAnimationFrame(heroPose);
}
function kickHero(){if(!heroRaf)heroRaf=requestAnimationFrame(heroPose)}
addEventListener("scroll",kickHero,{passive:true});
addEventListener("mousemove",e=>{mxT=e.clientX/innerWidth-.5;myT=e.clientY/innerHeight-.5;kickHero()},{passive:true});
addEventListener("resize",kickHero);
kickHero();
/* timelines draw on scroll */
const tio=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("drawn");tio.unobserve(e.target)}}),{threshold:.18});
$$(".tl").forEach(el=>tio.observe(el));
/* page-hero banners wipe in */
$$(".phero>img").forEach(el=>{el.classList.add("clip");if(el.parentElement)io.observe(el.parentElement)});
}
})();

