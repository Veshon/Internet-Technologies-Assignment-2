// Image Slider Functionality
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const prevButton = document.querySelector('.slider-prev');
    const nextButton = document.querySelector('.slider-next');
    const navButtons = document.querySelectorAll('.slider-nav-button');
    
    let currentIndex = 0;
    const slideCount = slides.length;
    
    // Initialize the slider
    function initSlider() {
        // Set the first slide as active
        updateSlider();
        
        // Set up autoplay
        startAutoplay();
    }
    
    // Update the slider position and active nav button
    function updateSlider() {
        // Update slider position
        slider.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Update active nav button
        navButtons.forEach((button, index) => {
            if (index === currentIndex) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
    }
    
    // Go to previous slide
    function prevSlide() {
        currentIndex = (currentIndex - 1 + slideCount) % slideCount;
        updateSlider();
    }
    
    // Go to next slide
    function nextSlide() {
        currentIndex = (currentIndex + 1) % slideCount;
        updateSlider();
    }
    
    // Go to a specific slide
    function goToSlide(index) {
        currentIndex = index;
        updateSlider();
    }
    
    // Set up autoplay
    let autoplayInterval;
    function startAutoplay() {
        autoplayInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }
    
    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }
    
    // Event listeners
    prevButton.addEventListener('click', function() {
        prevSlide();
        stopAutoplay();
        startAutoplay(); // Restart autoplay after manual navigation
    });
    
    nextButton.addEventListener('click', function() {
        nextSlide();
        stopAutoplay();
        startAutoplay(); // Restart autoplay after manual navigation
    });
    
    navButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            goToSlide(index);
            stopAutoplay();
            startAutoplay(); // Restart autoplay after manual navigation
        });
    });
    
    // Pause autoplay when hovering over the slider
    slider.addEventListener('mouseenter', stopAutoplay);
    slider.addEventListener('mouseleave', startAutoplay);
    
    // Initialize the slider
    initSlider();
});