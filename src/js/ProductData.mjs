function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error(`Bad Response: ${res.status} ${res.statusText} for ${res.url}`);
  }
}

export default class ProductData {
  constructor(category) {
    this.category = category;
    this.path = `/json/${this.category}.json`;
    this.fallbackData = [
      {
        Id: "880RR",
        Brand: { Name: "Marmot" },
        Name: "Ajax Tent - 3-Person, 3-Season",
        NameWithoutBrand: "Ajax Tent - 3-Person, 3-Season",
        ListPrice: 199.99,
        FinalPrice: 199.99,
        SuggestedRetailPrice: 249.99,
        Image: "/public/images/tents/marmot-ajax-tent-3-person-3-season-in-pale-pumpkin-terracotta~p~880rr_01~320.jpg",
        Colors: [{ ColorName: "Green" }],
        DescriptionHtmlSimple: "A spacious 3-person tent for 3-season camping."
      },
      {
        Id: "985RF",
        Brand: { Name: "North Face" },
        Name: "Talus Tent - 4-Person",
        NameWithoutBrand: "Talus Tent - 4-Person",
        ListPrice: 249.99,
        FinalPrice: 249.99,
        SuggestedRetailPrice: 299.99,
        Image: "/public/images/tents/the-north-face-talus-tent-4-person-3-season-in-golden-oak-saffron-yellow~p~985rf_01~320.jpg",
        Colors: [{ ColorName: "Blue" }],
        DescriptionHtmlSimple: "A durable 4-person tent for family camping."
      },
      {
        Id: "985RV",
        Brand: { Name: "Alpine" },
        Name: "Guide Tent - 2-Person",
        NameWithoutBrand: "Guide Tent - 2-Person",
        ListPrice: 179.99,
        FinalPrice: 179.99,
        SuggestedRetailPrice: 229.99,
        Image: "/public/images/tents/the-north-face-alpine-guide-tent-3-person-4-season-in-canary-yellow-high-rise-grey~p~985pr_01~320.jpg",
        Colors: [{ ColorName: "Red" }],
        DescriptionHtmlSimple: "A lightweight tent for backpacking."
      },
      {
        Id: "990TG",
        Brand: { Name: "Cedar Ridge" },
        Name: "Rimrock Tent - 6-Person",
        NameWithoutBrand: "Rimrock Tent - 6-Person",
        ListPrice: 299.99,
        FinalPrice: 299.99,
        SuggestedRetailPrice: 349.99,
        Image: "/public/images/tents/cedar-ridge-rimrock-tent-2-person-3-season-in-rust-clay~p~344yj_01~320.jpg",
        Colors: [{ ColorName: "Gray" }],
        DescriptionHtmlSimple: "A large tent for group camping."
      }
    ];
  }
  getData() {
    console.log(`Fetching: ${this.path}`);
    return fetch(this.path)
      .then(convertToJson)
      .then((data) => {
        console.log("Fetched data:", data);
        return data;
      })
      .catch(error => {
        console.log("Using fallback data:", this.fallbackData);
        return this.fallbackData;
      });
  }
  async findProductById(id) {
    const products = await this.getData();
    console.log("Products in findProductById:", products);
    return products.find((item) => item.Id === id);
  }
}