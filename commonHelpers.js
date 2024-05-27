import{a as h,S as y,i as a}from"./assets/vendor-b0d10f48.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&r(l)}).observe(document,{childList:!0,subtree:!0});function n(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(e){if(e.ep)return;e.ep=!0;const o=n(e);fetch(e.href,o)}})();function u(i,t,n){const r="https://pixabay.com/api/",e=new URLSearchParams({key:"32923501-8d8c5bf31ee0b7b85cce4fb99",q:i,image_type:"photo",orientation:"horizontal",page:t,per_page:n}),o=`${r}?${e.toString()}`;return h.get(o)}function f(i){return console.log(i.length),i.map(t=>`<a class="section-item" data-id=${t.id} href ='${t.largeImageURL}'> 
            <img 
            class="section-img"
            src="${t.webformatURL}"
            alt="${t.tags}"
            >
            <div class="section-soc">
             <div class="section-info">
                <p class="section-props">Likes</p>
                <span class="section-props-count">${t.likes}</span>
              </div>
              <div class="section-info">
                <p class="section-props">Views</p>
                <span class="section-props-count">${t.views}</span>
              </div>
              <div class="section-info">
                <p class="section-props">Comments</p>
                <span class="section-props-count">${t.comments}</span>
              </div>
              <div class="section-info">
                <p class="section-props">Downloads</p>
                <span class="section-props-count">${t.downloads}</span>
              </div>
            </div>
          </a>`).join("")}const p={theme:"light",timeout:3e3,title:"Sorry, there are no images matching your search query. Please try again!",titleSize:16,position:"topRight",progressBar:!0,displayMode:"once",transitionIn:"fadeInUp",close:!0},m=new y(".section-list a",{captionsData:"alt",captionPosition:"bottom",captionDelay:250,overlayOpacity:.3,widthRatio:.77,heightRatio:.919}),s={formEl:document.querySelector(".section-form"),listEl:document.querySelector(".section-list"),textEl:document.querySelector(".section-text"),btnEl:document.querySelector(".section-more-btn")},d=30,g=Math.ceil(90/d);let c=1;s.formEl.addEventListener("submit",i=>{i.preventDefault(),s.listEl.innerHTML="";const t=i.target.elements.query.value;t&&u(t,c,d).then(n=>{const r=n.data;if(!r.hits.length){a.error(p);return}const e=f(r.hits);s.textEl.classList.remove("hidden"),s.listEl.insertAdjacentHTML("beforeend",e),m.refresh(),setTimeout(()=>{s.textEl.classList.add("hidden"),s.textEl.style.order=1,s.btnEl.style.display="block"},1e3)}).catch(n=>{a.error(p),console.log(n)})});s.btnEl.addEventListener("click",b);function b(i){i.preventDefault(),c++;const t=s.formEl.elements.query.value;u(t,c,d).then(n=>{if(c>g){a.error({position:"topRight",message:"We're sorry, there are no more posts to load"}),s.btnEl.style.display="none";return}const r=n.data;s.btnEl.style.display="none",s.textEl.classList.remove("hidden");const e=f(r.hits);s.listEl.insertAdjacentHTML("beforeend",e),m.refresh(),setTimeout(()=>{s.textEl.classList.add("hidden"),s.btnEl.style.display="block"},1e3)}).catch(n=>{a.error(p),s.textEl.classList.add("hidden"),s.btnEl.style.display="none",console.log(n)})}
//# sourceMappingURL=commonHelpers.js.map
