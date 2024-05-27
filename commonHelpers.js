import{S as p,i as a}from"./assets/vendor-8c59ed88.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&n(c)}).observe(document,{childList:!0,subtree:!0});function o(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(t){if(t.ep)return;t.ep=!0;const s=o(t);fetch(t.href,s)}})();function d(i){const e="https://pixabay.com/api/",o=new URLSearchParams({key:"32923501-8d8c5bf31ee0b7b85cce4fb99",q:i,image_type:"photo",orientation:"horizontal"}),n=`${e}?${o.toString()}`;return fetch(n).then(t=>t.json())}function u(i){return i.map(e=>`<a class="section-item" data-id=${e.id} href ='${e.largeImageURL}'> 
            <img 
            class="section-img"
            src="${e.webformatURL}"
            alt="${e.tags}"
            >
            <div class="section-soc">
             <div class="section-info">
                <p class="section-props">Likes</p>
                <span class="section-props-count">${e.likes}</span>
              </div>
              <div class="section-info">
                <p class="section-props">Views</p>
                <span class="section-props-count">${e.views}</span>
              </div>
              <div class="section-info">
                <p class="section-props">Comments</p>
                <span class="section-props-count">${e.comments}</span>
              </div>
              <div class="section-info">
                <p class="section-props">Downloads</p>
                <span class="section-props-count">${e.downloads}</span>
              </div>
            </div>
          </a>`).join("")}const l={theme:"light",timeout:3e3,title:"Sorry, there are no images matching your search query. Please try again!",titleSize:16,position:"topRight",progressBar:!0,displayMode:"once",transitionIn:"fadeInUp",close:!0},f=new p(".section-list a",{captionsData:"alt",captionPosition:"bottom",captionDelay:250,overlayOpacity:.3,widthRatio:.77,heightRatio:.919}),r={formEl:document.querySelector(".section-form"),listEl:document.querySelector(".section-list"),textEl:document.querySelector(".section-text")};r.formEl.addEventListener("submit",i=>{i.preventDefault(),r.listEl.innerHTML="";const e=i.target.elements.query.value;e&&d(e).then(o=>{if(!o.hits.length){a.error(l);return}const n=u(o.hits);r.textEl.classList.remove("hidden"),r.listEl.insertAdjacentHTML("beforeend",n),f.refresh(),setTimeout(()=>{r.textEl.classList.add("hidden")},1e3)}).catch(o=>{a.error(l),console.log(o)})});
//# sourceMappingURL=commonHelpers.js.map
