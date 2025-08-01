(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))f(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&f(a)}).observe(document,{childList:!0,subtree:!0});function t(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function f(e){if(e.ep)return;e.ep=!0;const o=t(e);fetch(e.href,o)}})();let l=1,u="";const c=document.querySelector(".gallery"),i=document.querySelector(".load-more-btn"),d=document.querySelector(".loader");async function y(r,n=1){s(n);try{const t=await fetchFromPixabay(r,n);if(!t.hits||t.hits.length===0){c.innerHTML="<p>No images found. Try another search.</p>",s(null);return}p(t.hits),l=n,s(null)}catch(t){console.error("Error fetching images:",t),c.innerHTML="<p>Error loading images. Please try again.</p>",s(null)}}function p(r){const n=r.map(t=>`
    <div class="photo-card">
      <img src="${t.webformatURL}" alt="${t.tags}" loading="lazy" />
      <div class="info">
        <p><b>Likes:</b> ${t.likes}</p>
        <p><b>Views:</b> ${t.views}</p>
        <p><b>Comments:</b> ${t.comments}</p>
        <p><b>Downloads:</b> ${t.downloads}</p>
      </div>
    </div>
  `).join("");c.insertAdjacentHTML("beforeend",n)}function s(r){r===1?(i.style.display="none",d.style.display="none"):r===2?(i.style.display="block",d.style.display="none"):r>=3&&(i.style.display="none",d.style.display="block")}document.querySelector("form").addEventListener("submit",r=>{r.preventDefault(),c.innerHTML="",u=r.target.elements["search-text"].value.trim(),l=1,y(u,l)});i.addEventListener("click",()=>{y(u,l+1)});
//# sourceMappingURL=index.js.map
