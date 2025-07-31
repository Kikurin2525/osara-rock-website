/* 🔥 IKEHAYA INSPIRED MEGA IMPACT JAVASCRIPT 🔥 */

document.addEventListener('DOMContentLoaded', function() {
    
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
    
    // ========== PERFORMANCE MONITORING ==========
    console.log('🔥 IKEHAYA IMPACT MODE ACTIVATED 🔥');
    console.log('Performance:', {
        'Load Time': performance.now(),
        'User Agent': navigator.userAgent,
        'Screen': `${screen.width}x${screen.height}`,
        'Viewport': `${window.innerWidth}x${window.innerHeight}`
    });
});

// ========== PREVENT BODY SCROLL WHEN MENU OPEN ==========
const style = document.createElement('style');
style.textContent = `
    .menu-open {
        overflow: hidden;
    }
`;
document.head.appendChild(style);