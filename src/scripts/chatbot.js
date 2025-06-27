import { gsap } from "gsap";
import { ScrollController } from "./utils";
let scrollY = 0;

class Chatbot {
  constructor() {
    // Initialize state first
    this.isOpen = false;
    this.conversationStarted = false;
    this.messageQueue = [];
    this.processingQueue = false;
     this.sc = new ScrollController();
     this.sc.setChatbotSelector('.chatbot-container')

    // Knowledge Base - now grouped by topic with questions
    this.knowledgeBase = {
      portfolio: [
        {
          q: "What is this portfolio about?",
          a: "This portfolio showcases Shawky's journey as a full-stack developer and professional athlete. From clean code to karate kicks, it’s all in here!"
        },
        {
          q: "Who created this portfolio?",
          a: "Shawky Ahmad, a MEAN stack developer and Egyptian national karate champion, created this portfolio to blend tech and tenacity."
        }
      ],
      skills: [
        {
          q: "What are Shawky's main skills?",
          a: "Shawky is skilled in JavaScript, Angular, Node.js, Python, MongoDB, and Express. He also builds intuitive UIs and writes clean backend logic."
        },
        {
          q: "Does Shawky have soft skills?",
          a: "Absolutely! Shawky excels in communication, leadership, adaptability, and has discipline sharpened by years of karate training."
        }
      ],
      contact: [
        {
          q: "How can I contact Shawky?",
          a: "Use the contact form or reach out via LinkedIn or email. He responds faster than his roundhouse kick!"
        },
        {
          q: "Is Shawky available for hire?",
          a: "Yes! Shawky is open to freelance, part-time, and full-time opportunities in web development or tech instruction."
        }
      ],
      karate: [
        {
          q: "What is Shawky's karate background?",
          a: "Shawky is a professional karate player on the Egyptian National Team and Al Ahly Club's first team with multiple championship medals."
        },
        {
          q: "How does karate help with coding?",
          a: "Karate instills discipline, focus, and strategy—all of which Shawky applies to debugging, problem-solving, and team collaboration."
        }
      ],
      projects: [
        {
          q: "Where can I see Shawky's projects?",
          a: "Head over to the Projects section to explore his web apps, landing pages, AI integrations, and more."
        },
        {
          q: "What kind of projects has Shawky built?",
          a: "From eCommerce platforms and expense trackers to smart AI games and medical AI tools—Shawky’s code covers it all."
        }
      ],
      education: [
        {
          q: "What did Shawky study?",
          a: "Shawky studied Computer and Systems Engineering at Ain Shams University, blending software with solid systems knowledge."
        },
        {
          q: "Did Shawky take any certifications?",
          a: "Yes! Shawky earned certifications in MEAN stack development, AI career essentials, and responsive web design."
        }
      ],
      experience: [
        {
          q: "What is Shawky's work experience?",
          a: "Shawky has experience as a full-stack developer, part-time programming instructor, and freelancer, building real-world applications."
        },
        {
          q: "Has Shawky worked with teams?",
          a: "Yes! Shawky has collaborated on projects, managed tasks in dev teams, and guided students as a coding mentor."
        }
      ],
      achievements: [
        {
          q: "Has Shawky won any awards?",
          a: "Definitely. Shawky has clinched medals in national karate championships and earned bonus marks and praise in AI coursework."
        },
        {
          q: "What’s Shawky most proud of?",
          a: "Combining tech and sports at a high level—delivering polished apps while competing professionally in karate."
        }
      ],
      hobbies: [
        {
          q: "What are Shawky's hobbies?",
          a: "Coding, karate, photography, hiking, and reading. He also enjoys learning new frameworks just for fun!"
        },
        {
          q: "Is Shawky into design?",
          a: "Yes! Shawky has a strong eye for UI/UX and enjoys crafting sleek, responsive interfaces."
        }
      ]
    };
    

    // Initialize DOM elements and setup after DOM is ready
    this.initializeDOM();
  }

