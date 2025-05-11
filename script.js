window.addEventListener("DOMContentLoaded", () => {
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
      contactSection.style.opacity = scrollY > 4.7 * windowHeight ? "1" : "0";
    });
  });
  