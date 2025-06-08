// Contact page animations
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import emailjs from "@emailjs/browser";

gsap.registerPlugin(ScrollTrigger);
// Contact section animations

document.addEventListener("DOMContentLoaded", function () {
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
  contactTimeline
    .from(".contact-header", {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    })
    .from(
      ".contact-intro",
      {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
      },
      "-=0.4"
    )
    .from(
      ".contact-method",
      {
        opacity: 0,
        stagger: 0.2,
        duration: 0.6,
        ease: "back.out(1.7)",
      },
      "-=0.4"
    )
    .from(
      ".social-links",
      {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
      },
      "-=0.4"
    )
    .from(
      ".contact-form-container",
      {
        x: 50,
        opacity: 0,
        duration: 0.8,
        ease: "back.out(1.7)",
      },
      "-=0.6"
    )
    .from(
      ".contact-quote",
      {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      },
      "-=0.4"
    );

  // Form input animations
  const formInputs = document.querySelectorAll(
    ".contact-form input, .contact-form textarea"
  );
  if (formInputs) {
    formInputs.forEach((input) => {
      input.addEventListener("focus", () => {
        gsap.to(input, {
          borderColor: "#e5383b",
          boxShadow: "0 0 0 3px rgba(229, 56, 59, 0.2)",
          duration: 0.3,
          ease: "power2.out",
        });
      });

      input.addEventListener("blur", () => {
        if (!input.value) {
          gsap.to(input, {
            borderColor: "rgba(177, 167, 166, 0.3)",
            boxShadow: "none",
            duration: 0.3,
            ease: "power2.out",
          });
        }
      });
    });
  }

  // Email sending function
  function sendEmail() {
    // Get form element and check validity
    const contactForm = document.querySelector(".contact-form");
    if (!contactForm || !contactForm.checkValidity()) return;

    // Get form data
    const formData = new FormData(contactForm);
    const templateParams = {
        from_name: formData.get("name"),
        from_email: formData.get("email"),
        subject: formData.get("subject"),
        message: formData.get("message"),
        date: new Date().toLocaleString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          timeZoneName: "short"
        })
      };

    // Send email using EmailJS
    return emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      templateParams,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    );
  }

  // Form submission with animations
  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const submitBtn = this.querySelector(".submit-btn");
      const btnText = submitBtn.querySelector(".btn-text");
      const btnIcon = submitBtn.querySelector("i");

      // Disable button
      submitBtn.disabled = true;

      // Show loading state
      gsap.to(btnText, {
        opacity: 0,
        y: -10,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          btnText.textContent = "Sending...";
          gsap.to(btnText, {
            opacity: 1,
            y: 0,
            duration: 0.3,
            ease: "power2.out",
          });
        },
      });

      gsap.to(btnIcon, {
        rotation: 360,
        repeat: 2,
        duration: 0.8,
        ease: "power1.inOut",
      });

      // Actually send the email
      sendEmail()
        .then(() => {
          // Show success state
          gsap.to(btnText, {
            opacity: 0,
            y: -10,
            duration: 0.3,
            ease: "power2.in",
            onComplete: () => {
              btnText.textContent = "Message Sent!";
              btnIcon.className = "fas fa-check";
              submitBtn.style.backgroundColor = "#4CAF50";

              gsap.to(btnText, {
                opacity: 1,
                y: 0,
                duration: 0.3,
                ease: "power2.out",
              });

              gsap.to(btnIcon, {
                scale: 1.2,
                duration: 0.3,
                ease: "back.out(1.7)",
                onComplete: () => {
                  gsap.to(btnIcon, {
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out",
                  });
                },
              });

              // Reset form
              contactForm.reset();
            },
          });
        })
        .catch((error) => {
          console.error("Email sending failed:", error);

          // Show error state
          gsap.to(btnText, {
            opacity: 0,
            y: -10,
            duration: 0.3,
            ease: "power2.in",
            onComplete: () => {
              btnText.textContent = "Failed to Send";
              btnIcon.className = "fas fa-exclamation-triangle";
              submitBtn.style.backgroundColor = "#dc3545";

              gsap.to(btnText, {
                opacity: 1,
                y: 0,
                duration: 0.3,
                ease: "power2.out",
              });
            },
          });
        })
        .finally(() => {
          // Reset button after delay
          setTimeout(() => {
            gsap.to(submitBtn, {
              backgroundColor: "#a4161a",
              duration: 0.5,
              ease: "power2.inOut",
            });

            gsap.to(btnText, {
              opacity: 0,
              y: -10,
              duration: 0.3,
              ease: "power2.in",
              onComplete: () => {
                btnText.textContent = "Send Message";
                btnIcon.className = "fas fa-paper-plane";
                submitBtn.disabled = false;

                gsap.to(btnText, {
                  opacity: 1,
                  y: 0,
                  duration: 0.3,
                  ease: "power2.out",
                });
              },
            });
          }, 3000);
        });
    });
  }
});
