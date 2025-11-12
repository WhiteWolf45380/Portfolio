// Effet d'apparition au scroll
const sections = document.querySelectorAll('section');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
      entry.target.style.transform = 'translateY(0)';
      entry.target.style.transition = 'all 0.8s ease';
    }
  });
}, { threshold: 0.08 });

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

  // On fixe le background au viewport
  body.style.backgroundAttachment = 'fixed';

  // image de fond
  const img = new Image();
  img.src = 'assets/background.jpg';
  img.onload = () => {
    function update_background() {
      const scroll_y = window.scrollY; // scroll réel
      const doc_height = document.documentElement.scrollHeight; // hauteur totale de la page
      const view_height = window.innerHeight; // hauteur du viewport
      const view_width = window.innerWidth; // largeur du viewport

      // zoom minimal vertical et horizontal
      const min_height = view_height * 1.25;
      const min_width  = view_width; 
      const img_height = Math.max(img.height, min_height);
      const img_width  = Math.max(img.width, min_width);

      // décalage de l'image proportionnel
      const offset = Math.round(scroll_y * (img_height - view_height) / (doc_height - view_height));

      // applique la taille et la position
      body.style.backgroundSize = `${img_width}px ${img_height}px`;
      body.style.backgroundPosition = `center ${-offset}px`;
    }

    window.addEventListener("scroll", update_background);
    window.addEventListener("resize", update_background);
    update_background();
  };
});

// Voile assombrissant dynamique
window.addEventListener("scroll", () => {
  const scroll_y = window.scrollY;
  const view_height = window.innerHeight;
  const doc_height = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);

  const scroll_ratio = scrollY / (doc_height - view_height);

  const max_blur = 6;
  const max_opacity = 0.3;

  const blur_value = scroll_ratio * max_blur;
  const opacity_value = 0.25 + scroll_ratio * (max_opacity - 0.25);

  document.body.style.setProperty('--veil-blur', `${blur_value}px`);
  document.body.style.setProperty('--veil-opacity', opacity_value);
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