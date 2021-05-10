export class CarouselClass {
  constructor(container) {
    // Created variables
    this.container = container;
    this.carouselList = this.container.querySelector(".carousel-list"),
    this.carouselItems = this.container.querySelectorAll(".carousel-list__item"),
    this.carouselWrap = this.container.querySelector(".carousel-wrap"),
    this.btnNext = this.container.querySelector(".carousel-next"),
    this.btnPrev = this.container.querySelector(".carousel-prev"),
    this.pagination = this.container.querySelectorAll(".pagination-bullet");

    // Calculated variables
    this.carouselWrapWidth = this.carouselWrap.offsetWidth,
    this.carouselItemsLength = this.carouselItems.length,
    this.carouselItemsActiveIndex = 0,
    this.isResizing = false;


  }

  // Add or disable switch transition
  addTransition() {
    return (this.carouselList.style.transition = this.isResizing
      ? ""
      : "transform 0.5s ease-in-out");
  };

  // Set active class to carousel item
  addActiveToItem() {
    this.carouselItems.forEach((item, index) => {
      return index ===  this.carouselItemsActiveIndex
        ? item.classList.add("carousel-list__item--active")
        : item.classList.remove("carousel-list__item--active");
    });
  };

  // Add/remove class to pagination bullet
  setActivePagination() {
    this.pagination.forEach((item, index) => {
      return index === this.carouselItemsActiveIndex
        ? item.classList.add("pagination-bullet--active")
        : item.classList.remove("pagination-bullet--active");
    });
  };

  // Navigate carousel on pagination click
  moveCarouselOnPagination() {
    this.pagination.forEach((item, index) => {
      item.addEventListener("click", () => {
        this.carouselItemsActiveIndex = index;
        this.moveCarousel();
      });
    });
  };

  // On window resize change carouselWrapWidth to atjust transform
  changeSize() {
    this.carouselWrapWidth = this.carouselWrap.offsetWidth; // HERE
    this.isResizing = true;
    this.carouselList.style.transition = "";
    this.moveCarousel();
  };

  // Move carousel to selected item
  moveCarousel() {
    let transformValue = this.carouselItemsActiveIndex * this.carouselWrapWidth;
    this.carouselList.style.transform =
      "translate3d(-" + transformValue + "px, 0px, 0px)";
    this.addActiveToItem();
    this.addTransition();
    this.setActivePagination();
    this.setButtonAttr();
  };

  // Move carousel to direction
  moveTo(direction) {
    const isFirst = this.carouselItemsActiveIndex === 0;
    const isLast = this.carouselItemsActiveIndex === this.carouselItemsLength - 1;

    if (direction === "forward" && !isLast) {
      this.carouselItemsActiveIndex += 1;
    } else if (direction === "back" && !isFirst) {
      this.carouselItemsActiveIndex -= 1;
    }

    this.isResizing = false;
    this.moveCarousel();
  };

  // Set disabled if carousel is on firt or last element
  setButtonAttr() {
    this.btnPrev.disabled = this.carouselItemsActiveIndex === 0;
    this.btnNext.disabled = this.carouselItemsActiveIndex === this.carouselItemsLength - 1;
  };

  // Run on load
  init() {
    this.btnNext.addEventListener("click", () => this.moveTo("forward"));
    this.btnPrev.addEventListener("click", () => this.moveTo("back"));

    window.addEventListener('resize', () => this.changeSize());

    this.moveCarouselOnPagination();
  };
}