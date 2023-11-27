/**
 * Carousel
 * Inspiration: https://www.codingnepalweb.com/draggable-card-slider-html-css-javascript/
 */

import * as constants from "../constants/index.js";

let currentPos = constants.slideMinPos;
let shouldMonitor = true;

function updatePagination() {
  const prevPaginationBtn = document.querySelector(".active-pagination");
  prevPaginationBtn.classList.remove("active-pagination");

  const paginationBtns = document.querySelectorAll(".carousel-pagination button");
  paginationBtns[currentPos].classList.add("active-pagination");
}

// Monitor the scroll event to update the current position and pagination if a user is swiping or using keyboard navigation
function monitorScroll(event) {
  if (!shouldMonitor) return;

  const slider = event.target;
  const slideItemWidth = slider.firstElementChild.offsetWidth;
  const newPosition = slider.scrollLeft;

  currentPos = Math.round(newPosition / (slideItemWidth + constants.slideGap));
  updatePagination();
}

function updateSlider() {
  shouldMonitor = false;

  const slider = document.querySelector(".bestsellers-container");
  const slideItemWidth = slider.firstElementChild.offsetWidth;

  slider.scrollLeft = currentPos * (slideItemWidth + constants.slideGap);
  updatePagination();
}

function goToSlidePos(slidePos) {
  currentPos = slidePos;
  updateSlider();
}

function prevSlide() {
  currentPos--;
  if (currentPos < constants.slideMinPos) {
    currentPos = constants.slideMaxPos;
  }
  updateSlider();
}

function nextSlide() {
  currentPos++;
  if (currentPos > constants.slideMaxPos) {
    currentPos = constants.slideMinPos;
  }
  updateSlider();
}

export function initCarousel() {
  const slider = document.querySelector(".bestsellers-container");
  const prevBtn = document.querySelector(".carousel-prev");
  const nextBtn = document.querySelector(".carousel-next");
  const paginationBtns = document.querySelectorAll(".carousel-pagination button");

  prevBtn.addEventListener("click", prevSlide);
  nextBtn.addEventListener("click", nextSlide);
  slider.addEventListener("scroll", monitorScroll);
  slider.addEventListener("scrollend", () => (shouldMonitor = true));

  paginationBtns.forEach((btn, i) => {
    btn.addEventListener("click", () => goToSlidePos(i));
  });
}
