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
}, { threshold: 0.1 });

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
  
  body.style.backgroundAttachment = 'fixed';

  const img = new Image();
  img.src = 'assets/background.jpg';
  img.onload = () => {
    function updateBackground() {
      const scrollY = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight;
      const viewHeight = window.innerHeight;
      const maxScroll = scrollHeight - viewHeight;
      
      // Plus la page est longue par rapport au viewport, plus on ralentit
      const pageRatio = scrollHeight / viewHeight;
      const slowdownFactor = 1 / pageRatio; // Inversement proportionnel
      
      const coefficient = maxScroll > 0 ? slowdownFactor : 0;
      const offset = -scrollY * coefficient;

      body.style.backgroundSize = 'cover';
      body.style.backgroundPosition = `center ${offset}px`;
    }

    window.addEventListener("scroll", updateBackground);
    window.addEventListener("resize", updateBackground);
    updateBackground();
  };
});