  initializeDOM() {
    // Wait for DOM to be fully loaded if not already
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setupDOMElements());
    } else {
      this.setupDOMElements();
    }
  }

  setupDOMElements() {
    try {
      // DOM Elements - with error checking
      this.widget = document.querySelector(".chatbot-widget");
      this.toggle = document.querySelector(".chatbot-toggle");
      this.container = document.querySelector(".chatbot-container");
      this.messagesContainer = document.querySelector(".chatbot-messages");
      this.topicsDiv = document.querySelector(".chatbot-topics");
      this.questionsDiv = document.querySelector(".chatbot-questions");
      this.closeButton = document.querySelector(".control-btn.close");
      this.chatTag = document.querySelector(".chat-tag")
      gsap.to(this.chatTag,
        {
         duration: 1,
         repeat:-1,
         y:-30,
         ease:"back.inOut"

        })
      // Check if critical elements exist
      if (!this.toggle || !this.container || !this.messagesContainer) {
        console.error("Critical chatbot DOM elements not found. Please check your HTML structure.");
        return;
      }

      // Initialize after DOM elements are confirmed to exist
      this.init();

    } catch (error) {
      console.error("Error setting up chatbot DOM elements:", error);
    }
  }

  init() {
    // Event listeners with null checks
    if (this.toggle) {
      this.toggle.addEventListener("click", () => this.toggleChat());
    }

 

    if (this.closeButton) {
      this.closeButton.addEventListener("click", () => this.toggleChat());
    }

    // Topic selection
    if (this.topicsDiv) {
      this.topicsDiv.addEventListener("click", (e) => {
        if (e.target.classList.contains("topic-btn")) {
          const topic = e.target.getAttribute("data-topic");
          this.showQuestions(topic);
        }
      });
    }

    // Question selection
    if (this.questionsDiv) {
      this.questionsDiv.addEventListener("click", (e) => {
        if (e.target.classList.contains("question-btn")) {
          const topic = e.target.getAttribute("data-topic");
          const idx = e.target.getAttribute("data-idx");
          const qa = this.knowledgeBase[topic][idx];
          this.addUserMessage(qa.q);
          this.processMessage(qa.a);
          this.questionsDiv.style.display = "none";
          if (this.topicsDiv) {
            this.topicsDiv.style.display = "flex";
          }
        }
      });
    }

    // Show initial notification after a delay
    setTimeout(() => {
      if (!this.isOpen && !this.conversationStarted) {
        this.showNotification();
      }
    }, 3000);
  }

  showQuestions(topic) {
    if (!this.questionsDiv || !this.topicsDiv) return;

    this.questionsDiv.innerHTML = '<p class="select-text"  >Select a question:</p>';

    this.knowledgeBase[topic].forEach((qa, idx) => {
      const btn = document.createElement("button");
      btn.className = "question-btn";
      btn.setAttribute("data-topic", topic);
      btn.setAttribute("data-idx", idx);
      btn.textContent = qa.q;
      this.questionsDiv.appendChild(btn);
    });
    this.topicsDiv.style.display = "none";
    this.questionsDiv.style.display = "flex";
  }

  processMessage(answer) {
    this.addTypingIndicator();
    setTimeout(() => {
      this.removeTypingIndicator();
      this.queueMessage({ text: answer });
    }, 1000 + Math.random() * 1000);
  }

  

 openChatbot() {
  this.sc.disable();
}

 closeChatbot() {
  this.sc.enable();
}


  toggleChat() {
    if (!this.toggle || !this.container) return;

    this.isOpen = !this.isOpen;

    if (this.isOpen) {
      // Set initial state for container before animation
      this.toggle.classList.add("active");
      this.openChatbot()



      // Open chat - hide toggle first
      gsap.to(this.toggle, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power3.out",
        onComplete: () => {
          gsap.to(this.chatTag,
            {
              opacity:0,
              duration:1,
              ease:'ease',
              visibility:'hidden'
            }
          )
          // Then animate container in
          gsap.fromTo(this.container, {
            opacity: 0,
            x:400,
           
          },{
            opacity: 1,
            x:0,
            ease:"ease",
            onComplete: () => {
                this.container.classList.add("active");
  
                // Show welcome message if first time
                if (!this.conversationStarted) {
                  this.addBotMessage("Hello! I'm here to help you learn about Shawky. What would you like to know?");
                  this.conversationStarted = true;
                }
              },
          });
        },
      });
    } else {
        this.container.classList.remove("active");
        this.closeChatbot()

      // Minimize chat - animate container out first
      gsap.to(this.container, {
        opacity: 0,
        x:400,
        duration: 0.3,
        ease: "power3.in",
        onComplete: () => {
          
        

          // Then show toggle again
          gsap.to(this.toggle, {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: "back.out(1.7)",
            onComplete: () => {
              this.toggle.classList.remove("active");
              gsap.to(this.chatTag,
                {
                 duration: 1,
                 repeat:-1,
                 y:-50

                })
            },
          });
        },
      });
    }
  }

//   closeChat() {
//     if (!this.container || !this.toggle) return;

//     if (this.isOpen) {
//       this.isOpen = false;
      
//       gsap.to(this.container, {
//         scale: 0,
//         opacity: 0,
//         duration: 0.3,
//         ease: "power3.in",
//         onComplete: () => {
//           this.container.classList.remove("active");
          
