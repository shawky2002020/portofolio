// utils/smoothScroll.js
import Lenis from 'lenis'

export class SmoothScroll {
  constructor() {
    this.lenis = null
    this.init()
  }

  init() {
    this.lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    })

    // Start the animation loop
    this.raf()

    // Debug (optional)
    // this.lenis.on('scroll', (e) => {
    //   console.log(e)
    // })
  }

  raf(time) {
    this.lenis.raf(time)
    requestAnimationFrame((time) => this.raf(time))
  }

  // Utility methods
  scrollTo(target, options = {}) {
    this.lenis.scrollTo(target, options)
  }

  stop() {
    this.lenis.stop()
  }

  start() {
    this.lenis.start()
  }

  destroy() {
    this.lenis.destroy()
  }

  // Get the Lenis instance
  getInstance() {
    return this.lenis
  }
}

export class ScrollController {
  constructor(smoothScrollInstance = null) {
    this.keys = { 37: 1, 38: 1, 39: 1, 40: 1, 33: 1, 34: 1, 35: 1, 36: 1 }; // Added Page Up, Page Down, End, Home
    this.isDisabled = false;
    this.smoothScroll = smoothScrollInstance;
    this.lockedScrollTop = 0;
    this.lockedScrollLeft = 0;
    this.chatbotSelector = null; // Will store the chatbot container selector
    
    // Detect passive event listener support
    this.supportsPassive = false;
    try {
      window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
        get: () => { this.supportsPassive = true; }
      }));
    } catch(e) {}
    
    this.wheelOpt = this.supportsPassive ? { passive: false } : false;
    this.wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';
    
    // Bind methods to preserve 'this' context
    this.preventDefault = this.preventDefault.bind(this);
    this.preventDefaultForScrollKeys = this.preventDefaultForScrollKeys.bind(this);
    this.lockScrollPosition = this.lockScrollPosition.bind(this);
    this.preventTouch = this.preventTouch.bind(this);
  }
  
  // Method to set chatbot container selector
  setChatbotSelector(selector) {
    this.chatbotSelector = selector;
  }
  
  // Method to set smooth scroll instance after initialization
  setSmoothScroll(smoothScrollInstance) {
    this.smoothScroll = smoothScrollInstance;
  }
  
  preventDefault(e) {
    // Check if event originated from chatbot container
    if (this.isEventFromChatbot(e)) {
      return true; // Allow the event
    }
    
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    return false;
  }
  
  preventTouch(e) {
    if (e.touches.length > 1) return; // Allow pinch zoom
    
    // Check if touch originated from chatbot container
    if (this.isEventFromChatbot(e)) {
      return true; // Allow the event
    }
    
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    return false;
  }
  
  preventDefaultForScrollKeys(e) {
    if (this.keys[e.keyCode]) {
      // Check if focus is within chatbot container
      if (this.isEventFromChatbot(e)) {
        return true; // Allow the event
      }
      
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      return false;
    }
  }
  
  // Helper method to check if event originated from chatbot
  isEventFromChatbot(e) {
    if (!this.chatbotSelector) return false;
    
    const chatbotContainer = document.querySelector(this.chatbotSelector);
    if (!chatbotContainer) return false;
    
    // Check if the event target is within the chatbot container
    const target = e.target || e.srcElement;
    return chatbotContainer.contains(target);
  }
  
  lockScrollPosition() {
    if (this.isDisabled) {
      window.scrollTo(this.lockedScrollLeft, this.lockedScrollTop);
    }
  }
  
  disable() {
    if (this.isDisabled) return;
    
    // Store current scroll position
    this.lockedScrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.lockedScrollLeft = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0;
    
    // Stop Lenis completely
    if (this.smoothScroll && this.smoothScroll.lenis) {
      this.smoothScroll.stop();
    }
    
    // If there's a global lenis instance, stop it too
    if (window.lenis) {
      window.lenis.stop();
    }
    
    this.isDisabled = true;
    
    // Prevent all scroll events with maximum priority
    const eventOptions = { passive: false, capture: true };
    
    // Mouse wheel events
    window.addEventListener('wheel', this.preventDefault, eventOptions);
    window.addEventListener('mousewheel', this.preventDefault, eventOptions);
    window.addEventListener('DOMMouseScroll', this.preventDefault, eventOptions);
    
    // Touch events
    window.addEventListener('touchstart', this.preventTouch, eventOptions);
    window.addEventListener('touchmove', this.preventTouch, eventOptions);
    window.addEventListener('touchend', this.preventTouch, eventOptions);
    
    // Keyboard events
    window.addEventListener('keydown', this.preventDefaultForScrollKeys, eventOptions);
    
    // Scroll events - lock position immediately when scroll is attempted
    window.addEventListener('scroll', this.lockScrollPosition, { passive: false, capture: true });
    document.addEventListener('scroll', this.lockScrollPosition, { passive: false, capture: true });
    
    // Additional events
    window.addEventListener('resize', this.lockScrollPosition, false);
    
    // Prevent drag and select which can cause scrolling
    document.addEventListener('dragstart', this.preventDefault, eventOptions);
    document.addEventListener('selectstart', this.preventDefault, eventOptions);
    
    // Mobile gesture events
    if ('ontouchstart' in window) {
      document.addEventListener('gesturestart', this.preventDefault, eventOptions);
      document.addEventListener('gesturechange', this.preventDefault, eventOptions);
      document.addEventListener('gestureend', this.preventDefault, eventOptions);
    }
    
    // Also add to document and body for maximum coverage
    document.addEventListener('wheel', this.preventDefault, eventOptions);
    document.addEventListener('touchmove', this.preventTouch, eventOptions);
    document.body.addEventListener('wheel', this.preventDefault, eventOptions);
    document.body.addEventListener('touchmove', this.preventTouch, eventOptions);
    
    // Force scroll position immediately
    setTimeout(() => {
      if (this.isDisabled) {
        window.scrollTo(this.lockedScrollLeft, this.lockedScrollTop);
      }
    }, 0);
  }
  
  enable() {
    if (!this.isDisabled) return;
    
    this.isDisabled = false;
    
    const eventOptions = { passive: false, capture: true };
    
    // Remove all event listeners
    window.removeEventListener('wheel', this.preventDefault, eventOptions);
    window.removeEventListener('mousewheel', this.preventDefault, eventOptions);
    window.removeEventListener('DOMMouseScroll', this.preventDefault, eventOptions);
    window.removeEventListener('touchstart', this.preventTouch, eventOptions);
    window.removeEventListener('touchmove', this.preventTouch, eventOptions);
    window.removeEventListener('touchend', this.preventTouch, eventOptions);
    window.removeEventListener('keydown', this.preventDefaultForScrollKeys, eventOptions);
    window.removeEventListener('scroll', this.lockScrollPosition, { passive: false, capture: true });
    window.removeEventListener('resize', this.lockScrollPosition, false);
    
    document.removeEventListener('scroll', this.lockScrollPosition, { passive: false, capture: true });
    document.removeEventListener('dragstart', this.preventDefault, eventOptions);
    document.removeEventListener('selectstart', this.preventDefault, eventOptions);
    document.removeEventListener('wheel', this.preventDefault, eventOptions);
    document.removeEventListener('touchmove', this.preventTouch, eventOptions);
    
    document.body.removeEventListener('wheel', this.preventDefault, eventOptions);
    document.body.removeEventListener('touchmove', this.preventTouch, eventOptions);
    
    if ('ontouchstart' in window) {
      document.removeEventListener('gesturestart', this.preventDefault, eventOptions);
      document.removeEventListener('gesturechange', this.preventDefault, eventOptions);
      document.removeEventListener('gestureend', this.preventDefault, eventOptions);
    }
    
    // Restart Lenis
    if (this.smoothScroll && this.smoothScroll.lenis) {
      this.smoothScroll.start();
    }
    
    if (window.lenis) {
      window.lenis.start();
    }
  }
  
  // Nuclear option - completely override scroll behavior
  disableNuclear() {
    if (this.isDisabled) return;
    
    this.lockedScrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.lockedScrollLeft = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0;
    
    // Stop all smooth scroll instances
    if (this.smoothScroll && this.smoothScroll.lenis) {
      this.smoothScroll.stop();
    }
    if (window.lenis) {
      window.lenis.stop();
    }
    
    this.isDisabled = true;
    
    // Override window.scrollTo temporarily
    this.originalScrollTo = window.scrollTo;
    this.originalScrollBy = window.scrollBy;
    
    window.scrollTo = (x, y) => {
      if (!this.isDisabled) {
        this.originalScrollTo.call(window, x, y);
      }
    };
    
    window.scrollBy = (x, y) => {
      if (!this.isDisabled) {
        this.originalScrollBy.call(window, x, y);
      }
    };
    
    // Override scroll properties
    Object.defineProperty(window, 'scrollY', {
      get: () => this.isDisabled ? this.lockedScrollTop : this.originalScrollTo ? window.pageYOffset : 0,
      configurable: true
    });
    
    Object.defineProperty(window, 'scrollX', {
      get: () => this.isDisabled ? this.lockedScrollLeft : this.originalScrollTo ? window.pageXOffset : 0,
      configurable: true
    });
    
    // Use regular disable method for events
    this.disable();
  }
  
  enableNuclear() {
    if (!this.isDisabled) return;
    
    // Restore original scroll functions
    if (this.originalScrollTo) {
      window.scrollTo = this.originalScrollTo;
      delete this.originalScrollTo;
    }
    if (this.originalScrollBy) {
      window.scrollBy = this.originalScrollBy;
      delete this.originalScrollBy;
    }
    
    // Restore scroll properties
    delete window.scrollY;
    delete window.scrollX;
    
    this.enable();
  }
  
  // Utility method to check current state
  getState() {
    return this.isDisabled;
  }
  
  // Method to toggle scroll state
  toggle() {
    if (this.isDisabled) {
      this.enable();
    } else {
      this.disable();
    }
  }
  
  // Get current locked position
  getLockedPosition() {
    return {
      top: this.lockedScrollTop,
      left: this.lockedScrollLeft
    };
  }
  
  // Force scroll to locked position (useful for debugging)
  forcePosition() {
    if (this.isDisabled) {
      window.scrollTo(this.lockedScrollLeft, this.lockedScrollTop);
    }
  }
}