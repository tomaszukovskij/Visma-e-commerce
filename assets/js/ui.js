import { Carousel } from "./carousel.js";
export const UI = {
  get productList() {
    return document.querySelector(".products-list");
  },

  get productsSection() {
    return document.querySelector("#products");
  },

  get btnAddProduct() {
    return document.querySelector("#add-product");
  },

  get btnSubmitProduct() {
    return document.querySelector("#submit-product");
  },

  get btnDeleteProduct() {
    return document.querySelector("#delete-product");
  },

  get btnEditProduct() {
    return document.querySelector(".submit-edit");
  },

  get btnCancelModal() {
    return document.querySelector(".cancel");
  },

  get modal() {
    return document.querySelector("#modal");
  },

  get modalForm() {
    return document.querySelector(".modal__form");
  },

  get modalDeleteControls() {
    return document.querySelector(".modal__delete");
  },

  get modalContainer() {
    return document.querySelector(".modal-container");
  },

  get inputTitle() {
    return document.querySelector("#title");
  },

  get inputPrice() {
    return document.querySelector("#price");
  },

  get inputImageUrl() {
    return document.querySelector("#image-url");
  },

  get inputText() {
    return document.querySelector("#text");
  },

  get inputHiddenId() {
    return document.querySelector("#hidden-id");
  },

  get inputIsHighlighted() {
    return document.querySelector("#isHighlighted");
  },

  showModal(state, type) {
    state
      ? UI.modal.classList.add("modal--show")
      : UI.modal.classList.remove("modal--show");

    UI.modalForm.style.display = type === "form" ? "block" : "none";
    UI.modalDeleteControls.style.display = type === "delete" ? "block" : "none";
  },

  getValues() {
    return {
      id: parseInt(UI.inputHiddenId.value),
      title: UI.inputTitle.value,
      price: UI.inputPrice.value,
      imageUrl: UI.inputImageUrl.value,
      text: UI.inputText.value,
      isHighlighted: UI.inputIsHighlighted.checked,
    };
  },

  fillFormWithDataToEdit(data) {
    UI.inputTitle.value = data.title;
    UI.inputPrice.value = data.price;
    UI.inputImageUrl.value = data.imageUrl;
    UI.inputText.value = data.text;
    UI.inputHiddenId.value = data.id;
    UI.inputIsHighlighted.checked = data.isHighlighted;

    UI.setButtonState("edit");
  },

  populateCarousel(data) {
    const carouselList = document.querySelector(".carousel-list"),
      carouselPagination = document.querySelector(".carousel__pagination");
    const carouselContainer = document.querySelector("#carousel");
    carouselList.innerHTML = "";
    carouselPagination.innerHTML = "";
    data.forEach((item, index) => {
      const elementClass =
          index === 0
            ? "carousel-list__item carousel-list__item--active"
            : "carousel-list__item",
        elementPaginationClass =
          index === 0
            ? "pagination-bullet pagination-bullet--active"
            : "pagination-bullet";
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
        let paginationItem = `<span class="${elementPaginationClass}"></span>`;
        carouselList.innerHTML += newItem;
        carouselPagination.innerHTML += paginationItem;
      }
    });

    const carouselSlider = new Carousel(carouselContainer);
    carouselSlider.init();
  },

  populateProducts(data) {
    data.length === 0 ? (UI.productsSection.style.display = "none") : "";
    UI.productList.innerHTML = "";
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
          <div>
            <button type="button" class="btn btn--primary btn--xs-full js-edit-product" value="${item.id}">
              Edit
            </button>
            <button type="button" class="btn btn--secondary btn--xs-full js-delete-product" value="${item.id}">
              Delete
            </button>
          </div>
        </div>
      </a>
      `;

      UI.productList.innerHTML += newItem;
    });
  },

  clearFields() {
    UI.inputTitle.value = "";
    UI.inputPrice.value = "";
    UI.inputImageUrl.value = "";
    UI.inputText.value = "";
    UI.inputHiddenId.value = "";
    UI.inputIsHighlighted.checked = "";
  },

  showErrorMsg(state) {
    const errorEl = `<p class="form-error">Please fill all fields</p>`,
      containsElement = document.contains(
        document.querySelector(".form-error")
      );

    if (state) {
      if (!containsElement) {
        UI.modalForm.insertAdjacentHTML("afterbegin", errorEl);
      }
    } else {
      if (containsElement) {
        document.querySelector(".form-error").remove();
      }
    }
  },

  setButtonState(state) {
    UI.btnSubmitProduct.textContent =
      state === "edit" ? "Edit product" : "Add product";

    state === "edit"
      ? UI.btnSubmitProduct.classList.add("submit-edit")
      : UI.btnSubmitProduct.classList.remove("submit-edit");
  },

  checkInputValidation() {
    if (
      UI.inputTitle.value !== "" &&
      UI.inputPrice.value !== "" &&
      UI.inputImageUrl.value !== "" &&
      UI.inputText.value !== ""
    ) {
      return true;
    }
  },
};
