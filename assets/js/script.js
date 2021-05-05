const carouselList = document.querySelector(".carousel-list"),
  carouselItems = document.querySelectorAll(".carousel-list__item"),
  carouselWrap = document.querySelector(".carousel-wrap"),
  btnNext = document.querySelector(".carousel-next"),
  btnPrev = document.querySelector(".carousel-prev"),
  pagination = document.querySelectorAll(".pagination-bullet");

let carouselWrapWidth = carouselWrap.offsetWidth,
  carouselItemsLength = carouselItems.length,
  carouselItemsActiveIndex = 0,
  isResizing = false;

// Add or disable switch transition
function addTransition() {
  carouselList.style.transition = isResizing
    ? ""
    : "transform 0.5s ease-in-out";
}

// Set active class to carousel item
function addActiveToItem() {
  carouselItems.forEach((item, index) => {
    index === carouselItemsActiveIndex
      ? item.classList.add("carousel-list__item--active")
      : item.classList.remove("carousel-list__item--active");
  });
}
// Add/remove class to pagination bullet
function setActivePagination() {
  pagination.forEach((item, index) => {
    index === carouselItemsActiveIndex
      ? item.classList.add("pagination-bullet--active")
      : item.classList.remove("pagination-bullet--active");
  });
}

// Navigate carousel on pagination click
function moveCarouselOnPagination() {
  pagination.forEach((item, index) => {
    item.addEventListener("click", () => {
      carouselItemsActiveIndex = index;
      moveCarousel();
    });
  });
}

// Move carousel to selected item
function moveCarousel() {
  let transformValue = carouselItemsActiveIndex * carouselWrapWidth;
  carouselList.style.transform =
    "translate3d(-" + transformValue + "px, 0px, 0px)";
  addActiveToItem();
  addTransition();
  setActivePagination();
  setButtonAttr();
}

// Move carousel to direction
function moveTo(direction) {
  const isFirst = carouselItemsActiveIndex === 0;
  const isLast = carouselItemsActiveIndex === carouselItemsLength - 1;

  if (direction === "forward" && !isLast) {
    carouselItemsActiveIndex += 1;
  } else if (direction === "back" && !isFirst) {
    carouselItemsActiveIndex -= 1;
  }

  isResizing = false;
  moveCarousel();
}

// Set disabled if carousel is on firt or last element
function setButtonAttr() {
  btnPrev.disabled = carouselItemsActiveIndex === 0;
  btnNext.disabled = carouselItemsActiveIndex === carouselItemsLength - 1;
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
