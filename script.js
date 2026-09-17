/**
 * PulseTrack Landing Page Interactive Engine
 * Handles navigation states, mobile menu drawer, scroll animations,
 * interactive pricing toggle, interactive demo modal, and live telemetry simulation.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Navbar Dynamic Blur & Opacity on Scroll
  const navbar = document.getElementById('navbar');
  const handleScroll = () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // 2. Mobile Menu Toggle Drawer
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link, .mobile-actions a');

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.contains('open');
      if (isOpen) {
        mobileMenu.classList.remove('open');
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      } else {
        mobileMenu.classList.add('open');
        mobileToggle.classList.add('active');
        mobileToggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
      }
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // 3. Scroll Reveal Animation via Intersection Observer
  const revealElements = document.querySelectorAll('.reveal-fade');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback for older browsers
    revealElements.forEach(el => el.classList.add('visible'));
  }

  // 4. Interactive Pricing Toggle (Monthly vs Annual)
  const billingSwitch = document.getElementById('billing-switch');
  const monthlyLabel = document.getElementById('monthly-label');
  const annualLabel = document.getElementById('annual-label');
  const priceAmounts = document.querySelectorAll('.tier-price .amount');

  if (billingSwitch) {
    let isAnnual = true;
    billingSwitch.classList.add('active'); // Default to annual discount

    billingSwitch.addEventListener('click', () => {
      isAnnual = !isAnnual;
      billingSwitch.classList.toggle('active', isAnnual);
      billingSwitch.setAttribute('aria-checked', isAnnual.toString());

      if (isAnnual) {
        annualLabel.classList.add('active');
        monthlyLabel.classList.remove('active');
      } else {
        annualLabel.classList.remove('active');
        monthlyLabel.classList.add('active');
      }

      // Update price values with subtle scale animation
      priceAmounts.forEach(priceEl => {
        const targetVal = isAnnual ? priceEl.dataset.annual : priceEl.dataset.monthly;
        if (targetVal) {
          priceEl.style.transform = 'scale(0.85)';
          priceEl.style.opacity = '0.5';
          setTimeout(() => {
            priceEl.textContent = targetVal;
            priceEl.style.transform = 'scale(1)';
            priceEl.style.opacity = '1';
          }, 150);
        }
      });
    });
  }

  // 5. Interactive Demo Modal
  const demoTrigger = document.getElementById('hero-demo-trigger');
  const demoModal = document.getElementById('demo-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalStartBtn = document.getElementById('modal-start-btn');

  const openDemoModal = () => {
    if (demoModal) {
      demoModal.classList.add('active');
      demoModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  };

  const closeDemoModal = () => {
    if (demoModal) {
      demoModal.classList.remove('active');
      demoModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  };

  if (demoTrigger) {
    demoTrigger.addEventListener('click', (e) => {
      e.preventDefault();
      openDemoModal();
    });
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeDemoModal);
  if (modalStartBtn) modalStartBtn.addEventListener('click', closeDemoModal);

  if (demoModal) {
    demoModal.addEventListener('click', (e) => {
      if (e.target === demoModal) closeDemoModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && demoModal && demoModal.classList.contains('active')) {
      closeDemoModal();
    }
  });

  // 6. Interactive Dashboard Simulation (Dynamic Bar Chart Hover & Pulse)
  const chartBars = document.querySelectorAll('.bar-col');
  chartBars.forEach(col => {
    col.addEventListener('mouseenter', () => {
      const fill = col.querySelector('.bar-fill-cyan');
      if (fill) fill.style.background = 'linear-gradient(to top, #22D3EE, #3B82F6)';
    });
    col.addEventListener('mouseleave', () => {
      const fill = col.querySelector('.bar-fill-cyan');
      if (fill) fill.style.background = 'linear-gradient(to top, rgba(34, 211, 238, 0.3), rgba(34, 211, 238, 0.8))';
    });
  });

  // 7. Interactive Dashboard Sidebar items active state switch
  const dashNavItems = document.querySelectorAll('.dash-nav-item');
  dashNavItems.forEach(item => {
    item.addEventListener('click', () => {
      dashNavItems.forEach(n => n.classList.remove('active'));
      item.classList.add('active');
    });
  });
});
