// Enhanced Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;
    
    // Toggle mobile menu
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        body.classList.toggle('menu-open');
    });
    
    // Close menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            body.classList.remove('menu-open');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target) && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            body.classList.remove('menu-open');
        }
    });
    
    // Prevent scrolling when menu is open
    const style = document.createElement('style');
    style.textContent = `
        .menu-open {
            overflow: hidden;
        }
    `;
    document.head.appendChild(style);
});

// Dropdown Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const dropdownToggle = dropdown.querySelector('.dropdown-toggle');
        const dropdownMenu = dropdown.querySelector('.dropdown-menu');
        let hoverTimeout;
        
        // Desktop hover functionality
        if (window.innerWidth > 768) {
            dropdown.addEventListener('mouseenter', function() {
                clearTimeout(hoverTimeout);
                dropdown.classList.add('active');
            });
            
            dropdown.addEventListener('mouseleave', function() {
                hoverTimeout = setTimeout(() => {
                    dropdown.classList.remove('active');
                }, 100);
            });
        }
        
        // Mobile touch functionality
        if (window.innerWidth <= 768) {
            dropdownToggle.addEventListener('click', function(e) {
                e.preventDefault();
                dropdown.classList.toggle('active');
                
                // Close other open dropdowns
                dropdowns.forEach(otherDropdown => {
                    if (otherDropdown !== dropdown) {
                        otherDropdown.classList.remove('active');
                    }
                });
            });
        }
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove('active');
            }
        });
        
        // Close dropdown when clicking on submenu item
        const submenuItems = dropdown.querySelectorAll('.dropdown-menu a');
        submenuItems.forEach(item => {
            item.addEventListener('click', function() {
                dropdown.classList.remove('active');
                // Close mobile menu if open
                const navMenu = document.querySelector('.nav-menu');
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                }
            });
        });
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            // Remove active class from all dropdowns on desktop
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });
});

// Smooth dropdown animation with intersection observer
document.addEventListener('DOMContentLoaded', function() {
    const dropdownMenus = document.querySelectorAll('.dropdown-menu');
    
    dropdownMenus.forEach(menu => {
        const items = menu.querySelectorAll('a');
        
        // Add stagger animation to dropdown items
        items.forEach((item, index) => {
            item.style.transitionDelay = `${index * 0.1}s`;
        });
        
        // Add focus trap for accessibility
        menu.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                const dropdown = menu.closest('.dropdown');
                dropdown.classList.remove('active');
                const toggle = dropdown.querySelector('.dropdown-toggle');
                toggle.focus();
            }
        });
    });
});

// Enhanced Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        
        if (target) {
            // Close mobile menu if open
            const navMenu = document.querySelector('.nav-menu');
            const navToggle = document.querySelector('.nav-toggle');
            const body = document.body;
            
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                body.classList.remove('menu-open');
            }
            
            // Smooth scroll to target
            const headerHeight = 80;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Contact form handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    const consultingForm = document.querySelector('.consulting-contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Validate required fields
            const requiredFields = ['name', 'email', 'message'];
            let isValid = true;
            
            requiredFields.forEach(field => {
                const input = this.querySelector(`[name="${field}"]`);
                if (!data[field] || data[field].trim() === '') {
                    input.style.borderColor = '#e74c3c';
                    isValid = false;
                } else {
                    input.style.borderColor = '#ddd';
                }
            });
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const emailField = this.querySelector('[name="email"]');
            if (!emailRegex.test(data.email)) {
                emailField.style.borderColor = '#e74c3c';
                isValid = false;
            }
            
            if (!isValid) {
                e.preventDefault();
                showMessage('必須項目を正しく入力してください。', 'error');
            }
            // If valid, let the form submit naturally to Netlify
        });
    }
    
    // Handle consulting form
    if (consultingForm) {
        consultingForm.addEventListener('submit', function(e) {
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Validate required fields
            const requiredFields = ['name', 'email', 'message'];
            let isValid = true;
            
            requiredFields.forEach(field => {
                const input = this.querySelector(`[name="${field}"]`);
                if (!data[field] || data[field].trim() === '') {
                    input.style.borderColor = '#e74c3c';
                    isValid = false;
                } else {
                    input.style.borderColor = 'rgba(99, 102, 241, 0.2)';
                }
            });
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const emailField = this.querySelector('[name="email"]');
            if (!emailRegex.test(data.email)) {
                emailField.style.borderColor = '#e74c3c';
                isValid = false;
            }
            
            if (!isValid) {
                e.preventDefault();
                showMessage('必須項目を正しく入力してください。', 'error');
            }
            // If valid, let the form submit naturally to Netlify
        });
    }
});

// Show message function
function showMessage(message, type) {
    // Remove existing messages
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}`;
    messageDiv.textContent = message;
    
    // Add styles
    messageDiv.style.padding = '10px';
    messageDiv.style.marginBottom = '15px';
    messageDiv.style.borderRadius = '5px';
    messageDiv.style.fontSize = '14px';
    
    if (type === 'success') {
        messageDiv.style.backgroundColor = '#d4edda';
        messageDiv.style.color = '#155724';
        messageDiv.style.border = '1px solid #c3e6cb';
    } else if (type === 'error') {
        messageDiv.style.backgroundColor = '#f8d7da';
        messageDiv.style.color = '#721c24';
        messageDiv.style.border = '1px solid #f5c6cb';
    } else if (type === 'info') {
        messageDiv.style.backgroundColor = '#d1ecf1';
        messageDiv.style.color = '#0c5460';
        messageDiv.style.border = '1px solid #bee5eb';
    }
    
    // Insert message at the top of the form
    const form = document.querySelector('.contact-form');
    form.insertBefore(messageDiv, form.firstChild);
    
    // Auto-remove message after 5 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

// Add active class to navigation items based on scroll position
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add scroll effect to header - Enhanced Version
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Smooth scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.service-item, .fade-in');
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
});

// Enhanced loading state for form submit buttons
document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('.contact-form, .consulting-contact-form');
    
    forms.forEach(form => {
        const submitButton = form.querySelector('button[type="submit"]');
        
        if (submitButton) {
            form.addEventListener('submit', function(e) {
                const formData = new FormData(this);
                const data = Object.fromEntries(formData);
                
                // Quick validation check
                const requiredFields = ['name', 'email', 'message'];
                let isValid = true;
                
                requiredFields.forEach(field => {
                    if (!data[field] || data[field].trim() === '') {
                        isValid = false;
                    }
                });
                
                // Email validation
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(data.email)) {
                    isValid = false;
                }
                
                if (isValid) {
                    // Show loading state
                    const originalText = submitButton.innerHTML;
                    submitButton.innerHTML = '<span style="display: inline-flex; align-items: center; gap: 8px;"><span style="width: 16px; height: 16px; border: 2px solid transparent; border-top: 2px solid white; border-radius: 50%; animation: spin 1s linear infinite;"></span>送信中...</span>';
                    submitButton.disabled = true;
                    
                    // Add spinner animation
                    const style = document.createElement('style');
                    style.textContent = `
                        @keyframes spin {
                            0% { transform: rotate(0deg); }
                            100% { transform: rotate(360deg); }
                        }
                    `;
                    if (!document.querySelector('style[data-spinner]')) {
                        style.setAttribute('data-spinner', 'true');
                        document.head.appendChild(style);
                    }
                    
                    // Reset button after timeout (fallback)
                    setTimeout(() => {
                        submitButton.innerHTML = originalText;
                        submitButton.disabled = false;
                    }, 10000);
                }
            });
        }
    });
});