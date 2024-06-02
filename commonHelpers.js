import{a as g,S as E,i as l}from"./assets/vendor-b0d10f48.js";(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))r(t);new MutationObserver(t=>{for(const n of t)if(n.type==="childList")for(const c of n.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&r(c)}).observe(document,{childList:!0,subtree:!0});function s(t){const n={};return t.integrity&&(n.integrity=t.integrity),t.referrerPolicy&&(n.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?n.credentials="include":t.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(t){if(t.ep)return;t.ep=!0;const n=s(t);fetch(t.href,n)}})();function u(o,i,s=20){const r="https://pixabay.com/api/",t=new URLSearchParams({key:"32923501-8d8c5bf31ee0b7b85cce4fb99",q:o,image_type:"photo",orientation:"horizontal",page:i,per_page:s}),n=`${r}?${t.toString()}`;return g.get(n)}function f(o,i){return o.map((s,r)=>`<a class="section-item" data-source ="${r}" data-id=${s.id} href ='${s.largeImageURL}'> 
            <img 
            class="section-img"
            src="${s.webformatURL}"
            alt="${s.tags}"
            >
            <div class="section-soc">
             <div class="section-info">
                <p class="section-props">Likes</p>
                <span class="section-props-count">${s.likes}</span>
              </div>
              <div class="section-info">
                <p class="section-props">Views</p>
                <span class="section-props-count">${s.views}</span>
              </div>
              <div class="section-info">
                <p class="section-props">Comments</p>
                <span class="section-props-count">${s.comments}</span>
              </div>
              <div class="section-info">
                <p class="section-props">Downloads</p>
                <span class="section-props-count">${s.downloads}</span>
              </div>
            </div>
          </a>`).join("")}const d={theme:"light",timeout:3e3,title:"Sorry, there are no images matching your search query. Please try again!",titleSize:16,position:"topRight",progressBar:!0,displayMode:"once",transitionIn:"fadeInUp",close:!0},m=new E(".section-list a",{captionsData:"alt",captionPosition:"bottom",captionDelay:250,overlayOpacity:.3,widthRatio:.77,heightRatio:.919}),e={formEl:document.querySelector(".section-form"),listEl:document.querySelector(".section-list"),textEl:document.querySelector(".section-text"),btnEl:document.querySelector(".section-more-btn")},b=45,p=15,h=Math.ceil(b/p);let a=1;e.formEl.addEventListener("input",function(o){o.target.tagName==="INPUT"&&!o.target.value.trim()&&alert("Please fill the form - input.")});e.formEl.addEventListener("submit",async o=>{o.preventDefault(),e.listEl.innerHTML="";const i=o.target.elements.query.value;if(i)try{e.textEl.classList.remove("hidden");const r=(await u(i,a,p)).data;if(!r.hits.length){l.error(d),e.textEl.classList.add("hidden");return}if(a>=h){e.btnEl.style.display="none";return}const t=f(r.hits,a);e.listEl.insertAdjacentHTML("beforeend",t),m.refresh(),setTimeout(()=>{e.textEl.classList.add("hidden"),e.textEl.style.order=1,e.btnEl.style.display="block",y(".section-list")},1e3)}catch(s){l.error(d),e.textEl.classList.add("hidden"),console.log(s.message)}finally{}});e.btnEl.addEventListener("click",v);async function v(o){e.btnEl.disabled=!0,o.preventDefault(),a++;const i=e.formEl.elements.query.value;try{if(a>h){l.error({position:"topRight",message:"We're sorry, there are no more posts to load"}),e.btnEl.style.display="none";return}e.textEl.classList.remove("hidden");const r=(await u(i,a,p)).data;e.btnEl.style.display="none";const t=f(r.hits,a);e.listEl.insertAdjacentHTML("beforeend",t),m.refresh(),setTimeout(()=>{e.textEl.classList.add("hidden"),e.btnEl.style.display="block",y(".section-list")},1e3)}catch(s){l.error(d),e.textEl.classList.add("hidden"),e.btnEl.style.display="none",console.log(s)}finally{e.btnEl.disabled=!1}}function y(o){const i=document.querySelector(`${o}`).lastChild.clientHeight*2;window.scrollBy({top:i,left:0,behavior:"smooth"})}
//# sourceMappingURL=commonHelpers.js.map
