// Mobile hamburger menu
const hamburger = document.getElementById('nav-hamburger');
const mobileMenu = document.getElementById('mobile-menu');

function openMobileMenu() {
    hamburger.setAttribute('aria-expanded', 'true');
    mobileMenu.setAttribute('aria-hidden', 'false');
    mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
}

if (hamburger) {
    hamburger.addEventListener('click', () => {
        const isOpen = hamburger.getAttribute('aria-expanded') === 'true';
        isOpen ? closeMobileMenu() : openMobileMenu();
    });
}

document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});

// Active nav link via IntersectionObserver
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav ul li a');
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(a => {
                a.classList.toggle('active', a.getAttribute('href') === `#${entry.target.id}`);
            });
        }
    });
}, { threshold: 0.35 });
sections.forEach(s => sectionObserver.observe(s));

// Nav: transparent → solid on scroll
const header = document.getElementById('navbar');
const ctaFloat = document.getElementById('cta-float');
window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 80);

    // Show floating CTA after scrolling past hero, hide when contact section is in view
    const hero = document.getElementById('home');
    const contact = document.getElementById('contact');
    const pastHero = window.scrollY > (hero ? hero.offsetHeight * 0.8 : 400);
    const atContact = contact ? contact.getBoundingClientRect().top < window.innerHeight * 0.6 : false;
    if (ctaFloat) ctaFloat.classList.toggle('visible', pastHero && !atContact);
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
            el.style.transitionDelay = `${Math.min(idx * 0.08, 0.4)}s`;
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

const headingIntervals = [];

const headingObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        spawnHeadingParticles(el);
        const id = setInterval(() => {
            if (!document.contains(el)) { clearInterval(id); return; }
            spawnHeadingParticles(el);
        }, 2400);
        headingIntervals.push(id);
        headingObserver.unobserve(el);
    });
}, { threshold: 0.2 });

document.addEventListener('visibilitychange', () => {
    if (document.hidden) headingIntervals.forEach(clearInterval);
});

document.querySelectorAll('.section-heading').forEach(h => headingObserver.observe(h));


