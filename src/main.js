import "@fortawesome/fontawesome-free/css/all.min.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);
document.addEventListener("DOMContentLoaded", function () {
  const navIcon = document.querySelector(".nav-icon");
  const navList = document.querySelector(".nav-list");

  navIcon.addEventListener("click", function () {
    navList.classList.toggle("show");
    navIcon.classList.toggle("close");
  });

  const navLinks = document.querySelectorAll(".nav-list li a");

  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      navList.classList.remove("show");
    });
  });
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".quote",
      start: "-100px 400px",
      end: "60% 10%",
      scrub: 1, // Remove this if you want fixed timing
    },
  });

  gsap.utils.toArray(".quote .fill .fill-text").forEach((el) => {
    tl.to(el, {
      width: "100%",
      duration: 1.2,
      ease: "power2.out",
    });
  });
  gsap.from(".quote-footer h1", {
     y: 100,
      duration: 1 ,
      scrollTrigger: {
        trigger: ".quote-footer",
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse", // Add this for debugging
      },
    });
});

// Education section animations
gsap.registerPlugin(ScrollTrigger);

const educationTimeline = gsap.timeline({
  scrollTrigger: {
    trigger: ".education",
    start: "top 80%",
    end: "bottom 20%",
    toggleActions: "play none none reverse"
  }
});

educationTimeline
  .from(".education-header", {
    y: 50,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out"
  })
  .from(".timeline-line", {
    height: 0,
    duration: 1.2,
    ease: "power3.inOut"
  }, "-=0.4")
  .from(".education-card", {
    x: -50,
    opacity: 0,
    duration: 0.8,
    ease: "back.out(1.7)"
  }, "-=0.8")
  .from(".education-quote", {
    y: 30,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out"
  }, "-=0.4");

// Add hover animations for skill tags
const skillTags = document.querySelectorAll('.skill-tag');
if (skillTags) {
  skillTags.forEach(tag => {
    tag.addEventListener('mouseenter', () => {
      gsap.to(tag, {
        y: -5,
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out"
      });
    });
    
    tag.addEventListener('mouseleave', () => {
      gsap.to(tag, {
        y: 0,
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
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
    toggleActions: "play none none reverse"
  }
});

aboutTimeline
  .from(".about-header", {
    y: 50,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out"
  })
  .from(".about-image-wrapper", {
    x: -50,
    opacity: 0,
    duration: 0.8,
    ease: "back.out(1.7)"
  }, "-=0.4")
  .from(".karate-badge", {
    x: 50,
    opacity: 0,
    duration: 0.6,
    ease: "power3.out"
  }, "-=0.6")
  .from(".about-intro", {
    y: 30,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out"
  }, "-=0.4")
  .from(".achievement-item", {
    x: 30,
    opacity: 0,
    duration: 0.6,
    stagger: 0.2,
    ease: "power3.out"
  }, "-=0.4")
  .from(".about-philosophy", {
    y: 30,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out"
  }, "-=0.4")
  .from(".skill-container", {
    y: 30,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out"
  }, "-=0.6")
  .from(".about-quote", {
    scale: 0.9,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out"
  }, "-=0.4");

// Add interactive effect for achievement items
const achievementItems = document.querySelectorAll('.achievement-item');
if (achievementItems) {
  achievementItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      gsap.to(item.querySelector('.achievement-icon'), {
        backgroundColor: `rgba(${hexToRgb($primary-darker)}, 0.6)`,
        scale: 1.1,
        duration: 0.3,
        ease: "power2.out"
      });
    });
    
    item.addEventListener('mouseleave', () => {
      gsap.to(item.querySelector('.achievement-icon'), {
        backgroundColor: `rgba(${hexToRgb($primary-darker)}, 0.2)`,
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    });
  });
}

// Helper function to convert hex to rgb
function hexToRgb(hex) {
  // Remove the hash if it exists
  hex = hex.replace('#', '');
  
  // Parse the hex values
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  return `${r}, ${g}, ${b}`;
}

// Projects section animations
const projectsTimeline = gsap.timeline({
  scrollTrigger: {
    trigger: ".projects",
    start: "top 80%",
    end: "bottom 20%",
    toggleActions: "play none none reverse"
  }
});

projectsTimeline
  .from(".projects-header", {
    y: 50,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out"
  })
  .from(".projects-filter", {
    y: 30,
    opacity: 0,
    duration: 0.6,
    ease: "power3.out"
  }, "-=0.4")
  .from(".project-card", {
    y: 50,
    opacity: 0,
    stagger: 0.2,
    duration: 0.8,
    ease: "back.out(1.7)"
  }, "-=0.2")
  .from(".projects-cta", {
    y: 30,
    opacity: 0,
    duration: 0.6,
    ease: "power3.out"
  }, "-=0.4");

// Project filtering functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

if (filterButtons.length && projectCards.length) {
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Update active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      const filter = button.getAttribute('data-filter');
      
      // Filter projects
      projectCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          // Show card with animation
          gsap.to(card, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.4,
            ease: "power3.out",
            clearProps: "visibility",
            onStart: () => {
              card.style.display = 'block';
            }
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
              card.style.display = 'none';
            }
          });
        }
      });
    });
  });
}

// Hover effects for project cards
projectCards.forEach(card => {
  const techTags = card.querySelectorAll('.tech-tag');
  
  card.addEventListener('mouseenter', () => {
    gsap.to(techTags, {
      y: -5,
      stagger: 0.1,
      duration: 0.3,
      ease: "power2.out"
    });
  });
  
  card.addEventListener('mouseleave', () => {
    gsap.to(techTags, {
      y: 0,
      stagger: 0.05,
      duration: 0.3,
      ease: "power2.in"
    });
  });
});
