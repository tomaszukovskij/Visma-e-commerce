import { UI } from "./ui.js";
const http = new Http();

const fetchDataFromApi = {
  getData() {
    return http.get("products").then((data) => data);
  },
};

// Fetch and populate product data
function fetchProductDataHandler() {
  fetchDataFromApi.getData().then((data) => {
    UI.populateCarousel(data);
    UI.populateProducts(data);
  });
}

// Variable for selected item ID to delete
let itemIdToDelete = "";
const onDelete = (event) => deleteProductHandle(event, itemIdToDelete);

UI.btnAddProduct.addEventListener("click", addNewProductHandler);
UI.btnSubmitProduct.addEventListener("click", submitProductHandler);
UI.productList.addEventListener("click", editOrDeleteProductModalHandler);
UI.modalContainer.addEventListener("click", closeModalHandler);

function addNewProductHandler() {
  UI.showModal(true, "form");
  UI.setButtonState("add");
}

function closeModalHandler(e) {
  if (e.target.classList.contains("js-cancel")) {
    UI.showModal(false, "form");
    UI.clearFields();
    UI.btnDeleteProduct.removeEventListener("click", onDelete);
    UI.showErrorMsg(false);
  }
}

// show modal and get selected product data
function editOrDeleteProductModalHandler(e) {
  if (e.target.classList.contains("js-edit-product")) {
    fetchSingleProductData(parseInt(e.target.value), "edit");
    UI.showModal(true, "form");
    e.preventDefault();
  } else if (e.target.classList.contains("js-delete-product")) {
    fetchSingleProductData(parseInt(e.target.value), "delete");
    UI.showModal(true, "delete");
    e.preventDefault();
  }
}

// Get only single product which one needs to be edited or deleted
function fetchSingleProductData(id, type) {
  fetchDataFromApi.getData().then((data) => {
    const foundItem = data.find((item) => item.id === id);
    if (type === "edit") {
      UI.fillFormWithDataToEdit(foundItem);
    } else if (type === "delete") {
      itemIdToDelete = foundItem.id;
      UI.btnDeleteProduct.addEventListener("click", onDelete);
    }
  });
}

// Submit new or edited item
function submitProductHandler(e) {
  // get input values
  const dataValues = UI.getValues(),
    isValid = UI.checkInputValidation();

  if (isValid) {
    UI.showErrorMsg(false);
    if (!e.target.classList.contains("submit-edit")) {
      http
        .post("products", dataValues)
        .then((data) => data)
        .catch((err) => console.log(err));
      fetchProductDataHandler();
      UI.clearFields();
      UI.showModal(false, "form");
    } else {
      http
        .put("products/" + dataValues.id, dataValues)
        .then((data) => data)
        .catch((err) => console.log(err));
      fetchProductDataHandler();
      UI.showModal(false, "form");
      UI.clearFields();
    }
  } else {
    UI.showErrorMsg(true);
  }

  e.preventDefault();
}

function deleteProductHandle(e, id) {
  http.delete("products/" + id).then((data) => data);
  fetchProductDataHandler();
  UI.showModal(false, "delete");

  e.preventDefault();
}

fetchProductDataHandler();
