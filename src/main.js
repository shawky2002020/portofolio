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
