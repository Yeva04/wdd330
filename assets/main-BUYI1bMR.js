import{r as n}from"./utils-B1gkA_s2.js";import{P as i}from"./ProductData-328078zX.js";function l(e){var s;if(console.log("Rendering product, image path:",e.Image),!e||!e.Id)return console.error("Invalid product data:",e),'<li class="product-card error">Invalid Product</li>';const t="/wdd330/",a=`${t}images/tents/${e.Image.split("/").pop()}?v=${new Date().getTime()}`,r=`${t}images/noun_Tent_2517.svg`;return`<li class="product-card">
  <a href="/product_pages/index.html?product=${e.Id}">
    <img src="${a}" alt="Image of ${e.Name||e.NameWithoutBrand||"Unnamed Product"}" 
         onload="console.log('Image loaded:', '${a}');" 
         onerror="console.log('Image failed, using fallback:', '${r}'); this.src='${r}'; this.onerror=null;" />
    <h3 class="card__brand">${((s=e.Brand)==null?void 0:s.Name)||"Unknown Brand"}</h3>
    <h2 class="card__name">${e.Name||e.NameWithoutBrand||"Unnamed Product"}</h2>
    <p class="product-card__price">$${e.ListPrice||e.FinalPrice||0}</p>
  </a>
  <button class="addToCart" data-id="${e.Id}">Add to Cart</button>
</li>`}class c{constructor(t,a,r){this.category=t,this.dataSource=a,this.listElement=r}async init(){try{const t=await this.dataSource.getData();console.log("Raw data from tents.json:",t);const a=t.filter(r=>["880RR","985RF","985PR","344YJ"].includes(r.Id));console.log("Filtered list length:",a.length,"Products:",a),this.renderList(a)}catch(t){console.error("Error loading products:",t),this.listElement.innerHTML='<p class="error-message">Failed to load products. Please refresh the page.</p>'}}renderList(t){n(l,this.listElement,t)}}const d=new i("tents"),o=document.querySelector(".product-list"),m=new c("tents",d,o);m.init().catch(e=>{console.error("Error initializing ProductList:",e),o.innerHTML='<p class="error-message">Failed to load products. Please refresh the page.</p>'});
