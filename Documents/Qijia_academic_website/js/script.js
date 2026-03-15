// ============================================
// Claude Code Style Academic Website JavaScript
// Modern Interactions & Horizontal Page Navigation
// ============================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initPageNavigation();
    initNavigation();
    initAnimations();
    initSkillBars();
    initSmoothScroll();
    initIntersectionObserver();
    initKeyboardNavigation();
});

// ============================================
// Global State
// ============================================

let currentPage = 0;
let totalPages = 0;
let pages = [];
let isMobile = window.innerWidth <= 768;

// ============================================
// Navigation System
// ============================================

function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
    }

    // Handle navigation link clicks
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Get target page from href
            const targetId = link.getAttribute('href').substring(1); // Remove '#'
            
            // Find the page index
            const pageIndex = Array.from(pages).findIndex(page => 
                page.id === targetId
            );
            
            if (pageIndex !== -1 && !isMobile) {
                goToPage(pageIndex);
            } else if (isMobile) {
                // On mobile, scroll to section
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    const navbarHeight = navbar.offsetHeight;
                    const targetPosition = targetElement.offsetTop - navbarHeight - 20;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
            
            // Close mobile menu
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close mobile menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Initialize active link
    updateActiveNavLink();
}

function updateActiveNavLink() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (parseInt(link.dataset.page) === currentPage) {
            link.classList.add('active');
        }
    });
}

// ============================================
// Page Navigation System
// ============================================

function initPageNavigation() {
    const pagesContainer = document.querySelector('.pages-container');
    if (!pagesContainer) return;

    pages = document.querySelectorAll('.page');
    totalPages = pages.length;

    // Add data-page attributes to navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    const pageIds = ['about', 'research', 'teaching', 'cv', 'skills', 'contact'];
    
    navLinks.forEach((link, index) => {
        link.dataset.page = index;
    });

    // Create navigation buttons
    createPageNavButtons();
    createPageIndicators();

    // Handle window resize
    window.addEventListener('resize', debounce(() => {
        const wasMobile = isMobile;
        isMobile = window.innerWidth <= 768;
        
        if (wasMobile !== isMobile) {
            if (isMobile) {
                // Switch to mobile layout
                pagesContainer.style.transform = 'none';
            } else {
                // Switch to desktop layout
                goToPage(currentPage);
            }
        }
    }, 250));

    // Initialize first page
    updateActiveNavLink();
    updatePageIndicators();
    updateNavButtons();
}

function createPageNavButtons() {
    if (isMobile) return;

    const prevBtn = document.createElement('button');
    prevBtn.className = 'page-nav page-nav-prev';
    prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
    prevBtn.setAttribute('aria-label', 'Previous page');
    prevBtn.addEventListener('click', () => prevPage());

    const nextBtn = document.createElement('button');
    nextBtn.className = 'page-nav page-nav-next';
    nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
    nextBtn.setAttribute('aria-label', 'Next page');
    nextBtn.addEventListener('click', () => nextPage());

    document.body.appendChild(prevBtn);
    document.body.appendChild(nextBtn);
}

function createPageIndicators() {
    if (isMobile) return;

    const indicatorsContainer = document.createElement('div');
    indicatorsContainer.className = 'page-indicators';

    for (let i = 0; i < totalPages; i++) {
        const indicator = document.createElement('div');
        indicator.className = 'page-indicator';
        indicator.dataset.page = i;
        indicator.addEventListener('click', () => goToPage(i));
        indicatorsContainer.appendChild(indicator);
    }

    document.body.appendChild(indicatorsContainer);
}

function goToPage(pageIndex) {
    if (pageIndex < 0 || pageIndex >= totalPages || isMobile) return;

    currentPage = pageIndex;
    const pagesContainer = document.querySelector('.pages-container');
    pagesContainer.style.transform = `translateX(-${currentPage * 100}%)`;

    updateActiveNavLink();
    updatePageIndicators();
    updateNavButtons();

    // Scroll to top of the new page
    pages[currentPage].scrollTop = 0;
}

