window.addEventListener("DOMContentLoaded", () => {
  // Elements
  const mainText = document.getElementById("main-text");
  const dynamicWord = document.getElementById("dynamic-word");
  const sections = {
    about: document.getElementById("about-text"),
    experience: document.getElementById("experience"),
    skills: document.getElementById("skills"),
    projects: document.getElementById("projects"),
    certifications: document.getElementById("certifications"),
    contact: document.getElementById("contact"),
  };
  const skillItems = document.querySelectorAll(".skill-text");

  // Scroll handler
  function handleScroll() {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;

    // Dynamic hero text
    const fadeFactor = Math.min(scrollY / windowHeight, 1);
    const bgValue = 255 - fadeFactor * 255;
    document.body.style.backgroundColor = `rgb(${bgValue}, ${bgValue}, ${bgValue})`;

    if (scrollY > 50 && scrollY < windowHeight) {
      const newSize = Math.min(48 + scrollY / 10, 80);
      dynamicWord.innerText = "bigger";
      dynamicWord.style.fontSize = `${newSize}px`;
    } else {
      dynamicWord.innerText = "big";
      dynamicWord.style.fontSize = `48px`;
    }

    mainText.style.opacity = scrollY > windowHeight / 2 ? "0" : "1";

    // Fade in sections
    Object.values(sections).forEach((section) => {
      const rect = section.getBoundingClientRect();
      const visible = rect.top < window.innerHeight * 0.8;
      section.style.opacity = visible ? "1" : "0";

      if (section.classList.contains("skills-section")) {
        skillItems.forEach((el) => (el.style.animationPlayState = visible ? "running" : "paused"));
      }
    });
  }

  window.addEventListener("scroll", handleScroll);
  handleScroll(); // initial call

  // Certification carousel
  const carousel = document.querySelector(".certifications-carousel");
  const leftBtn = document.querySelector(".carousel-btn.left");
  const rightBtn = document.querySelector(".carousel-btn.right");

  if (carousel && leftBtn && rightBtn) {
    let cards = document.querySelectorAll(".certification-card");
    let currentIndex = 0;
    let cardWidth = 0;
    let gap = 0;
    let maxIndex = 0;

    function calculateSizes() {
      if (!cards.length) return;
      const style = getComputedStyle(cards[0]);
      const marginLeft = parseFloat(style.marginLeft) || 0;
      const marginRight = parseFloat(style.marginRight) || 0;
      gap = parseFloat(getComputedStyle(carousel).gap || 0) || 0;
      cardWidth = cards[0].offsetWidth + marginLeft + marginRight + gap;

      const wrapper = document.querySelector(".carousel-wrapper");
      const visibleCards = Math.floor(wrapper.offsetWidth / cardWidth);
      maxIndex = cards.length - visibleCards;
      if (maxIndex < 0) maxIndex = 0;
      if (currentIndex > maxIndex) currentIndex = maxIndex;
    }

    function updateTransform() {
      carousel.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
      leftBtn.disabled = currentIndex <= 0;
      rightBtn.disabled = currentIndex >= maxIndex;
    }

    function slideTo(index) {
      carousel.style.transition = "transform 0.4s ease-in-out";
      currentIndex = index;
      updateTransform();
    }

    requestAnimationFrame(() => {
      calculateSizes();
      updateTransform();
    });

    rightBtn.addEventListener("click", () => {
      if (currentIndex < maxIndex) slideTo(currentIndex + 1);
    });

    leftBtn.addEventListener("click", () => {
      if (currentIndex > 0) slideTo(currentIndex - 1);
    });

    window.addEventListener("resize", () => {
      calculateSizes();
      carousel.style.transition = "none";
      updateTransform();
    });

    // Touch swipe
    let startX = 0;
    let isDown = false;

    carousel.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
      isDown = true;
    });

    carousel.addEventListener("touchmove", (e) => {
      if (!isDown) return;
      const x = e.touches[0].clientX;
      const diff = startX - x;
      if (Math.abs(diff) > 50) {
        diff > 0 ? rightBtn.click() : leftBtn.click();
        isDown = false;
      }
    });

    carousel.addEventListener("touchend", () => {
      isDown = false;
    });
  }

  // Mobile hamburger
  const hamburger = document.getElementById("hamburger");
  const mobileNav = document.getElementById("mobile-nav");
  if (hamburger && mobileNav) {
    hamburger.addEventListener("click", () => {
      mobileNav.classList.toggle("active");
    });

    document.querySelectorAll(".mobile-nav a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileNav.classList.remove("active");
      });
    });

    document.addEventListener("click", (e) => {
      if (!mobileNav.contains(e.target) && !hamburger.contains(e.target)) {
        mobileNav.classList.remove("active");
      }
    });
  }
});
