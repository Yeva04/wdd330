import "../css/style.css";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";
import { getParam } from "./utils.mjs";

const productId = getParam("product");
if (!productId) {
  console.error("No product ID in URL parameters");
  document.querySelector('.product-detail').innerHTML = '<p>No product selected. Please use a valid URL (e.g., ?product=880RR).</p>';
} else {
  const dataSource = new ProductData("tents");
  const product = new ProductDetails(productId, dataSource);
  product.init();
}