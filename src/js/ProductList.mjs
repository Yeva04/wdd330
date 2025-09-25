import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  console.log("Rendering product, image path:", product.Image);
  if (!product || !product.Id) {
    console.error("Invalid product data:", product);
    return `<li class="product-card error">Invalid Product</li>`;
  }
  const imageUrl = `/images/tents/${product.Image.split('/').pop()}?v=${new Date().getTime()}`; // Extract filename
  return `<li class="product-card">
    <a href="/product_pages/?product=${product.Id}">
      <img src="${imageUrl}" alt="Image of ${product.Name || product.NameWithoutBrand || 'Unnamed Product'}" 
           onload="console.log('Image loaded:', '${imageUrl}');" 
           onerror="console.log('Image failed, using fallback:', '/images/noun_Tent_2517.svg'); this.src='/images/noun_Tent_2517.svg'; this.onerror=null;" />
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
      if (filteredList.length === 4) {
        this.renderList(filteredList);
      } else {
        throw new Error("Filtered list does not contain all 4 products");
      }
    } catch (error) {
      console.error("Error loading products:", error);
      // Fallback to hardcoded list if JSON fails
      const fallbackList = [
        { Id: "880RR", Name: "Marmot Ajax Tent - 3-Person, 3-Season", Image: "../images/tents/marmot-ajax-tent-3-person-3-season-in-pale-pumpkin-terracotta~p~880rr_01~320.jpg", ListPrice: 199.99, FinalPrice: 199.99, Brand: { Name: "Marmot" } },
        { Id: "985RF", Name: "The North Face Talus Tent - 4-Person, 3-Season", Image: "../images/tents/the-north-face-talus-tent-4-person-3-season-in-golden-oak-saffron-yellow~p~985rf_01~320.jpg", ListPrice: 199.99, FinalPrice: 199.99, Brand: { Name: "The North Face" } },
        { Id: "985PR", Name: "The North Face Alpine Guide Tent - 3-Person, 4-Season", Image: "../images/tents/the-north-face-alpine-guide-tent-3-person-4-season-in-canary-yellow-high-rise-grey~p~985pr_01~320.jpg", ListPrice: 349.99, FinalPrice: 349.99, Brand: { Name: "The North Face" } },
        { Id: "344YJ", Name: "Cedar Ridge Rimrock Tent - 2-Person, 3-Season", Image: "../images/tents/cedar-ridge-rimrock-tent-2-person-3-season-in-rust-clay~p~344yj_01~320.jpg", ListPrice: 69.99, FinalPrice: 69.99, Brand: { Name: "Cedar Ridge" } }
      ];
      console.log("Using fallback list:", fallbackList);
      this.renderList(fallbackList);
    }
  }
  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
}