import{a as g,S as b,i as a}from"./assets/vendor-b0d10f48.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))r(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const d of o.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&r(d)}).observe(document,{childList:!0,subtree:!0});function s(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(t){if(t.ep)return;t.ep=!0;const o=s(t);fetch(t.href,o)}})();function u(i,n,s=20){const r="https://pixabay.com/api/",t=new URLSearchParams({key:"32923501-8d8c5bf31ee0b7b85cce4fb99",q:i,image_type:"photo",orientation:"horizontal",page:n,per_page:s}),o=`${r}?${t.toString()}`;return g.get(o)}function f(i,n){return i.map((s,r)=>`<a class="section-item" data-source ="${r}" data-id=${s.id} href ='${s.largeImageURL}'> 
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
          </a>`).join("")}const c={theme:"light",timeout:3e3,title:"Sorry, there are no images matching your search query. Please try again!",titleSize:16,position:"topRight",progressBar:!0,displayMode:"once",transitionIn:"fadeInUp",close:!0},m=new b(".section-list a",{captionsData:"alt",captionPosition:"bottom",captionDelay:250,overlayOpacity:.3,widthRatio:.77,heightRatio:.919}),e={formEl:document.querySelector(".section-form"),listEl:document.querySelector(".section-list"),textEl:document.querySelector(".section-text"),btnEl:document.querySelector(".section-more-btn")},E=65,p=15,h=Math.ceil(E/p);let l=1;e.formEl.addEventListener("input",L);function L(i){i.target.tagName==="INPUT"&&!i.target.value.trim()&&alert("Please fill the form - input.")}e.formEl.addEventListener("submit",v);async function v(i){i.preventDefault();const n=i.target.elements.btnSubmit;n.disabled=!0,e.listEl.innerHTML="";const s=i.target.elements.query.value;if(s)try{e.textEl.classList.remove("hidden");const t=(await u(s,l,p)).data;if(!t.hits.length){a.error(c),e.textEl.classList.add("hidden");return}if(l>=h){e.btnEl.style.display="none";return}const o=f(t.hits,l);e.listEl.insertAdjacentHTML("beforeend",o),m.refresh(),setTimeout(()=>{e.textEl.classList.add("hidden"),e.textEl.style.order=1,e.btnEl.style.display="block",y(".section-list")},1e3)}catch(r){a.error(c),e.textEl.classList.add("hidden"),console.log(r.message)}finally{n.disabled=!1}}e.btnEl.addEventListener("click",S);async function S(i){e.btnEl.disabled=!0,l++;const n=e.formEl.elements.query.value;try{e.textEl.classList.remove("hidden");const r=(await u(n,l,p)).data;if(console.log(r.hits.length),l>h||r.hits.length===0){a.error({...c,title:"We're sorry, there are no more posts to load."}),e.btnEl.style.display="none",e.textEl.classList.add("hidden");return}e.btnEl.style.display="none";const t=f(r.hits,l);e.listEl.insertAdjacentHTML("beforeend",t),m.refresh(),setTimeout(()=>{e.textEl.classList.add("hidden"),e.btnEl.style.display="block",y(".section-list")},1e3)}catch(s){a.error(c),e.textEl.classList.add("hidden"),e.btnEl.style.display="none",console.log(s)}finally{e.btnEl.disabled=!1}}function y(i){const n=document.querySelector(`${i}`).lastChild.clientHeight*2;window.scrollBy({top:n,left:0,behavior:"smooth"})}
//# sourceMappingURL=commonHelpers.js.map
