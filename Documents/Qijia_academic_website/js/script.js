// ============================================
// Claude Code Style Academic Website JavaScript
// Modern Interactions & Horizontal Page Navigation
// ============================================

// ============================================
// Site Data Renderer
// Loads site-data.json and renders all sections
// ============================================

async function loadSiteData() {
    const response = await fetch('assets/data/site-data.json');
    if (!response.ok) throw new Error(`site-data.json fetch failed: ${response.status}`);
    return response.json();
}

function renderProfile(data) {
    const el = document.getElementById('heroText');
    if (!el) return;

    const highlights = data.highlights.map(h => `
        <div class="highlight-item">
            <i class="fas ${h.icon}"></i>
            <span>${h.text}</span>
        </div>`).join('');

    const socials = data.social.map(s => `
        <a href="${s.url}" target="_blank" rel="noopener" class="social-link" title="${s.title}">
            <i class="${s.icon}"></i>
        </a>`).join('');

    el.innerHTML = `
        <div class="hero-badge">${data.badge}</div>
        <h1 class="hero-title"><span class="title-line">${data.name}</span></h1>
        <p class="hero-subtitle">
            ${data.institution}
            <span class="sep"></span>
            ${data.location}
        </p>
        <p class="hero-description">${data.description}</p>
        <div class="hero-highlights">${highlights}</div>
        <div class="hero-actions">
            <a href="#contact" class="btn btn-primary btn-lg">
                <i class="fas fa-envelope"></i> Get in Touch
            </a>
            <a href="#cv" class="btn btn-secondary btn-lg">
                <i class="fas fa-file-alt"></i> View CV
            </a>
        </div>
        <div class="hero-social">${socials}</div>
    `;
}

function renderResearch(data) {
    const el = document.getElementById('researchContent');
    if (!el) return;

    const streams = data.streams.map(s => `
        <div class="research-stream-item">
            <h4>${s.title}</h4>
            <p>${s.body}</p>
        </div>`).join('');

    const pubs = data.publications.map(p => `
        <div class="publication-item">
            <h4>${p.authors}</h4>
            <p>"${p.title}," <em>${p.venue}</em>${p.details ? ', ' + p.details : ''}.</p>
        </div>`).join('');

    el.innerHTML = `
        <p class="research-intro">${data.intro}</p>
        <h3 class="research-stream-title">Research Streams</h3>
        ${streams}
        <h3 class="research-stream-title">Publications</h3>
        <div class="publication-list">${pubs}</div>
    `;
}

function renderTeaching(data) {
    const el = document.getElementById('teachingContent');
    if (!el) return;

    const courses = data.courses.map(c => `
        <div class="course-item">
            <h4>${c.code} · ${c.title}
                <span style="font-weight:400;color:var(--text-muted)">(${c.level})</span>
            </h4>
            <p>${c.description}</p>
            <div class="course-skills">${c.skills.join(' &nbsp;·&nbsp; ')}</div>
        </div>`).join('');

    const interests = data.interests.map(i => `
        <div class="interest-item">${i}</div>`).join('');

    el.innerHTML = `
        <p class="teaching-intro">${data.intro}</p>
        <div class="teaching-philosophy">
            <h3>Teaching Philosophy</h3>
            <p>${data.philosophy}</p>
        </div>
        <h3 class="teaching-subsection">Teaching Assistant Experience</h3>
        <div class="courses-list">${courses}</div>
        <h3 class="teaching-subsection">Teaching Interests</h3>
        <div class="teaching-interests">${interests}</div>
    `;
}

