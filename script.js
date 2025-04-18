document.addEventListener("DOMContentLoaded", function () {
  // Initialize GSAP ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);

  // Parallax effects for backgrounds
  const sections = document.querySelectorAll("section");

  sections.forEach((section, index) => {
    const bg = section.querySelector(".parallax-bg");

    gsap.to(bg, {
      y: "30%",
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    // Animate section content
    const content = section.querySelector(".section-content");

    gsap.from(content, {
      y: 50,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });
  });

  // Smooth scroll for navigation dots
  const navDots = document.querySelectorAll(".nav-dot");

  navDots.forEach((dot) => {
    dot.addEventListener("click", function () {
      const sectionNum = this.getAttribute("data-section");
      const targetSection = document.getElementById(`section${sectionNum}`);

      window.scrollTo({
        top: targetSection.offsetTop,
        behavior: "smooth",
      });
    });
  });

  // Update active navigation dot based on scroll position
  window.addEventListener("scroll", function () {
    const scrollPosition = window.scrollY;

    sections.forEach((section, index) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (
        scrollPosition >= sectionTop - sectionHeight * 0.3 &&
        scrollPosition < sectionTop + sectionHeight - sectionHeight * 0.3
      ) {
        navDots.forEach((dot) => dot.classList.remove("active"));
        navDots[index].classList.add("active");
      }
    });
  });

  // Flame animation
  const flame = document.getElementById("flame");
  gsap.to(flame, {
    duration: 0.5,
    scaleX: 0.8,
    scaleY: 1.2,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });

  // Video carousel functionality
  const videoItems = document.querySelectorAll(".video-item");
  const progressBar = document.querySelector(".video-progress-bar");
  let currentVideo = 0;
  const videoDuration = 5; // 5 seconds per video
  let progress = 0;

  function showVideo(index) {
    // Hide all videos
    videoItems.forEach((item) => {
      item.classList.remove("active");
    });

    // Show current video
    currentVideo = (index + videoItems.length) % videoItems.length;
    videoItems[currentVideo].classList.add("active");

    // Reset progress
    progress = 0;
    progressBar.style.width = "0%";
  }

  // Update progress bar
  function updateProgress() {
    progress += 0.1;
    const percentage = (progress / videoDuration) * 100;
    progressBar.style.width = `${percentage}%`;

    if (progress >= videoDuration) {
      showVideo(currentVideo + 1);
    }
  }

  // Start the carousel
  showVideo(0);
  setInterval(updateProgress, 100);

  // Modal functionality
  window.openModal = function (src) {
    const modal = document.getElementById("modal");
    const modalContent = document.getElementById("modal-content");

    modalContent.src = src;
    modal.classList.add("active");
  };

  document.getElementById("close-modal").addEventListener("click", function () {
    document.getElementById("modal").classList.remove("active");
  });

  // Create dancing notes animation randomly
  function createDancingNotes() {
    const notes = ["♪", "♫", "♩", "♬"];
    const section3 = document.querySelector(".section-3");

    for (let i = 0; i < 10; i++) {
      const note = document.createElement("div");
      note.classList.add("dancing-note");
      note.innerHTML = notes[Math.floor(Math.random() * notes.length)];
      note.style.left = Math.random() * 100 + "%";
      note.style.top = Math.random() * 100 + "%";
      section3.appendChild(note);

      gsap.to(note, {
        duration: 10 + Math.random() * 5,
        y: -300,
        x: (Math.random() - 0.5) * 200,
        opacity: 0.7,
        ease: "sine.inOut",
        repeat: -1,
        delay: Math.random() * 5,
      });
    }
  }

  createDancingNotes();
});
