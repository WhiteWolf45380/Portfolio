// Compétences - barres
const skills = [
  { name: "Python", icon: "assets/icons/python.png", level: 99, color: "#3776AB" },
  { name: "HTML / CSS", icon: "assets/icons/html.png", level: 70, color: "#E34F26" },
  { name: "JavaScript", icon: "assets/icons/javascript.png", level: 45, color: "#F7DF1E" },
  { name: "SQL", icon: "assets/icons/sql.png", level: 55, color: "#00b4baff" },
  { name: "Machine Learning", icon: "assets/icons/ml.png", level: 70, color: "#4CAF50" },
  { name: "Git / GitHub", icon: "assets/icons/github.png", level: 50, color: "#181717" },
];

const skills_container = document.querySelector('.skills-container');

skills.forEach(skill => {
  const skill_item = document.createElement('div');
  skill_item.className = 'skill-item';
  skill_item.innerHTML = `
    <div class="skill-header">
      <img src="${skill.icon}" alt="${skill.name} logo">
      <div class="skill-name">${skill.name}</div>
    </div>
    <div class="skill-bar">
      <div class="skill-fill" data-level="${skill.level}" style="background-color: ${skill.color}"></div>
    </div>
  `;
  skills_container.appendChild(skill_item);
});

  // Animation quand la barre apparaît
const skill_fills = document.querySelectorAll('.skill-fill');

const skills_observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      const fill = entry.target;
      const level = fill.dataset.level;
      fill.style.width = level + '%';
      skills_observer.unobserve(fill);
    }
  });
}, { threshold: 0.5 });

skill_fills.forEach(fill => skills_observer.observe(fill));


// Hobbies et Loisirs - cartes
const hobbiesData = [
  { emoji: "💻", name: "Programmation", description: "Développeur passionné, créant des projets personnels et explorant le machine learning" },
  { emoji: "🎮", name: "Jeux vidéo", description: "Joueur curieux, explorant FPS, stratégie et jeux d’horreur pour le plaisir et la détente" },
  { emoji: "📺", name: "Animes", description: "Amateur d’animes en tout genre, suivant principalement des shonens" },
  { emoji: "🏸", name: "Badminton", description: "Joueur régulier de badminton, développant réflexes, endurance et esprit de compétition amical" },
  { emoji: "♟️", name: "Échecs", description: "Joueur d’échecs intermédiaire (~1000 ELO), jouant occasionnellement pour le plaisir et la stratégie" }
];

const cards_container = document.querySelector('.cards-container');

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

  cards_container.appendChild(card);
});