function renderCV(data) {
    const el = document.getElementById('cvContent');
    if (!el) return;

    function cvItems(items) {
        return items.map(item => {
            const header = `
                <div class="cv-item-header">
                    <h4>${item.degree || item.role || item.title || item.authors}</h4>
                    ${item.period ? `<span class="cv-item-time">${item.period}</span>` : ''}
                </div>`;
            const body = item.institution
                ? `<p>${item.institution}${item.note ? `<br><em>${item.note}</em>` : ''}</p>
                   ${item.description ? `<p>${item.description}</p>` : ''}`
                : item.description
                    ? `<p>${item.description}</p>`
                    : item.title && item.venue
                        ? `<p>"${item.title}," <em>${item.venue}</em>${item.details ? ', ' + item.details : ''}.</p>`
                        : '';
            return `<div class="cv-item">${header}${body}</div>`;
        }).join('');
    }

    const trainingItems = data.teaching_training.map((t, i) =>
        i === 0 ? `<p>${t}</p>` : `<p><em>${t}</em></p>`
    ).join('');

    el.innerHTML = `
        <div class="cv-category"><h3>Education</h3>${cvItems(data.education)}</div>
        <div class="cv-category"><h3>Academic Experience</h3>${cvItems(data.academic_experience)}</div>
        <div class="cv-category"><h3>Work Experience</h3>${cvItems(data.work_experience)}</div>
        <div class="cv-category"><h3>Publications</h3>${cvItems(data.publications)}</div>
        <div class="cv-category"><h3>Awards &amp; Grants</h3>${cvItems(data.awards)}</div>
        <div class="cv-category">
            <h3>Teaching &amp; Training</h3>
            <div class="cv-item">${trainingItems}</div>
        </div>
    `;
}

function renderSkills(data) {
    const el = document.getElementById('skillsContent');
    if (!el) return;

    el.innerHTML = data.categories.map(cat => `
        <div class="skill-category">
            <h3>${cat.title}</h3>
            <div class="skill-list">
                ${cat.items.map(i => `<span class="skill-item">${i}</span>`).join('')}
            </div>
        </div>`).join('');
}

function renderContact(data) {
    const el = document.getElementById('contactContent');
    if (!el) return;

    el.innerHTML = `
        <div class="contact-info">
            <p><strong>Email</strong> &nbsp;
                <a href="mailto:${data.email}">${data.email}</a>
            </p>
            <p><strong>Institution</strong> &nbsp;${data.institution}</p>
            <p><strong>Address</strong> &nbsp;${data.address}</p>
        </div>
        <div class="job-market-notice">
            <h3>Academic Job Market</h3>
            <p>${data.job_market}</p>
            <a href="mailto:${data.email}" class="btn btn-primary">
                <i class="fas fa-envelope"></i> Send Email
            </a>
        </div>
    `;
}

function renderFooter(social) {
    const el = document.getElementById('footerRight');
    if (!el) return;

    const links = social.map(s => `
        <a href="${s.url}" target="_blank" rel="noopener" title="${s.title}">
            <i class="${s.icon}"></i>
        </a>`).join('');

    el.innerHTML = `
        <div class="footer-social">${links}</div>
        <p class="footer-copyright">&copy; ${new Date().getFullYear()} Qijia Liao</p>
    `;
}

// Bootstrap: load site-data.json then render all sections
async function initSiteData() {
    try {
        const data = await loadSiteData();
        renderProfile(data.profile);
        renderResearch(data.research);
        renderTeaching(data.teaching);
        renderCV(data.cv);
        renderSkills(data.skills);
        renderContact(data.contact);
        renderFooter(data.profile.social);
    } catch (err) {
        console.error('Failed to load site data:', err);
    }
}

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initSiteData();          // ← render content from JSON first
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
let pageIndexById = new Map();
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
            
            // Find the page index in O(1)
            const pageIndex = pageIndexById.get(targetId);
            
            if (Number.isInteger(pageIndex) && !isMobile) {
                goToPage(pageIndex);
            } else if (isMobile) {
                // On mobile, scroll to section
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    const navbarHeight = navbar ? navbar.offsetHeight : 0;
                    const targetPosition = targetElement.offsetTop - navbarHeight - 20;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
            
            // Close mobile menu
            if (navToggle) navToggle.classList.remove('active');
            if (navMenu) navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close mobile menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (navToggle) navToggle.classList.remove('active');
            if (navMenu) navMenu.classList.remove('active');
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
        if (parseInt(link.dataset.page, 10) === currentPage) {
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
    pageIndexById = new Map(Array.from(pages, (page, index) => [page.id, index]));

    // Add data-page attributes to navigation links
    const navLinks = document.querySelectorAll('.nav-link');
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
                        const navbarElement = document.getElementById('navbar');
                        const navbarHeight = navbarElement ? navbarElement.offsetHeight : 0;
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
    if (prefersReducedMotion) return;

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
    if (prefersReducedMotion) return;

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
    if (prefersReducedMotion) return;

    const sections = document.querySelectorAll('.section');
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate child elements
                const children = entry.target.querySelectorAll(':scope > *');
                children.forEach((child, index) => {
                    child.style.opacity = '0';
                    child.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0)';
                    }, index * 100);
                });

                sectionObserver.unobserve(entry.target);
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
function initCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    if (!statNumbers.length || prefersReducedMotion) return;

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const text = entry.target.textContent;
                const number = parseInt(text.replace(/\D/g, ''), 10);

                if (!Number.isNaN(number)) {
                    animateCounter(entry.target, number);
                }

                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => {
        counterObserver.observe(stat);
    });
}

