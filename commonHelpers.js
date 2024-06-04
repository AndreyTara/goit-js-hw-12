import{a as E,S as L,i as l}from"./assets/vendor-b0d10f48.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const i of e)if(i.type==="childList")for(const p of i.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&r(p)}).observe(document,{childList:!0,subtree:!0});function s(e){const i={};return e.integrity&&(i.integrity=e.integrity),e.referrerPolicy&&(i.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?i.credentials="include":e.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(e){if(e.ep)return;e.ep=!0;const i=s(e);fetch(e.href,i)}})();function f(n,o,s=20){const r="https://pixabay.com/api/",e=new URLSearchParams({key:"32923501-8d8c5bf31ee0b7b85cce4fb99",q:n,image_type:"photo",orientation:"horizontal",page:o,per_page:s}),i=`${r}?${e.toString()}`;return E.get(i)}function m(n,o){return n.map((s,r)=>`<a class="section-item" data-source ="${r}" data-id=${s.id} href ='${s.largeImageURL}'> 
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
          </a>`).join("")}const c={theme:"light",timeout:3e3,title:"Sorry, there are no images matching your search query. Please try again!",titleSize:16,position:"topRight",progressBar:!0,displayMode:"once",transitionIn:"fadeInUp",close:!0},h=new L(".section-list a",{captionsData:"alt",captionPosition:"bottom",captionDelay:250,overlayOpacity:.3,widthRatio:.77,heightRatio:.919}),t={formEl:document.querySelector(".section-form"),listEl:document.querySelector(".section-list"),textEl:document.querySelector(".section-text"),btnEl:document.querySelector(".section-more-btn")};let y=500;const d=15;let u=g(y,d);function g(n,o){return Math.ceil(n/o)}let a=1;t.formEl.addEventListener("submit",v);async function v(n){n.preventDefault();const o=n.target.elements.btnSubmit;o.disabled=!0,t.listEl.innerHTML="";const s=n.target.elements.query.value;if(s)try{t.textEl.classList.remove("hidden");const e=(await f(s,a,d)).data;if(e.totalHits<y&&(u=g(e.totalHits,d)),!e.hits.length){l.error(c),t.textEl.classList.add("hidden");return}const i=m(e.hits,a);if(t.listEl.insertAdjacentHTML("beforeend",i),h.refresh(),a>=u){l.error({...c,title:"We're sorry, there are no more posts to load."}),t.btnEl.style.display="none",t.textEl.classList.add("hidden");return}setTimeout(()=>{t.textEl.classList.add("hidden"),t.textEl.style.order=1,t.btnEl.style.display="block",b(".section-list")},1e3)}catch(r){l.error(c),t.textEl.classList.add("hidden"),console.log(r.message)}finally{o.disabled=!1}}t.btnEl.addEventListener("click",x);async function x(n){t.btnEl.disabled=!0,a++;const o=t.formEl.elements.query.value;try{t.textEl.classList.remove("hidden");const r=(await f(o,a,d)).data;t.btnEl.style.display="none";const e=m(r.hits,a);if(t.listEl.insertAdjacentHTML("beforeend",e),h.refresh(),a>=u){l.error({...c,title:"We're sorry, there are no more posts to load."}),t.btnEl.style.display="none",t.textEl.classList.add("hidden");return}setTimeout(()=>{t.textEl.classList.add("hidden"),t.btnEl.style.display="block",b(".section-list")},1e3)}catch(s){l.error(c),t.textEl.classList.add("hidden"),t.btnEl.style.display="none",console.log(s)}finally{t.btnEl.disabled=!1}}function b(n){const o=document.querySelector(`${n}`).lastChild.clientHeight*2;window.scrollBy({top:o,left:0,behavior:"smooth"})}
//# sourceMappingURL=commonHelpers.js.map
