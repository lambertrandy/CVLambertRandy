// Typing animation for hero code window
const codeLines = [
  "class ProjectManager {",
  "  constructor() {",
  "    this.skills = ['JavaScript', 'React', 'Node.js'];",
  "    this.experience = '10+ years';",
  "    this.approach = 'technical + strategic';",
  "  }",
  "",
  "  deliverProject(requirements) {",
  "    const plan = this.createRoadmap(requirements);",
  "    const team = this.assembleTeam(plan.scope);",
  "    ",
  "    return this.execute({",
  "      timeline: plan.milestones,",
  "      quality: 'enterprise-grade',",
  "      communication: 'transparent',",
  "      delivery: 'on-time, on-budget'",
  "    });",
  "  }",
  "",
  "  createRoadmap(requirements) {",
  "    return {",
  "      architecture: this.designSystem(requirements),",
  "      milestones: this.planSprints(requirements),",
  "      risks: this.assessChallenges(requirements),",
  "      success: this.defineMetrics(requirements)",
  "    };",
  "  }",
  "}"
];

let currentLine = 0;
let currentChar = 0;
let isTyping = true;

function typeCode() {
  const codeElement = document.getElementById('typing-code');
  if (!codeElement) return;

  if (currentLine < codeLines.length) {
    const line = codeLines[currentLine];
    
    if (currentChar < line.length) {
      codeElement.textContent += line[currentChar];
      currentChar++;
      setTimeout(typeCode, Math.random() * 50 + 30);
    } else {
      codeElement.textContent += '\n';
      currentLine++;
      currentChar = 0;
      setTimeout(typeCode, 200);
    }
  } else {
    // Restart animation after a pause
    setTimeout(() => {
      codeElement.textContent = '';
      currentLine = 0;
      currentChar = 0;
      typeCode();
    }, 3000);
  }
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
        
        // Update active nav link
        navLinks.forEach(nl => nl.classList.remove('active'));
        link.classList.add('active');
      }
    });
  });
}

// Intersection Observer for animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        
        // Animate skill bars
        if (entry.target.classList.contains('skill-progress')) {
          const progress = entry.target.getAttribute('data-progress');
          setTimeout(() => {
            entry.target.style.width = progress + '%';
          }, 200);
        }
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .skill-progress');
  animatedElements.forEach(el => observer.observe(el));
}

// Active navigation highlighting based on scroll position
function initActiveNavigation() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function updateActiveNav() {
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav);
}

// Mobile menu toggle
function initMobileMenu() {
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-open');
      mobileToggle.classList.toggle('active');
    });
  }
}

// Contact form handling
function initContactForm() {
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData);
      
      // Simulate form submission
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;
      
      setTimeout(() => {
        alert('Thank you for your message! I\'ll get back to you soon.');
        contactForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 1500);
    });
  }
}

// Navbar background on scroll
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  
  function updateNavbar() {
    if (window.scrollY > 50) {
      navbar.style.background = 'rgba(255, 255, 255, 0.98)';
      navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
      navbar.style.background = 'rgba(255, 255, 255, 0.95)';
      navbar.style.boxShadow = 'none';
    }
  }
  
  window.addEventListener('scroll', updateNavbar);
}

// Add animation classes to elements
function addAnimationClasses() {
  // Add fade-in class to various elements
  const fadeElements = document.querySelectorAll('.section-title, .project-card, .timeline-item');
  fadeElements.forEach(el => el.classList.add('fade-in'));
  
  // Add slide-in classes
  const leftElements = document.querySelectorAll('.about-text, .contact-info');
  leftElements.forEach(el => el.classList.add('slide-in-left'));
  
  const rightElements = document.querySelectorAll('.about-image, .contact-form');
  rightElements.forEach(el => el.classList.add('slide-in-right'));
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Start typing animation
  setTimeout(typeCode, 1000);
  
  // Initialize all features
  initSmoothScrolling();
  initActiveNavigation();
  initMobileMenu();
  initContactForm();
  initNavbarScroll();
  addAnimationClasses();
  
  // Initialize scroll animations after a brief delay
  setTimeout(initScrollAnimations, 100);
});

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Add some interactive hover effects
document.addEventListener('DOMContentLoaded', () => {
  // Add hover effect to project cards
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) scale(1)';
    });
  });
  
  // Add ripple effect to buttons
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.classList.add('ripple');
      
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
});

// Add CSS for ripple effect
const rippleCSS = `
.btn {
  position: relative;
  overflow: hidden;
}

.ripple {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transform: scale(0);
  animation: ripple-animation 0.6s linear;
  pointer-events: none;
}

@keyframes ripple-animation {
  to {
    transform: scale(4);
    opacity: 0;
  }
}
`;

// Inject ripple CSS
const style = document.createElement('style');
style.textContent = rippleCSS;
document.head.appendChild(style);
