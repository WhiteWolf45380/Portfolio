// Animation des compétences
const skillFills = document.querySelectorAll('.skill-fill');

const skillsObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      const fill = entry.target;
      const level = fill.dataset.level;
      fill.style.width = level + '%';
      skillsObserver.unobserve(fill);
    }
  });
}, { threshold: 0.5 });

skillFills.forEach(fill => skillsObserver.observe(fill));


// Hobbies / Loisirs - cartes
const hobbiesData = [
  { emoji: "💻", name: "Programmation", description: "Développeur passionné, créant des projets personnels et explorant le machine learning" },
  { emoji: "🎮", name: "Jeux vidéo", description: "Joueur curieux, explorant FPS, stratégie et jeux d’horreur pour le plaisir et la détente" },
  { emoji: "📺", name: "Animes", description: "Amateur d’animes en tout genre, suivant principalement des shonens" },
  { emoji: "🏸", name: "Badminton", description: "Joueur régulier de badminton, développant réflexes, endurance et esprit de compétition amical" },
  { emoji: "♟️", name: "Échecs", description: "Joueur d’échecs intermédiaire (~1000 ELO), jouant occasionnellement pour le plaisir et la stratégie" }
];

const container = document.querySelector('.cards-container');

hobbiesData.forEach(hobby => {
  const card = document.createElement('div');
  card.className = 'card';

  card.innerHTML = `
    <div class="card-inner">
      <div class="card-front">
        <div class="card-emoji">${hobby.emoji}</div>
        <div class="card-name">${hobby.name}</div>
      </div>
      <div class="card-back">${hobby.description}</div>
    </div>
  `;

  card.addEventListener('click', () => {
    card.classList.toggle('flipped');
  });

  container.appendChild(card);
});