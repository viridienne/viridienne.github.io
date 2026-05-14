// Nav: transparent → solid on scroll
const header = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 80);
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// Scroll reveal with staggered children
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        if (el.classList.contains('reveal-child')) {
            const siblings = Array.from(el.parentElement.querySelectorAll('.reveal-child'));
            const idx = siblings.indexOf(el);
            el.style.transitionDelay = `${idx * 0.1}s`;
        }
        el.classList.add('visible');
        revealObserver.unobserve(el);
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal, .reveal-child').forEach(el => revealObserver.observe(el));

// Section heading particle VFX
function spawnHeadingParticles(heading) {
    const w = heading.offsetWidth;
    const h = heading.offsetHeight;
    const cx = w / 2;

    for (let i = 0; i < 14; i++) {
        const p = document.createElement('span');
        p.className = 'heading-particle';

        const size   = 3 + Math.random() * 4;
        const startX = cx + (Math.random() - 0.5) * Math.min(w * 0.65, 380);
        const startY = h / 2 + (Math.random() - 0.5) * h * 0.5;
        const angle  = Math.random() * 2 * Math.PI;
        const dist   = 30 + Math.random() * 70;
        const tx     = (Math.cos(angle) * dist).toFixed(1);
        const ty     = (Math.sin(angle) * dist - 15).toFixed(1);
        const dur    = (0.8 + Math.random() * 0.9).toFixed(2);
        const delay  = (Math.random() * 0.4).toFixed(2);

        p.style.width  = size + 'px';
        p.style.height = size + 'px';
        p.style.left   = startX + 'px';
        p.style.top    = startY + 'px';
        p.style.setProperty('--hp-x',     tx + 'px');
        p.style.setProperty('--hp-y',     ty + 'px');
        p.style.setProperty('--hp-dur',   dur + 's');
        p.style.setProperty('--hp-delay', delay + 's');

        heading.appendChild(p);
        setTimeout(() => p.remove(), (+dur + +delay + 0.2) * 1000);
    }
}

const headingObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        spawnHeadingParticles(el);
        const id = setInterval(() => {
            if (!document.contains(el)) { clearInterval(id); return; }
            spawnHeadingParticles(el);
        }, 2400);
        headingObserver.unobserve(el);
    });
}, { threshold: 0.2 });

document.querySelectorAll('.section-heading').forEach(h => headingObserver.observe(h));

// View All Projects toggle
function toggleAllProjects() {
    const extra = document.getElementById('projects-extra');
    const btn   = document.getElementById('view-all-btn');
    const open  = extra.classList.toggle('open');
    btn.innerHTML = open
        ? '<i class="fas fa-times"></i> Show Less'
        : '<i class="fas fa-th-large"></i> View All Projects';
    if (open) {
        extra.querySelectorAll('.reveal-child').forEach(el => {
            if (!el.classList.contains('visible')) el.classList.add('visible');
        });
    }
}

// Contact form
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });
}
