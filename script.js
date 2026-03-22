// ===========================
// Portfolio — Interactive Scripts
// ===========================

document.addEventListener('DOMContentLoaded', () => {

    // ------- Navbar Scroll Effect -------
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('.section, .hero');

    const handleScroll = () => {
        // Add scrolled class
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active nav link
        const navLinks = document.querySelectorAll('.nav-links a');
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // ------- Mobile Hamburger Menu -------
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('open');
    });

    // Close menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('open');
        });
    });

    // ------- Cursor Glow -------
    const cursorGlow = document.getElementById('cursor-glow');
    if (window.innerWidth > 768) {
        cursorGlow.style.display = 'block';
        document.addEventListener('mousemove', (e) => {
            cursorGlow.style.left = e.clientX + 'px';
            cursorGlow.style.top = e.clientY + 'px';
        });
    }

    // ------- Scroll Reveal (Intersection Observer) -------
    const revealElements = document.querySelectorAll(
        '.section-title, .about-text, .about-info-card, .skill-card, .timeline-item, ' +
        '.project-card, .cert-card, .edu-card, .activity-card, .contact-card, ' +
        '.training-block, .stats-bar .stat'
    );

    revealElements.forEach(el => {
        el.classList.add('reveal');
    });

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -60px 0px',
        threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => revealObserver.observe(el));

    // ------- Smooth Scroll for Anchor Links -------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80;
                const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // ------- Skill Cards Stagger Animation -------
    const skillCards = document.querySelectorAll('.skill-card');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    skillCards.forEach(card => skillObserver.observe(card));

    // ------- Typed Effect for Badge -------
    const badge = document.querySelector('.badge-text');
    if (badge) {
        const text = badge.textContent;
        badge.textContent = '';
        badge.style.borderRight = '2px solid var(--accent)';
        let i = 0;
        const typeInterval = setInterval(() => {
            if (i < text.length) {
                badge.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typeInterval);
                // Blinking cursor
                let cursorVisible = true;
                setInterval(() => {
                    badge.style.borderRight = cursorVisible ? '2px solid transparent' : '2px solid var(--accent)';
                    cursorVisible = !cursorVisible;
                }, 530);
            }
        }, 50);
    }

    // ------- Counter Animation for Stats -------
    const statNumbers = document.querySelectorAll('.stat-number');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const text = el.textContent;
                // Only animate if it contains a number
                const match = text.match(/^(\d+)(\+?)$/);
                if (match) {
                    const target = parseInt(match[1]);
                    const suffix = match[2] || '';
                    let count = 0;
                    const duration = 1500;
                    const step = Math.ceil(target / (duration / 30));
                    const counter = setInterval(() => {
                        count += step;
                        if (count >= target) {
                            count = target;
                            clearInterval(counter);
                        }
                        el.textContent = count + suffix;
                    }, 30);
                }
                counterObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => counterObserver.observe(el));

    // ------- Parallax on Hero Grid -------
    const heroGrid = document.querySelector('.hero-grid');
    if (heroGrid && window.innerWidth > 768) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            heroGrid.style.transform = `translateY(${scrolled * 0.3}px)`;
        }, { passive: true });
    }
});
