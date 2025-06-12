// Carousel functionality
class Carousel {
    constructor(element) {
        this.carousel = element;
        this.track = this.carousel.querySelector('.carousel-track');
        this.items = Array.from(this.carousel.querySelectorAll('.carousel-item'));
        this.indicators = Array.from(this.carousel.querySelectorAll('.carousel-indicator'));
        this.prevButton = this.carousel.querySelector('.carousel-nav button.prev');
        this.nextButton = this.carousel.querySelector('.carousel-nav button.next');
        this.progressBar = this.carousel.querySelector('.carousel-progress-bar');
        
        this.currentIndex = 0;
        this.isAnimating = false;
        this.touchStartX = 0;
        this.touchEndX = 0;
        this.touchThreshold = 50;
        this.swipeVelocity = 0;
        this.lastTouchTime = 0;
        
        this.init();
    }
    
    init() {
        this.updateCarousel();
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        // Navigation buttons
        if (this.prevButton) {
            this.prevButton.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.slide('prev');
            });
        }
        
        if (this.nextButton) {
            this.nextButton.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.slide('next');
            });
        }
        
        // Indicators
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.goToSlide(index);
            });
        });
        
        // Touch events
        this.carousel.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: true });
        this.carousel.addEventListener('touchmove', this.handleTouchMove.bind(this), { passive: true });
        this.carousel.addEventListener('touchend', this.handleTouchEnd.bind(this));
        
        // Mouse events
        this.carousel.addEventListener('mousedown', this.handleMouseDown.bind(this));
        this.carousel.addEventListener('mousemove', this.handleMouseMove.bind(this));
        this.carousel.addEventListener('mouseup', this.handleMouseUp.bind(this));
        this.carousel.addEventListener('mouseleave', this.handleMouseUp.bind(this));
        
        // Keyboard navigation
        this.carousel.addEventListener('keydown', this.handleKeyDown.bind(this));
    }
    
    handleTouchStart(event) {
        this.touchStartX = event.touches[0].clientX;
        this.lastTouchTime = Date.now();
    }
    
    handleTouchMove(event) {
        if (this.isAnimating) return;
        this.touchEndX = event.touches[0].clientX;
        const currentTime = Date.now();
        const timeDiff = currentTime - this.lastTouchTime;
        
        this.swipeVelocity = (this.touchEndX - this.touchStartX) / timeDiff;
        
        const diff = this.touchStartX - this.touchEndX;
        const resistance = 0.3;
        const offset = -this.currentIndex * 100 + (diff * resistance);
        this.track.style.transform = `translateX(${offset}%)`;
    }
    
    handleTouchEnd() {
        if (this.isAnimating) return;
        const diff = this.touchStartX - this.touchEndX;
        const velocity = Math.abs(this.swipeVelocity);
        
        if (Math.abs(diff) > this.touchThreshold || velocity > 0.5) {
            if (diff > 0 || velocity > 0.5) {
                this.slide('next');
            } else {
                this.slide('prev');
            }
        } else {
            this.updateCarousel();
        }
    }
    
    handleMouseDown(event) {
        this.touchStartX = event.clientX;
        this.lastTouchTime = Date.now();
    }
    
    handleMouseMove(event) {
        if (!this.touchStartX) return;
        this.touchEndX = event.clientX;
        const currentTime = Date.now();
        const timeDiff = currentTime - this.lastTouchTime;
        
        this.swipeVelocity = (this.touchEndX - this.touchStartX) / timeDiff;
        
        const diff = this.touchStartX - this.touchEndX;
        const resistance = 0.3;
        const offset = -this.currentIndex * 100 + (diff * resistance);
        this.track.style.transform = `translateX(${offset}%)`;
    }
    
    handleMouseUp() {
        if (!this.touchStartX) return;
        this.handleTouchEnd();
        this.touchStartX = 0;
    }
    
    handleKeyDown(event) {
        if (event.key === 'ArrowLeft') {
            this.slide('prev');
        } else if (event.key === 'ArrowRight') {
            this.slide('next');
        }
    }
    
    slide(direction) {
        if (this.isAnimating) return;
        this.isAnimating = true;
        const newIndex = direction === 'next' 
            ? (this.currentIndex + 1) % this.items.length
            : (this.currentIndex - 1 + this.items.length) % this.items.length;
        this.goToSlide(newIndex);
        setTimeout(() => {
            this.isAnimating = false;
        }, this.getTransitionDuration());
    }
    
    goToSlide(index) {
        if (index === this.currentIndex) return;
        this.currentIndex = index;
        this.updateCarousel();
    }
    
    updateCarousel() {
        const offset = -this.currentIndex * 100;
        this.track.style.transform = `translateX(${offset}%)`;
        
        this.indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentIndex);
        });
        
        this.items.forEach((item, index) => {
            item.classList.toggle('active', index === this.currentIndex);
        });
        
        if (this.progressBar) {
            const progress = ((this.currentIndex + 1) / this.items.length) * 100;
            this.progressBar.style.width = `${progress}%`;
        }
    }
    
    getTransitionDuration() {
        const style = window.getComputedStyle(this.track);
        const duration = parseFloat(style.transitionDuration) * 1000;
        return duration || 400;
    }
}

