import{a as y}from"./assets/vendor-BkCUij8E.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const d of n.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&s(d)}).observe(document,{childList:!0,subtree:!0});function e(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerPolicy&&(n.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?n.credentials="include":r.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(r){if(r.ep)return;r.ep=!0;const n=e(r);fetch(r.href,n)}})();const m="https://pixabay.com/api/",h="51504630-db9fa299e862fff98d3dacf4e";async function g(t,o=1){var e;try{return(await y.get(m,{params:{key:h,q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,page:o,per_page:15}})).data}catch(s){throw console.error("Pixabay API error:",((e=s.response)==null?void 0:e.data)||s.message),new Error("Failed to fetch images")}}let c=1,f="";const l=document.querySelector(".gallery"),i=document.querySelector(".load-more-btn"),u=document.querySelector(".loader");async function p(t,o=1){a(o);try{const e=await g(t,o);if(!e.hits||e.hits.length===0){l.innerHTML="<p>No images found. Try another search.</p>",a(null);return}b(e.hits),c=o,a(null)}catch(e){console.error("Error fetching images:",e),l.innerHTML="<p>Error loading images. Please try again.</p>",a(null)}}function b(t){const o=t.map(e=>`
    <div class="photo-card">
      <img src="${e.webformatURL}" alt="${e.tags}" loading="lazy" />
      <div class="info">
        <p><b>Likes:</b> ${e.likes}</p>
        <p><b>Views:</b> ${e.views}</p>
        <p><b>Comments:</b> ${e.comments}</p>
        <p><b>Downloads:</b> ${e.downloads}</p>
      </div>
    </div>
  `).join("");l.insertAdjacentHTML("beforeend",o)}function a(t){t===1?(i.style.display="none",u.style.display="none"):t===2?(i.style.display="block",u.style.display="none"):t>=3&&(i.style.display="none",u.style.display="block")}document.querySelector("form").addEventListener("submit",t=>{t.preventDefault(),l.innerHTML="",f=t.target.elements["search-text"].value.trim(),c=1,p(f,c)});i.addEventListener("click",()=>{p(f,c+1)});
//# sourceMappingURL=index.js.map
