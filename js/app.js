const STORAGE_THEME = 'gentleman-theme';
const STORAGE_DIR = 'gentleman-dir';

const setupAnimations = () => {
  const revealItems = document.querySelectorAll('.reveal');
  if (!revealItems.length) return;

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealItems.forEach((item) => observer.observe(item));
    return;
  }

  revealItems.forEach((item) => item.classList.add('visible'));
};

const setupAutoMotion = () => {
  const hero = document.querySelector('.hero');
  const heroBg = document.querySelector('.hero-bg');

  if (hero && heroBg) {
    hero.addEventListener('pointermove', (event) => {
      const rect = hero.getBoundingClientRect();
      const offsetX = ((event.clientX - rect.left) / rect.width - 0.5) * 18;
      const offsetY = ((event.clientY - rect.top) / rect.height - 0.5) * 16;
      heroBg.style.transform = `scale(1.08) translate(${offsetX}px, ${offsetY}px)`;
    });

    hero.addEventListener('pointerleave', () => {
      heroBg.style.transform = 'scale(1.02) translate(0, 0)';
    });
  }

  document.querySelectorAll('[data-tilt]').forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      const rotateY = (x - 0.5) * 8;
      const rotateX = (0.5 - y) * 8;
      card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener('pointerleave', () => {
      card.style.transform = '';
    });
  });
};

const setupDriveExperience = () => {
  const display = document.querySelector('.drive-display');
  const modeButtons = document.querySelectorAll('[data-drive-mode]');
  if (!display || !modeButtons.length) return;

  const modes = {
    grand: {
      title: 'The Executive',
      index: 'SUIT / 01',
      copy: 'Composed tailoring for the daily arrival. A clean shoulder, balanced waist, and versatile cloth create a confident suit that works from first meeting to last call.',
      fit: 'Refined',
      detail: 'Half-canvas',
      tone: 'Business'
    },
    sport: {
      title: 'The Occasion',
      index: 'SUIT / 02',
      copy: 'A sharper profile for the moments that deserve a little more. Choose a statement lapel, distinctive cloth, and elegant finishing for weddings and evenings.',
      fit: 'Defined',
      detail: 'Structured',
      tone: 'Formal'
    },
    atelier: {
      title: 'The Bespoke',
      index: 'SUIT / 03',
      copy: 'A one-of-one commission built from your measurements and preferences, from hand-selected cloth and lining to final fitting and finishing.',
      fit: 'Personal',
      detail: 'Made-to-measure',
      tone: 'Individual'
    }
  };

  modeButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const mode = modes[button.dataset.driveMode];
      if (!mode) return;

      modeButtons.forEach((item) => {
        const selected = item === button;
        item.classList.toggle('active', selected);
        item.setAttribute('aria-pressed', String(selected));
      });

      display.dataset.driveDisplay = button.dataset.driveMode;
      display.querySelector('[data-drive-title]').textContent = mode.title;
      display.querySelector('[data-drive-copy]').textContent = mode.copy;
      display.querySelector('.drive-index').textContent = mode.index;
      display.querySelector('[data-drive-fit]').textContent = mode.fit;
      display.querySelector('[data-drive-detail]').textContent = mode.detail;
      display.querySelector('[data-drive-tone]').textContent = mode.tone;
    });
  });
};

