// Navigation bar show/hide on scroll
const navbar = document.querySelector("#navbar");
let lastScrollTop = 0;

window.addEventListener("scroll", () => {
    const scrollPosition = window.pageYOffset;
    const disappearPoint = 300;

    if (scrollPosition < disappearPoint || scrollPosition < lastScrollTop) {
        navbar.classList.add("show");
    } else {
        navbar.classList.remove("show");
    }

    lastScrollTop = scrollPosition <= 0 ? 0 : scrollPosition;
});

// Smooth scrolling for navigation links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70; // Account for navbar height
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navigation highlight based on scroll position
function highlightNavigation() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    const scrollPosition = window.pageYOffset + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// Intersection Observer for animations
const animatedElements = document.querySelectorAll(
    ".project-card, .skill-item, .about-content, .contact-content, .section-title"
);

const options = { 
    threshold: 0.1, 
    rootMargin: "-50px" 
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
            
            
            // Animate section titles with delay
            if (entry.target.classList.contains('section-title')) {
                entry.target.style.animationDelay = '0.2s';
            }
            
            // Stagger animation for project cards
            if (entry.target.classList.contains('project-card')) {
                const cards = Array.from(document.querySelectorAll('.project-card'));
                const index = cards.indexOf(entry.target);
                entry.target.style.animationDelay = `${index * 0.2}s`;
            }
            
            // Unobserve after animation to improve performance
            observer.unobserve(entry.target);
        }
    });
}, options);

animatedElements.forEach((element) => {
    observer.observe(element);
});

// Hero buttons smooth scroll
document.querySelectorAll('.hero-buttons .btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const targetSection = document.querySelector(href);
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Add interactive contact card effects
document.querySelectorAll('.contact-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(-5px)';
    });
});

// Add copy to clipboard functionality for contact info
document.querySelectorAll('.contact-item p').forEach(p => {
    if (p.textContent.includes('@') || p.textContent.includes('010-')) {
        p.style.cursor = 'pointer';
        p.title = 'Click to copy';
        
        p.addEventListener('click', function() {
            navigator.clipboard.writeText(this.textContent).then(() => {
                const originalText = this.textContent;
                this.textContent = 'Copied!';
                this.style.color = '#2ecc71';
                
                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.color = '';
                }, 1500);
            });
        });
    }
});

// Initialize navbar as shown on page load
document.addEventListener('DOMContentLoaded', function() {
    navbar.classList.add('show');
    
    // Trigger initial navigation highlight
    highlightNavigation();
});

// Smooth reveal animation for elements on page load
window.addEventListener('load', function() {
    const heroElements = document.querySelectorAll('.profile-image, .hero-title, .hero-subtitle, .hero-buttons');
    
    heroElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
});

// Add scroll progress indicator (optional enhancement)
function createScrollIndicator() {
    const scrollIndicator = document.createElement('div');
    scrollIndicator.id = 'scroll-indicator';
    scrollIndicator.style.cssText = `
        position: fixed;
        top: 70px;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #3498db, #2ecc71);
        z-index: 9999;
        transition: width 0.3s ease;
    `;
    document.body.appendChild(scrollIndicator);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        scrollIndicator.style.width = scrollPercent + '%';
    });
}

// Initialize scroll indicator
createScrollIndicator();

// Interactive profile image click effect
const profileImage = document.querySelector('.profile-image');
if (profileImage) {
    profileImage.addEventListener('click', function() {
        this.style.animation = 'bounce 0.6s ease';
        
        // Reset animation
        setTimeout(() => {
            this.style.animation = 'fadeInUp 1s ease, pulse 2s infinite';
        }, 600);
    });
}

// Add typing effect to hero subtitle
function typeWriter(element, text, speed = 100) {
    element.innerHTML = '';
    let i = 0;
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            element.style.borderRight = 'none'; // Remove cursor
        }
    }
    
    element.style.borderRight = '2px solid white';
    type();
}

// Initialize typing effect on page load
window.addEventListener('load', function() {
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const originalText = heroSubtitle.textContent;
        setTimeout(() => {
            typeWriter(heroSubtitle, originalText, 80);
        }, 1000);
    }
});

// Add particle effect to hero section
function createParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(255, 255, 255, 0.6);
            border-radius: 50%;
            pointer-events: none;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${3 + Math.random() * 4}s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
        `;
        hero.appendChild(particle);
    }
}

// Add floating animation for particles
const particleStyles = document.createElement('style');
particleStyles.textContent = `
    @keyframes float {
        0%, 100% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.6;
        }
        25% {
            transform: translateY(-20px) rotate(90deg);
            opacity: 1;
        }
        50% {
            transform: translateY(-10px) rotate(180deg);
            opacity: 0.8;
        }
        75% {
            transform: translateY(-30px) rotate(270deg);
            opacity: 0.4;
        }
    }
`;
document.head.appendChild(particleStyles);

// Initialize particles
createParticles();

// Add click effect to buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.4);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation
const rippleStyles = document.createElement('style');
rippleStyles.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyles);

// Add mouse parallax effect to hero section
const hero = document.querySelector('.hero');
if (hero) {
    hero.addEventListener('mousemove', function(e) {
        const { clientX: x, clientY: y } = e;
        const { offsetWidth: width, offsetHeight: height } = this;
        
        const moveX = (x / width - 0.5) * 20;
        const moveY = (y / height - 0.5) * 20;
        
        const heroContent = this.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.transform = `translate(${moveX}px, ${moveY}px)`;
        }
    });
    
    hero.addEventListener('mouseleave', function() {
        const heroContent = this.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.transform = 'translate(0, 0)';
        }
    });
}