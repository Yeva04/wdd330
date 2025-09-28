export default class ProductDiscount {
  constructor(product) {
    this.product = product;
  }

  calculateDiscount() {
    const suggestedPrice = this.product.SuggestedRetailPrice || this.product.ListPrice;
    const finalPrice = this.product.FinalPrice || this.product.ListPrice;
    if (suggestedPrice && finalPrice && suggestedPrice > finalPrice) {
      const discount = ((suggestedPrice - finalPrice) / suggestedPrice * 100).toFixed(0);
      return {
        discountPercentage: `${discount}%`,
        originalPrice: `$${suggestedPrice.toFixed(2)}`,
        discountedPrice: `$${finalPrice.toFixed(2)}`
      };
    }
    return null;
  }

  renderDiscount() {
    const discount = this.calculateDiscount();
    const discountElement = document.createElement('p');
    discountElement.id = 'product-discount';
    if (discount) {
      discountElement.innerHTML = `Save <strong>${discount.discountPercentage}</strong>! Was <s>${discount.originalPrice}</s>, Now ${discount.discountedPrice}`;
    } else {
      discountElement.textContent = 'No discount available.';
    }
    const descriptionElement = document.getElementById('product-description');
    if (descriptionElement) {
      descriptionElement.parentNode.insertBefore(discountElement, descriptionElement.nextSibling);
    } else {
      console.error('product-description element not found');
    }
  }
}