(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))u(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&u(c)}).observe(document,{childList:!0,subtree:!0});function t(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function u(e){if(e.ep)return;e.ep=!0;const o=t(e);fetch(e.href,o)}})();let i=1,d="";const f=document.querySelector(".gallery"),s=document.querySelector(".load-more-btn"),l=document.querySelector(".loader");async function y(r,n=1){a(n);try{const t=await fetchFromPixabay(r,n);p(t.hits),i=n,a(null)}catch(t){console.error("Error fetching images:",t),a(null)}}function p(r){const n=r.map(t=>`
    <div class="photo-card">
      <img src="${t.webformatURL}" alt="${t.tags}" loading="lazy" />
      <div class="info">
        <p><b>Likes:</b> ${t.likes}</p>
        <p><b>Views:</b> ${t.views}</p>
        <p><b>Comments:</b> ${t.comments}</p>
        <p><b>Downloads:</b> ${t.downloads}</p>
      </div>
    </div>
  `).join("");f.insertAdjacentHTML("beforeend",n)}function a(r){r===1?(s.style.display="none",l.style.display="none"):r===2?(s.style.display="block",l.style.display="none"):r>2?(s.style.display="none",l.style.display="block"):(s.style.display="none",l.style.display="none")}document.querySelector("form").addEventListener("submit",r=>{r.preventDefault(),f.innerHTML="",d=r.target.elements["search-text"].value.trim(),i=1,y(d,i)});s.addEventListener("click",()=>{y(d,i+1)});
//# sourceMappingURL=index.js.map
