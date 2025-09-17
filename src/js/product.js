import { setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

function addProductToCart(product) {
  // Get existing cart from localStorage or initialize an empty array
  let cart = localStorage.getItem("so-cart")
    ? JSON.parse(localStorage.getItem("so-cart"))
    : [];

  // Ensure cart is an array (handle edge cases where so-cart might be corrupted)
  if (!Array.isArray(cart)) {
    cart = [];
  }

  // Add new product to the cart array
  cart.push(product);

  // Save updated cart back to localStorage
  setLocalStorage("so-cart", cart);
}

async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
