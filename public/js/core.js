// Mobile menu toggle
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

mobileMenuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("-translate-x-full");
});

// Close mobile menu when clicking on links
mobileMenu.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    mobileMenu.classList.add("-translate-x-full");
  }
});

// Navbar scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar");
  if (window.scrollY > 100) {
    navbar.classList.add("backdrop-blur-xl");
  } else {
    navbar.classList.remove("backdrop-blur-xl");
  }
});

// Carousel functionality
let currentSlide = 0;
const slides = document.querySelectorAll(".carousel-slide");
const indicators = document.querySelectorAll(".indicator");
const totalSlides = slides.length;

function updateCarousel() {
  slides.forEach((slide, index) => {
    slide.classList.remove("active", "prev", "next", "hidden");

    if (index === currentSlide) {
      slide.classList.add("active");
    } else if (index === (currentSlide - 1 + totalSlides) % totalSlides) {
      slide.classList.add("prev");
    } else if (index === (currentSlide + 1) % totalSlides) {
      slide.classList.add("next");
    } else {
      slide.classList.add("hidden");
    }
  });

  indicators.forEach((indicator, index) => {
    indicator.classList.toggle("active", index === currentSlide);
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  updateCarousel();
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  updateCarousel();
}

// Carousel controls
document.getElementById("nextBtn").addEventListener("click", nextSlide);
document.getElementById("prevBtn").addEventListener("click", prevSlide);

// Indicator controls
indicators.forEach((indicator, index) => {
  indicator.addEventListener("click", () => {
    currentSlide = index;
    updateCarousel();
  });
});

// Auto-play carousel
setInterval(nextSlide, 6000);

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animationDelay = "0s";
      entry.target.classList.add("animate-slide-up");
    }
  });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll(".animate-slide-up").forEach((el) => {
  observer.observe(el);
});

// Form submission
document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  alert(
    "Thank you for your booking request! We will contact you shortly to confirm the details."
  );
});

// Initialize carousel
updateCarousel();

// Hero carousel functionality
let currentHeroSlide = 0;
const heroSlides = document.querySelectorAll(".hero-carousel-slide");
const totalHeroSlides = heroSlides.length;

function updateHeroCarousel() {
  heroSlides.forEach((slide, index) => {
    slide.classList.remove("active", "prev", "next", "hidden");

    if (index === currentHeroSlide) {
      slide.classList.add("active");
    } else if (
      index ===
      (currentHeroSlide - 1 + totalHeroSlides) % totalHeroSlides
    ) {
      slide.classList.add("prev");
    } else if (index === (currentHeroSlide + 1) % totalHeroSlides) {
      slide.classList.add("next");
    } else {
      slide.classList.add("hidden");
    }
  });
}

function nextHeroSlide() {
  currentHeroSlide = (currentHeroSlide + 1) % totalHeroSlides;
  updateHeroCarousel();
}

// Auto-play hero carousel
setInterval(nextHeroSlide, 4000);

// Enhanced touch controls for main carousel
let startX = 0;
let endX = 0;
let startY = 0;
let endY = 0;

const carouselContainer = document.querySelector(".carousel-container");

carouselContainer.addEventListener(
  "touchstart",
  (e) => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  },
  { passive: true }
);

carouselContainer.addEventListener(
  "touchend",
  (e) => {
    endX = e.changedTouches[0].clientX;
    endY = e.changedTouches[0].clientY;
    handleSwipe();
  },
  { passive: true }
);

function handleSwipe() {
  const threshold = 50;
  const diffX = startX - endX;
  const diffY = startY - endY;

  // Only handle horizontal swipes
  if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > threshold) {
    if (diffX > 0) {
      nextSlide();
    } else {
      prevSlide();
    }
  }
}

const galleryData = {
  0: {
    main: "/placeholder.svg?height=300&width=400",
    thumbs: [
      "/placeholder.svg?height=300&width=400",
      "/images/auditorium.png",
      "/images/wedding.jpg",
      "/images/funeral.jpg",
    ],
  },
  1: {
    main: "/images/wedding.jpg",
    thumbs: [
      "/images/wedding.jpg",
      "/placeholder.svg?height=300&width=400",
      "/images/auditorium.png",
      "/images/funeral.jpg",
    ],
  },
  2: {
    main: "/placeholder.svg?height=300&width=400",
    thumbs: [
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
      "/images/wedding.jpg",
      "/images/auditorium.png",
    ],
  },
  3: {
    main: "/images/funeral.jpg",
    thumbs: [
      "/images/funeral.jpg",
      "/placeholder.svg?height=300&width=400",
      "/images/wedding.jpg",
      "/images/auditorium.png",
    ],
  },
};

// Attach click handlers to slides
slides.forEach((slide, index) => {
  slide.addEventListener("click", () => openGallery(index));
});

function openGallery(slideIndex) {
  const modal = document.getElementById("galleryModal");
  const grid = document.getElementById("galleryGrid");
  const data = galleryData[slideIndex];

  grid.innerHTML = ""; // clear

  grid.className = "gallery-grid"; // ensure CSS grid is applied

  // Main image
  const mainImg = document.createElement("img");
  mainImg.src = data.main;
  mainImg.alt = "Main Image";
  mainImg.className =
    "gallery-main w-full h-full object-contain rounded-lg transition-opacity duration-300";
  grid.appendChild(mainImg);

  // Thumbnails
  data.thumbs.forEach((thumbSrc, idx) => {
    const thumbImg = document.createElement("img");
    thumbImg.src = thumbSrc;
    thumbImg.alt = `Gallery Thumbnail ${idx + 1}`;
    thumbImg.className =
      "gallery-thumb w-full h-full object-cover rounded-md border-2 border-transparent hover:opacity-80 cursor-pointer transition";
    thumbImg.addEventListener("click", () => {
      mainImg.style.opacity = 0.5;
      setTimeout(() => {
        mainImg.src = thumbSrc;
        mainImg.style.opacity = 1;
      }, 150);

      // Highlight active thumb
      grid.querySelectorAll(".gallery-thumb").forEach((el) => {
        el.classList.remove("border-blue-500");
      });
      thumbImg.classList.add("border-blue-500");
    });
    grid.appendChild(thumbImg);
  });

  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeGallery() {
  const modal = document.getElementById("galleryModal");
  modal.classList.remove("active");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "auto";
}

document.getElementById("galleryModal").addEventListener("click", (e) => {
  if (e.target.id === "galleryModal") {
    closeGallery();
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeGallery();
});

// Initialize hero carousel
updateHeroCarousel();

// Hero background carousel functionality
let currentHeroBgSlide = 0;
const heroBgSlides = document.querySelectorAll(".hero-bg-slide");
const totalHeroBgSlides = heroBgSlides.length;

function updateHeroBgCarousel() {
  heroBgSlides.forEach((slide, index) => {
    slide.classList.remove("active");
    if (index === currentHeroBgSlide) {
      slide.classList.add("active");
    }
  });
}

function nextHeroBgSlide() {
  currentHeroBgSlide = (currentHeroBgSlide + 1) % totalHeroBgSlides;
  updateHeroBgCarousel();
}

// Auto-play hero background carousel
setInterval(nextHeroBgSlide, 5000);

// Initialize hero background carousel
updateHeroBgCarousel();
