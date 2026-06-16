// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
    });
}

// Close mobile menu when a link is clicked
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu) {
            navMenu.style.display = 'none';
        }
    });
});

// Smooth scroll to section
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Navbar background on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 14, 39, 0.95)';
    } else {
        navbar.style.background = 'rgba(10, 14, 39, 0.8)';
    }
});

// Contact Form Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const formData = new FormData(contactForm);
        
        // You can send this to your backend or email service
        console.log('Form submitted:', {
            name: contactForm.querySelector('input[type="text"]').value,
            email: contactForm.querySelector('input[type="email"]').value,
            subject: contactForm.querySelectorAll('input')[2].value,
            message: contactForm.querySelector('textarea').value
        });
        
        // Show success message
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Message Sent! ✓';
        submitBtn.style.background = 'linear-gradient(135deg, #2ecc71, #27ae60)';
        
        // Reset form
        contactForm.reset();
        
        // Restore button after 3 seconds
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.background = '';
        }, 3000);
    });
}

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements on scroll
document.querySelectorAll('.project-card, .skill-category, .timeline-content').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrolled = window.scrollY;
        hero.style.backgroundPosition = `0 ${scrolled * 0.5}px`;
    }
});

// Animate numbers in stats section
function animateNumbers() {
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const target = parseInt(stat.textContent);
        let count = 0;
        const increment = target / 100;
        
        const timer = setInterval(() => {
            count += increment;
            if (count >= target) {
                stat.textContent = target + '+';
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(count) + '+';
            }
        }, 30);
    });
}

// Trigger number animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateNumbers();
            statsObserver.unobserve(entry.target);
        }
    });
});

const aboutSection = document.querySelector('.about-stats');
if (aboutSection) {
    statsObserver.observe(aboutSection);
}

// Dynamic background animation
function createBackgroundAnimation() {
    const canvas = document.createElement("canvas");
    canvas.id = "background-canvas";
    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.pointerEvents = "none";
    canvas.style.zIndex = "-1";

    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resize();
    window.addEventListener("resize", resize);

    let target = {
        x: canvas.width / 2,
        y: canvas.height / 2,
        size: 40
    };

    let destination = {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height
    };

    let pulse = 0;

    function newDestination() {
        destination.x = Math.random() * canvas.width;
        destination.y = Math.random() * canvas.height;
        pulse = 30;
    }

    function drawLines() {
        ctx.strokeStyle = "rgba(0, 255, 200, 0.5)";
        ctx.lineWidth = 1;

        // top
        ctx.beginPath();
        ctx.moveTo(target.x, 0);
        ctx.lineTo(target.x, target.y - target.size);
        ctx.stroke();

        // bottom
        ctx.beginPath();
        ctx.moveTo(target.x, canvas.height);
        ctx.lineTo(target.x, target.y + target.size);
        ctx.stroke();

        // left
        ctx.beginPath();
        ctx.moveTo(0, target.y);
        ctx.lineTo(target.x - target.size, target.y);
        ctx.stroke();

        // right
        ctx.beginPath();
        ctx.moveTo(canvas.width, target.y);
        ctx.lineTo(target.x + target.size, target.y);
        ctx.stroke();
    }

    function drawTarget() {
        ctx.strokeStyle = "#00ffc8";
        ctx.lineWidth = 2;
        ctx.shadowBlur = 15;
        ctx.shadowColor = "#00ffc8";

        ctx.strokeRect(
            target.x - target.size,
            target.y - target.size,
            target.size * 2,
            target.size * 2
        );

        // center dot
        ctx.fillStyle = "#00ffc8";
        ctx.beginPath();
        ctx.arc(target.x, target.y, 3, 0, Math.PI * 2);
        ctx.fill();

        ctx.shadowBlur = 0;
    }

    function drawPulse() {
        if (pulse <= 0) return;

        ctx.strokeStyle = `rgba(0,255,200,${pulse / 30})`;
        ctx.lineWidth = 2;

        ctx.beginPath();
        ctx.arc(
            target.x,
            target.y,
            60 - pulse,
            0,
            Math.PI * 2
        );
        ctx.stroke();

        pulse--;
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Smooth movement
        target.x += (destination.x - target.x) * 0.03;
        target.y += (destination.y - target.y) * 0.03;

        const dx = destination.x - target.x;
        const dy = destination.y - target.y;

        if (Math.sqrt(dx * dx + dy * dy) < 5) {
            newDestination();
        }

        drawLines();
        drawTarget();
        drawPulse();

        requestAnimationFrame(animate);
    }

    animate();
}

// Initialize background animation on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createBackgroundAnimation);
} else {
    createBackgroundAnimation();
}

// Add cursor glow effect
document.addEventListener('mousemove', (e) => {
    const cursor = document.querySelector('body');
    cursor.style.setProperty('--mouse-x', `${e.clientX}px`);
    cursor.style.setProperty('--mouse-y', `${e.clientY}px`);
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') {
        const nextSection = document.querySelector('section:in-viewport');
        if (nextSection && nextSection.nextElementSibling) {
            nextSection.nextElementSibling.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// Add smooth scroll behavior for all internal links
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

// Log page load time
window.addEventListener('load', () => {
    if (performance.timing) {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`Page loaded in ${loadTime}ms`);
    }
});

/* Intro overlay control: show on first load in this session */
(function () {
    const overlay = document.getElementById('intro-overlay');
    if (!overlay) return;

    const played = sessionStorage.getItem('introPlayed');
    if (played) {
        // Hide immediately if already played this session
        overlay.classList.add('intro-hidden');
        overlay.setAttribute('aria-hidden', 'true');
        setTimeout(() => overlay.remove(), 900);
        return;
    }

    // After a short duration, dismiss the intro
    function dismissIntro() {
        overlay.classList.add('intro-hidden');
        overlay.setAttribute('aria-hidden', 'true');
        // remove the element after transition
        setTimeout(() => {
            try { overlay.remove(); } catch (e) {}
        }, 900);
        sessionStorage.setItem('introPlayed', '1');
    }

    // Dismiss after animation completes (allow time for bars/ring) — ~5s
    window.addEventListener('load', () => {
        setTimeout(dismissIntro, 5000);
    });

    // Allow skipping the intro via click or key press
    overlay.addEventListener('click', dismissIntro);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') dismissIntro();
    });
})();