function nextPage() {
    if (currentPage < totalPages - 1) {
        goToPage(currentPage + 1);
    }
}

function prevPage() {
    if (currentPage > 0) {
        goToPage(currentPage - 1);
    }
}

function updatePageIndicators() {
    const indicators = document.querySelectorAll('.page-indicator');
    indicators.forEach((indicator, index) => {
        if (index === currentPage) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

function updateNavButtons() {
    const prevBtn = document.querySelector('.page-nav-prev');
    const nextBtn = document.querySelector('.page-nav-next');

    if (prevBtn) prevBtn.disabled = currentPage === 0;
    if (nextBtn) nextBtn.disabled = currentPage === totalPages - 1;
}

// ============================================
// Keyboard Navigation
// ============================================

function initKeyboardNavigation() {
    if (isMobile) return;

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            e.preventDefault();
            nextPage();
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            e.preventDefault();
            prevPage();
        }
    });
}

// ============================================
// Smooth Scroll (for internal anchor links)
// ============================================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        // Skip navigation links (they're handled by initNavigation)
        if (anchor.classList.contains('nav-link') || anchor.classList.contains('nav-logo')) {
            return;
        }

        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            e.preventDefault();
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Find which page this element is on
                const targetPage = Array.from(pages).findIndex(page => 
                    page.contains(targetElement)
                );
                
                if (targetPage !== -1) {
                    if (!isMobile) {
                        // On desktop, go to the page
                        goToPage(targetPage);
                    } else {
                        // On mobile, use regular smooth scroll
                        const navbarHeight = document.getElementById('navbar').offsetHeight;
                        const targetPosition = targetElement.offsetTop - navbarHeight - 20;
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                }
            }
        });
    });
}

// ============================================
// Animations
// ============================================

function initAnimations() {
    // Animate elements when they become visible
    const animatedElements = document.querySelectorAll('.paper-card, .course-card, .contact-card, .stat-card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                animationObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        animationObserver.observe(el);
    });

    // Add hover effects to cards
    document.querySelectorAll('.paper-card, .course-card, .contact-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// ============================================
// Skill Bars Animation
// ============================================

function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.style.width;
                entry.target.style.width = '0%';
                
                setTimeout(() => {
                    entry.target.style.width = width;
                }, 200);
                
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
}

// ============================================
// Intersection Observer for Sections
// ============================================

function initIntersectionObserver() {
    const sections = document.querySelectorAll('.section');
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate child elements
                const children = entry.target.querySelectorAll('>*');
                children.forEach((child, index) => {
                    child.style.opacity = '0';
                    child.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });
}

// ============================================
// Counter Animation for Stats
// ============================================

function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const updateCounter = () => {
        start += increment;
        
        if (start < target) {
            element.textContent = Math.floor(start) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    };
    
    updateCounter();
}

// Initialize counter animations
const statNumbers = document.querySelectorAll('.stat-number');
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const text = entry.target.textContent;
            const number = parseInt(text.replace(/\D/g, ''));
            
            if (!isNaN(number)) {
                animateCounter(entry.target, number);
            }
            
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => {
    counterObserver.observe(stat);
});

// ============================================
// Card Tilt Effect
// ============================================

function initCardTilt() {
    const cards = document.querySelectorAll('.paper-card, .course-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
}

// Initialize card tilt effect
initCardTilt();

// ============================================
// Performance Optimization
// ============================================

// Debounce function
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

// Throttle function
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ============================================
// Accessibility Improvements
// ============================================

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

// Remove keyboard navigation class on mouse use
document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
});

// ============================================
// Page Load Complete
// ============================================

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    setTimeout(() => {
        document.querySelectorAll('.hero-content > *').forEach((el, index) => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });
    }, 300);
});

// ============================================
// Export functions for external use
// ============================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        goToPage,
        nextPage,
        prevPage,
        initNavigation,
        initPageNavigation,
        debounce,
        throttle
    };
}