import "../css/style.css"; // Import CSS to bundle it
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

const dataSource = new ProductData("tents");
const listElement = document.querySelector(".product-list");
const productList = new ProductList("tents", dataSource, listElement);

productList.init().catch(error => {
  console.error("Error initializing ProductList:", error);
  listElement.innerHTML = '<p class="error-message">Failed to load products. Please refresh the page.</p>';
});