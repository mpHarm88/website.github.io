// Modern JavaScript for Enhanced User Experience - Updated for Mikio Harman

// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize typing effect for hero section
    initTypingEffect();
    
    // Initialize project hover effects
    initProjectEffects();
    
    // Initialize blog animations
    initBlogAnimations();
    
    // Initialize connect animations
    initConnectAnimations();
    
    // Initialize statistics counter
    initStatsCounter();
});

// Scroll animations
function initScrollAnimations() {
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

    // Add animation classes and observe elements
    const animateElements = document.querySelectorAll('.timeline-item, .project-card, .skill-category, .education-card, .blog-card, .highlight-item');
    
    animateElements.forEach((el, index) => {
        // Add staggered animation delay
        el.style.transitionDelay = `${index * 0.1}s`;
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Special animations for about section
    const aboutText = document.querySelector('.about-text');
    const profileCard = document.querySelector('.profile-card');
    
    if (aboutText) {
        aboutText.classList.add('slide-in-left');
        observer.observe(aboutText);
    }
    
    if (profileCard) {
        profileCard.classList.add('slide-in-right');
        observer.observe(profileCard);
    }
}

// Enhanced typing effect for hero section
function initTypingEffect() {
    const heroTitle = document.querySelector('.hero-title .gradient-text');
    if (!heroTitle) return;

    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    heroTitle.style.borderRight = '2px solid var(--tech-cyan)';
    
    let index = 0;
    
    function typeWriter() {
        if (index < text.length) {
            heroTitle.textContent += text.charAt(index);
            index++;
            // Vary typing speed for more natural effect
            const delay = Math.random() * 100 + 50;
            setTimeout(typeWriter, delay);
        } else {
            // Remove cursor after typing is complete
            setTimeout(() => {
                heroTitle.style.borderRight = 'none';
            }, 1000);
        }
    }
    
    // Start typing effect after a delay
    setTimeout(typeWriter, 1500);
}

// Enhanced project hover effects
function initProjectEffects() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add subtle tilt effect
            this.style.transform = 'translateY(-5px) rotateX(2deg) rotateY(2deg)';
            this.style.transition = 'all 0.3s ease';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
        });

        // Add click ripple effect
        card.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(0, 188, 212, 0.3);
                transform: scale(0);
                animation: ripple 0.6s linear;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                pointer-events: none;
            `;

            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Blog section animations
function initBlogAnimations() {
    const blogCards = document.querySelectorAll('.blog-card');
    
    blogCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const blogLink = this.querySelector('.blog-link');
            if (blogLink) {
                blogLink.style.transform = 'translateX(5px)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const blogLink = this.querySelector('.blog-link');
            if (blogLink) {
                blogLink.style.transform = 'translateX(0)';
            }
        });
    });

    // Featured blog card special effect
    const featuredCard = document.querySelector('.blog-card.featured');
    if (featuredCard) {
        setInterval(() => {
            featuredCard.style.borderColor = 'var(--tech-electric)';
            setTimeout(() => {
                featuredCard.style.borderColor = 'var(--tech-cyan)';
            }, 1000);
        }, 5000);
    }
}

// Connect section animations
function initConnectAnimations() {
    const networkNodes = document.querySelectorAll('.network-node');
    
    // Add hover effects to network nodes
    networkNodes.forEach(node => {
        node.addEventListener('mouseenter', function() {
            this.style.transform += ' scale(1.1)';
            this.style.background = 'var(--tech-electric)';
        });
        
        node.addEventListener('mouseleave', function() {
            this.style.transform = this.style.transform.replace(' scale(1.1)', '');
            if (!this.classList.contains('main-node')) {
                this.style.background = 'var(--tech-cyan)';
            } else {
                this.style.background = 'var(--primary-forest)';
            }
        });
    });

    // LinkedIn CTA pulse effect
    const linkedinCTAs = document.querySelectorAll('.linkedin-main-cta, .linkedin-cta');
    linkedinCTAs.forEach(cta => {
        setInterval(() => {
            cta.style.boxShadow = '0 0 25px rgba(0, 188, 212, 0.6)';
            setTimeout(() => {
                cta.style.boxShadow = '';
            }, 1500);
        }, 8000);
    });

    // Highlight items hover effect
    const highlightItems = document.querySelectorAll('.highlight-item');
    highlightItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
            this.style.borderLeftWidth = '5px';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
            this.style.borderLeftWidth = '3px';
        });
    });
}

// Statistics counter animation
function initStatsCounter() {
    const stats = document.querySelectorAll('.stat-number');
    const observerOptions = {
        threshold: 0.5
    };

    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const text = target.textContent;
                
                if (text.includes('+') && !text.includes('Billions')) {
                    const num = parseFloat(text.replace('+', ''));
                    animateCounter(target, 0, num, 2000);
                } else if (text === 'Billions') {
                    // Special animation for billions
                    target.style.animation = 'pulse 2s ease-in-out';
                }
                
                statsObserver.unobserve(target);
            }
        });
    }, observerOptions);

    stats.forEach(stat => {
        statsObserver.observe(stat);
    });
}

// Counter animation function
function animateCounter(element, start, end, duration) {
    const startTime = performance.now();
    const originalText = element.textContent;
    const hasDecimal = originalText.includes('.');
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        let current = start + (end - start) * progress;
        
        if (hasDecimal) {
            current = current.toFixed(1);
        } else {
            current = Math.floor(current);
        }
        
        element.textContent = current + (originalText.includes('+') ? '+' : '');
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// Scroll to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add scroll to top button
document.addEventListener('DOMContentLoaded', function() {
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollButton.className = 'scroll-to-top';
    scrollButton.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        background: var(--tech-cyan);
        color: var(--snow-white);
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: var(--shadow-lg);
    `;

    document.body.appendChild(scrollButton);

    scrollButton.addEventListener('click', scrollToTop);

    // Show/hide scroll button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollButton.style.opacity = '1';
            scrollButton.style.visibility = 'visible';
        } else {
            scrollButton.style.opacity = '0';
            scrollButton.style.visibility = 'hidden';
        }
    });
});

