import{a as d,S as y,i}from"./assets/vendor-5YrzWRhu.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&n(c)}).observe(document,{childList:!0,subtree:!0});function t(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(e){if(e.ep)return;e.ep=!0;const r=t(e);fetch(e.href,r)}})();const m="https://pixabay.com/api/",g="51504630-db9fa299e862fff98d3dacf4e";async function u(o,s=1,t=40){const n={key:g,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,page:s,per_page:t,lang:"uk"};try{return(await d.get(m,{params:n})).data}catch(e){throw console.error("❌ Помилка запиту до Pixabay API:",e.message),e}}const a=document.querySelector(".gallery"),h=new y(".gallery a");function b(){document.querySelector(".loader").style.display="block"}function l(){document.querySelector(".loader").style.display="none"}function f(o){if(!a)return;const s=o.map(t=>`
    <li class="gallery-item">
      <a href="${t.largeImageURL}">
        <img src="${t.webformatURL}" alt="${t.tags}" loading="lazy" />
      </a>
      <div class="info">
        <p><b>Likes:</b> ${t.likes}</p>
        <p><b>Views:</b> ${t.views}</p>
        <p><b>Comments:</b> ${t.comments}</p>
        <p><b>Downloads:</b> ${t.downloads}</p>
      </div>
    </li>
  `).join("");a.insertAdjacentHTML("beforeend",s),h.refresh()}function L(){a&&(a.innerHTML="")}const w="sunset";u(w).then(o=>{f(o.hits)}).catch(o=>{i.error({title:"Error",message:"Не вдалося отримати зображення. Спробуй ще раз!",position:"topRight"}),console.error(o)});const p=document.querySelector(".form"),P=p.elements["search-text"];p.addEventListener("submit",async o=>{o.preventDefault();const s=P.value.trim();if(s===""){i.warning({title:"Oops",message:"Please enter a search query!",position:"topRight"});return}L(),b();try{const t=await u(s);if(l(),t.hits.length===0){i.error({title:"No Results",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}f(t.hits)}catch(t){l(),i.error({title:"Error",message:"Something went wrong. Please try again later.",position:"topRight"}),console.error(t)}});
//# sourceMappingURL=index.js.map
