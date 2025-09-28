import{g as l,s as d}from"./utils-Dn-3GGK0.js";function o(){const a=l("so-cart")||[];console.log("Cart data:",a);const r=document.querySelector(".cart-items"),n=document.getElementById("cart-empty");if(!r){console.error("Cart items container (.cart-items) not found!");return}Array.isArray(a)&&a.length>0?(n.style.display="none",r.innerHTML=a.map((e,c)=>{var t,s;return`
      <li class="cart-card divider">
        <a href="#" class="cart-card__image">
          <img src="${e.Image?e.Image.replace("../images/tents/","/images/tents/"):"/images/noun_Tent_2517.svg"}" alt="${e.Name||"Cart Item"}">
        </a>
        <a href="#">
          <h2 class="card__name">${e.Name||"Unnamed Product"}</h2>
        </a>
        <p class="cart-card__color">${((s=(t=e.Colors)==null?void 0:t[0])==null?void 0:s.ColorName)||"N/A"}</p>
        <p class="cart-card__quantity">qty: 1</p>
        <p class="cart-card__price">$${e.FinalPrice||e.ListPrice||0}</p>
        <button class="remove-from-cart" data-index="${c}">Remove</button>
      </li>
    `}).join(""),document.querySelectorAll(".remove-from-cart").forEach(e=>{e.addEventListener("click",c=>{const t=parseInt(c.target.dataset.index);a.splice(t,1),d("so-cart",a),o()})})):(n.style.display="block",r.innerHTML="")}document.addEventListener("DOMContentLoaded",o);
