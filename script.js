// Rotating text in hero section
const rotatingText = document.querySelector('.rotating-text');
const heroSubtitle = document.querySelector('.hero-subtitle');

const words = ['cloud solutions', 'AI systems', 'secure platforms', 'automation'];
const subtitles = [
    'Seamless AWS migrations and cloud-native modernization',
    'Custom AI models and GenAI integration for your business',
    'Enterprise-grade security with SOC2 and HIPAA compliance',
    'CI/CD pipelines and Infrastructure as Code excellence'
];

let currentIndex = 0;

// Create word element
function createWordElement(text) {
    const span = document.createElement('span');
    span.className = 'word';
    span.textContent = text;
    return span;
}

// Initialize first word
let currentWord = createWordElement(words[0]);
currentWord.classList.add('active');
rotatingText.appendChild(currentWord);
heroSubtitle.textContent = subtitles[0];
heroSubtitle.classList.add('visible');

function rotateText() {
    const oldWord = currentWord;
    oldWord.classList.remove('active');
    oldWord.classList.add('exit');
    
    // Fade out subtitle smoothly
    heroSubtitle.classList.remove('visible');
    
    setTimeout(() => {
        // Remove old word after animation completes
        oldWord.remove();
        
        // Update index
        currentIndex = (currentIndex + 1) % words.length;
        
        // Create and add new word
        currentWord = createWordElement(words[currentIndex]);
        rotatingText.appendChild(currentWord);
        
        // Small delay before triggering entrance animation
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                currentWord.classList.add('active');
                
                // Update subtitle text and animate in with delay
                setTimeout(() => {
                    heroSubtitle.textContent = subtitles[currentIndex];
                    requestAnimationFrame(() => {
                        heroSubtitle.classList.add('visible');
                    });
                }, 200);
            });
        });
    }, 600);
}

// Rotate every 3.5 seconds for smoother feel
setInterval(rotateText, 3500);

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
