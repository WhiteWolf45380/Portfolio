// Effet d'apparition au scroll
const sections = document.querySelectorAll('section');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
      entry.target.style.transform = 'translateY(0)';
      entry.target.style.transition = 'all 0.65s ease';
    }
  });
}, { threshold: 0.065 });

sections.forEach(section => {
  section.style.opacity = 0;
  section.style.transform = 'translateY(50px)';
  observer.observe(section);
});

// Menu de nav actif
const nav_links = document.querySelectorAll('nav a');
const current_page = window.location.pathname.split("/").pop() || "main.html";

nav_links.forEach(link => {
  if (link.getAttribute('href') === current_page) {
    link.classList.add('active');
  }
});

// Effet de fond
window.addEventListener("load", () => {
  const body = document.body;
  const particlesCanvas = document.getElementById('particles-canvas');

  // Fixage du background au viewport
  body.style.backgroundAttachment = 'fixed';

  // Image de fond
  const img = new Image();
  img.src = 'assets/background.jpg';
  img.onload = () => {
    function update_background() {
      const scroll_y = window.scrollY; // scroll réel
      const doc_height = document.documentElement.scrollHeight; // hauteur totale de la page
      const view_height = window.innerHeight; // hauteur du viewport
      const view_width = window.innerWidth; // largeur du viewport

      // zoom minimal vertical et horizontal
      const min_height = view_height * 1.3;
      const min_width  = view_width; 
      const img_height = Math.max(img.height, min_height);
      const img_width  = Math.max(img.width, min_width);

      // décalage de l'image proportionnel
      const offset = Math.round(scroll_y * (img_height - view_height) / (doc_height - view_height));

      // applique la taille et la position
      body.style.backgroundSize = `${img_width}px ${img_height}px`;
      body.style.backgroundPosition = `center ${-offset}px`;
      
      // Applique le même offset au canvas pour l'effet parallax
      if (particlesCanvas) {
        particlesCanvas.style.transform = `translateY(${-offset * 0.3}px)`;
      }
    }

    window.addEventListener("scroll", update_background);
    window.addEventListener("resize", update_background);
    update_background();
  };
});

// Voile assombrissant dynamique
const particlesCanvas = document.getElementById('particles-canvas');

window.addEventListener("scroll", () => {
  const scroll_y = window.scrollY;
  const view_height = window.innerHeight;
  const doc_height = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);

  const scroll_ratio = scrollY / (doc_height - view_height);

  const max_blur = 6;
  const max_opacity = 0.4;

  const blur_value = scroll_ratio * max_blur;
  const opacity_value = 0.25 + scroll_ratio * (max_opacity - 0.25);

  document.body.style.setProperty('--veil-blur', `${blur_value}px`);
  document.body.style.setProperty('--veil-opacity', opacity_value);
  
  // Applique le blur et l'opacité sur le canvas
  if (particlesCanvas) {
    particlesCanvas.style.filter = `blur(${blur_value}px) opacity(${1 - (scroll_ratio * 0.5)})`;
  }
});

// Survole des sections
sections.forEach(section => {
  section.addEventListener('mouseenter', () => {
    // retire la classe 'active' de toutes les sections
    sections.forEach(sec => sec.classList.remove('active'));
    // ajoute 'active' à la section survolée
    section.classList.add('active');
  });
});

// Progress bar de scroll
const progressBar = document.querySelector('.scroll-progress');

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  progressBar.style.height = scrollPercent + '%';
});

// Particules de fond
window.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return; // sécurité
  
  const ctx = canvas.getContext('2d');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const particleCount = 80;

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
      this.radius = Math.random() * 2 + 1;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }

    draw() {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 120) {
          ctx.strokeStyle = `rgba(255, 255, 255, ${0.2 - distance / 600})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(particle => {
      particle.update();
      particle.draw();
    });

    connectParticles();
    requestAnimationFrame(animate);
  }

  animate();

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
});