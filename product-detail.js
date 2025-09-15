// Product Detail Page JavaScript

// Change main image when thumbnail is clicked
function changeMainImage(thumbnail) {
    const mainImage = document.getElementById('mainImage');
    const thumbnailImg = thumbnail.querySelector('img');

    // Update main image
    mainImage.src = thumbnailImg.src.replace('w=200', 'w=800');
    mainImage.alt = thumbnailImg.alt;

    // Update active thumbnail
    document.querySelectorAll('.thumbnail-item').forEach(item => {
        item.classList.remove('active');
    });
    thumbnail.classList.add('active');
}

// Open image modal (placeholder function)
function openImageModal() {
    alert('Tính năng xem toàn màn hình sẽ được phát triển trong phiên bản tiếp theo!');
}

// Show contact modal
function showContactModal() {
    const contactModal = new bootstrap.Modal(document.getElementById('contactModal'));
    contactModal.show();
}

// Initialize page
document.addEventListener('DOMContentLoaded', function () {
    // Add smooth scrolling for anchor links
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

    // Add click handlers for thumbnails
    document.querySelectorAll('.thumbnail-item').forEach((item, index) => {
        item.addEventListener('click', function () {
            changeMainImage(this);
        });
    });

    // Add form submission handler
    const contactForm = document.querySelector('#contactModal form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            alert('Cảm ơn bạn đã quan tâm! Chúng tôi sẽ liên hệ lại trong thời gian sớm nhất.');
            const modal = bootstrap.Modal.getInstance(document.getElementById('contactModal'));
            modal.hide();
        });
    }



    // Add map button handler
    const mapBtn = document.querySelector('.map-placeholder button');
    if (mapBtn) {
        mapBtn.addEventListener('click', function () {
            alert('Tính năng bản đồ chi tiết sẽ được tích hợp Google Maps trong phiên bản tiếp theo!');
        });
    }
});

// Image lazy loading
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading when DOM is loaded
document.addEventListener('DOMContentLoaded', lazyLoadImages);
