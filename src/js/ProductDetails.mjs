import { setLocalStorage, getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDiscount from "./ProductDiscount.mjs";

const productId = getParam("product");
console.log("Product ID from URL:", productId);

const dataSource = new ProductData("tents");

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId || "880RR";
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    try {
      console.log("Initializing with productId:", this.productId);
      this.product = await this.dataSource.findProductById(this.productId);
      if (!this.product) {
        console.error("Product not found for ID:", this.productId);
        document.querySelector(".product-detail").innerHTML = "<p>Product not found. Please use ?product=880RR in the URL.</p>";
        return;
      }
      console.log("Product loaded:", this.product);
      this.renderProductDetails();
      this.addToCartButton();
      this.applyDiscount();
    } catch (error) {
      console.error("Error initializing ProductDetails:", error);
      document.querySelector(".product-detail").innerHTML = "<p>Error loading product. Please try again later.</p>";
    }
  }

  addToCartButton() {
    const addToCartButton = document.querySelector(".product-detail #addToCart");
    if (addToCartButton) {
      addToCartButton.addEventListener("click", () => {
        let cart = localStorage.getItem("so-cart") ? JSON.parse(localStorage.getItem("so-cart")) : [];
        if (!Array.isArray(cart)) cart = [];
        const cartItem = { ...this.product, Id: this.product.Id };
        cart.push(cartItem);
        setLocalStorage("so-cart", cart);
        console.log("Cart updated:", cart);
        alert("Item added to cart!");
      });
    } else {
      console.error("addToCart button not found in DOM");
    }
  }

  renderProductDetails() {
    const basePath = "/wdd330/";
    const detailSection = document.querySelector(".product-detail");
    if (!detailSection) {
      console.error("Product detail section not found");
      return;
    }
    const brand = detailSection.querySelector("#product-brand");
    const name = detailSection.querySelector("#product-name");
    const image = detailSection.querySelector("#product-image");
    const price = detailSection.querySelector("#product-price");
    const color = detailSection.querySelector("#product-color");
    const description = detailSection.querySelector("#product-description");
    const discount = detailSection.querySelector("#product-discount");
    const addToCart = detailSection.querySelector("#addToCart");

    if (brand) brand.textContent = this.product.Brand.Name || "Unknown Brand";
    if (name) name.textContent = this.product.NameWithoutBrand || this.product.Name || "Unnamed Product";
    if (image) {
      const imagePath = this.product.Image
        ? `${basePath}images/tents/${this.product.Image.split("/").pop()}`
        : `${basePath}images/noun_Tent_2517.svg`;
      image.src = imagePath;
      image.alt = this.product.Name || "Product Image";
    }
    if (price) price.textContent = `$${this.product.ListPrice || this.product.FinalPrice || 0.0}`;
    if (color) color.textContent = this.product.Colors?.[0]?.ColorName || "N/A";
    if (description) description.innerHTML = this.product.DescriptionHtmlSimple || "No description available";
    if (discount) {
      const discountObj = new ProductDiscount(this.product);
      discountObj.renderDiscount();
    }
    if (addToCart) addToCart.dataset.id = this.product.Id;
  }

  applyDiscount() {
    const discount = document.querySelector(".product-detail #product-discount");
    if (discount) {
      const discountObj = new ProductDiscount(this.product);
      discountObj.renderDiscount();
    } else {
      console.error("Discount element not found");
    }
  }
}

const productDetails = new ProductDetails(productId, dataSource);
productDetails.init();