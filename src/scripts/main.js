import "@fortawesome/fontawesome-free/css/all.min.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
// main.js
import { SmoothScroll, ScrollController } from "./utils";

const smoothScroll = new SmoothScroll();
const scrollController = new ScrollController(smoothScroll);


// Set the chatbot container selector

// Make both available globally
window.smoothScroll = smoothScroll;
window.scrollController = scrollController;

gsap.registerPlugin(ScrollTrigger);

function scrollToSection(sectionId) {
  document.getElementById(sectionId).scrollIntoView({
    behavior: "smooth",
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const navIcon = document.querySelector(".nav-icon");
  const navList = document.querySelector(".nav-list");

  navIcon.addEventListener("click", function () {
    navList.classList.toggle("show");
    navIcon.classList.toggle("close");
  });

  const navLinks = document.querySelectorAll(".nav-list li a");

  function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({
      behavior: "smooth",
    });
  }
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      scrollToSection(link.getAttribute("href").substring(1));
      navIcon.classList.toggle("close");
      navList.classList.remove("show");
    });
  });
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".quote",
      start: "-350px 250px",
      end: "90% 10%",
      scrub: 1, // Remove this if you want fixed timing
    },
  });

  gsap.utils.toArray(".quote .fill .fill-text").forEach((el) => {
    tl.to(el, {
      width: "100%",
      duration: 4.2,
      ease: "power2.out",
    }).to(
      el,
      {
        width: "0%",
        duration: 1.2,
        ease: "power2.out",
      },
      "+=1.2"
    );
  });

  gsap.from(".quote-footer h1", {
    y: 100,
    duration: 1,
    scrollTrigger: {
      trigger: ".quote",
      start: "150% 80%",
      end: "250% 20%",
      //  markers:true,
      toggleActions: "play none none reverse", // Add this for debugging
    },
  });

  const educationTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".education",
      start: "top 80%",
      end: "bottom 20%",
      // scrub: true,
      toggleActions: "play reverse play reverse",
    },
  });

  educationTimeline
    .from(".education-header", {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    })
    .from(
      ".timeline-line",
      {
        height: 0,
        duration: 1.2,
        ease: "power3.inOut",
      },
      "-=0.4"
    )
    .fromTo(
      ".education-card",
      {
        x: -50,
        opacity: 0,
        duration: 0.8,
        ease: "back.out(1.7)",
      },
      {
        x: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.2,
        ease: "power3.out",
      },
      "-=0.8"
    )
    .from(
      ".education-quote",
      {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      },
      "-=0.4"
    );

  // Add hover animations for skill tags
  const skillTags = document.querySelectorAll(".skill-tag");
  if (skillTags) {
    skillTags.forEach((tag) => {
      tag.addEventListener("mouseenter", () => {
        gsap.to(tag, {
          y: -5,
          scale: 1.05,
          duration: 0.3,
          ease: "power2.out",
        });
      });

      tag.addEventListener("mouseleave", () => {
        gsap.to(tag, {
          y: 0,
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      });
    });
  }

  // About Me section animations
  const aboutTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".about-me",
      start: "top 80%",
      end: "bottom 20%",
      toggleActions: "play none none reverse",
    },
  });

  gsap.to(".about-image", {
    y: 100, // moves image upward on scroll
    ease: "none",
    scrollTrigger: {
      trigger: ".about-image-container",
      start: "top bottom", // when container enters viewport
      end: "bottom top", // until it leaves viewport
      scrub: true, // smooth scrubbing
    },
  });

  aboutTimeline
    .from(".about-header", {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    })
    .from(
      ".about-image-wrapper",
      {
        x: -50,
        opacity: 0,
        duration: 0.8,
        ease: "back.out(1.7)",
      },
      "-=0.4"
    )
    .from(
      ".karate-badge",
      {
        x: 50,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
      },
      "-=0.6"
    )
    .from(
      ".about-intro",
      {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      },
      "-=0.4"
    )
    .from(
      ".achievement-item",
      {
        x: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: "power3.out",
      },
      "-=0.4"
    )
    .from(
      ".about-philosophy",
      {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      },
      "-=0.4"
    )
    .from(
      ".skill-container",
      {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      },
      "-=0.6"
    )
    .from(
      ".about-quote",
      {
        scale: 0.9,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      },
      "-=0.4"
    );

  // Add interactive effect for achievement items
  const achievementItems = document.querySelectorAll(".achievement-item");
  if (achievementItems) {
    achievementItems.forEach((item) => {
      item.addEventListener("mouseenter", () => {
        gsap.to(item.querySelector(".achievement-icon"), {
          backgroundColor: `rgba(${hexToRgb($primary - darker)}, 0.6)`,
          scale: 1.1,
          duration: 0.3,
          ease: "power2.out",
        });
      });

      item.addEventListener("mouseleave", () => {
        gsap.to(item.querySelector(".achievement-icon"), {
          backgroundColor: `rgba(${hexToRgb($primary - darker)}, 0.2)`,
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      });
    });
  }
  // Projects section animations
  const projectsTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".projects",
      start: "top 80%",
      end: "bottom 20%",
      toggleActions: "play none none reverse",
    },
  });

  projectsTimeline
    .from(".projects-header", {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    })
    .from(
      ".projects-filter",
      {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
      },
      "-=0.4"
    )
    .from(
      ".project-card",
      {
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "back.out(1.7)",
      },
      "-=0.2"
    )
    .from(
      ".projects-cta",
      {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
      },
      "-=0.4"
    );

  // Project filtering functionality
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");
  projectCards.forEach((card) => {
    card.style.display = "block";
    card.style.opacity = 1;
  });
  if (filterButtons.length) {
    filterButtons[0].classList.add("active");
  }
  if (filterButtons.length && projectCards.length) {
    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        // Update active button
        filterButtons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");

        const filter = button.getAttribute("data-filter");

        // Keep track of animation completion
        let animationsCompleted = 0;
        const totalAnimations = projectCards.length;

        // Filter projects
        projectCards.forEach((card) => {
          if (
            filter === "all" ||
            card.getAttribute("data-category") === filter
          ) {
            // Show card with animation
            gsap.to(card, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.4,
              ease: "power3.out",
              clearProps: "visibility",
              onStart: () => {
                card.style.display = "block";
              },
              onComplete: () => {
                animationsCompleted++;
                if (animationsCompleted === totalAnimations) {
                  // Refresh ScrollTrigger after all animations complete
                  ScrollTrigger.refresh();
                }
              },
            });
          } else {
            // Hide card with animation
            gsap.to(card, {
              opacity: 0,
              y: 20,
              scale: 0.95,
              duration: 0.4,
              ease: "power3.in",
              onComplete: () => {
                card.style.display = "none";
                animationsCompleted++;
                if (animationsCompleted === totalAnimations) {
                  // Refresh ScrollTrigger after all animations complete
                  ScrollTrigger.refresh();
                }
              },
            });
          }
        });
      });
    });
  }

  // Hover effects for project cards
  projectCards.forEach((card) => {
    const techTags = card.querySelectorAll(".tech-tag");

    gsap.utils.toArray(techTags).forEach((tag) => {
      tag.style.opacity = 0;
      card.addEventListener("mouseenter", () => {
        gsap.to(tag, {
          y: -10,
          stagger: 0.05,
          duration: 0.3,
          ease: "power2.out",
          onStart: () => {
            gsap.utils.toArray(techTags).forEach((tag) => {
              tag.style.opacity = 1;
            });
          },
        });
      });
    });

    card.addEventListener("mouseleave", () => {
      gsap.to(techTags, {
        y: 0,
        stagger: 0.05,
        duration: 0.3,
        ease: "power2.in",
      });
    });
  });

  // Skills section animations
  const skillsTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".skills",
      start: "top 80%",
      end: "bottom 20%",
      toggleActions: "play none none reverse",
    },
  });

  skillsTimeline
    .from(".skills-header", {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    })
    .from(
      ".skills-column",
      {
        x: -50,
        opacity: 0,
        stagger: 0.3,
        duration: 0.8,
        ease: "back.out(1.7)",
      },
      "-=0.4"
    )
    .from(
      ".skills-quote",
      {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      },
      "-=0.4"
    );
});

