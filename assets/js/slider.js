// Image Slider Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all sliders on the page
    initializeAllSliders();

    // Function to initialize all sliders
    function initializeAllSliders() {
        // Get all slider containers
        const sliderContainers = document.querySelectorAll('.slider-container');

        // Initialize each slider
        sliderContainers.forEach((container, containerIndex) => {
            initializeSlider(container, containerIndex);
        });
    }

    // Function to initialize a single slider
    function initializeSlider(container, containerIndex) {
        const slider = container.querySelector('.slider');
        const slides = container.querySelectorAll('.slide');
        const prevButton = container.querySelector('.slider-prev');
        const nextButton = container.querySelector('.slider-next');
        const navContainer = container.querySelector('.slider-nav');

        // If there are no slides, don't initialize
        if (slides.length === 0) return;

        let currentIndex = 0;
        const slideCount = slides.length;

        // Create navigation dots if they don't exist
        if (navContainer && slideCount > 1) {
            // Clear existing nav buttons
            navContainer.innerHTML = '';

            // Create new nav buttons
            for (let i = 0; i < slideCount; i++) {
                const navButton = document.createElement('button');
                navButton.classList.add('slider-nav-button');
                if (i === 0) navButton.classList.add('active');
                navButton.setAttribute('aria-label', `Go to slide ${i + 1}`);
                navContainer.appendChild(navButton);

                // Add click event
                navButton.addEventListener('click', function() {
                    goToSlide(i);
                    stopAutoplay();
                    startAutoplay(); // Restart autoplay after manual navigation
                });
            }
        }

        // Get all nav buttons
        const navButtons = container.querySelectorAll('.slider-nav-button');

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
            if (slideCount > 1) {
                autoplayInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
            }
        }

        function stopAutoplay() {
            clearInterval(autoplayInterval);
        }

        // Event listeners
        if (prevButton) {
            prevButton.addEventListener('click', function() {
                prevSlide();
                stopAutoplay();
                startAutoplay(); // Restart autoplay after manual navigation
            });
        }

        if (nextButton) {
            nextButton.addEventListener('click', function() {
                nextSlide();
                stopAutoplay();
                startAutoplay(); // Restart autoplay after manual navigation
            });
        }

        // Pause autoplay when hovering over the slider
        slider.addEventListener('mouseenter', stopAutoplay);
        slider.addEventListener('mouseleave', startAutoplay);

        // Initialize the slider
        updateSlider();
        startAutoplay();
    }

    // Function to add a new image to a slider
    window.addImageToSlider = function(sliderIndex, imageSrc, imageAlt) {
        const containers = document.querySelectorAll('.slider-container');
        if (sliderIndex >= containers.length) return;

        const container = containers[sliderIndex];
        const slider = container.querySelector('.slider');

        // Create new slide
        const newSlide = document.createElement('div');
        newSlide.classList.add('slide');

        // Create image element
        const img = document.createElement('img');
        img.src = imageSrc;
        img.alt = imageAlt || 'Slider image';

        // Add image to slide
        newSlide.appendChild(img);

        // Add slide to slider
        slider.appendChild(newSlide);

        // Reinitialize the slider
        initializeSlider(container, sliderIndex);
    };
});
