class Carousel {
    constructor(element) {
        console.log('Carousel constructor called');
        this.carousel = element;
        this.track = this.carousel.querySelector('.carousel-track');
        this.items = Array.from(this.carousel.querySelectorAll('.carousel-item'));
        this.indicators = Array.from(this.carousel.querySelectorAll('.carousel-indicator'));
        this.prevButton = this.carousel.querySelector('.carousel-nav button.prev');
        this.nextButton = this.carousel.querySelector('.carousel-nav button.next');
        this.progressBar = this.carousel.querySelector('.carousel-progress-bar');
        
        console.log('Elements found:', {
            track: this.track,
            items: this.items.length,
            indicators: this.indicators.length,
            prevButton: this.prevButton,
            nextButton: this.nextButton,
            progressBar: this.progressBar
        });
        
        this.currentIndex = 0;
        this.isAnimating = false;
        this.touchStartX = 0;
        this.touchEndX = 0;
        this.autoPlayInterval = null;
        this.touchThreshold = 50;
        this.swipeVelocity = 0;
        this.lastTouchTime = 0;
        
        this.init();
    }
    
    init() {
        console.log('Initializing carousel');
        // Set initial state
        this.updateCarousel();
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        console.log('Setting up event listeners');
        // Navigation buttons
        if (this.prevButton) {
            console.log('Adding prev button listener');
            this.prevButton.addEventListener('click', (e) => {
                console.log('Prev button clicked');
                e.preventDefault();
                e.stopPropagation();
                this.slide('prev');
            });
        }
        
        if (this.nextButton) {
            console.log('Adding next button listener');
            this.nextButton.addEventListener('click', (e) => {
                console.log('Next button clicked');
                e.preventDefault();
                e.stopPropagation();
                this.slide('next');
            });
        }
        
        // Indicators
        this.indicators.forEach((indicator, index) => {
            console.log('Adding indicator listener for index:', index);
            indicator.addEventListener('click', (e) => {
                console.log('Indicator clicked:', index);
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
        
        // Pause autoplay on hover
        this.carousel.addEventListener('mouseenter', () => this.stopAutoPlay());
        this.carousel.addEventListener('mouseleave', () => this.startAutoPlay());
        
        // Visibility change
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.stopAutoPlay();
            } else {
                this.startAutoPlay();
            }
        });
        
        // Resize handling
        window.addEventListener('resize', this.handleResize.bind(this));
    }
    
    handleTouchStart(event) {
        this.touchStartX = event.touches[0].clientX;
        this.lastTouchTime = Date.now();
        this.stopAutoPlay();
    }
    
    handleTouchMove(event) {
        if (this.isAnimating) return;
        this.touchEndX = event.touches[0].clientX;
        const currentTime = Date.now();
        const timeDiff = currentTime - this.lastTouchTime;
        
        // Calculate velocity
        this.swipeVelocity = (this.touchEndX - this.touchStartX) / timeDiff;
        
        // Update track position with resistance
        const diff = this.touchStartX - this.touchEndX;
        const resistance = 0.3;
        const offset = -this.currentIndex * 100 + (diff * resistance);
        this.track.style.transform = `translateX(${offset}%)`;
    }
    
    handleTouchEnd() {
        if (this.isAnimating) return;
        const diff = this.touchStartX - this.touchEndX;
        const velocity = Math.abs(this.swipeVelocity);
        
        // Determine if we should slide based on distance and velocity
        if (Math.abs(diff) > this.touchThreshold || velocity > 0.5) {
            if (diff > 0 || velocity > 0.5) {
                this.slide('next');
            } else {
                this.slide('prev');
            }
        } else {
            // Return to current position
            this.updateCarousel();
        }
        
        this.startAutoPlay();
    }
    
    handleMouseDown(event) {
        this.touchStartX = event.clientX;
        this.lastTouchTime = Date.now();
        this.stopAutoPlay();
    }
    
    handleMouseMove(event) {
        if (!this.touchStartX) return;
        this.touchEndX = event.clientX;
        const currentTime = Date.now();
        const timeDiff = currentTime - this.lastTouchTime;
        
        // Calculate velocity
        this.swipeVelocity = (this.touchEndX - this.touchStartX) / timeDiff;
        
        // Update track position with resistance
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
    
    handleResize() {
        this.updateCarousel();
    }
    
    slide(direction) {
        console.log('Sliding:', direction);
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
        console.log('Going to slide:', index);
        if (index === this.currentIndex) return;
        // Update current index
        this.currentIndex = index;
        // Update carousel
        this.updateCarousel();
    }
    
    updateCarousel() {
        console.log('Updating carousel to index:', this.currentIndex);
        // Update track position with smooth transition
        const offset = -this.currentIndex * 100;
        this.track.style.transform = `translateX(${offset}%)`;
        
        // Update indicators
        this.indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentIndex);
        });
        
        // Update items with 3D effect
        this.items.forEach((item, index) => {
            item.classList.toggle('active', index === this.currentIndex);
        });
        
        // Update progress bar
        if (this.progressBar) {
            const progress = ((this.currentIndex + 1) / this.items.length) * 100;
            this.progressBar.style.width = `${progress}%`;
        }
    }
    
    startAutoPlay() {
        // Disabled auto-play
    }
    
    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
    
    getTransitionDuration() {
        const style = window.getComputedStyle(this.track);
        const duration = parseFloat(style.transitionDuration) * 1000;
        return duration || 400;
    }
}

// Initialize carousel
console.log('Script loaded');
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded');
    const carousel = document.querySelector('.carousel-container');
    console.log('Carousel element:', carousel);
    if (carousel) {
        new Carousel(carousel);
    } else {
        console.error('Carousel container not found!');
    }
}); 