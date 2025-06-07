// Modern JavaScript for Enhanced User Experience

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initScrollAnimations();
    initTypingEffect();
    initContactForm();
    initProjectEffects();
    initScrollToTop();
});

// Navigation functionality
function initNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu) navMenu.classList.remove('active');
            if (navToggle) navToggle.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
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
}

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
    const animateElements = document.querySelectorAll('.timeline-item, .project-card, .skill-category, .contact-method');
    
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

// Typing effect for hero section
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
            setTimeout(typeWriter, 100);
        } else {
            // Remove cursor after typing is complete
            setTimeout(() => {
                heroTitle.style.borderRight = 'none';
            }, 1000);
        }
    }
    
    // Start typing effect after a delay
    setTimeout(typeWriter, 1000);
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.querySelector('.contact-form form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });

        // Simulate form submission
        showFormMessage('Thank you for your message! I\'ll get back to you soon.', 'success');
        contactForm.reset();
    });

    // Add floating label effect
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', function() {
            if (this.value === '') {
                this.parentElement.classList.remove('focused');
            }
        });
    });
}

// Show form message
function showFormMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}`;
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        padding: 1rem;
        margin: 1rem 0;
        border-radius: 0.5rem;
        background: ${type === 'success' ? 'var(--tech-electric)' : 'var(--salmon-pink)'};
        color: var(--snow-white);
        font-weight: 500;
        animation: slideIn 0.3s ease;
    `;

    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.insertBefore(messageDiv, contactForm.firstChild);

        // Remove message after 5 seconds
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }
}

// Project hover effects
function initProjectEffects() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add subtle tilt effect
            this.style.transform = 'translateY(-5px) rotateX(5deg) rotateY(5deg)';
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

// Scroll to top functionality
function initScrollToTop() {
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

    scrollButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Show/hide scroll button based on scroll position
    window.addEventListener('scroll', debounce(function() {
        if (window.scrollY > 300) {
            scrollButton.style.opacity = '1';
            scrollButton.style.visibility = 'visible';
        } else {
            scrollButton.style.opacity = '0';
            scrollButton.style.visibility = 'hidden';
        }
    }, 10));

    // Add hover effect
    scrollButton.addEventListener('mouseenter', function() {
        this.style.background = 'var(--tech-electric)';
        this.style.transform = 'translateY(-2px)';
    });

    scrollButton.addEventListener('mouseleave', function() {
        this.style.background = 'var(--tech-cyan)';
        this.style.transform = 'translateY(0)';
    });
}

// Performance optimization: Debounce scroll events
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

// Add CSS animations dynamically
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
`;
document.head.appendChild(style);