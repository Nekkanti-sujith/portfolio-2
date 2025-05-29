window.addEventListener("DOMContentLoaded", () => {
  // Scroll-based animations (unchanged)
  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;

    const dynamicWord = document.getElementById("dynamic-word");
    const mainText = document.getElementById("main-text");
    const aboutText = document.getElementById("about-text");
    const experienceSection = document.getElementById("experience");
    const skillsSection = document.getElementById("skills");
    const projectsSection = document.getElementById("projects");
    const contactSection = document.getElementById("contact");
    const certificationsSection = document.getElementById("certifications");
    const skillItems = document.querySelectorAll(".skill-text");

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
    aboutText.style.opacity = scrollY > 0.8 * windowHeight && scrollY < 1.6 * windowHeight ? "1" : "0";
    experienceSection.style.opacity = scrollY > 1.7 * windowHeight ? "1" : "0";

    if (scrollY > 2.5 * windowHeight) {
      skillsSection.style.opacity = "1";
      skillItems.forEach(el => el.style.animationPlayState = 'running');
    } else {
      skillsSection.style.opacity = "0";
      skillItems.forEach(el => el.style.animationPlayState = 'paused');
    }

    projectsSection.style.opacity = scrollY > 3.6 * windowHeight ? "1" : "0";
    certificationsSection.style.opacity = scrollY > 4.2 * windowHeight ? "1" : "0";
    contactSection.style.opacity = scrollY > 4.7 * windowHeight ? "1" : "0";
  });

  // Certification Carousel (fixed to show all cards properly)
  const carousel = document.querySelector(".certifications-carousel");
  const leftBtn = document.querySelector(".carousel-btn.left");
  const rightBtn = document.querySelector(".carousel-btn.right");

  if (!carousel || !leftBtn || !rightBtn) return;

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
    const gapValue = parseFloat(getComputedStyle(carousel).gap || 0);

    gap = isNaN(gapValue) ? 0 : gapValue;
    cardWidth = cards[0].offsetWidth + marginLeft + marginRight + gap;

    // Use the carousel-wrapper width (visible area) for visible cards count
    const wrapper = document.querySelector(".carousel-wrapper");
    const visibleCards = Math.floor(wrapper.offsetWidth / cardWidth);

    maxIndex = cards.length - visibleCards;
    if (maxIndex < 0) maxIndex = 0; // avoid negative

    // Clamp currentIndex if needed
    if (currentIndex > maxIndex) currentIndex = maxIndex;
  }

  function updateTransform() {
    carousel.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    updateButtons();
  }

  function slideTo(index) {
    carousel.style.transition = "transform 0.4s ease-in-out";
    currentIndex = index;
    updateTransform();
  }

  function updateButtons() {
    leftBtn.disabled = currentIndex <= 0;
    rightBtn.disabled = currentIndex >= maxIndex;
  }

  // Initial setup after rendering
  requestAnimationFrame(() => {
    calculateSizes();
    updateTransform();
  });

  rightBtn.addEventListener("click", () => {
    if (currentIndex < maxIndex) {
      slideTo(currentIndex + 1);
    }
  });

  leftBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      slideTo(currentIndex - 1);
    }
  });

  window.addEventListener("resize", () => {
    calculateSizes();
    carousel.style.transition = "none"; // Remove transition on resize
    updateTransform();
  });
});
