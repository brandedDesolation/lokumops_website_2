// Rotating sentences in hero section
const heroSentence = document.getElementById('hero-sentence');

const sentences = [
    {
        html: 'We transform your business with<br><span class="highlight">Cloud and AI Excellence</span>'
    },
    {
        html: 'We deliver cutting-edge <span class="highlight">cloud solutions</span> and <span class="highlight">AI innovations</span> to transform your business'
    }
];

let currentIndex = 0;

// Initialize first sentence
heroSentence.innerHTML = sentences[0].html;
heroSentence.classList.add('visible');

function rotateSentence() {
    // Fade out
    heroSentence.classList.remove('visible');
    heroSentence.classList.add('exit');
    
    setTimeout(() => {
        // Update index
        currentIndex = (currentIndex + 1) % sentences.length;
        
        // Update content
        heroSentence.innerHTML = sentences[currentIndex].html;
        heroSentence.classList.remove('exit');
        
        // Fade in with smooth delay
        setTimeout(() => {
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    heroSentence.classList.add('visible');
                });
            });
        }, 50);
    }, 800);
}

// Rotate every 5 seconds for smoother experience
setInterval(rotateSentence, 5000);

// Solution cards expand/collapse
const solutionCards = document.querySelectorAll('.solution-card');

solutionCards.forEach(card => {
    const header = card.querySelector('.solution-header');
    
    header.addEventListener('click', () => {
        const isActive = card.classList.contains('active');
        
        // Close all cards
        solutionCards.forEach(c => c.classList.remove('active'));
        
        // Open clicked card if it wasn't active
        if (!isActive) {
            card.classList.add('active');
        }
    });
});

// Section titles animation on scroll
const sectionTitles = document.querySelectorAll('.section-title');

const titleObserverOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px'
};

const titleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            titleObserver.unobserve(entry.target);
        }
    });
}, titleObserverOptions);

sectionTitles.forEach(title => {
    titleObserver.observe(title);
});

// Expertise cards sequential reveal on scroll
const expertiseCards = document.querySelectorAll('.expertise-card');

const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const card = entry.target;
            const index = card.dataset.index;
            
            setTimeout(() => {
                card.classList.add('visible');
            }, index * 150);
            
            observer.unobserve(card);
        }
    });
}, observerOptions);

expertiseCards.forEach(card => {
    observer.observe(card);
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const navHeight = document.querySelector('.nav').offsetHeight;
            const targetPosition = target.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Add scroll effect to navigation - hide on scroll down, show on scroll up
let lastScroll = 0;
const nav = document.querySelector('.nav');
const heroSection = document.querySelector('.hero');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    const heroHeight = heroSection.offsetHeight;
    
    // Always show in hero section
    if (currentScroll < heroHeight) {
        nav.classList.remove('hidden');
    } 
    // Show when scrolling up, hide when scrolling down
    else if (currentScroll > lastScroll && currentScroll > heroHeight) {
        nav.classList.add('hidden');
    } else if (currentScroll < lastScroll) {
        nav.classList.remove('hidden');
    }
    
    lastScroll = currentScroll;
});

// Contact title animation on scroll
const contactTitle = document.querySelector('.contact-title');

const contactObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            contactObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

if (contactTitle) {
    contactObserver.observe(contactTitle);
}

// Social section animation on scroll
const socialSection = document.querySelector('.social');
const socialTitle = document.querySelector('.social h2');
const socialLinks = document.querySelector('.social-links');

const socialObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Animate title first
            if (socialTitle) {
                socialTitle.classList.add('visible');
            }
            
            // Then animate links with delay
            setTimeout(() => {
                if (socialLinks) {
                    socialLinks.classList.add('visible');
                }
            }, 200);
            
            socialObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.4 });

if (socialSection) {
    socialObserver.observe(socialSection);
}

// Mobile menu functionality
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const menuOverlay = document.querySelector('.menu-overlay');
const navLinks = document.querySelectorAll('.nav-menu a');

function closeMenu() {
    mobileMenuToggle.classList.remove('active');
    navMenu.classList.remove('active');
    if (menuOverlay) menuOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

function openMenu() {
    mobileMenuToggle.classList.add('active');
    navMenu.classList.add('active');
    if (menuOverlay) menuOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

if (mobileMenuToggle && navMenu) {
    // Toggle menu when clicking hamburger button
    mobileMenuToggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        if (navMenu.classList.contains('active')) {
            closeMenu();
        } else {
            openMenu();
        }
    });
    
    // Close menu when clicking on a navigation link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMenu();
        });
    });
    
    // Close menu when clicking on the overlay
    if (menuOverlay) {
        menuOverlay.addEventListener('click', () => {
            closeMenu();
        });
    }
    
    // Close menu when pressing Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            closeMenu();
        }
    });
}

// Contact email button - no additional JavaScript needed
// The mailto link will open the user's default email client