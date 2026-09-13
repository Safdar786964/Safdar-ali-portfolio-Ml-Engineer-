const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const navItems = Array.from(document.querySelectorAll('.nav-links a'));
const revealItems = Array.from(document.querySelectorAll('.reveal'));
const sections = Array.from(document.querySelectorAll('main section[id]'));
const filterButtons = Array.from(document.querySelectorAll('.filter-btn'));
const projectCards = Array.from(document.querySelectorAll('.project-card'));
const backToTop = document.getElementById('backToTop');
const form = document.querySelector('.contact-form');
const formStatus = document.querySelector('.form-status');
const yearNode = document.getElementById('year');
const heroParticles = document.querySelector('.hero-particles');

if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navItems.forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

if (revealItems.length) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
}

if (sections.length && navItems.length) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      const visibleEntry = entries.find((entry) => entry.isIntersecting);
      if (!visibleEntry) return;

      navItems.forEach((item) => {
        const isActive = item.getAttribute('href') === `#${visibleEntry.target.id}`;
        item.classList.toggle('active', isActive);
        item.setAttribute('aria-current', isActive ? 'page' : 'false');
      });
    },
    { threshold: 0.5 }
  );

  sections.forEach((section) => sectionObserver.observe(section));
}

if (filterButtons.length && projectCards.length) {
  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const selectedFilter = button.dataset.filter;

      filterButtons.forEach((btn) => {
        const isActive = btn === button;
        btn.classList.toggle('active', isActive);
        btn.setAttribute('aria-pressed', String(isActive));
      });

      projectCards.forEach((card) => {
        const category = card.dataset.category;
        const isVisible = selectedFilter === 'all' || category === selectedFilter;
        card.classList.toggle('is-hidden', !isVisible);
        card.setAttribute('aria-hidden', String(!isVisible));
      });
    });
  });
}

if (backToTop) {
  const toggleBackToTop = () => {
    if (window.scrollY > 450) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  };

  window.addEventListener('scroll', toggleBackToTop, { passive: true });
  toggleBackToTop();

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

if (heroParticles) {
  const particleCount = 18;

  for (let i = 0; i < particleCount; i += 1) {
    const particle = document.createElement('span');
    particle.style.setProperty('--size', `${(Math.random() * 12 + 8).toFixed(2)}px`);
    particle.style.setProperty('--left', `${(Math.random() * 100).toFixed(2)}%`);
    particle.style.setProperty('--top', `${(Math.random() * 100).toFixed(2)}%`);
    particle.style.setProperty('--delay', `${(Math.random() * 5).toFixed(2)}s`);
    particle.style.setProperty('--duration', `${(8 + Math.random() * 8).toFixed(2)}s`);
    heroParticles.appendChild(particle);
  }
}

if (form && formStatus) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const name = (formData.get('name') || '').toString().trim();
    const email = (formData.get('email') || '').toString().trim();
    const subject = (formData.get('subject') || '').toString().trim();
    const message = (formData.get('message') || '').toString().trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const errors = [];

    if (!name) {
      errors.push('Please enter your name.');
    }

    if (!email || !emailPattern.test(email)) {
      errors.push('Please enter a valid email address.');
    }

    if (!subject) {
      errors.push('Please add a subject.');
    }

    if (!message) {
      errors.push('Please write a message.');
    }

    if (errors.length) {
      formStatus.textContent = errors.join(' ');
      formStatus.style.color = '#ff9fbf';
      return;
    }

    formStatus.textContent = `Thanks, ${name}! Your message has been drafted. Replace this demo form with a real email endpoint when ready.`;
    formStatus.style.color = '#5eead4';
    form.reset();
  });
}