const setTheme = (mode) => {
  const root = document.documentElement;
  if (!root) return;
  root.setAttribute('data-theme', mode);
  const toggles = document.querySelectorAll('[data-theme-toggle]');
  toggles.forEach((btn) => {
    const icon = btn.querySelector('.theme-icon');
    if (icon) icon.textContent = mode === 'dark' ? '☀' : '☾';
    btn.setAttribute('aria-label', mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  });
  localStorage.setItem(STORAGE_THEME, mode);
};

const setDirection = (dir) => {
  document.documentElement.setAttribute('dir', dir);
  document.body.setAttribute('dir', dir);
  localStorage.setItem(STORAGE_DIR, dir);
};

const setupTheme = () => {
  const savedTheme = localStorage.getItem(STORAGE_THEME) || 'light';
  const savedDir = localStorage.getItem(STORAGE_DIR) || 'ltr';
  setTheme(savedTheme);
  setDirection(savedDir);

  document.querySelectorAll('[data-theme-toggle]').forEach((button) => {
    button.addEventListener('click', () => {
      const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      setTheme(next);
    });
  });

  document.querySelectorAll('[data-rtl-toggle]').forEach((button) => {
    button.addEventListener('click', () => {
      const next = document.documentElement.getAttribute('dir') === 'rtl' ? 'ltr' : 'rtl';
      setDirection(next);
    });
  });
};

const setupNav = () => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav-links');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('open');
    });
  }

  document.querySelectorAll('.nav-links a').forEach((link) => {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
};

const setupFaq = () => {
  document.querySelectorAll('.faq-item').forEach((item) => {
    const button = item.querySelector('.faq-question');
    if (!button) return;

    button.addEventListener('click', () => {
      item.classList.toggle('open');
    });
  });
};

const setupReveal = () => {
  const items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    items.forEach((item) => item.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  items.forEach((item) => observer.observe(item));
};

const setupLazyBackgrounds = () => {
  const items = document.querySelectorAll('[data-background-image]');
  const loadBackground = (item) => {
    item.style.backgroundImage = `url("${item.dataset.backgroundImage}")`;
    item.removeAttribute('data-background-image');
  };

  if (!('IntersectionObserver' in window)) {
    items.forEach(loadBackground);
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        loadBackground(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: '250px 0px' });

  items.forEach((item) => observer.observe(item));
};

const showToast = (message, type = 'success') => {
  const region = document.getElementById('toast-region');
  if (!region) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  region.appendChild(toast);
  setTimeout(() => toast.remove(), 2600);
};

const setupGallery = () => {
  const lightbox = document.querySelector('.lightbox');
  const lightboxImage = document.querySelector('.lightbox img');
  const closeBtn = document.querySelector('.lightbox button');

  document.querySelectorAll('[data-gallery-image]').forEach((button) => {
    button.addEventListener('click', () => {
      if (!lightbox || !lightboxImage) return;
      lightboxImage.src = button.dataset.galleryImage;
      lightbox.classList.add('open');
    });
  });

  if (closeBtn && lightbox) {
    closeBtn.addEventListener('click', () => lightbox.classList.remove('open'));
  }

  if (lightbox) {
    lightbox.addEventListener('click', (event) => {
      if (event.target === lightbox) lightbox.classList.remove('open');
    });
  }
};

const setupForms = () => {
  const forms = document.querySelectorAll('form[data-validate]');
  forms.forEach((form) => {
    form.addEventListener('submit', (event) => {
      const invalid = form.querySelector(':invalid');
      if (invalid) {
        event.preventDefault();
        invalid.focus();
        showToast('Please complete all required fields.', 'error');
        return;
      }
      event.preventDefault();
      showToast('Your request has been saved successfully.', 'success');
    });
  });
};

const setupMeasurement = () => {
  const unitButtons = document.querySelectorAll('[data-unit]');
  const measurementFields = document.querySelectorAll('[data-measurement]');
  if (!unitButtons.length || !measurementFields.length) return;

  const updateUnit = (unit) => {
    const suffix = unit === 'in' ? 'in' : 'cm';
    measurementFields.forEach((field) => {
      const labelText = field.dataset.measurement;
      field.textContent = `${labelText}: ${suffix}`;
    });
  };

  unitButtons.forEach((button) => {
    button.addEventListener('click', () => {
      unitButtons.forEach((btn) => btn.classList.toggle('active', btn === button));
      updateUnit(button.dataset.unit);
    });
  });

  const form = document.querySelector('#measurement-form');
  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      showToast('Measurement profile saved.', 'success');
    });
  }
};

const setupSuitDesigner = () => {
  const preview = document.querySelector('.designer-jacket');
  const fabricSelect = document.getElementById('suit-fabric');
  const colorSelect = document.getElementById('suit-color');
  const lapelSelect = document.getElementById('lapel-style');
  const buttonsSelect = document.getElementById('button-count');

  if (!preview) return;

  const applyDesign = () => {
    const color = colorSelect?.value || '#203148';
    const fabric = fabricSelect?.value || 'wool';
    const lapel = lapelSelect?.value || 'notch';
    const buttonCount = Number(buttonsSelect?.value || 2);

    preview.style.background = color;
    preview.style.filter = fabric === 'wool' ? 'saturate(1.1)' : fabric === 'linen' ? 'saturate(0.9)' : 'saturate(1.15)';
    preview.style.transform = fabric === 'linen' ? 'rotate(-2deg)' : 'rotate(0deg)';

    const lapels = preview.parentElement.querySelectorAll('.designer-lapel');
    lapels.forEach((el) => {
      el.style.opacity = lapel === 'shawl' ? '0.9' : '0.45';
      el.style.clipPath = lapel === 'peak' ? 'polygon(0 0,50% 24%,16% 100%)' : lapel === 'shawl' ? 'polygon(0 0,50% 35%,15% 100%)' : 'polygon(0 0,50% 24%,15% 100%)';
      el.style.transform = lapel === 'peak' ? 'scale(1.05)' : 'scale(1)';
    });

    const buttonNode = preview.parentElement.querySelector('.designer-button');
    if (buttonNode) {
      buttonNode.style.boxShadow = Array.from({ length: buttonCount }, (_, index) => `0 ${index * 34}px 0 var(--gold)`).join(',');
    }
  };

  [fabricSelect, colorSelect, lapelSelect, buttonsSelect].forEach((control) => {
    if (control) control.addEventListener('input', applyDesign);
    if (control) control.addEventListener('change', applyDesign);
  });

  const resetButton = document.getElementById('reset-design');
  if (resetButton) {
    resetButton.addEventListener('click', () => {
      if (colorSelect) colorSelect.value = '#203148';
      if (fabricSelect) fabricSelect.value = 'wool';
      if (lapelSelect) lapelSelect.value = 'notch';
      if (buttonsSelect) buttonsSelect.value = '2';
      applyDesign();
      showToast('Design reset.', 'success');
    });
  }

  const saveButton = document.getElementById('save-design');
  if (saveButton) {
    saveButton.addEventListener('click', () => showToast('Design saved to your account.', 'success'));
  }

  const continueButton = document.getElementById('continue-booking');
  if (continueButton) {
    continueButton.addEventListener('click', () => {
      window.location.href = 'measurements.html';
    });
  }

  applyDesign();
};

document.addEventListener('DOMContentLoaded', () => {
  setupTheme();
  setupNav();
  setupFaq();
  setupReveal();
  setupLazyBackgrounds();
  setupGallery();
  setupForms();
  setupMeasurement();
  setupSuitDesigner();
  setupAutoMotion();
  setupDriveExperience();
  setupAnimations();
});
