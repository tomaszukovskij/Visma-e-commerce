// Import fetch
const http = new Http();
import { CarouselClass } from "./carouselClass.js";

http.get("products").then((data) => {
  populateCarousel(data);
  populateProducts(data);
});

function populateCarousel(data) {
  const carouselList = document.querySelector(".carousel-list");
  const carouselContainer = document.querySelector("#carousel");
  data.forEach((item, index) => {
    const elementClass = index === 0 ? 'carousel-list__item carousel-list__item--active' : 'carousel-list__item';
    if (item.isHighlighted) {
      let newItem = `
      <a href="" class="${elementClass}">
        <figure class="carousel-list__image">
          <img src="${item.imageUrl}" alt="Title">
        </figure>
        <div class="carousel-list__info">
          <span>${item.title}</span>
        </div>
      </a>
      `;
      carouselList.innerHTML += newItem;
    }
  });

  const carouselSlider = new CarouselClass(carouselContainer);
  carouselSlider.init();
}

function populateProducts(data) {
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
