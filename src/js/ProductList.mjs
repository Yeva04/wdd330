import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  console.log("Rendering product, image path:", product.Image);
  if (!product || !product.Id) {
    console.error("Invalid product data:", product);
    return `<li class="product-card error">Invalid Product</li>`;
  }
  const basePath = '/wdd330/'; // Base path for GitHub Pages
  const imageUrl = `${basePath}images/tents/${product.Image.split('/').pop()}?v=${new Date().getTime()}`; // Extract filename and prepend base
  const fallbackUrl = `${basePath}images/noun_Tent_2517.svg`; // Adjusted fallback path
  return `<li class="product-card">
    <a href="/product_pages/?product=${product.Id}">
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
  }
  async init() {
    try {
      const list = await this.dataSource.getData();
      console.log("Raw data from tents.json:", list); // Debug raw data
      const filteredList = list.filter(product => 
        ["880RR", "985RF", "985PR", "344YJ"].includes(product.Id)
      );
      console.log("Filtered list length:", filteredList.length, "Products:", filteredList); // Debug filter
      this.renderList(filteredList);
    } catch (error) {
      console.error("Error loading products:", error);
      this.listElement.innerHTML = '<p class="error-message">Failed to load products. Please refresh the page.</p>';
    }
  }
  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
}