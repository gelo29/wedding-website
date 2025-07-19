// Navigation scroll effect
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Burger menu toggle
const burger = document.querySelector(".burger");
const navLinks = document.querySelector(".nav-links");

burger.addEventListener("click", function () {
  navLinks.classList.toggle("active");
  burger.classList.toggle("active");
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    window.scrollTo({
      top: targetElement.offsetTop - 80,
      behavior: "smooth",
    });

    // Close mobile menu if open
    if (navLinks.classList.contains("active")) {
      navLinks.classList.remove("active");
      burger.classList.remove("active");
    }
  });
});

// Image Modal functionality (Gallery only)
const modal = document.getElementById("galleryModal");
const modalContent = document.getElementById("modal-content");
const modalImg = document.getElementById("modalImage");
const captionText = document.getElementById("caption");
const closeBtn = document.getElementsByClassName("close")[0];
const prevBtn = document.getElementsByClassName("prev")[0];
const nextBtn = document.getElementsByClassName("next")[0];

// Get only gallery images (excluding entourage)
const galleryImages = document.querySelectorAll(".gallery-img");
let currentIndex = 0;

// Open modal when clicking on gallery images
galleryImages.forEach((img, index) => {
  img.addEventListener("click", function () {
    modal.style.display = "block";
    modalImg.src = this.src;
    captionText.innerHTML = this.alt;
    currentIndex = index;
    document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
  });
});

// Close modal
function closeModal() {
  modal.style.display = "none";
  document.body.style.overflow = "auto"; // Re-enable scrolling
}

closeBtn.addEventListener("click", closeModal);

// Close when clicking outside the image
modal.addEventListener("click", function (e) {
  if (e.target === modalContent) {
    closeModal();
  }
});

// Previous image
prevBtn.addEventListener("click", function (e) {
  e.stopPropagation();
  currentIndex =
    (currentIndex - 1 + galleryImages.length) % galleryImages.length;
  modalImg.src = galleryImages[currentIndex].src;
  captionText.innerHTML = galleryImages[currentIndex].alt;
});

// Next image
nextBtn.addEventListener("click", function (e) {
  e.stopPropagation();
  currentIndex = (currentIndex + 1) % galleryImages.length;
  modalImg.src = galleryImages[currentIndex].src;
  captionText.innerHTML = galleryImages[currentIndex].alt;
});

// Keyboard navigation
document.addEventListener("keydown", function (e) {
  if (modal.style.display === "block") {
    if (e.key === "Escape") {
      closeModal();
    } else if (e.key === "ArrowLeft") {
      currentIndex =
        (currentIndex - 1 + galleryImages.length) % galleryImages.length;
      modalImg.src = galleryImages[currentIndex].src;
      captionText.innerHTML = galleryImages[currentIndex].alt;
    } else if (e.key === "ArrowRight") {
      currentIndex = (currentIndex + 1) % galleryImages.length;
      modalImg.src = galleryImages[currentIndex].src;
      captionText.innerHTML = galleryImages[currentIndex].alt;
    }
  }
});

// Countdown Timer
function updateCountdown() {
  const weddingDate = new Date("December 26, 2025 16:00:00").getTime();
  const now = new Date().getTime();
  const distance = weddingDate - now;

  // Time calculations
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display results
  document.getElementById("days").textContent = days
    .toString()
    .padStart(2, "0");
  document.getElementById("hours").textContent = hours
    .toString()
    .padStart(2, "0");
  document.getElementById("minutes").textContent = minutes
    .toString()
    .padStart(2, "0");
  document.getElementById("seconds").textContent = seconds
    .toString()
    .padStart(2, "0");

  // If countdown is finished
  if (distance < 0) {
    clearInterval(countdownTimer);
    document.getElementById("days").textContent = "00";
    document.getElementById("hours").textContent = "00";
    document.getElementById("minutes").textContent = "00";
    document.getElementById("seconds").textContent = "00";
  }
}

// Update countdown every second
updateCountdown();
const countdownTimer = setInterval(updateCountdown, 1000);

// Carousel functionality
let currentSlide = 0;
const slides = document.querySelectorAll(".carousel-item");
const indicators = document.querySelectorAll(".indicator");
let interval;

function showSlide(index) {
  if (index >= slides.length) currentSlide = 0;
  else if (index < 0) currentSlide = slides.length - 1;
  else currentSlide = index;

  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === currentSlide);
  });

  indicators.forEach((indicator, i) => {
    indicator.classList.toggle("active", i === currentSlide);
  });
}

function nextSlide() {
  showSlide(currentSlide + 1);
}

function prevSlide() {
  showSlide(currentSlide - 1);
}

function goToSlide(index) {
  showSlide(index);
}

// Auto-advance every 5 seconds
function startCarousel() {
  interval = setInterval(nextSlide, 5000);
}

// Pause on hover/touch
const carousel = document.querySelector(".hero-carousel");
carousel.addEventListener("mouseenter", () => {
  clearInterval(interval);
});

carousel.addEventListener("mouseleave", startCarousel);

// Touch events for mobile
carousel.addEventListener(
  "touchstart",
  () => {
    clearInterval(interval);
  },
  { passive: true }
);

carousel.addEventListener(
  "touchend",
  () => {
    setTimeout(startCarousel, 3000);
  },
  { passive: true }
);

// Initialize
startCarousel();

// Handle window resize
window.addEventListener("resize", function () {
  carousel.style.display = "none";
  carousel.offsetHeight;
  carousel.style.display = "block";
});
