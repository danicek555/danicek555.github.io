// Navbar animation on scroll
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scroll function with custom duration
function smoothScroll(target, duration) {
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    // Easing function for smoother animation
    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}

// Single event listener for all internal links
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            smoothScroll(targetSection, 900); // 2 seconds duration
            
            // Update URL without jumping
            history.pushState(null, null, targetId);
        }
    });
});

// Tooltip functionality
const tooltipTexts = [
    "I worked on this project 3 months! It was my first project with javascript and css.",
    "I learned a lot of new things for example: how to animate the hearts, how to combinate javascript and css to create a smooth animation.",
    "Want to know more? Feel free to ask!",
    "It was for my girlfriend, so I put a lot of effort into it. I was very happy when she liked it. BTW we are still together!"
];

function updateTooltipText() {
    const tooltipText = document.querySelector('.tooltip-text');
    if (tooltipText) {
        const randomIndex = Math.floor(Math.random() * tooltipTexts.length);
        tooltipText.textContent = tooltipTexts[randomIndex];
    }
}

// Update text when hovering over the question mark
const tooltipContainer = document.querySelector('.tooltip-container');
if (tooltipContainer) {
    tooltipContainer.addEventListener('mouseenter', updateTooltipText);
}