// Initialize carousel
document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.carousel-container');
    if (carousel) {
        new Carousel(carousel);
    }
});

// Sidebar functionality
document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.querySelector('.sidebar');
    const toggleButton = document.getElementById('toggle-sidebar');

    if (toggleButton) {
        toggleButton.addEventListener('click', () => {
            sidebar.classList.toggle('collapsed');
        });
    }
});

// Duration calculation
function calculateDuration() {
    const issuedByField = document.getElementById('issuedBy');
    const expiresField = document.getElementById('expires');
    const durationField = document.getElementById('duration');

    if (issuedByField.value) {
        const issuedDate = new Date(issuedByField.value);
        const expiryDate = new Date(issuedDate);
        expiryDate.setDate(expiryDate.getDate() + 1825); // Add 5 years

        const expiryFormatted = expiryDate.toISOString().split('T')[0];
        expiresField.value = expiryFormatted;
        durationField.value = '5 years';
    }
}

// Qualification updates
function updateQualifications() {
    const accreditationNumber = document.getElementById('accreditationNumber').value;
    const qualifications = document.getElementById('qualifications');
    const nqfLevel = document.getElementById('nqfLevel');
    const ofoNumber = document.getElementById('ofoNumber');

    qualifications.innerHTML = '<option value="" disabled selected>Select qualifications</option>';
    nqfLevel.value = '';
    ofoNumber.value = '';

    const qualificationsMap = {
        '05-QCTO/AC-TTC250125102623': [
            'Occupational Certificates: Checkout Operator',
            'Occupational Certificates: Dispatching and Receiving Clerk',
            'Occupational Certificates: Visual Merchandiser',
            'Occupational Certificates: Retail Supervisor',
            'Occupational Certificates: Retail Manager/Retail Store Manager'
        ],
        '05-QCTO/SDP010524113839': [
            'Occupational Certificates: Visual Merchandiser',
            'Occupational Certificates: Retail Supervisor',
            'Occupational Certificates: Retail Buyer',
            'Occupational Certificates: Retail Manager/Retail Store Manager'
        ],
        '05-QCTO/AC-TTC240924085655': [
            'Intermediate Occupational Certificate: Food and Beverage Process Machine Operator'
        ],
        '05-QCTO/SDP040325132739': [
            'Intermediate Occupational Certificate: Food and Beverage Process Machine Operator'
        ]
    };

    if (qualificationsMap[accreditationNumber]) {
        qualificationsMap[accreditationNumber].forEach(optionText => {
            const option = document.createElement('option');
            option.value = optionText;
            option.textContent = optionText;
            qualifications.appendChild(option);
        });
    }
}

// NQF Level and OFO Number updates
function updateNQFLevelAndOFONumber() {
    const qualification = document.getElementById('qualifications').value;
    const nqfLevel = document.getElementById('nqfLevel');
    const ofoNumber = document.getElementById('ofoNumber');

    const nqfMap = {
        'Occupational Certificates: Checkout Operator': '02',
        'Occupational Certificates: Dispatching and Receiving Clerk': '03',
        'Occupational Certificates: Visual Merchandiser': '03',
        'Occupational Certificates: Retail Supervisor': '04',
        'Occupational Certificates: Retail Manager': '06',
        'Occupational Certificates: Retail Buyer': '05',
        'Occupational Certificates: Retail Manager/Retail Store Manager': '06',
        'Intermediate Occupational Certificate: Food and Beverage Process Machine Operator': '03'
    };

    const ofoMap = {
        'Occupational Certificates: Checkout Operator': '99707',
        'Occupational Certificates: Dispatching and Receiving Clerk': '99446',
        'Occupational Certificates: Retail Buyer': '103145',
        'Occupational Certificates: Visual Merchandiser': '99688',
        'Occupational Certificates: Retail Supervisor': '99573',
        'Occupational Certificates: Retail Manager/Retail Store Manager': '91789',
        'Intermediate Occupational Certificate: Food and Beverage Process Machine Operator': '121149'
    };

    nqfLevel.value = nqfMap[qualification] || '';
    ofoNumber.value = ofoMap[qualification] || '';
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    const qualificationsSelect = document.getElementById('qualifications');
    if (qualificationsSelect) {
        qualificationsSelect.addEventListener('change', updateNQFLevelAndOFONumber);
    }

    const issuedByField = document.getElementById('issuedBy');
    if (issuedByField) {
        issuedByField.addEventListener('change', calculateDuration);
    }
}); 