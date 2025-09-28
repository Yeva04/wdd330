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
    this.path = `/src/json/${this.category}.json`; // Absolute path for Vite
    this.fallbackData = [
      {
        Id: "880RR",
        Brand: { Name: "Marmot" },
        Name: "Marmot Ajax Tent - 3-Person, 3-Season",
        NameWithoutBrand: "Ajax Tent - 3-Person, 3-Season",
        ListPrice: 199.99,
        FinalPrice: 199.99,
        SuggestedRetailPrice: 300.0,
        Image: "/images/tents/marmot-ajax-tent-3-person-3-season-in-pale-pumpkin-terracotta~p~880rr_01~320.jpg",
        Colors: [{ ColorName: "Pale Pumpkin/Terracotta" }],
        DescriptionHtmlSimple: "Get out and enjoy nature with Marmot's Ajax tent, featuring a smart design with durable, waterproof construction and two doors for easy access."
      },
      {
        Id: "985RF",
        Brand: { Name: "The North Face" },
        Name: "The North Face Talus Tent - 4-Person, 3-Season",
        NameWithoutBrand: "Talus Tent - 4-Person, 3-Season",
        ListPrice: 199.99,
        FinalPrice: 199.99,
        SuggestedRetailPrice: 299.0,
        Image: "/images/tents/the-north-face-talus-tent-4-person-3-season-in-golden-oak-saffron-yellow~p~985rf_01~320.jpg",
        Colors: [{ ColorName: "Golden Oak/Saffron Yellow" }],
        DescriptionHtmlSimple: "<strong>Closeout</strong>. Enjoy a fun night under stars with your favorite people in The North Face's Talus four-person tent, featuring durable construction with a roomy interior, an advanced DAC Featherlite NSL pole system and an easy to pitch design."
      },
      {
        Id: "985PR",
        Brand: { Name: "The North Face" },
        Name: "The North Face Alpine Guide Tent - 3-Person, 4-Season",
        NameWithoutBrand: "Alpine Guide Tent - 3-Person, 4-Season",
        ListPrice: 349.99,
        FinalPrice: 349.99,
        SuggestedRetailPrice: 489.0,
        Image: "/images/tents/the-north-face-alpine-guide-tent-3-person-4-season-in-canary-yellow-high-rise-grey~p~985pr_01~320.jpg",
        Colors: [{ ColorName: "Canary Yellow/High Rise Grey" }],
        DescriptionHtmlSimple: "<strong>Closeout</strong>. Be ready for any outdoor adventure in low elevations and high-alpine environments alike with the hybrid design of The North Face's Alpine Guide four-season tent. It is made from durable, waterproof nylon ripstop with an advanced DAC Featherlite NSL pole system and an easy to pitch design."
      },
      {
        Id: "344YJ",
        Brand: { Name: "Cedar Ridge" },
        Name: "Cedar Ridge Rimrock Tent - 2-Person, 3-Season",
        NameWithoutBrand: "Rimrock Tent - 2-Person, 3-Season",
        ListPrice: 69.99,
        FinalPrice: 69.99,
        SuggestedRetailPrice: 89.99,
        Image: "/images/tents/cedar-ridge-rimrock-tent-2-person-3-season-in-rust-clay~p~344yj_01~320.jpg",
        Colors: [{ ColorName: "Rust/Clay" }],
        DescriptionHtmlSimple: "<strong>Closeouts</strong>. Lightweight and ready for adventure, this Cedar Ridge Rimrock tent boasts a weather-ready design that includes a tub-style floor and factory-sealed rain fly."
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
        console.error("Fetch error, using fallback data:", error);
        return this.fallbackData;
      });
  }

  async findProductById(id) {
    const products = await this.getData();
    console.log("Products in findProductById:", products);
    const product = products.find((item) => item.Id === id);
    if (!product) console.warn(`Product with ID ${id} not found in data`);
    return product || null;
  }
}