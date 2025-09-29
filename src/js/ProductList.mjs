import { renderListWithTemplate } from "./utils.mjs";
import ProductDetails from "./ProductDetails.mjs";

let productDetailsInstance = null;

function productCardTemplate(product) {
  console.log("Rendering product, image path:", product.Image);
  if (!product || !product.Id) {
    console.error("Invalid product data:", product);
    return `<li class="product-card error">Invalid Product</li>`;
  }
  const basePath = "/wdd330/";
  const imageUrl = `${basePath}images/tents/${product.Image.split("/").pop()}?v=${new Date().getTime()}`; // Cache busting
  const fallbackUrl = `${basePath}images/noun_Tent_2517.svg`;
  return `<li class="product-card" data-id="${product.Id}">
    <a href="#" class="product-link">
      <img src="${imageUrl}" alt="Image of ${product.Name || product.NameWithoutBrand || 'Unnamed Product'}" 
           onload="console.log('Image loaded:', '${imageUrl}');" 
           onerror="console.log('Image failed, using fallback:', '${fallbackUrl}'); this.src='${fallbackUrl}'; this.onerror=null;" />
      <h3 class="card__brand">${product.Brand?.Name || "Unknown Brand"}</h3>
      <h2 class="card__name">${product.Name || product.NameWithoutBrand || 'Unnamed Product'}</h2>
      <p class="product-card__price">$${product.ListPrice || product.FinalPrice || 0.00}</p>
    </a>
    <button class="addToCart" data-id="${product.Id}">Add to Cart</button>
  </li>`;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
    this.initProductDetails();
  }

  initProductDetails() {
    const productId = new URLSearchParams(window.location.search).get("product");
    if (productId) {
      productDetailsInstance = new ProductDetails(productId, new ProductData("tents"));
      productDetailsInstance.init().then(() => {
        this.hideList(); // Hide list if details are shown
      });
    }
  }

  hideList() {
    if (this.listElement) {
      this.listElement.style.display = "none";
      const detailSection = document.querySelector(".product-detail");
      if (detailSection) detailSection.style.display = "block";
    }
  }

  showList() {
    if (this.listElement) {
      this.listElement.style.display = "block";
      const detailSection = document.querySelector(".product-detail");
      if (detailSection) detailSection.style.display = "none";
    }
  }

  async init() {
    try {
      const list = await this.dataSource.getData();
      console.log("Raw data from tents.json:", list); // Debug raw data
      const filteredList = list.filter((product) =>
        ["880RR", "985RF", "985PR", "344YJ"].includes(product.Id)
      );
      console.log("Filtered list length:", filteredList.length, "Products:", filteredList); // Debug filter
      this.renderList(filteredList);
      this.addEventListeners();
    } catch (error) {
      console.error("Error loading products:", error);
      this.listElement.innerHTML = '<p class="error-message">Failed to load products. Please refresh the page.</p>';
    }
  }

  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }

  addEventListeners() {
    const productLinks = this.listElement.querySelectorAll(".product-link");
    productLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const productId = link.closest(".product-card").dataset.id;
        window.location.search = `?product=${productId}`;
        if (!productDetailsInstance || productDetailsInstance.productId !== productId) {
          productDetailsInstance = new ProductDetails(productId, new ProductData("tents"));
          productDetailsInstance.init().then(() => {
            this.hideList();
          });
        } else {
          productDetailsInstance.init().then(() => {
            this.hideList();
          });
        }
      });
    });

    const addToCartButtons = this.listElement.querySelectorAll(".addToCart");
    addToCartButtons.forEach((button) => {
      button.addEventListener("click", () => {
        console.log("Add to cart clicked for:", button.dataset.id);
        // Add your cart logic here if needed
      });
    });
  }
}