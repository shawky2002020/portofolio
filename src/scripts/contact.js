document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    
    // Form validation
    function validateField(field, errorId, validationFn) {
      const value = field.value.trim();
      const errorElement = document.getElementById(errorId);
      const formGroup = field.closest('.form-group');
      
      if (!validationFn(value)) {
        formGroup.classList.add('error');
        errorElement.classList.add('show');
        return false;
      } else {
        formGroup.classList.remove('error');
        errorElement.classList.remove('show');
        return true;
      }
    }
    
    // Validation functions
    const validations = {
      name: (value) => value.length >= 2,
      email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      subject: (value) => true, // Optional field
      message: (value) => value.length >= 10
    };
    
    // Error messages
    const errorMessages = {
      name: 'Name must be at least 2 characters long',
      email: 'Please enter a valid email address',
      subject: '',
      message: 'Message must be at least 10 characters long'
    };
    
    // Set error messages
    Object.keys(errorMessages).forEach(field => {
      document.getElementById(field + 'Error').textContent = errorMessages[field];
    });
    
    // Real-time validation
    Object.keys(validations).forEach(fieldName => {
      const field = document.getElementById(fieldName);
      field.addEventListener('blur', () => {
        validateField(field, fieldName + 'Error', validations[fieldName]);
      });
      
      field.addEventListener('input', () => {
        if (field.closest('.form-group').classList.contains('error')) {
          validateField(field, fieldName + 'Error', validations[fieldName]);
        }
      });
    });
    
    // Form submission
    form.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      // Validate all fields
      let isValid = true;
      Object.keys(validations).forEach(fieldName => {
        const field = document.getElementById(fieldName);
        if (!validateField(field, fieldName + 'Error', validations[fieldName])) {
          isValid = false;
        }
      });
      
      if (!isValid) {
        showPopup('error', 'Validation Error', 'Please fill in all required fields correctly.');
        return;
      }
      
      // Show loading state
      submitBtn.classList.add('loading');
      
      // Collect form data
      const formData = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        subject: document.getElementById('subject').value.trim() || 'New Contact Form Message',
        message: document.getElementById('message').value.trim()
      };
      
      try {
        // Simulate email sending (replace with actual email service)
        await sendEmail(formData);
        
        // Show success message
        showPopup('success', 'Message Sent!', 'Thanks for reaching out! I\'ll get back to you faster than a roundhouse kick to the head.');
        
        // Reset form
        form.reset();
        
      } catch (error) {
        // Show error message
        showPopup('error', 'Oops!', 'Something went wrong. Please try again or contact me directly at shawkyelsayed2002@gmail.com');
      } finally {
        // Remove loading state
        submitBtn.classList.remove('loading');
      }
    });
  });
  
  // Email sending function (using EmailJS or similar service)
  async function sendEmail(formData) {
    // This is a mock function - replace with actual email service
    // For real implementation, use EmailJS, Formspree, or your backend API
    
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate success/failure
        if (Math.random() > 0.1) { // 90% success rate for demo
          resolve();
        } else {
          reject(new Error('Network error'));
        }
      }, 2000);
    });
    
    /* 
    // Example with EmailJS:
    return emailjs.send('your_service_id', 'your_template_id', {
      from_name: formData.name,
      from_email: formData.email,
      subject: formData.subject,
      message: formData.message,
      to_email: 'shawkyelsayed2002@gmail.com'
    });
    */
  }
  
  // Popup functions
  function showPopup(type, title, message) {
    const popup = document.getElementById('messagePopup');
    const icon = popup.querySelector('.popup-icon');
    const titleElement = popup.querySelector('.popup-title');
    const messageElement = popup.querySelector('.popup-message');
    
    // Set icon based on type
    if (type === 'success') {
      icon.className = 'popup-icon success fas fa-check-circle';
    } else {
      icon.className = 'popup-icon error fas fa-exclamation-circle';
    }
    
    titleElement.textContent = title;
    messageElement.textContent = message;
    
    popup.classList.add('show');
  }
  
  function closePopup() {
    document.getElementById('messagePopup').classList.remove('show');
  }
  
  // Close popup when clicking outside
  document.getElementById('messagePopup').addEventListener('click', function(e) {
    if (e.target === this) {
      closePopup();
    }
  });
  
  // Close popup with Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closePopup();
    }
  });