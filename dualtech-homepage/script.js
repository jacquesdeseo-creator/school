document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (hamburger.classList.contains('active')) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    });

    // 2. Sticky Navbar on Scroll
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const revealPoint = 100;

        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('revealed');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger initially

    // 4. Parallax Effect for Images (Image Tilt)
    const tiltElements = document.querySelectorAll('.image-tilt');
    
    tiltElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const height = element.clientHeight;
            const width = element.clientWidth;
            const xVal = e.layerX;
            const yVal = e.layerY;
            
            const multiplier = 20; // How extreme the tilt is
            
            const yRotation = multiplier * ((xVal - width / 2) / width);
            const xRotation = -multiplier * ((yVal - height / 2) / height);
            
            const transformString = `perspective(1000px) scale(1.02) rotateX(${xRotation}deg) rotateY(${yRotation}deg)`;
            element.style.transform = transformString;
        });
        
        element.addEventListener('mouseout', () => {
            element.style.transform = 'perspective(1000px) scale(1) rotateX(0deg) rotateY(0deg)';
        });
    });

    // 5. Counter Animation
    const counters = document.querySelectorAll('.counter');
    let hasCounted = false;

    const runCounters = () => {
        counters.forEach(counter => {
            counter.innerText = '0';
            const target = +counter.getAttribute('data-target');
            // Adjust speed factor based on how high the target is
            const increment = target / 50; 
            
            const updateCounter = () => {
                const current = +counter.innerText;
                
                if (current < target) {
                    counter.innerText = `${Math.ceil(current + increment)}`;
                    setTimeout(updateCounter, 30);
                } else {
                    counter.innerText = target;
                }
            };
            
            updateCounter();
        });
        hasCounted = true;
    };

    // Use Intersection Observer for counters
    const statsSection = document.querySelector('.stats-container');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !hasCounted) {
                runCounters();
            }
        }, { threshold: 0.5 });
        
        observer.observe(statsSection);
    }
});
