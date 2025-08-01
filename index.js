(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))u(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&u(c)}).observe(document,{childList:!0,subtree:!0});function t(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function u(e){if(e.ep)return;e.ep=!0;const r=t(e);fetch(e.href,r)}})();let l=1,d="";const f=document.querySelector(".gallery"),s=document.querySelector(".load-more-btn"),i=document.querySelector(".loader");async function y(o,n=1){a(n);try{const t=await fetchFromPixabay(o,n);p(t.hits),l=n,a(null)}catch(t){console.error("Error fetching images:",t),a(null)}}function p(o){const n=o.map(t=>`
    <div class="photo-card">
      <img src="${t.webformatURL}" alt="${t.tags}" loading="lazy" />
      <div class="info">
        <p><b>Likes:</b> ${t.likes}</p>
        <p><b>Views:</b> ${t.views}</p>
        <p><b>Comments:</b> ${t.comments}</p>
        <p><b>Downloads:</b> ${t.downloads}</p>
      </div>
    </div>
  `).join("");f.insertAdjacentHTML("beforeend",n)}function a(o){o===1?(s.style.display="block",i.style.display="none"):o>1?(s.style.display="none",i.style.display="block"):(s.style.display="block",i.style.display="none")}document.querySelector("form").addEventListener("submit",o=>{o.preventDefault(),f.innerHTML="",d=o.target.elements["search-text"].value.trim(),l=1,y(d,l)});s.addEventListener("click",()=>{y(d,l+1)});
//# sourceMappingURL=index.js.map
