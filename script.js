// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  mobileMenu.classList.toggle('active');
});

// Close mobile menu when a link is clicked
const mobileLinks = mobileMenu.querySelectorAll('a');
mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('active');
  });
});

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Lightbox for Gallery & Sheets
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');

// Zoom & Pan State
let scale = 1;
let pointX = 0;
let pointY = 0;
let startX = 0;
let startY = 0;
let isDragging = false;

// Zoom controls elements
const zoomInBtn = document.getElementById('zoom-in');
const zoomOutBtn = document.getElementById('zoom-out');
const zoomResetBtn = document.getElementById('zoom-reset');

function updateTransform() {
  lightboxImg.style.transform = `translate(${pointX}px, ${pointY}px) scale(${scale})`;
  if (scale > 1) {
    lightboxImg.style.cursor = isDragging ? 'grabbing' : 'grab';
  } else {
    lightboxImg.style.cursor = 'zoom-in';
  }
}

function resetZoom() {
  scale = 1;
  pointX = 0;
  pointY = 0;
  updateTransform();
}

// Select all gallery images, floor plans, and presentation sheets
const zoomableElements = document.querySelectorAll(
  '.gallery-img, .full-sheet-img, .hero-gallery-img, .fp-card img'
);

zoomableElements.forEach(element => {
  element.addEventListener('click', () => {
    resetZoom();
    lightboxImg.src = element.src;
    lightboxImg.alt = element.alt;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden'; // Stop page scrolling background
  });
});

function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = ''; // Restore background scroll
  resetZoom();
}

lightboxClose.addEventListener('click', closeLightbox);

// Close on clicking wrapper or outside image
lightbox.addEventListener('click', (e) => {
  const isOutside = e.target.classList.contains('lightbox') || 
                    e.target.classList.contains('lightbox-img-wrap') || 
                    e.target.id === 'lightbox-close';
  if (isOutside) {
    closeLightbox();
  }
});

// Esc Key to Close Lightbox
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && lightbox.classList.contains('active')) {
    closeLightbox();
  }
});

// Zoom Button Event Listeners
zoomInBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  scale = Math.min(scale + 0.5, 6);
  updateTransform();
});

zoomOutBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  scale = Math.max(scale - 0.5, 1);
  if (scale === 1) {
    pointX = 0;
    pointY = 0;
  }
  updateTransform();
});

zoomResetBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  resetZoom();
});

// Double click to zoom toggle
lightboxImg.addEventListener('dblclick', (e) => {
  e.stopPropagation();
  if (scale > 1) {
    resetZoom();
  } else {
    scale = 3.5;
    // Center-zoom relative to screen
    pointX = 0;
    pointY = 0;
    updateTransform();
  }
});

// Mouse wheel zoom
lightboxImg.addEventListener('wheel', (e) => {
  e.preventDefault();
  const zoomFactor = 0.15;
  if (e.deltaY < 0) {
    scale = Math.min(scale + zoomFactor, 6);
  } else {
    scale = Math.max(scale - zoomFactor, 1);
  }
  if (scale === 1) {
    pointX = 0;
    pointY = 0;
  }
  updateTransform();
}, { passive: false });

// Mouse drag and pan
lightboxImg.addEventListener('mousedown', (e) => {
  if (scale <= 1) return;
  e.preventDefault();
  isDragging = true;
  startX = e.clientX - pointX;
  startY = e.clientY - pointY;
  updateTransform();
});

window.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  pointX = e.clientX - startX;
  pointY = e.clientY - startY;
  updateTransform();
});

window.addEventListener('mouseup', () => {
  if (isDragging) {
    isDragging = false;
    updateTransform();
  }
});


// Skill Bars Animation on Scroll
const skillFills = document.querySelectorAll('.skill-fill');

const animateSkills = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
      observer.unobserve(entry.target);
    }
  });
};

const skillObserver = new IntersectionObserver(animateSkills, {
  threshold: 0.1
});

skillFills.forEach(fill => {
  skillObserver.observe(fill);
});

// Form Submission Simulation
function handleForm(event) {
  event.preventDefault();
  
  const submitBtn = document.getElementById('btn-form-submit');
  const successMsg = document.getElementById('form-success');
  
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending...';
  
  setTimeout(() => {
    submitBtn.style.display = 'none';
    successMsg.style.display = 'block';
  }, 1000);
}
