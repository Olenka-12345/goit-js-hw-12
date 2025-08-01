(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))f(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const d of o.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&f(d)}).observe(document,{childList:!0,subtree:!0});function t(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function f(e){if(e.ep)return;e.ep=!0;const o=t(e);fetch(e.href,o)}})();let c=1,u="";const a=document.querySelector(".gallery"),s=document.querySelector(".load-more-btn"),l=document.querySelector(".loader");async function y(r,n=1){i(n);try{const t=await fetchFromPixabay(r,n);if(!t.hits||t.hits.length===0){a.innerHTML="<p>No images found. Try another search.</p>",i(null);return}p(t.hits),c=n,i(null)}catch(t){console.error("Error fetching images:",t),a.innerHTML="<p>Error loading images. Please try again.</p>",i(null)}}function p(r){const n=r.map(t=>`
    <div class="photo-card">
      <img src="${t.webformatURL}" alt="${t.tags}" loading="lazy" />
      <div class="info">
        <p><b>Likes:</b> ${t.likes}</p>
        <p><b>Views:</b> ${t.views}</p>
        <p><b>Comments:</b> ${t.comments}</p>
        <p><b>Downloads:</b> ${t.downloads}</p>
      </div>
    </div>
  `).join("");a.insertAdjacentHTML("beforeend",n)}function i(r){r===1?(s.style.display="none",l.style.display="none"):r===2?(s.style.display="block",l.style.display="none"):r>2?(s.style.display="none",l.style.display="block"):(s.style.display="none",l.style.display="none")}document.querySelector("form").addEventListener("submit",r=>{r.preventDefault(),a.innerHTML="",u=r.target.elements["search-text"].value.trim(),c=1,y(u,c)});s.addEventListener("click",()=>{y(u,c+1)});
//# sourceMappingURL=index.js.map
