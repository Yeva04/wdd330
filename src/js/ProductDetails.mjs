import { setLocalStorage, getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const productId = getParam("product");
const dataSource = new ProductData("tents");

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    try {
      this.product = await this.dataSource.findProductById(this.productId);
      console.log("Found product:", this.product); // Debug
      if (this.product && this.product.Id) {
        this.renderProductDetails();
        this.addToCartButton();
      } else {
        const fallbackProducts = {
          "880RR": { Id: "880RR", Name: "Marmot Ajax Tent - 3-Person, 3-Season", Image: "../images/tents/marmot-ajax-tent-3-person-3-season-in-pale-pumpkin-terracotta~p~880rr_01~320.jpg", FinalPrice: 199.99, DescriptionHtmlSimple: "Durable 3-season tent.", Brand: { Name: "Marmot" } },
          "985RF": { Id: "985RF", Name: "The North Face Talus Tent - 4-Person, 3-Season", Image: "../images/tents/the-north-face-talus-tent-4-person-3-season-in-golden-oak-saffron-yellow~p~985rf_01~320.jpg", FinalPrice: 199.99, DescriptionHtmlSimple: "Spacious 4-person tent.", Brand: { Name: "The North Face" } },
          "985PR": { Id: "985PR", Name: "The North Face Alpine Guide Tent - 3-Person, 4-Season", Image: "../images/tents/the-north-face-alpine-guide-tent-3-person-4-season-in-canary-yellow-high-rise-grey~p~985pr_01~320.jpg", FinalPrice: 349.99, DescriptionHtmlSimple: "Rugged 4-season tent.", Brand: { Name: "The North Face" } },
          "344YJ": { Id: "344YJ", Name: "Cedar Ridge Rimrock Tent - 2-Person, 3-Season", Image: "../images/tents/cedar-ridge-rimrock-tent-2-person-3-season-in-rust-clay~p~344yj_01~320.jpg", FinalPrice: 69.99, DescriptionHtmlSimple: "Lightweight 3-season tent.", Brand: { Name: "Cedar Ridge" } }
        };
        this.product = fallbackProducts[this.productId] || { Id: this.productId, Name: "Unknown Product" };
        this.renderProductDetails();
        this.addToCartButton();
      }
    } catch (error) {
      console.error("Error loading product:", error);
      document.querySelector(".product-detail").innerHTML = "<p>Product not found.</p>";
    }
  }

  renderProductDetails() {
    const product = this.product;
    const imageUrl = `/images/tents/${product.Image.split('/').pop()}?v=${new Date().getTime()}`; // Match index path
    document.querySelector(".product-detail").innerHTML = `
      <h3>${product.Name}</h3>
      <img class="product-image" src="${imageUrl}" alt="${product.Name}">
      <p class="product-card__price">$${product.FinalPrice}</p>
      <p>${product.DescriptionHtmlSimple || "No description available"}</p>
      <button class="addToCart" data-id="${product.Id}">Add to Cart</button>
    `;
  }

  addToCartButton() {
    const addToCartButton = document.querySelector(".addToCart");
    if (addToCartButton) {
      addToCartButton.addEventListener("click", () => {
        let cart = JSON.parse(localStorage.getItem("so-cart")) || [];
        cart.push({ ...this.product }); // Create a copy to avoid reference issues
        setLocalStorage("so-cart", cart); // Store as array
        console.log("Cart updated:", cart); // Debug
        alert("Item added to cart!"); // Quick feedback
      });
    }
  }
}

const productDetails = new ProductDetails(productId, dataSource);
productDetails.init();