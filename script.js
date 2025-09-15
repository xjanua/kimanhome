// Navbar scroll effect
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Add scrolled class for background change
    if (scrollTop > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Hide/show navbar on scroll
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scrolling down - hide navbar
        navbar.classList.add('hidden');
    } else {
        // Scrolling up - show navbar
        navbar.classList.remove('hidden');
    }

    lastScrollTop = scrollTop;
});

// Carousel functionality
function moveCarousel(carouselId, direction) {
    const carousel = document.getElementById(carouselId);
    const items = carousel.querySelectorAll('.carousel-item');
    const itemWidth = items[0].offsetWidth;
    const currentTransform = carousel.style.transform || 'translateX(0px)';
    const currentX = parseInt(currentTransform.replace('translateX(', '').replace('px)', '')) || 0;

    let newX = currentX + (direction * itemWidth);
    const maxX = -(items.length - 4) * itemWidth;

    if (newX > 0) newX = 0;
    if (newX < maxX) newX = maxX;

    carousel.style.transform = `translateX(${newX}px)`;
}

// Smooth scrolling for navigation links
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

// Form submission
document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong thời gian sớm nhất.');
});

// Scroll Animation Functions
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function isElementPartiallyInViewport(el) {
    const rect = el.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const windowWidth = window.innerWidth || document.documentElement.clientWidth;

    return (
        rect.top < windowHeight &&
        rect.bottom > 0 &&
        rect.left < windowWidth &&
        rect.right > 0
    );
}

function handleScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in, .bounce-in');

    animatedElements.forEach(element => {
        if (isElementPartiallyInViewport(element)) {
            element.classList.add('visible');
        }
    });
}

// Initialize scroll animations
document.addEventListener('DOMContentLoaded', function () {
    // Add animation classes to elements
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        if (index > 0) { // Skip hero section
            section.classList.add('fade-in');
        }
    });

    // Add specific animations to different elements
    const cards = document.querySelectorAll('.card-apartment, .service-card, .testimonial-card, .news-card');
    cards.forEach((card, index) => {
        card.classList.add('scale-in');
        card.classList.add(`stagger-${(index % 6) + 1}`);
    });

    const achievements = document.querySelectorAll('.achievement-item');
    achievements.forEach((achievement, index) => {
        achievement.classList.add('bounce-in');
        achievement.classList.add(`stagger-${(index % 6) + 1}`);
    });

    const carousels = document.querySelectorAll('.carousel-container');
    carousels.forEach(carousel => {
        carousel.classList.add('slide-in-left');
    });

    // Initial check for elements already in viewport
    handleScrollAnimations();
});

// Add scroll event listener
window.addEventListener('scroll', handleScrollAnimations);
