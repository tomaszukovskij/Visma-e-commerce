const carouselList = document.querySelector(".carousel-list"),
  carouselItems = document.querySelectorAll(".carousel-list__item"),
  carouselWrap = document.querySelector(".carousel-wrap"),
  btnNext = document.querySelector(".carousel-next"),
  btnPrev = document.querySelector(".carousel-prev"),
  pagination = document.querySelectorAll(".pagination-bullet");

let carouselWrapWidth = carouselWrap.offsetWidth,
  carouselItemsLength = carouselItems.length,
  carouselIemsActiveIndex = 0,
  isResizing = false;

// Add or disable switch transition
function addTransition() {
  !isResizing
    ? (carouselList.style.transition = "transform 0.5s ease-in-out")
    : (carouselList.style.transition = "");
}

// Set active class to carousel item
function addActiveToItem() {
  carouselItems.forEach((item, index) => {
    index === carouselIemsActiveIndex
      ? item.classList.add("carousel-list__item--active")
      : item.classList.remove("carousel-list__item--active");
  });
}
// Add/remove class to pagination bullet
function setActivePagination() {
  pagination.forEach((item, index) => {
    index === carouselIemsActiveIndex
      ? item.classList.add("pagination-bullet--active")
      : item.classList.remove("pagination-bullet--active");
  });
}

// Navigate carousel on pagination click
function moveCarouselOnPagination() {
  pagination.forEach((item, index) => {
    item.addEventListener("click", () => {
      carouselIemsActiveIndex = index;
      moveCarousel();
    });
  });
}

// Move carousel to selected item
function moveCarousel() {
  let transformValue = carouselIemsActiveIndex * carouselWrapWidth;
  carouselList.style.transform =
    "translate3d(-" + transformValue + "px, 0px, 0px)";
  addActiveToItem();
  addTransition();
  setActivePagination();
  setButtonAttr();
}

// Move carousel to direction
function moveTo(direction) {
  if (direction === "forward") {
    carouselIemsActiveIndex++;
    carouselIemsActiveIndex > carouselItemsLength - 1
      ? (carouselIemsActiveIndex = carouselItemsLength - 1)
      : "";
  } else if (direction === "back") {
    carouselIemsActiveIndex--;
    carouselIemsActiveIndex < 0 ? (carouselIemsActiveIndex = 0) : "";
  }

  isResizing = false;
  moveCarousel();
}

// Set disabled if carousel is on firt or last element
function setButtonAttr() {
  carouselIemsActiveIndex === 0
    ? (btnPrev.disabled = true)
    : (btnPrev.disabled = false);
  carouselIemsActiveIndex === carouselItemsLength - 1
    ? (btnNext.disabled = true)
    : (btnNext.disabled = false);
}

// On window resize change carouselWrapWidth to atjust transform
function changeSize() {
  carouselWrapWidth = carouselWrap.offsetWidth;
  isResizing = true;
  carouselList.style.transition = "";
  moveCarousel();
}

// Run on load
function init() {
  btnNext.addEventListener("click", () => moveTo("forward"));
  btnPrev.addEventListener("click", () => moveTo("back"));
  moveCarousel();
  moveCarouselOnPagination();
  window.onresize = changeSize;
}

init();
