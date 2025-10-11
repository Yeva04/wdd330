import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cart = getLocalStorage("so-cart") || [];
  console.log("Cart data:", cart);
  const cartItems = document.querySelector(".cart-items");
  const cartEmpty = document.getElementById("cart-empty");
  if (!cartItems) {
    console.error("Cart items container (.cart-items) not found!");
    return;
  }
  if (Array.isArray(cart) && cart.length > 0) {
    cartEmpty.style.display = "none";
    cartItems.innerHTML = cart.map((item, index) => {
      const basePath = "./";
      const imageUrl = item.Image
        ? `${basePath}images/tents/${item.Image.split("/").pop()}`
        : `${basePath}images/noun_Tent_2517.svg`;
      return `
        <li class="cart-card divider">
          <a href="#" class="cart-card__image">
            <img src="${imageUrl}" alt="${item.Name || 'Cart Item'}">
          </a>
          <a href="#">
            <h2 class="card__name">${item.Name || 'Unnamed Product'}</h2>
          </a>
          <p class="cart-card__color">${item.Colors?.[0]?.ColorName || 'N/A'}</p>
          <p class="cart-card__quantity">qty: 1</p>
          <p class="cart-card__price">$${item.FinalPrice || item.ListPrice || 0.00}</p>
          <button class="remove-from-cart" data-index="${index}">Remove</button>
        </li>
      `;
    }).join("");
    document.querySelectorAll('.remove-from-cart').forEach(button => {
      button.addEventListener('click', (e) => {
        const index = parseInt(e.target.dataset.index);
        cart.splice(index, 1);
        setLocalStorage('so-cart', cart);
        renderCartContents();
      });
    });
  } else {
    cartEmpty.style.display = "block";
    cartItems.innerHTML = "";
  }
}

document.addEventListener("DOMContentLoaded", renderCartContents);