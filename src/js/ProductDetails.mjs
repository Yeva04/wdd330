import { setLocalStorage, getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDiscount from "./ProductDiscount.mjs";

const productId = getParam("product");
const dataSource = new ProductData("tents");

// Singleton instance to prevent multiple initializations
let instance = null;

export default class ProductDetails {
  constructor(productId, dataSource) {
    if (instance) return instance;
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
    instance = this;
  }

  async init() {
    if (this.product && Object.keys(this.product).length > 0) {
      console.log('Product already initialized, skipping re-init');
      return;
    }
    try {
      this.product = await this.dataSource.findProductById(this.productId);
      if (!this.product) {
        console.error('Product not found for ID:', this.productId);
        document.querySelector('.product-detail').innerHTML = '<p>Product not found. Please check the URL (e.g., ?product=880RR).</p>';
        return;
      }
      console.log('Product loaded:', this.product);
      this.renderProductDetails();
      this.addToCartButton();
      this.applyDiscount();
    } catch (error) {
      console.error('Error initializing ProductDetails:', error);
      document.querySelector('.product-detail').innerHTML = '<p>Error loading product. Please try again later.</p>';
    }
  }

  addToCartButton() {
    const addToCartButton = document.getElementById('addToCart');
    if (addToCartButton && !addToCartButton.dataset.listener) {
      addToCartButton.addEventListener('click', () => {
        let cart = localStorage.getItem('so-cart') ? JSON.parse(localStorage.getItem('so-cart')) : [];
        if (!Array.isArray(cart)) cart = [];
        const cartItem = { ...this.product, Id: this.product.Id };
        cart.push(cartItem);
        setLocalStorage('so-cart', cart);
        console.log('Cart updated:', cart);
        alert('Item added to cart!');
        addToCartButton.dataset.listener = 'true'; // Mark as listened to prevent reattachment
      });
      addToCartButton.dataset.listener = 'true'; // Initial mark
    } else if (!addToCartButton) {
      console.error('addToCart button not found in DOM');
    }
  }

  renderProductDetails() {
    document.getElementById('product-brand').textContent = this.product.Brand.Name || 'Unknown Brand';
    document.getElementById('product-name').textContent = this.product.NameWithoutBrand || this.product.Name || 'Unnamed Product';
    document.getElementById('product-image').src = this.product.Image.replace('../images/tents/', '/images/tents/') || '/images/noun_Tent_2517.svg';
    document.getElementById('product-image').alt = this.product.Name || 'Product Image';
    document.getElementById('product-price').textContent = `$${this.product.ListPrice || this.product.FinalPrice || 0.00}`;
    document.getElementById('product-color').textContent = this.product.Colors?.[0]?.ColorName || 'N/A';
    document.getElementById('product-description').innerHTML = this.product.DescriptionHtmlSimple || 'No description available';
    document.getElementById('addToCart').dataset.id = this.product.Id;
  }

  applyDiscount() {
    const discount = new ProductDiscount(this.product);
    discount.renderDiscount();
  }
}

const productDetails = new ProductDetails(productId, dataSource);
productDetails.init();