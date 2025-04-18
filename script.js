document.addEventListener("DOMContentLoaded", function () {
  // ตรวจสอบขนาดหน้าจอและปรับแต่งการแสดงผล
  setupResponsiveDisplay();

  // ตรวจสอบว่ามีการโหลด GSAP หรือไม่ (เพิ่มการตรวจสอบเพื่อป้องกันข้อผิดพลาด)
  if (typeof gsap !== "undefined") {
    // เริ่มต้น GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // เพิ่มคอนเฟตติและลูกโป่ง
    createConfetti();
    createBalloons();
    createSparkles();

    // ปรับปรุงอนิเมชั่น Parallax
    enhanceParallaxEffects();

    // แอนิเมชั่นสำหรับเนื้อหาแต่ละส่วน
    animateSectionContent();

    // เพิ่มเอฟเฟกต์แสงเพิ่มเติม
    addLightingEffects();

    // การแสดงผลตามการเลื่อน
    setupScrollBasedAnimations();
  } else {
    console.warn("GSAP ไม่ได้ถูกโหลด กรุณาเพิ่ม script ที่ถูกต้อง");
    // ถ้าไม่มี GSAP ให้ใช้ CSS Animation แทน
    document.body.classList.add("use-css-fallback");
  }

  // การนำทางด้วย Dot Navigation
  setupNavigation();

  // อนิเมชั่นสำหรับเปลวไฟเทียน
  animateCandle();

  // การทำงานของ Video Carousel
  setupVideoCarousel();

  // สร้างโน้ตเพลงที่ลอยอยู่
  createDancingNotes();

  // การทำงานของ Modal
  setupModal();

  // Animation ส่วนเค้ก
  setupCakeAnimations();

  // จัดการกับอุปกรณ์เคลื่อนที่
  handleDeviceOrientation();

  // ปรับแต่งวิดีโอสำหรับมือถือ
  optimizeVideoForMobile();

  // ตั้งค่าการเลื่อนแบบราบรื่น
  setupSmoothScrolling();

  // ตั้งค่าโมดัลแบบ responsive
  setupResponsiveModal();

  // จัดการกับอุปกรณ์ที่มีประสิทธิภาพต่ำ
  handleLowPerformance();

  // เพิ่มอนิเมชันเมื่อโหลดหน้าเสร็จ
  playIntroAnimation();
});

// ฟังก์ชันตรวจสอบขนาดหน้าจอและปรับแต่งการแสดงผลตามขนาด
function setupResponsiveDisplay() {
  // ตรวจสอบขนาดหน้าจอและตั้งค่า body class
  function checkScreenSize() {
    const width = window.innerWidth;
    document.body.classList.remove(
      "screen-xs",
      "screen-sm",
      "screen-md",
      "screen-lg"
    );

    if (width < 480) {
      document.body.classList.add("screen-xs");
    } else if (width < 768) {
      document.body.classList.add("screen-sm");
    } else if (width < 1024) {
      document.body.classList.add("screen-md");
    } else {
      document.body.classList.add("screen-lg");
    }

    // ปรับแต่ง text shadow ตามขนาดหน้าจอ
    const headings = document.querySelectorAll("h1, h2, h3");
    if (width < 768) {
      headings.forEach((heading) => {
        heading.style.textShadow = "0 2px 4px rgba(0, 0, 0, 0.9)";
      });
    }
  }

  // เพิ่ม event listener สำหรับการเปลี่ยนขนาดหน้าจอ
  window.addEventListener("resize", checkScreenSize);

  // เรียกใช้ฟังก์ชันครั้งแรก
  checkScreenSize();
}

// ฟังก์ชันสำหรับการตรวจสอบการหมุนของอุปกรณ์
function handleDeviceOrientation() {
  // เพิ่ม event listener สำหรับการหมุนอุปกรณ์
  window.addEventListener("orientationchange", function () {
    // รีเซ็ตการแสดงผลเมื่อหมุนอุปกรณ์
    setTimeout(() => {
      // อัปเดตตำแหน่งของปุ่มนำทาง
      const nav = document.querySelector(".navigation");
      if (nav) {
        nav.style.right = window.innerWidth < 768 ? "10px" : "20px";
      }

      // ปรับขนาดองค์ประกอบเมื่อหมุนอุปกรณ์
      adjustElementsForOrientation();
    }, 300); // รอให้การหมุนเสร็จสมบูรณ์
  });
}

// ปรับขนาดองค์ประกอบตามการหมุนอุปกรณ์
function adjustElementsForOrientation() {
  const isLandscape = window.innerWidth > window.innerHeight;
  const isMobile = window.innerWidth < 768 || window.innerHeight < 768;

  // ปรับขนาดเค้กตามแนว
  const cake = document.querySelector(".birthday-cake");
  if (cake) {
    if (isMobile && isLandscape) {
      // แนวนอนบนมือถือ - ลดขนาดลง
      cake.style.transform = "scale(0.7)";
      cake.style.marginTop = "10px";
    } else if (isMobile && !isLandscape) {
      // แนวตั้งบนมือถือ - ขนาดปกติ
      cake.style.transform = "scale(0.9)";
      cake.style.marginTop = "20px";
    } else {
      // เดสก์ท็อป - ขนาดเต็ม
      cake.style.transform = "scale(1)";
      cake.style.marginTop = "30px";
    }
  }

  // ปรับขนาดหัวข้อตามแนว
  const headings = document.querySelectorAll("h1");
  headings.forEach((heading) => {
    if (isMobile && isLandscape) {
      heading.style.fontSize = "1.8rem";
    } else if (isMobile && !isLandscape) {
      heading.style.fontSize = "2rem";
    } else {
      heading.style.fontSize = "3rem";
    }
  });
}