// Skills Marquee Animation
function initSkillsMarquee() {
  const marqueeTrack = document.querySelector(".marquee-track");
  const skillSpans = document.querySelectorAll(".skills-marquee span");

  if (marqueeTrack && skillSpans.length) {
    // Random starting positions for skill items
    skillSpans.forEach((span) => {
      gsap.from(span, {
        y: -30,
        opacity: 0,
        duration: 0.8,
        ease: "back.out(1.7)",
        delay: Math.random() * 1.5,
        scrollTrigger: {
          trigger: ".skills-marquee",
          start: "top 90%",
          toggleActions: "play none none none",
        },
      });
    });

    // Hover effect for each skill
    skillSpans.forEach((span) => {
      span.addEventListener("mouseenter", () => {
        const icon = span.querySelector("i");
        gsap.to(icon, {
          rotation: 360,
          scale: 1.2,
          color: "#ffffff",
          duration: 0.5,
          ease: "back.out(1.7)",
        });
      });

      span.addEventListener("mouseleave", () => {
        const icon = span.querySelector("i");
        gsap.to(icon, {
          rotation: 0,
          scale: 1,
          color: "#e5383b",
          duration: 0.5,
          ease: "power2.out",
        });
      });
    });
  }
}

// Helper function to convert hex to rgb
function hexToRgb(hex) {
  // Remove the hash if it exists
  hex = hex.replace("#", "");

  // Parse the hex values
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return `${r}, ${g}, ${b}`;
}