// Project Modal
const projectData = {
    'singing-cats': {
        title: 'Duet Cats: Idle Gacha',
        image: 'https://play-lh.googleusercontent.com/eZmHx0AqsqnbvKm6uoDiigpFNGBy8x3jvp3wMdz9qXkICub-f__ednQbx01cxzlR8E5l=s248-rw',
        tags: ['Unity', 'C#', 'Music', 'Mobile'],
        desc: 'An idle gacha music game featuring adorable singing cats. Collect and evolve cats, build your band, and create harmonious melodies.',
        screenshots: [
            'assets/screens/edcg-ss/1.png',
            'assets/screens/edcg-ss/2.png',
            'assets/screens/edcg-ss/3.png',
            'assets/screens/edcg-ss/4.png',
            'assets/screens/edcg-ss/5.png',
            'assets/screens/edcg-ss/6.png',
            'assets/screens/edcg-ss/7.png',
        ],
        links: [
            { label: '<i class="fab fa-google-play"></i> Google Play', url: 'https://play.google.com/store/apps/details?id=com.echo.duetcatsgacha&hl=en', cls: 'link-play' },
            { label: '<i class="fab fa-apple"></i> App Store', url: 'https://apps.apple.com/vn/app/the-singing-cats-idle-gacha/id6742020927?l=vi', cls: 'link-apple' }
        ]
    },
    'word-music': {
        title: 'Word Music: Puzzle Melody',
        image: 'assets/word-music-icon.png',
        tags: ['Unity', 'C#', 'Music', 'Puzzle', 'Mobile'],
        desc: 'A musical word puzzle game where solving letter challenges unlocks melodic rewards. Blend vocabulary and rhythm in a unique mobile experience.',
        screenshots: [
            'assets/screens/ncwom-ss/1.webp',
            'assets/screens/ncwom-ss/2.webp',
            'assets/screens/ncwom-ss/3.webp',
        ],
        links: [
            { label: '<i class="fab fa-google-play"></i> Google Play', url: 'https://play.google.com/store/apps/details?id=com.core.wordmusic', cls: 'link-play' },
            { label: '<i class="fab fa-apple"></i> App Store', url: 'https://apps.apple.com/us/app/word-puzzle-music/id6751626442', cls: 'link-apple' }
        ]
    },
    'hexa-block': {
        title: 'Hexa Block Away: Melody Puzzle',
        image: 'assets/hexa-game-icon.png',
        tags: ['Unity', 'C#', 'Music', 'Puzzle', 'Mobile'],
        desc: 'A relaxing hexagonal block puzzle game where clearing stages unlocks musical pieces. Satisfying mechanics paired with a melodic soundtrack.',
        screenshots: [
            'assets/screens/nchm-ss/1.webp',
            'assets/screens/nchm-ss/2.webp',
            'assets/screens/nchm-ss/3.webp',
            'assets/screens/nchm-ss/4.webp',
        ],
        links: [
            { label: '<i class="fab fa-google-play"></i> Google Play', url: 'https://play.google.com/store/apps/details?id=com.ngd.hexamusic', cls: 'link-play' },
            { label: '<i class="fab fa-apple"></i> App Store', url: 'https://apps.apple.com/us/app/hexa-block-away-melody-puzzle/id6755384175', cls: 'link-apple' }
        ]
    },
    'tap-music': {
        title: 'Tap Music Gallery',
        image: 'assets/tap-music-icon.png',
        tags: ['Unity', 'C#', 'Music', 'Puzzle', 'Mobile'],
        desc: 'A tap-based music gallery game where players uncover artwork and melodies through rhythm-driven tapping challenges.',
        screenshots: [
            'assets/screens/nct-ss/1.webp',
            'assets/screens/nct-ss/2.webp',
            'assets/screens/nct-ss/3.webp',
            'assets/screens/nct-ss/4.webp',
        ],
        links: [
            { label: '<i class="fab fa-google-play"></i> Google Play', url: 'https://play.google.com/store/apps/details?id=com.ngd.tapmusic', cls: 'link-play' },
            { label: '<i class="fab fa-apple"></i> App Store', url: 'https://apps.apple.com/app/tap-music-gallery/id6752386492', cls: 'link-apple' }
        ]
    },
    'heroic-defense': {
        title: 'Heroic Defense',
        image: 'https://play-lh.googleusercontent.com/w0s401oHZno1m29gsm49Ieuj5RFyz5D5j4MqHfpzQDLlxS9RxosGk_8MpnU9-SFYkrg=w480-h960-rw',
        tags: ['Unity', 'C#', 'Tower Defense', 'Mobile'],
        desc: 'A strategic tower defense game where heroes defend against endless waves of enemies. Features hero upgrades, multiple tower types, and escalating difficulty.',
        screenshots: [
            'assets/screens/hd-ss/1.webp',
            'assets/screens/hd-ss/2.webp',
            'assets/screens/hd-ss/3.webp',
            'assets/screens/hd-ss/4.webp',
            'assets/screens/hd-ss/5.webp',
        ],
        links: [
            { label: '<i class="fab fa-google-play"></i> Google Play', url: 'https://play.google.com/store/apps/details?id=com.hd.heroic.defense&hl=en', cls: 'link-play' },
            { label: '<i class="fab fa-apple"></i> App Store', url: 'https://apps.apple.com/ca/app/heroic-defense/id6742034673?uo=2', cls: 'link-apple' }
        ]
    },
    'planet-extinction': {
        title: 'Planet Extinction',
        image: 'https://play-lh.googleusercontent.com/GRj3HvpLB3WZIJIYCIEvWRHVPxRIH0gZEwLGdU9ijAFY8rHtXr9HTGWzkOtSiJHT7hGe=w480-h960-rw',
        tags: ['Unity', 'C#', 'Arcade', 'Shooter', 'Mobile'],
        desc: 'In Planet Extinction, you are neither a hero nor a villain but a being with absolute power to destroy everything. Obliterate planets across the vastness of space—just you and the planets awaiting their inevitable destruction. Explore the beauty of the cosmos before you reduce it to cosmic dust! Features complete annihilation of every planet, an ultimate arsenal of destruction including cosmic energy, devastating lasers, and massive explosions.',
        screenshots: [
            'assets/screens/pe-ss/1.webp',
            'assets/screens/pe-ss/2.webp',
            'assets/screens/pe-ss/3.webp',
            'assets/screens/pe-ss/4.webp',
        ],
        links: [
            { label: '<i class="fab fa-google-play"></i> Google Play', url: 'https://play.google.com/store/apps/details?id=com.pex.planet.extinction&hl=en', cls: 'link-play' }
        ]
    },
    'ball-destroy': {
        title: 'Ball Destroy',
        image: 'https://play-lh.googleusercontent.com/1weDP-ODyx-k_802dQ04RkgNw1-gJQtUluZ3DMZ1_X6-1XS5L1Gz1gq-2QzYVFGxSsMO=w480-h960-rw',
        tags: ['Unity', 'C#', 'Arcade', 'Casual', 'Mobile'],
        desc: 'Command a legendary race of monsters wielding fire, wind, and lightning to defend the planet from a never-ending storm of meteors. Channel elemental fury—each breath has its own destructive power. Time your attacks perfectly to decimate meteors before they reach the earth.',
        screenshots: [
            'assets/screens/bd-ss/1.webp',
            'assets/screens/bd-ss/2.webp',
            'assets/screens/bd-ss/3.webp',
            'assets/screens/bd-ss/4.webp',
            'assets/screens/bd-ss/5.webp',
        ],
        links: [
            { label: '<i class="fab fa-google-play"></i> Google Play', url: 'https://play.google.com/store/apps/details?id=game.bb.ball.blast&hl=en', cls: 'link-play' }
        ]
    },
    'mimiland': {
        title: 'Mimiland',
        image: 'https://play-lh.googleusercontent.com/9WjvFonSvANwCmL2kYfrS7BICaMdArMtH67-YJJ03WyyLNbopOAPgBGD5pB9yB9zAq4=w480-h960-rw',
        tags: ['Unity', 'C#', 'Social Sim', 'Mobile'],
        desc: 'An MMORPG adventure combining a rich virtual world with Vietnam\'s vibrant youth community. Explore countless mini-games and community-created content, customize cosplay avatars to transform into any character you dream of, and connect with a lively social network in a colorful virtual world.',
        screenshots: [
            'assets/screens/mml-ss/1.webp',
            'assets/screens/mml-ss/2.webp',
            'assets/screens/mml-ss/3.webp',
            'assets/screens/mml-ss/4.webp',
            'assets/screens/mml-ss/5.webp',
            'assets/screens/mml-ss/6.webp',
            'assets/screens/mml-ss/7.webp',
        ],
        links: [
            { label: '<i class="fab fa-google-play"></i> Google Play', url: 'https://play.google.com/store/apps/details?id=com.games.city.mimiland&hl=vi', cls: 'link-play' },
            { label: '<i class="fab fa-apple"></i> App Store', url: 'https://apps.apple.com/vn/app/mimiland/id1660327908', cls: 'link-apple' }
        ]
    },
    'the-swordman': {
        title: 'The Swordman',
        image: 'assets/the swordman.png',
        tags: ['Unity', 'C#', '3D', 'Action', 'Combat'],
        desc: 'A 3D action combat game featuring fluid sword fighting mechanics. Players master combo chains and precise timing to defeat increasingly challenging foes.',
        screenshots: [],
        links: [
            { label: '<i class="fab fa-youtube"></i> Watch Gameplay', url: 'https://youtu.be/utRvn2S_-P8', cls: 'link-youtube' }
        ]
    },
    'the-wanderer': {
        title: 'The Wanderer',
        image: 'https://img.itch.zone/aW1hZ2UvMTQ5OTIzNC84NzM4ODExLnBuZw==/original/OMB4d0.png',
        tags: ['Unity', 'C#', '2D', 'Platformer', 'Action'],
        desc: 'A 2D action platformer with tight controls and handcrafted level design. Navigate through atmospheric environments and master movement to reach the end.',
        screenshots: [],
        links: [
            { label: '<i class="fas fa-gamepad"></i> Play on itch.io', url: 'https://viridienne.itch.io/the-wanderer', cls: 'link-itch' }
        ]
    }
};

