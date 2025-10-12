(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&i(c)}).observe(document,{childList:!0,subtree:!0});function o(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(e){if(e.ep)return;e.ep=!0;const r=o(e);fetch(e.href,r)}})();async function n(){try{const t=await(await fetch("./json/tents.json")).json();l(t)}catch(s){console.error("Error loading products:",s)}}function l(s){const t=document.querySelector(".product-list");t.innerHTML=s.map(o=>`
      <li class="product-card">
        <a href="./product.html?id=${o.Id}">
          <img src="${o.Image.replace("../","./")}" alt="${o.Name}">
          <h2>${o.Name}</h2>
        </a>
        <p class="product-price">$${o.FinalPrice.toFixed(2)}</p>
      </li>
    `).join("")}n();
