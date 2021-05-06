// Import fetch
const http = new Http();

http.get("products").then(render);

function render(data) {
  const productSection = document.querySelector("#products");
  let productList = document.querySelector(".products-list");

  data.length === 0 ? (productSection.style.display = "none") : "";

  data.forEach((item) => {
    let newItem = `
    <a href="" class="products-list__item">
      <figure class="products-list__image">
        <img src="${item.imageUrl}" alt="${item.title}">
      </figure>
      <h3>${item.title}</h3>
      <p>${item.text}</p>
      <div class="products-list__controls">
        <span class="products-list__price">${item.price} USD</span>
        <button type="button" class="btn btn--primary btn--xs-full">
          Buy now
        </button>
      </div>
    </a>
    `;

    productList.innerHTML += newItem;
  });
}