// Enhanced link tracking for analytics
function trackLinkClick(linkType, destination) {
    // This function can be used to track user interactions
    console.log(`User clicked ${linkType} link to ${destination}`);
    
    // If you want to add analytics later, you can implement it here
    // Example: gtag('event', 'click', { 'event_category': linkType, 'event_label': destination });
}

// Add click tracking to external links
document.addEventListener('DOMContentLoaded', function() {
    const socialLinks = document.querySelectorAll('a[href*="linkedin.com"], a[href*="github.com"], a[href*="medium.com"]');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', function() {
            const url = this.href;
            let platform = '';
            
            if (url.includes('linkedin.com')) platform = 'LinkedIn';
            else if (url.includes('github.com')) platform = 'GitHub';
            else if (url.includes('medium.com')) platform = 'Medium';
            
            trackLinkClick('social', platform);
        });
    });

    // Track blog link clicks
    const blogLinks = document.querySelectorAll('.blog-link');
    blogLinks.forEach(link => {
        link.addEventListener('click', function() {
            trackLinkClick('blog', 'Medium');
        });
    });
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.05);
        }
    }

    @keyframes glow {
        0%, 100% {
            box-shadow: 0 0 20px rgba(0, 188, 212, 0.5);
        }
        50% {
            box-shadow: 0 0 30px rgba(0, 188, 212, 0.8);
        }
    }

    .scroll-to-top:hover {
        background: var(--tech-electric) !important;
        transform: translateY(-2px);
    }

    .linkedin-main-cta:hover,
    .linkedin-cta:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(0, 188, 212, 0.3);
    }

    .education-card:hover .education-icon {
        animation: pulse 0.6s ease;
    }

    .timeline-item:hover .timeline-dot {
        transform: scale(1.2);
        background: var(--tech-electric);
    }

    .blog-card.featured {
        animation: glow 4s ease-in-out infinite;
    }

    .highlight-item {
        transition: all 0.3s ease;
    }

    .connect-cta .btn:hover {
        transform: translateY(-2px);
    }
`;
document.head.appendChild(style);

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function execute