const _modal        = document.getElementById('project-modal');
const _modalImage   = document.getElementById('modal-image');
const _modalTitle   = document.getElementById('modal-title');
const _modalDesc    = document.getElementById('modal-desc');
const _modalTags    = document.getElementById('modal-tags');
const _modalScreens = document.getElementById('modal-screenshots');
const _modalLinks   = document.getElementById('modal-links');

function openProjectModal(id) {
    const data = projectData[id];
    if (!data) return;

    _modalImage.style.backgroundImage = `url('${data.image}')`;
    _modalTitle.textContent = data.title;
    _modalDesc.textContent = data.desc;

    _modalTags.innerHTML = data.tags.map(t => `<span>${t}</span>`).join('');

    if (data.screenshots && data.screenshots.length > 0) {
        _modalScreens.innerHTML = `
            <p class="modal-screenshots-label">// Screenshots</p>
            <div class="modal-screenshots-strip">
                ${data.screenshots.map(url => `<img src="${url}" alt="${data.title} screenshot" loading="lazy">`).join('')}
            </div>`;
        _modalScreens.style.display = '';
    } else {
        _modalScreens.innerHTML = '';
        _modalScreens.style.display = 'none';
    }

    _modalLinks.innerHTML = data.links.map(l =>
        `<a href="${l.url}" target="_blank" class="${l.cls}">${l.label}</a>`
    ).join('');

    _modal.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeProjectModal(event) {
    if (event && event.target !== _modal) return;
    _modal.classList.remove('open');
    document.body.style.overflow = '';
}


document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        _modal.classList.remove('open');
        document.body.style.overflow = '';
    }
});

// Count-up animation for stat numbers
const countUpObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        const suffix = el.dataset.suffix || '';
        const duration = 1200;
        const start = performance.now();

        function tick(now) {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.round(eased * target) + suffix;
            if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        countUpObserver.unobserve(el);
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number[data-count]').forEach(el => countUpObserver.observe(el));

// Contact form
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });
}
