/* ==========================================================================
   MATTEO MANCINI PORTFOLIO - INTERACTIVE JAVASCRIPT LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* ----------------------------------------------------------------------
       1. DYNAMIC TYPING EFFECT FOR HERO SUBTITLE
       ---------------------------------------------------------------------- */
    const typingElement = document.getElementById('typing-text');
    const roles = [
        "AI & Machine Learning Developer",
        "Data Analyst",
        "Data Scientist"
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 70;
    const deletingSpeed = 40;
    const delayBetweenRoles = 2000;

    function typeEffect() {
        if (!typingElement) return;

        const currentRole = roles[roleIndex];

        if (isDeleting) {
            typingElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        let currentSpeed = isDeleting ? deletingSpeed : typingSpeed;

        if (!isDeleting && charIndex === currentRole.length) {
            currentSpeed = delayBetweenRoles;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            currentSpeed = 300;
        }

        setTimeout(typeEffect, currentSpeed);
    }

    typeEffect();


    /* ----------------------------------------------------------------------
       2. PROJECT CATEGORY FILTERING LOGIC
       ---------------------------------------------------------------------- */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');

                if (filterValue === 'all' || filterValue === category) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });


    /* ----------------------------------------------------------------------
       3. ANIMATED NUMBER COUNTERS FOR HERO STATS
       ---------------------------------------------------------------------- */
    const statNumbers = document.querySelectorAll('.stat-num');
    let animated = false;

    function animateCounters() {
        if (animated) return;

        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'), 10);
            let current = 0;
            const increment = target / 40;

            const updateCount = () => {
                current += increment;
                if (current < target) {
                    stat.textContent = Math.ceil(current);
                    setTimeout(updateCount, 30);
                } else {
                    stat.textContent = target;
                }
            };

            updateCount();
        });

        animated = true;
    }

    const heroSection = document.getElementById('hero');
    if (heroSection) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                animateCounters();
            }
        }, { threshold: 0.5 });

        observer.observe(heroSection);
    }


    /* ----------------------------------------------------------------------
       4. MOBILE NAVIGATION TOGGLE
       ---------------------------------------------------------------------- */
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
                document.body.style.overflow = 'hidden';
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
                document.body.style.overflow = '';
            }
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
                const icon = mobileToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }


    /* ----------------------------------------------------------------------
       5. HEADER STICKY GLASS EFFECT ON SCROLL
       ---------------------------------------------------------------------- */
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
            header.style.background = 'rgba(7, 9, 14, 0.9)';
        } else {
            header.style.boxShadow = 'none';
            header.style.background = 'rgba(7, 9, 14, 0.75)';
        }
    });


    /* ----------------------------------------------------------------------
       6. DIRECT MAILTO CONTACT FORM HANDLER
       ---------------------------------------------------------------------- */
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('form-name').value;
            const email = document.getElementById('form-email').value;
            const message = document.getElementById('form-message').value;

            const subject = encodeURIComponent(`Messaggio da Portfolio Web - ${name}`);
            const body = encodeURIComponent(`Nome: ${name}\nEmail: ${email}\n\nMessaggio:\n${message}`);

            window.location.href = `mailto:matteo.mancini0619@gmail.com?subject=${subject}&body=${body}`;
        });
    }


    /* ----------------------------------------------------------------------
       7. INTERACTIVE CV MODAL PREVIEWER LOGIC
       ---------------------------------------------------------------------- */
    const cvTriggers = document.querySelectorAll('.btn-cv-trigger, #btn-hero-cv, #nav-link-cv');
    const cvModalOverlay = document.getElementById('cv-modal-overlay');
    const cvModalClose = document.getElementById('cv-modal-close');

    if (cvModalOverlay) {
        cvTriggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                cvModalOverlay.classList.add('active');
                cvModalOverlay.setAttribute('aria-hidden', 'false');
                document.body.style.overflow = 'hidden';
            });
        });

        const closeModal = () => {
            cvModalOverlay.classList.remove('active');
            cvModalOverlay.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        };

        if (cvModalClose) {
            cvModalClose.addEventListener('click', closeModal);
        }

        cvModalOverlay.addEventListener('click', (e) => {
            if (e.target === cvModalOverlay) {
                closeModal();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && cvModalOverlay.classList.contains('active')) {
                closeModal();
            }
        });
    }

});
