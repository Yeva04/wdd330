import "../css/style.css"; // Add CSS import
import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
  document.getElementById("cart-empty").style.display = cartItems.length === 0 ? "block" : "none";
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
    <img
      src="${item.Image}"
      alt="${item.Name}"
      class="cart-card__image"
    />
    <div class="cart-card__content">
      <h2 class="card__name">${item.Name}</h2>
      <p class="cart-card__color">${item.Colors[0].ColorName}</p>
      <p class="cart-card__quantity">qty: 1</p>
      <p class="cart-card__price">$${item.FinalPrice}</p>
    </div>
  </li>`;
  return newItem;
}

renderCartContents();
