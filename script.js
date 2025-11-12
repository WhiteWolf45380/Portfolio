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
const navLinks = document.querySelectorAll('nav a');
const currentPage = window.location.pathname.split("/").pop() || "main.html";

navLinks.forEach(link => {
  if (link.getAttribute('href') === currentPage) {
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
    function updateBackground() {
      const scrollY = window.scrollY; // scroll réel
      const docHeight = document.documentElement.scrollHeight; // hauteur totale de la page
      const viewHeight = window.innerHeight; // hauteur du viewport
      const viewWidth = window.innerWidth; // largeur du viewport

      // zoom minimal vertical et horizontal
      const minHeight = viewHeight * 1.2;
      const minWidth  = viewWidth; 
      const imgHeight = Math.max(img.height, minHeight);
      const imgWidth  = Math.max(img.width, minWidth);

      // décalage de l'image proportionnel
      const offset = Math.round(scrollY * (imgHeight - viewHeight) / (docHeight - viewHeight));

      // applique la taille et la position
      body.style.backgroundSize = `${imgWidth}px ${imgHeight}px`;
      body.style.backgroundPosition = `center ${-offset}px`;
    }

    window.addEventListener("scroll", updateBackground);
    window.addEventListener("resize", updateBackground);
    updateBackground();
  };
});