// ฟังก์ชันแสดงอนิเมชั่นเริ่มต้น
function playIntroAnimation() {
  // สร้างหน้าโหลดที่จะถูกแสดงเมื่อเข้าเว็บ
  const loadingScreen = document.createElement("div");
  loadingScreen.classList.add("loading-screen");
  loadingScreen.innerHTML = `
        <div class="loading-content">
          <div class="loading-icon">🎂</div>
          <div class="loading-text">กำลังเตรียมงานวันเกิด...</div>
          <div class="loading-progress-container">
            <div class="loading-progress-bar"></div>
          </div>
        </div>
      `;
  document.body.appendChild(loadingScreen);

  // แอนิเมทแถบโหลด
  const progressBar = loadingScreen.querySelector(".loading-progress-bar");
  if (typeof gsap !== "undefined") {
    gsap.to(progressBar, {
      width: "100%",
      duration: 2,
      ease: "power1.inOut",
      onComplete: () => {
        // เมื่อโหลดเสร็จ ให้แสดงหน้าหลัก
        gsap.to(loadingScreen, {
          opacity: 0,
          duration: 0.7,
          onComplete: () => {
            loadingScreen.remove();
            // แอนิเมทส่วนแรกให้ปรากฏ
            animateFirstSection();
          },
        });
      },
    });
  } else {
    // ถ้าไม่มี GSAP ใช้ CSS Animation แทน
    progressBar.style.animation = "progress 2s forwards";
    progressBar.addEventListener("animationend", function () {
      loadingScreen.style.animation = "fadeOut 0.7s forwards";
      loadingScreen.addEventListener("animationend", function () {
        loadingScreen.remove();
        // เพิ่ม class แอนิเมชันให้กับส่วนแรก
        document.querySelector(".section-1").classList.add("loaded");
      });
    });
  }
}

// ฟังก์ชันแอนิเมท Section แรก
function animateFirstSection() {
  const section1 = document.querySelector(".section-1");
  if (!section1) return;

  const heading = section1.querySelector("h1");
  const paragraph = section1.querySelector("p");
  const cake = section1.querySelector(".birthday-cake");

  if (typeof gsap !== "undefined") {
    // รีเซ็ตตำแหน่งเริ่มต้น
    gsap.set([heading, paragraph, cake], { opacity: 0, y: 50 });

    // แอนิเมทองค์ประกอบทีละอัน
    const timeline = gsap.timeline();

    timeline
      .to(heading, { opacity: 1, y: 0, duration: 0.8, ease: "back.out(1.7)" })
      .to(
        paragraph,
        { opacity: 1, y: 0, duration: 0.8, ease: "back.out(1.7)" },
        "-=0.5"
      )
      .to(
        cake,
        { opacity: 1, y: 0, duration: 1, ease: "elastic.out(1, 0.3)" },
        "-=0.3"
      )
      .fromTo(
        ".flame",
        { opacity: 0, scale: 0 },
        { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" }
      );

    // แสดงคอนเฟตติหลังจากอนิเมชั่นเสร็จ
    timeline.call(function () {
      createBirthdayConfetti();
    });
  } else {
    // ถ้าไม่มี GSAP ใช้ CSS Animation แทน
    if (heading) heading.classList.add("fadeInUp");
    if (paragraph) paragraph.classList.add("fadeInUp", "delay-300ms");
    if (cake) cake.classList.add("fadeInUp", "delay-600ms");

    // รอ animation จบแล้วจึงแสดงคอนเฟตติ
    setTimeout(() => {
      createBirthdayConfetti();
    }, 2000);
  }
}

// สร้างคอนเฟตติพิเศษตอนเริ่มต้น
function createBirthdayConfetti() {
  // ลดจำนวนคอนเฟตติบนอุปกรณ์ขนาดเล็ก
  const isMobile = window.innerWidth < 768;
  const confettiCount = isMobile ? 50 : 100;

  for (let i = 0; i < confettiCount; i++) {
    setTimeout(() => {
      const confetti = document.createElement("div");
      confetti.classList.add("confetti", "birthday-confetti");
      confetti.style.left = Math.random() * 100 + "%";
      confetti.style.top = "-5%";
      confetti.style.backgroundColor = getRandomColor();
      confetti.style.animationDuration = 3 + Math.random() * 5 + "s";

      document.body.appendChild(confetti);

      // ลบคอนเฟตติหลังจากตกลงมา
      setTimeout(() => {
        if (confetti.parentNode === document.body) {
          confetti.remove();
        }
      }, 8000);
    }, i * (isMobile ? 60 : 30)); // ช่วงเวลาห่างมากขึ้นบนมือถือ
  }
}

// สร้างสีสุ่ม
function getRandomColor() {
  const colors = [
    "#ff5e5e", // สีแดง
    "#ff9d5e", // สีส้ม
    "#ffde5e", // สีเหลือง
    "#5eff8f", // สีเขียว
    "#5eb8ff", // สีฟ้า
    "#ae5eff", // สีม่วง
    "#ff5eb8", // สีชมพู
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

// ฟังก์ชันสร้างคอนเฟตติ
function createConfetti() {
  const confettiContainer = document.createElement("div");
  confettiContainer.classList.add("confetti-container");
  document.body.appendChild(confettiContainer);

  // ลดจำนวนคอนเฟตติบนอุปกรณ์ขนาดเล็ก
  const isMobile = window.innerWidth < 768;
  const confettiCount = isMobile ? 30 : 50;

  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");
    confetti.style.left = Math.random() * 100 + "%";
    confetti.style.animationDelay = Math.random() * 15 + "s";
    confetti.style.transform = `rotate(${Math.random() * 360}deg)`;

    // ให้บางอันเป็นรูปร่างที่แตกต่างกัน
    if (i % 3 === 0) {
      confetti.style.borderRadius = "50%";
    } else if (i % 3 === 1) {
      confetti.style.borderRadius = "0";
    } else {
      confetti.style.borderRadius = "50% 0 50% 0";
    }

    confettiContainer.appendChild(confetti);
  }
}

// ฟังก์ชันสร้างลูกโป่ง
function createBalloons() {
  const section1 = document.querySelector(".section-1");
  if (!section1) return;

  const balloonsContainer = document.createElement("div");
  balloonsContainer.classList.add("balloons-container");
  section1.appendChild(balloonsContainer);

  // ลดจำนวนลูกโป่งบนอุปกรณ์ขนาดเล็ก
  const isMobile = window.innerWidth < 768;
  const balloonCount = isMobile ? 3 : 5;
  const spaceOffset = isMobile ? 30 : 20;

  for (let i = 0; i < balloonCount; i++) {
    const balloon = document.createElement("div");
    balloon.classList.add("balloon");
    balloon.style.left =
      i * spaceOffset + (100 - spaceOffset * balloonCount) / 2 + "%";
    balloon.style.animationDelay = i * 2 + "s";

    // เพิ่มเชือกลูกโป่ง
    const string = document.createElement("div");
    string.classList.add("balloon-string");
    balloon.appendChild(string);

    balloonsContainer.appendChild(balloon);

    // เพิ่มการโต้ตอบเมื่อคลิกลูกโป่ง
    balloon.addEventListener("click", function () {
      popBalloon(this);
    });

    // เพิ่มการโต้ตอบเมื่อแตะลูกโป่งบนมือถือ
    balloon.addEventListener("touchstart", function (e) {
      e.preventDefault(); // ป้องกันการเลื่อนจอ
      popBalloon(this);
    });
  }
}

// ฟังก์ชันแตกลูกโป่ง
function popBalloon(balloon) {
  // เสียงลูกโป่งแตก
  playPopSound();

  // แอนิเมชัน
  if (typeof gsap !== "undefined") {
    gsap.to(balloon, {
      scale: 1.5,
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        // สร้างคอนเฟตติเล็กๆ ออกจากตำแหน่งลูกโป่ง
        const rect = balloon.getBoundingClientRect();
        createMiniConfetti(
          rect.left + rect.width / 2,
          rect.top + rect.height / 2
        );
        if (balloon.parentNode) {
          balloon.parentNode.removeChild(balloon);
        }
      },
    });
  } else {
    // ใช้ CSS Animation แทนถ้าไม่มี GSAP
    balloon.style.animation = "balloon-pop 0.3s forwards";
    balloon.addEventListener("animationend", function () {
      // สร้างคอนเฟตติเล็กๆ ออกจากตำแหน่งลูกโป่ง
      const rect = balloon.getBoundingClientRect();
      createMiniConfetti(
        rect.left + rect.width / 2,
        rect.top + rect.height / 2
      );
      if (balloon.parentNode) {
        balloon.parentNode.removeChild(balloon);
      }
    });
  }
}

// ฟังก์ชันเล่นเสียงลูกโป่งแตก
function playPopSound() {
  const popSound = document.createElement("audio");
  popSound.src =
    "https://assets.mixkit.co/sfx/preview/mixkit-balloon-popping-sound-2927.mp3";
  popSound.volume = 0.3;
  popSound.play().catch((e) => console.log("Could not play sound:", e));
}

// ฟังก์ชันสร้างคอนเฟตติขนาดเล็กจากตำแหน่งที่กำหนด
function createMiniConfetti(x, y) {
  // ลดจำนวนอนุภาคบนอุปกรณ์ขนาดเล็ก
  const isMobile = window.innerWidth < 768;
  const particleCount = isMobile ? 10 : 20;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.classList.add("mini-confetti");
    particle.style.left = x + "px";
    particle.style.top = y + "px";
    particle.style.backgroundColor = getRandomColor();
    particle.style.transform = `rotate(${Math.random() * 360}deg)`;

    document.body.appendChild(particle);

    // แอนิเมทอนุภาค
    if (typeof gsap !== "undefined") {
      gsap.to(particle, {
        x: (Math.random() - 0.5) * 200,
        y: (Math.random() - 0.5) * 200,
        opacity: 0,
        scale: 0,
        duration: 1 + Math.random(),
        ease: "power2.out",
        onComplete: () => {
          if (particle.parentNode === document.body) {
            document.body.removeChild(particle);
          }
        },
      });
    } else {
      // ใช้ CSS Animation แทนถ้าไม่มี GSAP
      particle.style.animation = "particle-fly-out 1s forwards";
      particle.addEventListener("animationend", function () {
        if (particle.parentNode === document.body) {
          document.body.removeChild(particle);
        }
      });
    }
  }
}

