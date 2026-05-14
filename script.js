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


// Project Modal
const projectData = {
    'singing-cats': {
        title: 'The Singing Cats',
        image: 'https://play-lh.googleusercontent.com/eZmHx0AqsqnbvKm6uoDiigpFNGBy8x3jvp3wMdz9qXkICub-f__ednQbx01cxzlR8E5l=s248-rw',
        tags: ['Unity', 'C#', 'Music', 'Mobile'],
        desc: 'An idle gacha music game featuring adorable singing cats. Collect and evolve cats, build your band, and create harmonious melodies.',
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
        links: [
            { label: '<i class="fab fa-google-play"></i> Google Play', url: 'https://play.google.com/store/apps/details?id=com.hd.heroic.defense&hl=en', cls: 'link-play' },
            { label: '<i class="fab fa-apple"></i> App Store', url: 'https://apps.apple.com/ca/app/heroic-defense/id6742034673?uo=2', cls: 'link-apple' }
        ]
    },
    'planet-extinction': {
        title: 'Planet Extinction',
        image: 'https://play-lh.googleusercontent.com/GRj3HvpLB3WZIJIYCIEvWRHVPxRIH0gZEwLGdU9ijAFY8rHtXr9HTGWzkOtSiJHT7hGe=w480-h960-rw',
        tags: ['Unity', 'C#', 'Arcade', 'Shooter', 'Mobile'],
        desc: 'A fast-paced arcade shooter where players pilot a spacecraft to defend planets from alien extinction events. Survive waves of enemies across the galaxy.',
        links: [
            { label: '<i class="fab fa-google-play"></i> Google Play', url: 'https://play.google.com/store/apps/details?id=com.pex.planet.extinction&hl=en', cls: 'link-play' }
        ]
    },
    'ball-destroy': {
        title: 'Ball Destroy',
        image: 'https://play-lh.googleusercontent.com/1weDP-ODyx-k_802dQ04RkgNw1-gJQtUluZ3DMZ1_X6-1XS5L1Gz1gq-2QzYVFGxSsMO=w480-h960-rw',
        tags: ['Unity', 'C#', 'Arcade', 'Casual', 'Mobile'],
        desc: 'A satisfying casual arcade game where players launch balls to smash and destroy blocks. Simple controls with progressively challenging level designs.',
        links: [
            { label: '<i class="fab fa-google-play"></i> Google Play', url: 'https://play.google.com/store/apps/details?id=game.bb.ball.blast&hl=en', cls: 'link-play' }
        ]
    },
    'mimiland': {
        title: 'Mimiland',
        image: 'https://play-lh.googleusercontent.com/9WjvFonSvANwCmL2kYfrS7BICaMdArMtH67-YJJ03WyyLNbopOAPgBGD5pB9yB9zAq4=w480-h960-rw',
        tags: ['Unity', 'C#', 'Social Sim', 'Mobile'],
        desc: 'A vibrant social simulation game where players build and decorate their own virtual city, interact with neighbors, and grow a thriving community.',
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
        links: [
            { label: '<i class="fab fa-youtube"></i> Watch Gameplay', url: 'https://youtu.be/utRvn2S_-P8', cls: 'link-youtube' }
        ]
    },
    'the-wanderer': {
        title: 'The Wanderer',
        image: 'https://img.itch.zone/aW1hZ2UvMTQ5OTIzNC84NzM4ODExLnBuZw==/original/OMB4d0.png',
        tags: ['Unity', 'C#', '2D', 'Platformer', 'Action'],
        desc: 'A 2D action platformer with tight controls and handcrafted level design. Navigate through atmospheric environments and master movement to reach the end.',
        links: [
            { label: '<i class="fas fa-gamepad"></i> Play on itch.io', url: 'https://viridienne.itch.io/the-wanderer', cls: 'link-itch' }
        ]
    }
};

function openProjectModal(id) {
    const data = projectData[id];
    if (!data) return;

    document.getElementById('modal-image').style.backgroundImage = `url('${data.image}')`;
    document.getElementById('modal-title').textContent = data.title;
    document.getElementById('modal-desc').textContent = data.desc;

    const tagsEl = document.getElementById('modal-tags');
    tagsEl.innerHTML = data.tags.map(t => `<span>${t}</span>`).join('');

    const linksEl = document.getElementById('modal-links');
    linksEl.innerHTML = data.links.map(l =>
        `<a href="${l.url}" target="_blank" class="${l.cls}">${l.label}</a>`
    ).join('');

    document.getElementById('project-modal').classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeProjectModal(event) {
    if (event && event.target !== document.getElementById('project-modal')) return;
    document.getElementById('project-modal').classList.remove('open');
    document.body.style.overflow = '';
}


document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.getElementById('project-modal').classList.remove('open');
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
