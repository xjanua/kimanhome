// Apartments Pages JavaScript

document.addEventListener('DOMContentLoaded', function () {
    // Initialize filter functionality
    initializeFilters();

    // Add click handlers to apartment cards
    addApartmentClickHandlers();
});

function initializeFilters() {
    // Get all apartment items
    const apartments = document.querySelectorAll('#apartmentsList > div');

    // Store original count
    updateResultsCount(apartments.length);
}

function applyFilters() {
    const districtFilter = document.getElementById('districtFilter').value;
    const typeFilter = document.getElementById('typeFilter').value;
    const priceFromFilter = document.getElementById('priceFromFilter').value;
    const priceToFilter = document.getElementById('priceToFilter').value;

    const apartments = document.querySelectorAll('#apartmentsList > div');
    let visibleCount = 0;

    apartments.forEach(apartment => {
        let show = true;

        // District filter
        if (districtFilter && apartment.dataset.district !== districtFilter) {
            show = false;
        }

        // Type filter
        if (typeFilter && apartment.dataset.type !== typeFilter) {
            show = false;
        }

        // Price range filter
        const apartmentPrice = parseInt(apartment.dataset.price);

        if (priceFromFilter && apartmentPrice < parseInt(priceFromFilter)) {
            show = false;
        }

        if (priceToFilter && apartmentPrice > parseInt(priceToFilter)) {
            show = false;
        }

        // Show/hide apartment
        if (show) {
            apartment.style.display = 'block';
            apartment.classList.add('show');
            apartment.classList.remove('hidden');
            visibleCount++;
        } else {
            apartment.style.display = 'none';
            apartment.classList.add('hidden');
            apartment.classList.remove('show');
        }
    });

    // Update results count
    updateResultsCount(visibleCount);

    // Show no results message if needed
    showNoResultsMessage(visibleCount === 0);
}

function clearFilters() {
    // Reset all filter selects
    document.getElementById('districtFilter').value = '';
    document.getElementById('typeFilter').value = '';
    document.getElementById('priceFromFilter').value = '';
    document.getElementById('priceToFilter').value = '';

    // Show all apartments
    const apartments = document.querySelectorAll('#apartmentsList > div');
    apartments.forEach(apartment => {
        apartment.style.display = 'block';
        apartment.classList.add('show');
        apartment.classList.remove('hidden');
    });

    // Update results count
    updateResultsCount(apartments.length);

    // Hide no results message
    showNoResultsMessage(false);
}

function updateResultsCount(count) {
    const resultsCountElement = document.getElementById('resultsCount');
    if (resultsCountElement) {
        resultsCountElement.textContent = count;
    }
}

function showNoResultsMessage(show) {
    let noResultsElement = document.getElementById('noResultsMessage');

    if (show && !noResultsElement) {
        // Create no results message
        noResultsElement = document.createElement('div');
        noResultsElement.id = 'noResultsMessage';
        noResultsElement.className = 'no-results';
        noResultsElement.innerHTML = `
            <i class="fas fa-search"></i>
            <h4>Không tìm thấy căn hộ nào</h4>
            <p>Hãy thử điều chỉnh bộ lọc để tìm kiếm kết quả phù hợp hơn.</p>
        `;

        // Insert after results header
        const resultsSection = document.querySelector('.results-section .container');
        const resultsHeader = resultsSection.querySelector('.results-header').parentElement;
        resultsSection.insertBefore(noResultsElement, resultsHeader.nextSibling);
    } else if (!show && noResultsElement) {
        // Remove no results message
        noResultsElement.remove();
    }
}

function addApartmentClickHandlers() {
    const apartmentCards = document.querySelectorAll('.card-apartment');

    apartmentCards.forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', function () {
            // Get apartment title for navigation
            const title = this.querySelector('.card-title').textContent;

            // Navigate to product detail page
            // You can customize this URL based on your needs
            window.location.href = 'product-detail.html';
        });
    });
}

// Add smooth scrolling for navigation links
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

// Add loading animation for filter operations
function showLoading() {
    const resultsList = document.getElementById('apartmentsList');
    const loadingElement = document.createElement('div');
    loadingElement.className = 'loading';
    loadingElement.innerHTML = '<i class="fas fa-spinner"></i><p>Đang tìm kiếm...</p>';

    resultsList.style.opacity = '0.5';
    resultsList.appendChild(loadingElement);
}

function hideLoading() {
    const loadingElement = document.querySelector('.loading');
    const resultsList = document.getElementById('apartmentsList');

    if (loadingElement) {
        loadingElement.remove();
    }

    resultsList.style.opacity = '1';
}

// Enhanced filter function with loading animation
function applyFiltersWithLoading() {
    showLoading();

    // Simulate loading delay for better UX
    setTimeout(() => {
        applyFilters();
        hideLoading();
    }, 300);
}

// Update the filter button to use the enhanced function
document.addEventListener('DOMContentLoaded', function () {
    const filterButton = document.querySelector('.btn-primary');
    if (filterButton && filterButton.textContent.includes('Tìm kiếm')) {
        filterButton.onclick = applyFiltersWithLoading;
    }
});

// Add keyboard support for filters
document.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        const activeElement = document.activeElement;
        if (activeElement && activeElement.classList.contains('form-select')) {
            applyFiltersWithLoading();
        }
    }
});

// Add filter state persistence (optional)
function saveFilterState() {
    const filters = {
        district: document.getElementById('districtFilter').value,
        type: document.getElementById('typeFilter').value,
        priceFrom: document.getElementById('priceFromFilter').value,
        priceTo: document.getElementById('priceToFilter').value
    };

    localStorage.setItem('apartmentFilters', JSON.stringify(filters));
}

function loadFilterState() {
    const savedFilters = localStorage.getItem('apartmentFilters');
    if (savedFilters) {
        const filters = JSON.parse(savedFilters);

        document.getElementById('districtFilter').value = filters.district || '';
        document.getElementById('typeFilter').value = filters.type || '';
        document.getElementById('priceFromFilter').value = filters.priceFrom || '';
        document.getElementById('priceToFilter').value = filters.priceTo || '';

        // Apply saved filters
        if (filters.district || filters.type || filters.priceFrom || filters.priceTo) {
            applyFilters();
        }
    }
}

// Load saved filter state on page load
document.addEventListener('DOMContentLoaded', function () {
    loadFilterState();

    // Save filter state when filters change
    const filterSelects = document.querySelectorAll('.form-select');
    filterSelects.forEach(select => {
        select.addEventListener('change', saveFilterState);
    });
});