// ฟังก์ชันเพิ่มเอฟเฟกต์ Parallax
function enhanceParallaxEffects() {
  // ตรวจสอบว่าเป็นอุปกรณ์ที่มีประสิทธิภาพต่ำหรือไม่
  const isMobile = window.innerWidth < 768;

  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined")
    return;

  const sections = document.querySelectorAll("section");

  sections.forEach((section, index) => {
    const bg = section.querySelector(".parallax-bg");

    if (!bg) return;

    // ทำให้พื้นหลังเคลื่อนที่ตามการเลื่อน (ลดความเคลื่อนไหวบนมือถือ)
    gsap.to(bg, {
      y: isMobile ? "10%" : "30%",
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    // เพิ่มเอฟเฟกต์ความลึกของพื้นหลัง
    if (!isMobile) {
      gsap.fromTo(
        bg,
        { scale: 1.1 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }
  });

  // สร้าง Parallax ระดับลึกเพิ่มเติมสำหรับอิลิเมนต์ที่กำหนด
  if (!isMobile) {
    // เอฟเฟกต์สำหรับเค้ก
    const cake = document.querySelector(".birthday-cake");
    if (cake) {
      gsap.to(cake, {
        y: "50px",
        rotate: 5,
        ease: "none",
        scrollTrigger: {
          trigger: ".section-1",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }

    // เอฟเฟกต์สำหรับการ์ดอวยพร
    const greetingCard = document.querySelector(".greeting-card");
    if (greetingCard) {
      gsap.to(greetingCard, {
        y: "30px",
        rotateX: "5deg",
        ease: "none",
        scrollTrigger: {
          trigger: ".section-5",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }

    // เอฟเฟกต์สำหรับวิดีโอคารูเซล
    const videoCarousel = document.querySelector(".video-carousel-container");
    if (videoCarousel) {
      gsap.to(videoCarousel, {
        y: "40px",
        rotateX: "8deg",
        ease: "none",
        scrollTrigger: {
          trigger: ".section-3",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }
  }
}

// ฟังก์ชันแอนิเมทเนื้อหาในแต่ละส่วน
function animateSectionContent() {
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined")
    return;

  const sections = document.querySelectorAll("section");
  const isMobile = window.innerWidth < 768;

  sections.forEach((section, index) => {
    const content = section.querySelector(".section-content");
    if (!content) return;

    const headings = section.querySelectorAll("h1, h2, h3");
    const paragraphs = section.querySelectorAll("p");
    const buttons = section.querySelectorAll("button, .btn");
    const images = section.querySelectorAll("img");

    // เพิ่มคลาสแอนิเมชันให้กับเนื้อหา
    content.classList.add("fade-up");

    // ตั้งค่าทริกเกอร์ ScrollTrigger
    ScrollTrigger.create({
      trigger: section,
      start: "top 80%",
      onEnter: () => {
        content.classList.add("active");

        // ทำให้องค์ประกอบย่อยเข้ามาอย่างต่อเนื่อง
        gsap.to(headings, {
          opacity: 1,
          y: 0,
          stagger: isMobile ? 0.1 : 0.2,
          duration: isMobile ? 0.6 : 0.8,
          ease: "power3.out",
        });

        gsap.to(paragraphs, {
          opacity: 1,
          y: 0,
          stagger: isMobile ? 0.1 : 0.2,
          duration: isMobile ? 0.6 : 0.8,
          delay: isMobile ? 0.2 : 0.3,
          ease: "power3.out",
        });

        gsap.to(buttons, {
          opacity: 1,
          y: 0,
          stagger: isMobile ? 0.1 : 0.2,
          duration: isMobile ? 0.6 : 0.8,
          delay: isMobile ? 0.3 : 0.6,
          ease: "power3.out",
        });

        gsap.to(images, {
          opacity: 1,
          y: 0,
          stagger: isMobile ? 0.1 : 0.2,
          duration: isMobile ? 0.6 : 0.8,
          delay: isMobile ? 0.2 : 0.3,
          ease: "power3.out",
        });
      },
      onLeaveBack: () => content.classList.remove("active"),
    });
  });
}

// ฟังก์ชันเพิ่มเอฟเฟกต์แสงและเงา
function addLightingEffects() {
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined")
    return;

  // เพิ่มเงาที่เคลื่อนไหวได้ตามการเลื่อนหน้าจอ
  const sections = document.querySelectorAll("section");
  const isMobile = window.innerWidth < 768;

  if (!isMobile) {
    sections.forEach((section) => {
      // สร้างไฟที่ส่องสว่างเมื่อเลื่อนมาถึง
      gsap.to(section, {
        backgroundPosition: "center 30%",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });
  }

  // เพิ่มแสงที่เคลื่อนไหวในส่วนที่ 1
  const section1 = document.querySelector(".section-1");
  if (section1) {
    // สร้างแสง
    const light = document.createElement("div");
    light.classList.add("moving-light");
    section1.appendChild(light);

    // แอนิเมทแสง
    gsap.to(light, {
      left: "100%",
      duration: isMobile ? 12 : 8, // ช้าลงบนมือถือ
      repeat: -1,
      ease: "sine.inOut",
      yoyo: true,
    });
  }
}

// ฟังก์ชันตั้งค่าอนิเมชันตามการเลื่อน
// ฟังก์ชันตั้งค่าอนิเมชันตามการเลื่อน
function setupScrollBasedAnimations() {
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined")
    return;

  const isMobile = window.innerWidth < 768;

  // แอนิเมชันสำหรับแกลเลอรี
  const galleryItems = document.querySelectorAll(".gallery-item");
  const scrubValue = isMobile ? 0.5 : 1;

  galleryItems.forEach((item, index) => {
    gsap.fromTo(
      item,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        scrollTrigger: {
          trigger: item,
          start: "top 85%",
          end: "bottom 60%",
          scrub: scrubValue,
        },
        duration: 1,
        delay: index * (isMobile ? 0.05 : 0.1),
      }
    );
  });

  // แอนิเมชันสำหรับการ์ดอวยพร
  const greetingCard = document.querySelector(".greeting-card");
  if (greetingCard) {
    gsap.fromTo(
      greetingCard,
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        scrollTrigger: {
          trigger: greetingCard,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }

  // เพิ่มอนิเมชันสำหรับแถว gallery ที่เลื่อน
  const galleryRows = document.querySelectorAll(".gallery-row");
  if (galleryRows.length) {
    galleryRows.forEach((row, index) => {
      gsap.fromTo(
        row,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: row,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          delay: index * 0.2,
        }
      );
    });
  }
}

// ฟังก์ชันปรับแต่งวิดีโอสำหรับมือถือ
function optimizeVideoForMobile() {
  const videoItems = document.querySelectorAll(".video-item video");
  const isMobile = window.innerWidth < 768;

  videoItems.forEach((video) => {
    // ลดคุณภาพวิดีโอบนมือถือเพื่อประสิทธิภาพที่ดีขึ้น
    if (isMobile) {
      if (video.hasAttribute("src")) {
        // บันทึก src ดั้งเดิมไว้
        video.setAttribute("data-original-src", video.getAttribute("src"));

        // ตั้งค่า preload เป็น 'none' เพื่อไม่ให้โหลดจนกว่าจะเลือก
        video.setAttribute("preload", "none");
      }
    } else {
      // กลับไปใช้ src ดั้งเดิมบนเดสก์ท็อป
      if (video.hasAttribute("data-original-src")) {
        video.setAttribute("src", video.getAttribute("data-original-src"));
        video.removeAttribute("preload");
      }
    }
  });
}

// ฟังก์ชันสำหรับการนำทางด้วย Navigation Dots
function setupNavigation() {
  const navDots = document.querySelectorAll(".nav-dot");
  const sections = document.querySelectorAll("section");

  navDots.forEach((dot) => {
    dot.addEventListener("click", function () {
      const sectionNum = this.getAttribute("data-section");
      const targetSection = document.getElementById(`section${sectionNum}`);

      if (!targetSection) return;

      // เลื่อนไปยังส่วนที่ต้องการและเพิ่มเอฟเฟกต์เพิ่มเติม
      window.scrollTo({
        top: targetSection.offsetTop,
        behavior: "smooth",
      });

      // เพิ่มเอฟเฟกต์เมื่อคลิก
      this.classList.add("clicked");
      setTimeout(() => this.classList.remove("clicked"), 500);

      // สร้างเอฟเฟกต์ประกายที่จุดที่คลิก
      createSparkleEffect(this);
    });
  });

  // อัพเดต active dot ตามตำแหน่งการเลื่อน
  window.addEventListener("scroll", function () {
    const scrollPosition = window.scrollY;

    sections.forEach((section, index) => {
      if (index >= navDots.length) return;

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
}

// ฟังก์ชันตั้งค่าการเลื่อนแบบราบรื่น
function setupSmoothScrolling() {
  // ตรวจสอบว่าเบราว์เซอร์รองรับ smooth scrolling หรือไม่
  if ("scrollBehavior" in document.documentElement.style) {
    // ถ้ารองรับ ใช้ CSS scroll-behavior
    document.documentElement.style.scrollBehavior = "smooth";
  } else {
    // ถ้าไม่รองรับ ใช้ JavaScript
    const navDots = document.querySelectorAll(".nav-dot");
    navDots.forEach((dot) => {
      dot.addEventListener("click", function (e) {
        e.preventDefault();
        const sectionNum = this.getAttribute("data-section");
        const targetSection = document.getElementById(`section${sectionNum}`);

        if (!targetSection) return;

        const targetPosition = targetSection.offsetTop;

        // ใช้ JS scroll แทน
        window.scrollTo({
          top: targetPosition,
          left: 0,
          behavior: "smooth",
        });
      });
    });
  }
}

// ฟังก์ชันเพิ่มเอฟเฟกต์ประกาย
function createSparkleEffect(element) {
  const rect = element.getBoundingClientRect();
  const sparkle = document.createElement("div");
  sparkle.classList.add("sparkle");
  sparkle.style.left = rect.left + rect.width / 2 + "px";
  sparkle.style.top = rect.top + rect.height / 2 + "px";
  document.body.appendChild(sparkle);

  // ลบเอฟเฟกต์ประกายหลังจากอนิเมชันเสร็จสิ้น
  setTimeout(() => {
    if (sparkle.parentNode === document.body) {
      document.body.removeChild(sparkle);
    }
  }, 2000);
}

// ฟังก์ชันสร้างประกายทั่วทั้งหน้าจอ
function createSparkles() {
  // เพิ่มประกายในส่วนที่ 1
  const section1 = document.querySelector(".section-1");
  if (!section1) return;

  const isMobile = window.innerWidth < 768;
  const sparkleCount = isMobile ? 10 : 20;

  for (let i = 0; i < sparkleCount; i++) {
    setTimeout(() => {
      const sparkle = document.createElement("div");
      sparkle.classList.add("sparkle");
      sparkle.style.left = Math.random() * 100 + "vw";
      sparkle.style.top = Math.random() * 100 + "vh";
      sparkle.style.animationDelay = Math.random() * 5 + "s";
      section1.appendChild(sparkle);

      // ลบประกายหลังจากอนิเมชันเสร็จสิ้น
      setTimeout(() => {
        if (sparkle.parentNode === section1) {
          section1.removeChild(sparkle);
        }
      }, 2000);
    }, i * (isMobile ? 500 : 300));
  }
}

// ฟังก์ชันอนิเมทเปลวไฟเทียน
function animateCandle() {
  const flame = document.getElementById("flame");
  if (!flame) return;

  if (typeof gsap !== "undefined") {
    // ทำให้เปลวไฟเคลื่อนไหวตามธรรมชาติ
    gsap.to(flame, {
      duration: 0.5,
      scaleX: 0.8,
      scaleY: 1.2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // เพิ่มแสงไฟกระพริบจากเปลวไฟ
    gsap.to(".section-1", {
      boxShadow: "0 0 20px rgba(245, 158, 11, 0.3)",
      repeat: -1,
      yoyo: true,
      duration: 1,
      ease: "sine.inOut",
    });
  }

  // เพิ่มเอฟเฟกต์คลิกเทียน (เป่าเทียน)
  flame.addEventListener("click", blowCandle);

  // เพิ่มการรองรับสำหรับอุปกรณ์สัมผัส
  flame.addEventListener("touchstart", function (e) {
    e.preventDefault();
    blowCandle();
  });
}

// ฟังก์ชันเป่าเทียน
function blowCandle() {
  const flame = document.getElementById("flame");
  if (!flame) return;

  // ทำให้เปลวไฟเลือนหายไป
  if (typeof gsap !== "undefined") {
    gsap.to(flame, {
      opacity: 0,
      scaleY: 0,
      scaleX: 2,
      y: -10,
      duration: 0.5,
      ease: "power2.out",
      onComplete: () => {
        // แสดงข้อความหลังจากเป่าเทียน
        showWishMessage();
      },
    });
  } else {
    // ใช้ CSS Animation แทนถ้าไม่มี GSAP
    flame.style.animation = "blow-out 0.5s forwards";
    flame.addEventListener("animationend", function () {
      showWishMessage();
    });
  }

  // เพิ่มเอฟเฟกต์ควัน
  createSmokeEffect();
}

// ฟังก์ชันสร้างเอฟเฟกต์ควัน
function createSmokeEffect() {
  const candle = document.querySelector(".candle");
  if (!candle) return;

  const isMobile = window.innerWidth < 768;
  const smokeCount = isMobile ? 5 : 10;

  for (let i = 0; i < smokeCount; i++) {
    const smoke = document.createElement("div");
    smoke.style.position = "absolute";
    smoke.style.width = "15px";
    smoke.style.height = "15px";
    smoke.style.borderRadius = "50%";
    smoke.style.backgroundColor = "rgba(200, 200, 200, 0.5)";
    smoke.style.top = "0";
    smoke.style.left = "50%";
    smoke.style.transform = "translate(-50%, 0)";
    smoke.style.zIndex = "5";
    candle.appendChild(smoke);

    // แอนิเมทควัน
    if (typeof gsap !== "undefined") {
      gsap.to(smoke, {
        y: -100 - Math.random() * 50,
        x: (Math.random() - 0.5) * 100,
        opacity: 0,
        scale: 3 + Math.random() * 2,
        duration: 2 + Math.random() * 2,
        ease: "power1.out",
        onComplete: () => {
          if (smoke.parentNode === candle) {
            candle.removeChild(smoke);
          }
        },
      });
    } else {
      // ใช้ CSS Animation แทนถ้าไม่มี GSAP
      smoke.style.animation = "smoke-rise 2s forwards";
      smoke.addEventListener("animationend", function () {
        if (smoke.parentNode === candle) {
          candle.removeChild(smoke);
        }
      });
    }
  }
}

// ฟังก์ชันแสดงข้อความหลังอธิษฐาน
function showWishMessage() {
  const section1 = document.querySelector(".section-1");
  if (!section1) return;

  const wishMessage = document.createElement("div");

  wishMessage.innerHTML = "<p>สุขสันต์วันเกิด! คำอธิษฐานของคุณจะเป็นจริง</p>";
  wishMessage.style.position = "absolute";
  wishMessage.style.top = "40%";
  wishMessage.style.left = "50%";
  wishMessage.style.transform = "translate(-50%, -50%)";
  wishMessage.style.color = "white";
  wishMessage.style.fontSize = window.innerWidth < 768 ? "1.2rem" : "1.5rem";
  wishMessage.style.fontFamily = "Sriracha, cursive";
  wishMessage.style.textShadow = "0 0 10px rgba(255, 255, 255, 0.7)";
  wishMessage.style.opacity = "0";
  wishMessage.style.zIndex = "10";
  wishMessage.style.textAlign = "center";
  wishMessage.style.padding = "10px 20px";
  wishMessage.style.background = "rgba(0, 0, 0, 0.3)";
  wishMessage.style.borderRadius = "10px";

  section1.appendChild(wishMessage);

  // แอนิเมทข้อความ
  if (typeof gsap !== "undefined") {
    gsap.to(wishMessage, {
      opacity: 1,
      y: -20,
      duration: 1,
      ease: "power2.out",
      onComplete: () => {
        // หายไปหลังจากแสดงสักพัก
        setTimeout(() => {
          gsap.to(wishMessage, {
            opacity: 0,
            duration: 1,
            onComplete: () => {
              if (wishMessage.parentNode === section1) {
                section1.removeChild(wishMessage);
              }
            },
          });
        }, 3000);
      },
    });
  } else {
    // ใช้ CSS Animation แทนถ้าไม่มี GSAP
    wishMessage.style.animation = "fade-in-up 1s forwards";
    setTimeout(() => {
      wishMessage.style.animation = "fade-out 1s forwards";
      wishMessage.addEventListener("animationend", function () {
        if (wishMessage.parentNode === section1) {
          section1.removeChild(wishMessage);
        }
      });
    }, 3000);
  }

  // เพิ่มคอนเฟตติเมื่อทำการอธิษฐาน
  createWishConfetti();
}

// ฟังก์ชันสร้างคอนเฟตติเมื่ออธิษฐาน
function createWishConfetti() {
  const isMobile = window.innerWidth < 768;
  const confettiCount = isMobile ? 50 : 100;

  for (let i = 0; i < confettiCount; i++) {
    setTimeout(() => {
      const confetti = document.createElement("div");
      confetti.classList.add("confetti");
      confetti.style.left = Math.random() * 100 + "%";
      confetti.style.top = "50%";
      confetti.style.opacity = "1";
      confetti.style.animationDelay = "0s";
      confetti.style.backgroundColor = getRandomColor();

      document.body.appendChild(confetti);

      // ลบคอนเฟตติหลังจากตกลงมา
      setTimeout(() => {
        if (confetti.parentNode === document.body) {
          confetti.remove();
        }
      }, 10000);
    }, i * (isMobile ? 80 : 50));
  }
}

// ฟังก์ชันตั้งค่า Video Carousel
function setupVideoCarousel() {
  const videoItems = document.querySelectorAll(".video-item");
  const progressBar = document.querySelector(".video-progress-bar");

  if (!videoItems.length) return;

  let currentVideo = 0;
  const videoDuration = 5; // 5 วินาทีต่อวิดีโอ
  let progress = 0;
  let progressInterval;

  function showVideo(index) {
    // ซ่อนวิดีโอทั้งหมด
    videoItems.forEach((item) => {
      const video = item.querySelector("video");
      item.classList.remove("active");
      if (video) {
        video.pause();
      }
    });

    // แสดงวิดีโอปัจจุบัน
    currentVideo = (index + videoItems.length) % videoItems.length;
    videoItems[currentVideo].classList.add("active");

    // รีเซ็ตความคืบหน้า
    progress = 0;
    if (progressBar) {
      progressBar.style.width = "0%";
    }

    // เล่นวิดีโอปัจจุบันโดยอัตโนมัติ
    const currentVideoEl = videoItems[currentVideo].querySelector("video");
    if (currentVideoEl) {
      currentVideoEl.currentTime = 0;
      const playPromise = currentVideoEl.play();

      if (playPromise !== undefined) {
        playPromise.catch((e) => {
          console.log("Auto-play prevented:", e);
          // เพิ่มปุ่มเล่นวิดีโอถ้าไม่สามารถเล่นอัตโนมัติได้
          addPlayButton(currentVideoEl);
        });
      }
    }
  }

  // เพิ่มปุ่มเล่นวิดีโอสำหรับอุปกรณ์มือถือที่ไม่สามารถเล่นอัตโนมัติได้
  function addPlayButton(videoElement) {
    const parent = videoElement.parentElement;

    // ตรวจสอบว่ามีปุ่มอยู่แล้วหรือไม่
    if (parent.querySelector(".play-button")) return;

    const playButton = document.createElement("div");
    playButton.classList.add("play-button");
    playButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="white">
          <path d="M8 5v14l11-7z"/>
        </svg>
      `;
    playButton.style.position = "absolute";
    playButton.style.top = "50%";
    playButton.style.left = "50%";
    playButton.style.transform = "translate(-50%, -50%)";
    playButton.style.background = "rgba(0, 0, 0, 0.5)";
    playButton.style.borderRadius = "50%";
    playButton.style.width = "60px";
    playButton.style.height = "60px";
    playButton.style.display = "flex";
    playButton.style.justifyContent = "center";
    playButton.style.alignItems = "center";
    playButton.style.cursor = "pointer";

    playButton.addEventListener("click", function () {
      videoElement.play();
      this.remove();
    });

    parent.appendChild(playButton);
  }

  // อัพเดทแถบความคืบหน้า
  function updateProgress() {
    progress += 0.1;
    const percentage = (progress / videoDuration) * 100;
    if (progressBar) {
      progressBar.style.width = `${percentage}%`;
    }

    if (progress >= videoDuration) {
      showVideo(currentVideo + 1);
    }
  }

  // ตั้งค่าระบบเลื่อนอัตโนมัติ
  function startAutoProgress() {
    clearInterval(progressInterval);
    progressInterval = setInterval(updateProgress, 100);
  }

  function stopAutoProgress() {
    clearInterval(progressInterval);
  }

  // ตั้งค่าปุ่มเลื่อนซ้ายและขวา
  const carouselContainer = document.querySelector(".video-carousel-container");
  if (carouselContainer && videoItems.length > 1) {
    // เพิ่มปุ่มเลื่อนซ้าย
    const prevBtn = document.createElement("div");
    prevBtn.classList.add("video-nav", "prev-btn");
    prevBtn.innerHTML = "&#10094;";
    prevBtn.addEventListener("click", () => {
      showVideo(currentVideo - 1);
      startAutoProgress();
    });

    // เพิ่มการรองรับสำหรับอุปกรณ์สัมผัส
    prevBtn.addEventListener("touchstart", function (e) {
      e.preventDefault();
      showVideo(currentVideo - 1);
      startAutoProgress();
    });

    // เพิ่มปุ่มเลื่อนขวา
    const nextBtn = document.createElement("div");
    nextBtn.classList.add("video-nav", "next-btn");
    nextBtn.innerHTML = "&#10095;";
    nextBtn.addEventListener("click", () => {
      showVideo(currentVideo + 1);
      startAutoProgress();
    });

    // เพิ่มการรองรับสำหรับอุปกรณ์สัมผัส
    nextBtn.addEventListener("touchstart", function (e) {
      e.preventDefault();
      showVideo(currentVideo + 1);
      startAutoProgress();
    });

    carouselContainer.appendChild(prevBtn);
    carouselContainer.appendChild(nextBtn);

    // เพิ่มการหยุดเลื่อนอัตโนมัติเมื่อเมาส์อยู่เหนือคารูเซล
    carouselContainer.addEventListener("mouseenter", stopAutoProgress);
    carouselContainer.addEventListener("mouseleave", startAutoProgress);

    // เพิ่มการรองรับสำหรับอุปกรณ์สัมผัส
    carouselContainer.addEventListener("touchstart", stopAutoProgress);
    carouselContainer.addEventListener("touchend", startAutoProgress);

    // เริ่ม carousel
    showVideo(0);
    startAutoProgress();
  }
}

// ฟังก์ชันตั้งค่า Modal สำหรับรูปภาพ
function setupModal() {
  // ตั้งค่า Modal สำหรับรูปภาพ
  window.openModal = function (src) {
    const modal = document.getElementById("modal");
    const modalContent = document.getElementById("modal-content");

    if (!modal || !modalContent) return;

    modalContent.src = src;
    modal.classList.add("active");

    // เพิ่มเอฟเฟกต์เปิด modal
    if (typeof gsap !== "undefined") {
      gsap.fromTo(
        modalContent,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: "power2.out" }
      );
    } else {
      // ใช้ CSS Animation แทนถ้าไม่มี GSAP
      modalContent.style.animation = "modal-open 0.5s forwards";
    }

    // ป้องกันการเลื่อนหน้าเมื่อเปิด modal
    document.body.style.overflow = "hidden";
  };

  const closeModal = document.getElementById("close-modal");
  const modal = document.getElementById("modal");
  const modalContent = document.getElementById("modal-content");

  if (closeModal && modal && modalContent) {
    closeModal.addEventListener("click", function () {
      // เพิ่มเอฟเฟกต์ปิด modal
      if (typeof gsap !== "undefined") {
        gsap.to(modalContent, {
          scale: 0.8,
          opacity: 0,
          duration: 0.3,
          onComplete: () => {
            modal.classList.remove("active");
            // คืนค่าการเลื่อนหน้า
            document.body.style.overflow = "";
          },
        });
      } else {
        // ใช้ CSS Animation แทนถ้าไม่มี GSAP
        modalContent.style.animation = "modal-close 0.3s forwards";
        modalContent.addEventListener("animationend", function () {
          modal.classList.remove("active");
          document.body.style.overflow = "";
        });
      }
    });

    // เพิ่มความสามารถในการกดภายนอกรูปภาพเพื่อปิด modal
    modal.addEventListener("click", function (e) {
      if (e.target === modal) {
        if (typeof gsap !== "undefined") {
          gsap.to(modalContent, {
            scale: 0.8,
            opacity: 0,
            duration: 0.3,
            onComplete: () => {
              modal.classList.remove("active");
              document.body.style.overflow = "";
            },
          });
        } else {
          modalContent.style.animation = "modal-close 0.3s forwards";
          modalContent.addEventListener("animationend", function () {
            modal.classList.remove("active");
            document.body.style.overflow = "";
          });
        }
      }
    });

    // เพิ่มการกดปุ่ม ESC เพื่อปิด modal
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && modal.classList.contains("active")) {
        if (typeof gsap !== "undefined") {
          gsap.to(modalContent, {
            scale: 0.8,
            opacity: 0,
            duration: 0.3,
            onComplete: () => {
              modal.classList.remove("active");
              document.body.style.overflow = "";
            },
          });
        } else {
          modalContent.style.animation = "modal-close 0.3s forwards";
          modalContent.addEventListener("animationend", function () {
            modal.classList.remove("active");
            document.body.style.overflow = "";
          });
        }
      }
    });
  }
}

// ฟังก์ชันตั้งค่าโมดัลแบบ responsive
function setupResponsiveModal() {
  const modal = document.getElementById("modal");
  if (!modal) return;

  // ปรับขนาดของโมดัลตามอุปกรณ์
  function adjustModalForDevice() {
    const isMobile = window.innerWidth < 768;
    const modalContent = document.getElementById("modal-content");

    if (!modalContent) return;

    if (isMobile) {
      modalContent.style.maxWidth = "95%";
      modalContent.style.maxHeight = "80%";
    } else {
      modalContent.style.maxWidth = "85%";
      modalContent.style.maxHeight = "85%";
    }
  }

  // ปรับขนาดเมื่อเปลี่ยนขนาดหน้าจอ
  window.addEventListener("resize", adjustModalForDevice);

  // เรียกใช้งานครั้งแรก
  adjustModalForDevice();
}

// ฟังก์ชันตั้งค่าแอนิเมชั่นสำหรับเค้ก
function setupCakeAnimations() {
  const cake = document.querySelector(".birthday-cake");

  if (!cake) return;

  // ทำให้เค้กสั่นได้เมื่อ hover
  cake.addEventListener("mouseleave", () => {
    if (typeof gsap !== "undefined") {
      gsap.to(cake, {
        y: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    } else {
      cake.style.transform = "translateY(0)";
    }
  });

  // ทำให้เค้กตอบสนองกับการคลิก
  cake.addEventListener("click", () => {
    if (typeof gsap !== "undefined") {
      gsap.to(cake, {
        scale: 1.1,
        duration: 0.2,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut",
      });
    } else {
      cake.style.animation = "cake-bounce 0.4s";
      cake.addEventListener("animationend", function () {
        cake.style.animation = "";
      });
    }
  });

  // เพิ่มการรองรับสำหรับอุปกรณ์สัมผัส
  cake.addEventListener("touchstart", function (e) {
    e.preventDefault(); // ป้องกันการเลื่อนจอ
    if (typeof gsap !== "undefined") {
      gsap.to(cake, {
        scale: 1.1,
        duration: 0.2,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut",
      });
    } else {
      cake.style.animation = "cake-bounce 0.4s";
      cake.addEventListener("animationend", function () {
        cake.style.animation = "";
      });
    }
  });
}

// ฟังก์ชันจัดการกับอุปกรณ์ที่มีประสิทธิภาพต่ำ
function handleLowPerformance() {
  // ตรวจสอบว่าเป็นอุปกรณ์ที่มีประสิทธิภาพต่ำหรือไม่
  const isLowPerformanceDevice = () => {
    return (
      window.innerWidth < 480 ||
      /Android 4|Android 5|iPhone 5|iPhone 6/i.test(navigator.userAgent)
    );
  };

  // ถ้าเป็นอุปกรณ์ที่มีประสิทธิภาพต่ำ
  if (isLowPerformanceDevice()) {
    // เพิ่มคลาสสำหรับอุปกรณ์ประสิทธิภาพต่ำ
    document.body.classList.add("low-performance");

    // ลดจำนวนอนิเมชั่นและเอฟเฟกต์
    reduceAnimations();
  }
}

// ฟังก์ชันลดจำนวนอนิเมชั่นสำหรับอุปกรณ์ประสิทธิภาพต่ำ
function reduceAnimations() {
  // ลดจำนวนคอนเฟตติ
  const confettiItems = document.querySelectorAll(".confetti");
  if (confettiItems.length > 20) {
    for (let i = 20; i < confettiItems.length; i++) {
      if (confettiItems[i].parentNode) {
        confettiItems[i].parentNode.removeChild(confettiItems[i]);
      }
    }
  }

  // ลดจำนวนโน้ตดนตรี
  const dancingNotes = document.querySelectorAll(".dancing-note");
  if (dancingNotes.length > 5) {
    for (let i = 5; i < dancingNotes.length; i++) {
      if (dancingNotes[i].parentNode) {
        dancingNotes[i].parentNode.removeChild(dancingNotes[i]);
      }
    }
  }

  // ซ่อนบางส่วนของอนิเมชันที่ไม่จำเป็น
  const rows = document.querySelectorAll(".gallery-row");
  if (rows.length > 1) {
    for (let i = 1; i < rows.length; i++) {
      rows[i].style.display = "none";
    }
  }

  // ลด parallax effect
  document.querySelectorAll(".parallax-bg").forEach((bg) => {
    bg.style.transform = "none";
  });
}

// ฟังก์ชันสร้างโน้ตเพลงที่ลอยอยู่
function createDancingNotes() {
  const notes = ["♪", "♫", "♩", "♬"];
  const section3 = document.querySelector(".section-3");

  if (!section3) return;

  // ลดจำนวนโน้ตบนอุปกรณ์มือถือ
  const isMobile = window.innerWidth < 768;
  const noteCount = isMobile ? 8 : 15;

  for (let i = 0; i < noteCount; i++) {
    const note = document.createElement("div");
    note.classList.add("dancing-note");
    note.innerHTML = notes[Math.floor(Math.random() * notes.length)];
    note.style.left = Math.random() * 100 + "%";
    note.style.top = Math.random() * 100 + "%";
    note.style.fontSize = 20 + Math.random() * 20 + "px";
    section3.appendChild(note);

    if (typeof gsap !== "undefined") {
      gsap.to(note, {
        duration: 10 + Math.random() * 5,
        y: -300,
        x: (Math.random() - 0.5) * 200,
        opacity: 0.7,
        ease: "sine.inOut",
        repeat: -1,
        delay: Math.random() * 5,
      });
    } else {
      // ใช้ CSS Animation แทนถ้าไม่มี GSAP
      note.style.animation = `note-float ${10 + Math.random() * 5}s infinite ${
        Math.random() * 5
      }s`;
    }
  }
}
