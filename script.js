// Smooth-scroll for in-page anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Reveal elements as they scroll into view
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationDelay = '0.1s';
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Hide the header on scroll-down, show on scroll-up
let lastScrollTop = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && scrollTop > 100) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }

    lastScrollTop = scrollTop;
});

// Typewriter effect for the hero heading
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const title = document.querySelector('.hero-text h1');

if (title && !reduceMotion) {
    const titleText = title.textContent;
    title.textContent = '';
    let i = 0;
    const type = () => {
        if (i < titleText.length) {
            title.textContent += titleText.charAt(i);
            i++;
            setTimeout(type, 100);
        }
    };
    type();
}
