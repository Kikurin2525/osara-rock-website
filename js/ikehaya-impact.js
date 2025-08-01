/* 🌟 HAPPY BRIGHT OPTIMIZED JAVASCRIPT 🌟 */

document.addEventListener('DOMContentLoaded', function() {
    
    // ========== SPACES SLIDER FUNCTIONALITY ==========
    const sliderTrack = document.getElementById('spacesSliderTrack');
    const indicators = document.querySelectorAll('.indicator');
    let currentSlide = 0;
    const totalSlides = 7;
    let autoSlideInterval;
    let isAutoSliding = true;
    
    // Initialize slider
    function initSlider() {
        if (sliderTrack) {
            // Start auto-sliding
            startAutoSlide();
            
            // Add click event to indicators
            indicators.forEach((indicator, index) => {
                indicator.addEventListener('click', () => {
                    goToSlide(index);
                    stopAutoSlide();
                    // Restart auto-slide after user interaction
                    setTimeout(startAutoSlide, 3000);
                });
            });
            
            // Pause auto-slide on hover
            const sliderContainer = document.querySelector('.spaces-slider-container');
            if (sliderContainer) {
                sliderContainer.addEventListener('mouseenter', stopAutoSlide);
                sliderContainer.addEventListener('mouseleave', startAutoSlide);
            }
        }
    }
    
    function goToSlide(slideIndex) {
        currentSlide = slideIndex;
        const translateX = -(slideIndex * 14.28); // 100% / 7 slides = 14.28%
        sliderTrack.style.transform = `translateX(${translateX}%)`;
        
        // Update indicators
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === slideIndex);
        });
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        goToSlide(currentSlide);
    }
    
    function startAutoSlide() {
        if (isAutoSliding && !autoSlideInterval) {
            autoSlideInterval = setInterval(nextSlide, 3000); // 3 seconds per slide
        }
    }
    
    function stopAutoSlide() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
            autoSlideInterval = null;
        }
    }
    
    // Initialize slider
    initSlider();
    
    // ========== LAZY LOADING FOR SLIDER IMAGES ==========
    function initLazyLoading() {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.addEventListener('load', () => {
                            img.classList.add('loaded');
                        });
                        observer.unobserve(img);
                    }
                });
            });
            
            lazyImages.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback for browsers without IntersectionObserver
            lazyImages.forEach(img => {
                img.classList.add('loaded');
            });
        }
    }
    
    // Initialize lazy loading
    initLazyLoading();
    
    // ========== IMAGE LOADING DEBUG ==========
    function debugImageLoading() {
        const allSlideImages = document.querySelectorAll('.slide-img');
        allSlideImages.forEach((img, index) => {
            img.addEventListener('load', () => {
                console.log(`Image ${index + 1} loaded successfully: ${img.src}`);
            });
            
            img.addEventListener('error', () => {
                console.error(`Failed to load image ${index + 1}: ${img.src}`);
                // Fallback to a placeholder or default image
                img.style.backgroundColor = '#333';
                img.style.display = 'block';
            });
        });
    }
    
    // Initialize debug
    debugImageLoading();
    
    // ========== CYBER HEADER SCROLL EFFECT ==========
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // ========== BRUTAL MOBILE NAVIGATION ==========
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;
    
    if (navToggle && navMenu) {
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
    }
    
    // ========== SCROLL REVEAL ANIMATIONS ==========
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
    const animatedElements = document.querySelectorAll('.fade-in, .service-card, .studio-card');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
    
    // ========== GLITCH TEXT EFFECT ==========
    function createGlitchEffect() {
        const glitchElements = document.querySelectorAll('.glitch');
        
        glitchElements.forEach(element => {
            const text = element.textContent;
            element.setAttribute('data-text', text);
        });
    }
    
    createGlitchEffect();
    
    // ========== CRAZY CURSOR TRAIL EFFECT ==========
    function createCursorTrail() {
        const trail = [];
        const trailLength = 10;
        
        for (let i = 0; i < trailLength; i++) {
            const dot = document.createElement('div');
            dot.style.cssText = `
                position: fixed;
                width: 4px;
                height: 4px;
                background: linear-gradient(45deg, #8b5cf6, #00ffff);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                opacity: ${(trailLength - i) / trailLength};
                transition: all 0.1s ease;
            `;
            document.body.appendChild(dot);
            trail.push(dot);
        }
        
        document.addEventListener('mousemove', function(e) {
            trail.forEach((dot, index) => {
                setTimeout(() => {
                    dot.style.left = e.clientX + 'px';
                    dot.style.top = e.clientY + 'px';
                }, index * 50);
            });
        });
    }
    
    // Only add cursor trail on desktop
    if (window.innerWidth > 768) {
        createCursorTrail();
    }
    
    // ========== BRUTAL BUTTON ANIMATIONS ==========
    const buttons = document.querySelectorAll('.btn-mega');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        button.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(0) scale(0.98)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
    });
    
    // ========== PLATFORM LINKS CRAZY HOVER ==========
    const platformLinks = document.querySelectorAll('.platform-link');
    
    platformLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            // Create random particles
            for (let i = 0; i < 5; i++) {
                createParticle(this);
            }
        });
    });
    
    function createParticle(element) {
        const particle = document.createElement('div');
        const rect = element.getBoundingClientRect();
        
        particle.style.cssText = `
            position: fixed;
            width: 6px;
            height: 6px;
            background: #8b5cf6;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            left: ${rect.left + Math.random() * rect.width}px;
            top: ${rect.top + Math.random() * rect.height}px;
            animation: particleFloat 1s ease-out forwards;
        `;
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 1000);
    }
    
    // Add particle animation keyframes
    if (!document.querySelector('#particle-styles')) {
        const style = document.createElement('style');
        style.id = 'particle-styles';
        style.textContent = `
            @keyframes particleFloat {
                0% {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                }
                100% {
                    opacity: 0;
                    transform: translateY(-50px) scale(0);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // ========== VIBE TEXT RANDOM MOVEMENT ==========
    const vibeTexts = document.querySelectorAll('.vibe-text');
    
    vibeTexts.forEach((text, index) => {
        setInterval(() => {
            const randomX = (Math.random() - 0.5) * 20;
            const randomY = (Math.random() - 0.5) * 20;
            text.style.transform += ` translate(${randomX}px, ${randomY}px)`;
        }, 3000 + index * 1000);
    });
    
    // ========== BRUTAL FORM ENHANCEMENTS ==========
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.style.borderColor = '#8b5cf6';
                this.style.boxShadow = '0 0 20px rgba(139, 92, 246, 0.3)';
            });
            
            input.addEventListener('blur', function() {
                this.style.borderColor = 'rgba(99, 102, 241, 0.2)';
                this.style.boxShadow = 'none';
            });
        });
    });
    
    // ========== TYPING EFFECT FOR TITLES ==========
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }
    
    // Apply typing effect to main title on homepage
    const mainTitle = document.querySelector('.hero h1');
    if (mainTitle && window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        const originalText = mainTitle.textContent;
        setTimeout(() => {
            typeWriter(mainTitle, originalText, 150);
        }, 500);
    }
    
    // ========== BRUTAL LOADING SCREEN ==========
    function createLoadingScreen() {
        const loader = document.createElement('div');
        loader.id = 'brutal-loader';
        loader.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #000000 0%, #0a0a0a 100%);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            transition: opacity 0.5s ease;
        `;
        
        loader.innerHTML = `
            <div style="text-align: center;">
                <div style="font-size: 3rem; font-weight: 900; color: #8b5cf6; margin-bottom: 1rem; animation: pulse 1s infinite;">
                    OSARA ROCK
                </div>
                <div style="width: 200px; height: 4px; background: rgba(139, 92, 246, 0.3); border-radius: 2px; overflow: hidden;">
                    <div style="width: 0%; height: 100%; background: linear-gradient(90deg, #8b5cf6, #00ffff); border-radius: 2px; animation: loadProgress 2s ease-out forwards;"></div>
                </div>
            </div>
        `;
        
        document.body.appendChild(loader);
        
        // Remove loader after 2 seconds
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.remove();
            }, 500);
        }, 2000);
    }
    
    // Add loading animations
    const loadingStyles = document.createElement('style');
    loadingStyles.textContent = `
        @keyframes loadProgress {
            to { width: 100%; }
        }
        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
        }
    `;
    document.head.appendChild(loadingStyles);
    
    // Show loading screen
    createLoadingScreen();
    
    // ========== 🔥 COUNTER ANIMATIONS FOR SUCCESS STORY 🔥 ==========
    initCounterAnimations();
    
    // ========== PERFORMANCE MONITORING ==========
    console.log('🔥 IKEHAYA IMPACT MODE ACTIVATED 🔥');
    console.log('Performance:', {
        'Load Time': performance.now(),
        'User Agent': navigator.userAgent,
        'Screen': `${screen.width}x${screen.height}`,
        'Viewport': `${window.innerWidth}x${window.innerHeight}`
    });
});

