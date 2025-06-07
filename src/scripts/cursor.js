document.addEventListener("DOMContentLoaded", function () {
  
  const cursor = document.querySelector(".cursor");
  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;
  let isHoveringClickable = false;
  
  // Performance optimization - throttle the mousemove event
  let mouseMoveThrottle = false;
  
  // Update mouse position and check for clickable elements
  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Throttle the expensive operations
    if (!mouseMoveThrottle) {
      mouseMoveThrottle = true;
      requestAnimationFrame(() => {
        // Get the element under the cursor
        const elementUnderCursor = document.elementFromPoint(mouseX, mouseY);
        
        // Check if the element or any of its parents has cursor: pointer
        const hasPointerCursor = checkForPointerCursor(elementUnderCursor);
        
        // Update cursor style based on hover state
        if (hasPointerCursor && !isHoveringClickable) {
          isHoveringClickable = true;
          console.log('Hovering clickable element');
          cursor.classList.add('cursor-hover');
        } else if (!hasPointerCursor && isHoveringClickable) {
          isHoveringClickable = false;
          console.log('Left clickable element');
          cursor.classList.remove('cursor-hover');
        }
        
        mouseMoveThrottle = false;
      });
    }
    
    // Convert to percentage for CSS custom properties (if needed later)
    const xPercent = (mouseX / window.innerWidth) * 100;
    const yPercent = (mouseY / window.innerHeight) * 100;
  });
  
  // Function to check if element has cursor: pointer style
  function checkForPointerCursor(element) {
    if (!element) return false;
    
    // Check the computed style of the current element
    const computedStyle = window.getComputedStyle(element);
    if (computedStyle.cursor === 'pointer') {
      return true;
    }
    
    // Also check for common clickable elements that might have pointer cursor
    const clickableSelectors = [
      'a', 'button', 'input[type="button"]', 'input[type="submit"]', 
      'input[type="reset"]', '[role="button"]', '[onclick]'
    ];
    
    if (clickableSelectors.some(selector => element.matches(selector))) {
      return true;
    }
    
    // Check if any parent element has cursor: pointer (limit depth for performance)
    let parent = element.parentElement;
    let depth = 0;
    const maxDepth = 10; // Prevent infinite loops and improve performance
    
    while (parent && parent !== document.body && depth < maxDepth) {
      const parentStyle = window.getComputedStyle(parent);
      if (parentStyle.cursor === 'pointer') {
        return true;
      }
      parent = parent.parentElement;
      depth++;
    }
    
    return false;
  }
  
  // Smooth cursor following with immediate response option
  function updateCursor() {
    // You can adjust these values:
    // 1 = immediate following (no easing)
    // 0.1 = very smooth/slow following
    // 0.5 = balanced smooth following
    const easing = .5; // Currently set to immediate
    
    cursorX += (mouseX - cursorX) * easing;
    cursorY += (mouseY - cursorY) * easing;
    
    cursor.style.left = `${cursorX - 10}px`;
    cursor.style.top = `${cursorY - 10}px`;
    requestAnimationFrame(updateCursor);
  }
  updateCursor();
  
  // Add hover effects for page enter/leave
  document.addEventListener("mouseenter", () => {
    cursor.style.transform = "scale(1)";
  });
  
  document.addEventListener("mouseleave", () => {
    cursor.style.transform = "scale(0)";
  });
  
  // Handle page visibility changes (optional - hides cursor when tab is inactive)
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      cursor.style.opacity = "0";
    } else {
      cursor.style.opacity = "1";
    }
  });
  
  // Initialize cursor position
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  cursorX = centerX;
  cursorY = centerY;
});

// Optional: Add CSS class detection for more specific targeting
// You can add data attributes or specific classes to elements you want to trigger cursor changes
// Example: <div class="clickable-element" data-cursor="hover">Content</div>