// ============================================
// Card Tilt Effect
// ============================================

function initCardTilt() {
    if (isMobile || prefersReducedMotion) return;

    const cards = document.querySelectorAll('.paper-card, .course-card');
    
    cards.forEach(card => {
        let rafId;

        card.addEventListener('mousemove', (e) => {
            if (rafId) return;

            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            rafId = requestAnimationFrame(() => {
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
                rafId = null;
            });
        });
        
        card.addEventListener('mouseleave', () => {
            if (rafId) {
                cancelAnimationFrame(rafId);
                rafId = null;
            }
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
}

// Initialize card tilt effect
document.addEventListener('DOMContentLoaded', initCardTilt);
document.addEventListener('DOMContentLoaded', initCounters);

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
// Blog Content Management System
// ============================================

let blogData = null;
let currentFilter = 'all';
let currentSearch = '';

// Initialize Blog System
function initBlogSystem() {
    const blogGrid = document.getElementById('blogGrid');
    if (!blogGrid) return;

    // Load blog data
    loadBlogData().then(data => {
        blogData = data;
        renderBlogPosts();
        initFilterButtons();
        initSearchFunctionality();
        initReadingProgressBar();
        initBackToTop();
    }).catch(error => {
        console.error('Failed to load blog data:', error);
        blogGrid.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-triangle"></i>
                <p>Failed to load blog content. Please try refreshing the page.</p>
            </div>
        `;
    });
}

// Load blog data from JSON file
async function loadBlogData() {
    try {
        const response = await fetch('assets/data/blog-data.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error loading blog data:', error);
        throw error;
    }
}

// ============================================
// Fuzzy Search Utilities
// ============================================

/**
 * Simple fuzzy match: returns a score > 0 if query chars appear in order in str.
 * Higher score = better match (consecutive bonus).
 */
function fuzzyScore(str, query) {
    if (!query) return 1;
    str = str.toLowerCase();
    query = query.toLowerCase().trim();

    // Exact substring match gets highest priority
    if (str.includes(query)) return 1000 + (100 - str.indexOf(query));

    let score = 0;
    let sIdx = 0;
    let consecutive = 0;

    for (let qIdx = 0; qIdx < query.length; qIdx++) {
        const ch = query[qIdx];
        const found = str.indexOf(ch, sIdx);
        if (found === -1) return 0; // all query chars must appear in order
        if (found === sIdx) {
            consecutive++;
            score += 10 + consecutive * 5; // bonus for consecutive chars
        } else {
            consecutive = 0;
            score += 1;
        }
        sIdx = found + 1;
    }
    return score;
}

/**
 * Returns a relevance score for a post against the current search query.
 */
function postRelevance(post, query) {
    if (!query) return 1;
    const titleScore   = fuzzyScore(post.title,   query) * 3; // title weighted most
    const excerptScore = fuzzyScore(post.excerpt,  query) * 1.5;
    const tagScore     = Math.max(0, ...post.tags.map(t => fuzzyScore(t, query))) * 2;
    return titleScore + excerptScore + tagScore;
}

/**
 * Wrap matching substrings in a <mark> tag for highlight display.
 * Only highlights exact substring matches (keeps UI clean).
 */
function highlightMatch(text, query) {
    if (!query || !query.trim()) return text;
    const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escaped})`, 'gi');
    return text.replace(regex, '<mark class="search-highlight">$1</mark>');
}

// ============================================
// Difficulty Badge Helper
// ============================================

const DIFFICULTY_CONFIG = {
    beginner:     { label: 'Beginner',     color: 'difficulty-beginner'     },
    intermediate: { label: 'Intermediate', color: 'difficulty-intermediate' },
    advanced:     { label: 'Advanced',     color: 'difficulty-advanced'     },
    research:     { label: 'Research',     color: 'difficulty-research'     },
};

function getDifficultyBadge(difficulty) {
    if (!difficulty) return '';
    const cfg = DIFFICULTY_CONFIG[difficulty] || { label: difficulty, color: 'difficulty-beginner' };
    return `<span class="difficulty-badge ${cfg.color}">${cfg.label}</span>`;
}

// ============================================
// Table of Contents Generator
// ============================================

/**
 * Parses h3 headings from an HTML content string and returns a TOC nav HTML.
 * Returns empty string if fewer than 2 headings found.
 */
function buildTOC(contentHTML, postId) {
    const tmp = document.createElement('div');
    tmp.innerHTML = contentHTML;
    const headings = tmp.querySelectorAll('h3');
    if (headings.length < 2) return '';

    const items = Array.from(headings).map((h, i) => {
        const anchor = `toc-${postId}-${i}`;
        h.id = anchor; // mutates tmp (not DOM), we read it back below
        return `<li><a href="#${anchor}" class="toc-link" data-post="${postId}" data-anchor="${anchor}">${h.textContent}</a></li>`;
    });

    return `
        <nav class="blog-toc" aria-label="Article contents">
            <div class="blog-toc-title"><i class="fas fa-list"></i> Contents</div>
            <ol class="blog-toc-list">${items.join('')}</ol>
        </nav>
    `;
}

/**
 * After injecting content into DOM, stamp h3 IDs so TOC links work.
 */
function stampHeadingIDs(contentEl, postId) {
    const headings = contentEl.querySelectorAll('h3');
    headings.forEach((h, i) => {
        h.id = `toc-${postId}-${i}`;
    });
}

// Render Blog Posts
function renderBlogPosts(posts) {
    const blogGrid = document.getElementById('blogGrid');
    if (!blogGrid) return;

    const postsToRender = posts || getFilteredPosts();

    if (postsToRender.length === 0) {
        blogGrid.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-search"></i>
                <p>No posts match your search.</p>
                <button class="btn btn-secondary" onclick="resetBlogFilters()">Clear</button>
            </div>
        `;
        return;
    }

    blogGrid.innerHTML = postsToRender.map(post => createBlogCard(post)).join('');

    // After render: stamp heading IDs for TOC links, attach progress listeners
    postsToRender.forEach(post => {
        const card = blogGrid.querySelector(`[data-id="${post.id}"]`);
        if (!card) return;
        const contentEl = card.querySelector('.blog-card-content-text');
        if (contentEl) stampHeadingIDs(contentEl, post.id);

        // Attach details open/close: update progress bar scope
        const details = card.querySelector('details.blog-card-content');
        if (details) {
            details.addEventListener('toggle', () => updateReadingProgress());
        }
    });

    // TOC smooth-scroll delegation
    blogGrid.addEventListener('click', handleTOCClick);
}

function handleTOCClick(e) {
    const link = e.target.closest('.toc-link');
    if (!link) return;
    e.preventDefault();
    const anchor = link.dataset.anchor;
    const target = document.getElementById(anchor);
    if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Briefly highlight the heading
        target.classList.add('toc-target-flash');
        setTimeout(() => target.classList.remove('toc-target-flash'), 1200);
    }
}

// Create Blog Card HTML
function createBlogCard(post) {
    const languageBadge = post.language === 'zh'
        ? `<span class="blog-card-language">中文</span>`
        : '';
    const featuredClass = post.featured ? 'featured' : '';
    const readTime = post.readTime || '5 min';
    const query = currentSearch.trim();

    const titleHTML   = highlightMatch(post.title,  query);
    const excerptHTML = highlightMatch(post.excerpt, query);
    const diffBadge   = getDifficultyBadge(post.difficulty);

    // If post has external URL, render as link card
    if (post.externalUrl) {
        return `
            <a href="${post.externalUrl}" class="blog-card-link ${featuredClass}" data-category="${post.category}" data-id="${post.id}">
                <article class="blog-card ${featuredClass}">
                    <div class="blog-card-header">
                        <span class="blog-card-category">${getCategoryName(post.category)}${languageBadge}${diffBadge}</span>
                        <h3 class="blog-card-title">${titleHTML} <i class="fas fa-external-link-alt" style="font-size: 0.7em; margin-left: 8px; opacity: 0.5;"></i></h3>
                    </div>
                    <div class="blog-card-body">
                        <p class="blog-card-excerpt">${excerptHTML}</p>
                    </div>
                    <div class="blog-card-meta">
                        <span><i class="far fa-calendar"></i>${formatDate(post.date)}</span>
                        <span><i class="far fa-clock"></i>${readTime}</span>
                    </div>
                    <div class="blog-card-tags">
                        ${post.tags.slice(0, 4).map(tag => `<span class="blog-card-tag">${tag}</span>`).join('')}
                    </div>
                </article>
            </a>
        `;
    }

    // Default: render as expandable card
    const toc = buildTOC(post.content, post.id);

    return `
        <article class="blog-card ${featuredClass}" data-category="${post.category}" data-id="${post.id}">
            <div class="blog-card-header">
                <span class="blog-card-category">${getCategoryName(post.category)}${languageBadge}${diffBadge}</span>
                <h3 class="blog-card-title">${titleHTML}</h3>
            </div>
            <div class="blog-card-body">
                <p class="blog-card-excerpt">${excerptHTML}</p>
            </div>
            <div class="blog-card-meta">
                <span><i class="far fa-calendar"></i>${formatDate(post.date)}</span>
                <span><i class="far fa-clock"></i>${readTime}</span>
            </div>
            <div class="blog-card-details">
                <details class="blog-card-content">
                    <summary>Expand</summary>
                    <div class="blog-card-content-wrapper">
                        ${toc}
                        <div class="blog-card-content-text">${post.content}</div>
                        <div class="blog-card-tags">
                            ${post.tags.map(tag => `<span class="blog-card-tag">${tag}</span>`).join('')}
                        </div>
                    </div>
                </details>
            </div>
        </article>
    `;
}

// Get Filtered Posts — now uses fuzzy scoring
function getFilteredPosts() {
    if (!blogData || !blogData.posts) return [];
    const query = currentSearch.trim();

    const filtered = blogData.posts.filter(post => {
        const matchesCategory = currentFilter === 'all' || post.category === currentFilter;
        if (!matchesCategory) return false;
        if (!query) return true;
        return postRelevance(post, query) > 0;
    });

    // Sort by relevance when searching
    if (query) {
        filtered.sort((a, b) => postRelevance(b, query) - postRelevance(a, query));
    }

    return filtered;
}

// Initialize Filter Buttons
function initFilterButtons() {
    const filterContainer = document.getElementById('filterContainer');
    if (!filterContainer || !blogData || !blogData.categories) return;

    filterContainer.innerHTML = blogData.categories.map(cat => `
        <button class="filter-btn ${cat.id === 'all' ? 'active' : ''}" 
                data-category="${cat.id}"
                aria-label="Filter by ${cat.name}">
            <i class="fas ${cat.icon}"></i>
            ${cat.name}
            <span class="filter-count">(${cat.count})</span>
        </button>
    `).join('');

    // Add click handlers
    filterContainer.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            filterContainer.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.category;
            renderBlogPosts();
        });
    });
}

// Initialize Search Functionality
function initSearchFunctionality() {
    const searchInput = document.getElementById('blogSearch');
    if (!searchInput) return;

    // Live result count display
    const countEl = document.createElement('span');
    countEl.className = 'search-result-count';
    countEl.id = 'searchResultCount';
    searchInput.parentNode.appendChild(countEl);

    searchInput.addEventListener('input', debounce((e) => {
        currentSearch = e.target.value;
        renderBlogPosts();
        updateSearchCount();
    }, 250));
}

function updateSearchCount() {
    const countEl = document.getElementById('searchResultCount');
    if (!countEl) return;
    const query = currentSearch.trim();
    if (!query) {
        countEl.textContent = '';
        return;
    }
    const n = getFilteredPosts().length;
    countEl.textContent = `${n} result${n !== 1 ? 's' : ''}`;
}

// ============================================
// Reading Progress Bar
// ============================================

function initReadingProgressBar() {
    // Create the bar element once
    if (document.getElementById('readingProgressBar')) return;
    const bar = document.createElement('div');
    bar.id = 'readingProgressBar';
    bar.className = 'reading-progress-bar';
    bar.setAttribute('role', 'progressbar');
    bar.setAttribute('aria-valuemin', '0');
    bar.setAttribute('aria-valuemax', '100');
    document.body.appendChild(bar);

    // Update on scroll of the blog section page
    const blogSection = document.getElementById('blog');
    if (blogSection) {
        blogSection.addEventListener('scroll', throttle(updateReadingProgress, 16));
    }
    // Also update on window scroll (mobile)
    window.addEventListener('scroll', throttle(updateReadingProgress, 16));
}

function updateReadingProgress() {
    const bar = document.getElementById('readingProgressBar');
    if (!bar) return;

    // Find the first open details element (active read)
    const openDetails = document.querySelector('details.blog-card-content[open]');
    if (!openDetails) {
        bar.style.width = '0%';
        bar.style.opacity = '0';
        return;
    }

    const rect = openDetails.getBoundingClientRect();
    const totalHeight = openDetails.offsetHeight;
    if (totalHeight === 0) return;

    // How far through the open article we've scrolled
    const scrolled = Math.max(0, -rect.top);
    const progress = Math.min(100, (scrolled / totalHeight) * 100);

    bar.style.width = `${progress}%`;
    bar.style.opacity = progress > 0 ? '1' : '0';
    bar.setAttribute('aria-valuenow', Math.round(progress));
}

// ============================================
// Back to Top Button
// ============================================

function initBackToTop() {
    if (document.getElementById('backToTopBtn')) return;

    const btn = document.createElement('button');
    btn.id = 'backToTopBtn';
    btn.className = 'back-to-top-btn';
    btn.setAttribute('aria-label', 'Back to top');
    btn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(btn);

    btn.addEventListener('click', () => {
        const blogSection = document.getElementById('blog');
        if (blogSection && !isMobile) {
            blogSection.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });

    // Show/hide based on scroll position within the blog page
    const blogSection = document.getElementById('blog');
    const onScroll = throttle(() => {
        const scrollPos = isMobile ? window.scrollY : (blogSection ? blogSection.scrollTop : 0);
        btn.classList.toggle('visible', scrollPos > 400);
    }, 100);

    if (blogSection) blogSection.addEventListener('scroll', onScroll);
    window.addEventListener('scroll', onScroll);
}

// Reset Blog Filters
function resetBlogFilters() {
    currentFilter = 'all';
    currentSearch = '';

    // Reset filter buttons
    const filterContainer = document.getElementById('filterContainer');
    if (filterContainer) {
        filterContainer.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.category === 'all');
        });
    }

    // Reset search input
    const searchInput = document.getElementById('blogSearch');
    if (searchInput) {
        searchInput.value = '';
    }

    updateSearchCount();
    renderBlogPosts();
}

// Get Category Name
function getCategoryName(categoryId) {
    if (!blogData || !blogData.categories) return categoryId;

    const category = blogData.categories.find(cat => cat.id === categoryId);
    return category ? category.name : categoryId;
}

// Format Date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Make resetBlogFilters globally accessible
window.resetBlogFilters = resetBlogFilters;

// Initialize blog system when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBlogSystem);
} else {
    initBlogSystem();
}

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
        throttle,
        initBlogSystem,
        renderBlogPosts,
        resetBlogFilters,
        fuzzyScore,
        postRelevance,
        highlightMatch,
        buildTOC
    };
}
