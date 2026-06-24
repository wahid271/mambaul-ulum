// ===== INTERSECTION OBSERVER FOR REVEAL =====
const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Optional: unobserve after animation
            // revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// ===== COUNTER ANIMATION =====
const counters = document.querySelectorAll('.stat h3, .milestone-item h3, .badge-exp h4');

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            const text = target.innerText;
            const hasPlus = text.includes('+');
            const hasPercent = text.includes('%');
            const endValue = parseInt(text.replace(/\D/g, ''));

            if (isNaN(endValue)) return;

            let count = 0;
            const duration = 2000;
            const increment = endValue / (duration / 16);

            const updateCount = () => {
                count += increment;
                if (count < endValue) {
                    target.innerText = Math.ceil(count) + (hasPlus ? '+' : '') + (hasPercent ? '%' : '');
                    requestAnimationFrame(updateCount);
                } else {
                    target.innerText = endValue + (hasPlus ? '+' : '') + (hasPercent ? '%' : '');
                }
            };

            updateCount();
            counterObserver.unobserve(target);
        }
    });
}, { threshold: 0.5 });

counters.forEach(counter => counterObserver.observe(counter));

// ===== PARALLAX EFFECT (subtle) =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBg = document.querySelector('.hero-bg');
    if (heroBg) {
        heroBg.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// ===== TILT EFFECT (cards) =====
const tiltCards = document.querySelectorAll('.feature-card, .fasilitas-card');
tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -5;
        const rotateY = ((x - centerX) / centerX) * 5;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// ===== TYPEWRITER EFFECT =====
const typeWriter = (element, text, speed = 50) => {
    let i = 0;
    element.textContent = '';
    const type = () => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    };
    type();
};

// ===== RANDOM PARTICLES (Hero) =====
const createParticles = () => {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 6 + 2}px;
            height: ${Math.random() * 6 + 2}px;
            background: rgba(255, 255, 255, ${Math.random() * 0.5 + 0.2});
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            pointer-events: none;
            animation: float ${Math.random() * 5 + 3}s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
        `;
        hero.appendChild(particle);
    }
};

// Initialize particles on load
window.addEventListener('load', createParticles);

console.log('✨ Animations initialized');