// ========== 🔥 IKEHAYA-STYLE COUNTER ANIMATIONS 🔥 ==========
function initCounterAnimations() {
    const counters = document.querySelectorAll('.success-number');
    
    const observerOptions = {
        threshold: 0.7,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                animateCounter(entry.target);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    let step = 0;
    
    // Add dramatic effect
    element.style.transform = 'scale(1.2)';
    element.style.textShadow = '0 0 30px rgba(0, 255, 255, 0.8)';
    
    const timer = setInterval(() => {
        step++;
        
        // Use easing function for dramatic effect
        const progress = step / steps;
        const easeOut = 1 - Math.pow(1 - progress, 3);
        current = Math.floor(target * easeOut);
        
        element.textContent = current.toLocaleString();
        
        // Add random glitch effect like Ikehaya style
        if (Math.random() < 0.1) {
            element.style.color = Math.random() < 0.5 ? '#ff1493' : '#00ffff';
            setTimeout(() => {
                element.style.color = '#00ffff';
            }, 50);
        }
        
        if (step >= steps) {
            clearInterval(timer);
            element.textContent = target.toLocaleString();
            element.style.transform = 'scale(1)';
            
            // Final dramatic effect
            element.style.animation = 'counterFinish 0.5s ease';
            
            // Add particle effect for finale
            createCounterParticles(element);
        }
    }, duration / steps);
}

function createCounterParticles(element) {
    const rect = element.getBoundingClientRect();
    const particles = 8;
    
    for (let i = 0; i < particles; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: linear-gradient(45deg, #00ffff, #ff1493);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            left: ${rect.left + rect.width/2}px;
            top: ${rect.top + rect.height/2}px;
        `;
        
        document.body.appendChild(particle);
        
        const angle = (i / particles) * Math.PI * 2;
        const velocity = 100 + Math.random() * 50;
        const lifetime = 1000 + Math.random() * 500;
        
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        particle.animate([
            { 
                transform: 'translate(0, 0) scale(1)', 
                opacity: 1 
            },
            { 
                transform: `translate(${vx}px, ${vy}px) scale(0)`, 
                opacity: 0 
            }
        ], {
            duration: lifetime,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            fill: 'forwards'
        }).onfinish = () => {
            particle.remove();
        };
    }
}

// Add counter finish animation keyframes
const counterStyle = document.createElement('style');
counterStyle.textContent = `
    @keyframes counterFinish {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); text-shadow: 0 0 40px rgba(0, 255, 255, 1); }
        100% { transform: scale(1); text-shadow: 0 0 20px rgba(0, 255, 255, 0.5); }
    }
`;
document.head.appendChild(counterStyle);

// ========== PREVENT BODY SCROLL WHEN MENU OPEN ==========
const style = document.createElement('style');
style.textContent = `
    .menu-open {
        overflow: hidden;
    }
`;
document.head.appendChild(style);

// ========== PERFORMANCE & ACCESSIBILITY IMPROVEMENTS ==========

// Respect user's motion preferences
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
    // Disable all animations if user prefers reduced motion
    const reducedMotionStyle = document.createElement('style');
    reducedMotionStyle.textContent = `
        *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    `;
    document.head.appendChild(reducedMotionStyle);
}

// Debounce scroll events for better performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Intersection Observer for better performance on scroll animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements that need scroll-triggered animations
document.querySelectorAll('.fade-in, .service-card, .news-card-cyber').forEach(el => {
    observer.observe(el);
});

// Preload critical images
function preloadImages() {
    const criticalImages = [
        'images/waseda.webp',
        'images/pocket.webp',
        'images/chitosekarasuyama.webp',
        'images/osara.png'
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
}

// Initialize preloading
preloadImages();

// Add touch event optimization for mobile
if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');
    
    // Improve touch responsiveness
    document.querySelectorAll('.btn-mega, .nav-menu a').forEach(element => {
        element.addEventListener('touchstart', function() {
            this.style.opacity = '0.8';
        }, { passive: true });
        
        element.addEventListener('touchend', function() {
            setTimeout(() => {
                this.style.opacity = '';
            }, 150);
        }, { passive: true });
    });
}

// Error handling for slider
window.addEventListener('error', function(e) {
    console.warn('Error caught:', e.error);
    // Gracefully handle errors without breaking the page
});

// Keyboard accessibility improvements
document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        const navMenu = document.querySelector('.nav-menu');
        const navToggle = document.querySelector('.nav-toggle');
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    }
    
    // Skip to main content with Tab
    if (e.key === 'Tab' && !e.shiftKey && document.activeElement === document.body) {
        const main = document.querySelector('main');
        if (main) {
            main.focus();
            e.preventDefault();
        }
    }
});