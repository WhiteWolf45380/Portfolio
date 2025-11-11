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