// Animate skill progress bars when they come into view
function animateSkillBars() {
  const skillBars = document.querySelectorAll(".skill-progress-bar");

  if (skillBars.length) {
    skillBars.forEach((bar) => {
      const width = bar.getAttribute("data-width");
      gsap.to(bar, {
        width: width,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: bar,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      });
    });
  }
}

// Animate fun skill bars
function animateFunSkillBars() {
  const funSkillBars = document.querySelectorAll(".fun-skill-progress");

  if (funSkillBars.length) {
    funSkillBars.forEach((bar) => {
      const width = bar.style.width;
      bar.style.width = "0%";

      gsap.to(bar, {
        width: width,
        duration: 1.5,
        ease: "elastic.out(1, 0.3)",
        scrollTrigger: {
          trigger: bar,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      });
    });
  }
}

// Create radar chart for soft skills
function createRadarChart() {
  const canvas = document.getElementById("softSkillsRadar");

  if (canvas) {
    const ctx = canvas.getContext("2d");
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 30;

    // Skills data (out of 100)
    const skills = [
      { name: "Communication", value: 90 },
      { name: "Problem Solving", value: 95 },
      { name: "Teamwork", value: 85 },
      { name: "Adaptability", value: 92 },
      { name: "Time Management", value: 80 },
      { name: "Leadership", value: 88 },
    ];

    const numSkills = skills.length;
    const angleStep = (Math.PI * 2) / numSkills;

    // Draw background
    ctx.fillStyle = "rgba(177, 167, 166, 0.1)";
    ctx.beginPath();
    for (let i = 0; i < numSkills; i++) {
      const angle = i * angleStep - Math.PI / 2;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.closePath();
    ctx.fill();

    // Draw grid lines
    for (let j = 1; j <= 5; j++) {
      const gridRadius = radius * (j / 5);
      ctx.strokeStyle = "rgba(177, 167, 166, 0.1)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let i = 0; i < numSkills; i++) {
        const angle = i * angleStep - Math.PI / 2;
        const x = centerX + gridRadius * Math.cos(angle);
        const y = centerY + gridRadius * Math.sin(angle);

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.closePath();
      ctx.stroke();
    }

    // Draw axes
    ctx.strokeStyle = "rgba(177, 167, 166, 0.3)";
    ctx.lineWidth = 1;
    for (let i = 0; i < numSkills; i++) {
      const angle = i * angleStep - Math.PI / 2;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(x, y);
      ctx.stroke();
    }

    // Animate the radar chart
    gsap
      .timeline({
        scrollTrigger: {
          trigger: canvas,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      })
      .to(
        {
          progress: 0,
        },
        {
          progress: 1,
          duration: 1.5,
          ease: "power3.out",
          onUpdate: function () {
            const progress = this.progress();

            // Clear canvas for animation
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Redraw background
            ctx.fillStyle = "rgba(177, 167, 166, 0.1)";
            ctx.beginPath();
            for (let i = 0; i < numSkills; i++) {
              const angle = i * angleStep - Math.PI / 2;
              const x = centerX + radius * Math.cos(angle);
              const y = centerY + radius * Math.sin(angle);

              if (i === 0) {
                ctx.moveTo(x, y);
              } else {
                ctx.lineTo(x, y);
              }
            }
            ctx.closePath();
            ctx.fill();

            // Redraw grid lines
            for (let j = 1; j <= 5; j++) {
              const gridRadius = radius * (j / 5);
              ctx.strokeStyle = "rgba(177, 167, 166, 0.1)";
              ctx.lineWidth = 1;
              ctx.beginPath();
              for (let i = 0; i < numSkills; i++) {
                const angle = i * angleStep - Math.PI / 2;
                const x = centerX + gridRadius * Math.cos(angle);
                const y = centerY + gridRadius * Math.sin(angle);

                if (i === 0) {
                  ctx.moveTo(x, y);
                } else {
                  ctx.lineTo(x, y);
                }
              }
              ctx.closePath();
              ctx.stroke();
            }

            // Redraw axes
            ctx.strokeStyle = "rgba(177, 167, 166, 0.3)";
            ctx.lineWidth = 1;
            for (let i = 0; i < numSkills; i++) {
              const angle = i * angleStep - Math.PI / 2;
              const x = centerX + radius * Math.cos(angle);
              const y = centerY + radius * Math.sin(angle);

              ctx.beginPath();
              ctx.moveTo(centerX, centerY);
              ctx.lineTo(x, y);
              ctx.stroke();
            }

            // Draw data points with animation
            ctx.fillStyle = "rgba(229, 56, 59, 0.7)";
            ctx.strokeStyle = "rgba(229, 56, 59, 1)";
            ctx.lineWidth = 2;
            ctx.beginPath();

            for (let i = 0; i < numSkills; i++) {
              const angle = i * angleStep - Math.PI / 2;
              const value = (skills[i].value * progress) / 100;
              const pointRadius = radius * value;
              const x = centerX + pointRadius * Math.cos(angle);
              const y = centerY + pointRadius * Math.sin(angle);

              if (i === 0) {
                ctx.moveTo(x, y);
              } else {
                ctx.lineTo(x, y);
              }
            }

            ctx.closePath();
            ctx.globalAlpha = 0.7;
            ctx.fill();
            ctx.globalAlpha = 1;
            ctx.stroke();

            // Draw points at vertices
            for (let i = 0; i < numSkills; i++) {
              const angle = i * angleStep - Math.PI / 2;
              const value = (skills[i].value * progress) / 100;
              const pointRadius = radius * value;
              const x = centerX + pointRadius * Math.cos(angle);
              const y = centerY + pointRadius * Math.sin(angle);

              ctx.fillStyle = "#ffffff";
              ctx.beginPath();
              ctx.arc(x, y, 4, 0, Math.PI * 2);
              ctx.fill();

              ctx.strokeStyle = "rgba(229, 56, 59, 1)";
              ctx.lineWidth = 2;
              ctx.beginPath();
              ctx.arc(x, y, 4, 0, Math.PI * 2);
              ctx.stroke();
            }
          },
        }
      );
  }
}

// Initialize all animations when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  initSkillsMarquee();

  let t3 = gsap.timeline({
    scrollTrigger: {
      trigger: ".projects",
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
    },
  });

  t3.to(".page-sections", {
    duration: 1, // Relative duration within timeline
    background: "#530505",
    ease: "power3.out",
  }).to(".page-sections", {
    duration: 1, // Relative duration within timeline
    background: "#0b090ad4",
    ease: "power3.out",
  });
  // Initialize skills animations
  animateSkillBars();
  animateFunSkillBars();
  createRadarChart();
});

// Add hover effects for karate skills
const karateSkills = document.querySelectorAll(".karate-skill");
if (karateSkills) {
  karateSkills.forEach((skill) => {
    skill.addEventListener("mouseenter", () => {
      gsap.to(skill.querySelector(".karate-skill-icon"), {
        backgroundColor: `rgba(${hexToRgb($accent - dark)}, 0.4)`,
        scale: 1.1,
        duration: 0.3,
        ease: "power2.out",
      });
    });

    skill.addEventListener("mouseleave", () => {
      gsap.to(skill.querySelector(".karate-skill-icon"), {
        backgroundColor: `rgba(${hexToRgb($accent - dark)}, 0.2)`,
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    });
  });
}

// Contact section animations
const contactTimeline = gsap.timeline({
  scrollTrigger: {
    trigger: ".contact",
    start: "top 80%",
    end: "bottom 20%",
    toggleActions: "play none none reverse",
  },
});

// Social icon hover animations
const socialIcons = document.querySelectorAll(".social-icon");
if (socialIcons) {
  socialIcons.forEach((icon) => {
    icon.addEventListener("mouseenter", () => {
      gsap.to(icon, {
        y: -5,
        backgroundColor: "#a4161a",
        duration: 0.3,
        ease: "power2.out",
      });
    });

    icon.addEventListener("mouseleave", () => {
      gsap.to(icon, {
        y: 0,
        backgroundColor: "rgba(11, 9, 10, 0.5)",
        duration: 0.3,
        ease: "power2.out",
      });
    });
  });
}

// Testimonials Slider Functionality
class TestimonialsSlider {
  constructor() {
    ScrollTrigger.refresh();

    this.currentSlide = 0;
    this.slides = document.querySelectorAll(".testimonial-card");
    this.dots = document.querySelectorAll(".testimonials-dots .dot");
    this.prevBtn = document.querySelector(".testimonials-navigation .prev");
    this.nextBtn = document.querySelector(".testimonials-navigation .next");
    this.autoSlideInterval = null;

    this.init();
  }

  init() {
    if (this.slides.length === 0) return;

    this.bindEvents();
    this.startAutoSlide();
    this.animateStats();
  }

  bindEvents() {
    // Navigation buttons
    this.prevBtn?.addEventListener("click", () => this.prevSlide());
    this.nextBtn?.addEventListener("click", () => this.nextSlide());

    // Dots navigation
    this.dots.forEach((dot, index) => {
      dot.addEventListener("click", () => this.goToSlide(index));
    });

    // Pause auto-slide on hover
    const container = document.querySelector(".testimonials-container");
    container?.addEventListener("mouseenter", () => this.stopAutoSlide());
    container?.addEventListener("mouseleave", () => this.startAutoSlide());

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") this.prevSlide();
      if (e.key === "ArrowRight") this.nextSlide();
    });
  }

  goToSlide(index) {
    // Remove active class from current slide and dot
    this.slides[this.currentSlide]?.classList.remove("active");
    this.dots[this.currentSlide]?.classList.remove("active");

    // Update current slide
    this.currentSlide = index;

    // Add active class to new slide and dot
    this.slides[this.currentSlide]?.classList.add("active");
    this.dots[this.currentSlide]?.classList.add("active");

    // Animate slide transition
    gsap.fromTo(
      this.slides[this.currentSlide],
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
    );
  }

  nextSlide() {
    const nextIndex = (this.currentSlide + 1) % this.slides.length;
    this.goToSlide(nextIndex);
  }

  prevSlide() {
    const prevIndex =
      (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    this.goToSlide(prevIndex);
  }

  startAutoSlide() {
    this.stopAutoSlide();
    this.autoSlideInterval = setInterval(() => {
      this.nextSlide();
    }, 8000); // Change slide every 5 seconds
  }

  stopAutoSlide() {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
      this.autoSlideInterval = null;
    }
  }

  animateStats() {
    const stats = document.querySelectorAll(".stat-number");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target;
            const finalValue = target.textContent;

            // Extract number from text (e.g., "50+" -> 50)
            const numericValue = parseInt(finalValue.replace(/[^0-9]/g, ""));

            // Animate counter
            gsap.fromTo(
              target,
              { textContent: 0 },
              {
                textContent: numericValue,
                duration: 2,
                ease: "power2.out",
                snap: { textContent: 1 },
                onUpdate: function () {
                  const current = Math.round(this.targets()[0].textContent);
                  target.textContent = finalValue.replace(/[0-9]+/, current);
                },
              }
            );

            observer.unobserve(target);
          }
        });
      },
      { threshold: 0.5 }
    );

    stats.forEach((stat) => observer.observe(stat));
  }
}

// Initialize testimonials slider when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new TestimonialsSlider();
});