//           // Hide container completely
        
          
//           gsap.to(this.toggle, {
//             scale: 1,
//             opacity: 1,
//             duration: 0.5,
//             ease: "back.out(1.7)",
//             onComplete: () => {
//               this.toggle.classList.remove("active");
//             },
//           });
//         },
//       });
//     }
//   }

  showNotification() {
    if (!this.toggle) return;

    gsap.to(this.toggle, {
      y: -10,
      duration: 0.5,
      repeat: 3,
      yoyo: true,
      ease: "power3.out",
    });

    const badge = this.toggle.querySelector(".toggle-badge");
    if (badge) {
      gsap.to(badge, {
        scale: 1.2,
        duration: 0.3,
        repeat: 5,
        yoyo: true,
        ease: "power3.out",
      });
    }
  }

  queueMessage(response) {
    this.messageQueue.push(response);
    if (!this.processingQueue) {
      this.processQueue();
    }
  }

  processQueue() {
    if (this.messageQueue.length === 0) {
      this.processingQueue = false;
      return;
    }

    this.processingQueue = true;
    const response = this.messageQueue.shift();

    // Add bot message with any special formatting
    this.addBotMessage(response.text, response);

    // Process next message after delay
    setTimeout(() => this.processQueue(), 500);
  }

  addUserMessage(text) {
    if (!this.messagesContainer) return;

    const messageElement = document.createElement("div");
    messageElement.classList.add("message", "user");

    const now = new Date();
    const timeString = `${now.getHours().toString().padStart(2, "0")}:${now
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;

    messageElement.innerHTML = `
      ${text}
      <div class="message-time">${timeString}</div>
    `;

    this.messagesContainer.appendChild(messageElement);
    this.scrollToBottom();
  }

  addBotMessage(text, options = {}) {
    if (!this.messagesContainer) return;

    const messageElement = document.createElement("div");
    messageElement.classList.add("message", "bot");

    // Add special classes if needed
    if (options.isKarate) {
      messageElement.classList.add("karate-message");
    }

    if (options.isHighlight) {
      messageElement.classList.add("highlight-message");
    }

    const now = new Date();
    const timeString = `${now.getHours().toString().padStart(2, "0")}:${now
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;

    // Create message structure with empty text content initially
    messageElement.innerHTML = `
      <div class="message-text"></div>
      <div class="message-time">${timeString}</div>
    `;

    this.messagesContainer.appendChild(messageElement);
    this.scrollToBottom();

    // Animate the message entrance first
    gsap.from(messageElement, {
      x: -20,
      opacity: 0,
      duration: 0.5,
      ease: "power3.out",
      onComplete: () => {
        // Start typing effect after entrance animation
        this.typeText(messageElement.querySelector('.message-text'), text, options.typingSpeed || 30);
      }
    });
  }

  typeText(element, text, speed = 30) {
    if (!element) return;

    let index = 0;
    element.textContent = '';
    
    // Add cursor for typing effect
    const cursor = document.createElement('span');
    cursor.className = 'typing-cursor';
    cursor.textContent = '|';
    element.appendChild(cursor);

    const typeInterval = setInterval(() => {
      if (index < text.length) {
        // Insert character before cursor
        const textNode = document.createTextNode(text.charAt(index));
        element.insertBefore(textNode, cursor);
        index++;
        
        // Auto-scroll as text appears
        this.scrollToBottom();
      } else {
        // Remove cursor when typing is complete
        if (cursor.parentNode) {
          cursor.remove();
        }
        clearInterval(typeInterval);
      }
    }, speed);
  }

  addTypingIndicator() {
    if (!this.messagesContainer) return;

    const typingElement = document.createElement("div");
    typingElement.classList.add("message", "bot", "typing");
    typingElement.innerHTML = `
      <div class="typing-indicator">
        <span></span>
        <span></span>
        <span></span>
      </div>
    `;

    this.messagesContainer.appendChild(typingElement);
    this.scrollToBottom();
  }

  removeTypingIndicator() {
    if (!this.messagesContainer) return;

    const typingElement = this.messagesContainer.querySelector(".typing");
    if (typingElement) {
      typingElement.remove();
    }
  }

  scrollToBottom() {
    if (this.messagesContainer) {
      this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }
  }
}

// Safe initialization - multiple ways to ensure DOM is ready
function initializeChatbot() {
  try {
    const bot = new Chatbot();
    return bot;
  } catch (error) {
    console.error("Failed to initialize chatbot:", error);
  }
}

// Initialize chatbot when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener("DOMContentLoaded", initializeChatbot);
} else {
  // DOM is already loaded
  initializeChatbot();
}

export default Chatbot;