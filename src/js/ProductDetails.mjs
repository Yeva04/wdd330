import { setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    try {
      // Fetch product details
      this.product = await this.dataSource.findProductById(this.productId);
      if (!this.product) {
        console.error('Product not found for ID:', this.productId);
        throw new Error('Product not found');
      }
      console.log('Product loaded:', this.product);
      // Render product details
      this.renderProductDetails();
      // Add event listener for Add to Cart
      const addToCartButton = document.getElementById('addToCart');
      if (addToCartButton) {
        console.log('Adding event listener to addToCart button');
        addToCartButton.addEventListener('click', this.addProductToCart.bind(this));
      } else {
        console.error('addToCart button not found in DOM');
      }
    } catch (error) {
      console.error('Error initializing ProductDetails:', error);
    }
  }

  addProductToCart() {
    try {
      let cart = localStorage.getItem('so-cart')
        ? JSON.parse(localStorage.getItem('so-cart'))
        : [];
      if (!Array.isArray(cart)) cart = [];
      console.log('Adding product to cart:', this.product);
      cart.push(this.product);
      setLocalStorage('so-cart', cart);
      console.log('Updated cart:', cart);
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  }

  renderProductDetails() {
    document.getElementById('product-brand').textContent = this.product.Brand.Name;
    document.getElementById('product-name').textContent = this.product.NameWithoutBrand;
    document.getElementById('product-image').src = this.product.Image;
    document.getElementById('product-image').alt = this.product.Name;
    document.getElementById('product-price').textContent = `$${this.product.ListPrice}`;
    document.getElementById('product-color').textContent = this.product.Colors[0].ColorName;
    document.getElementById('product-description').innerHTML = this.product.DescriptionHtmlSimple;
    document.getElementById('addToCart').dataset.id = this.product.Id;
  }
}
