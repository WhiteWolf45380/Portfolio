// Projets - vidéos
const projects = [
  {
    name: "Othello",
    url: "https://github.com/WhiteWolf45380/Othello",
    description: "Un environnement de jeu Othello incluant deux modèles d'IA",
    video: "assets/projects_videos/othello.mp4",
    poster: "assets/projects_posters/othello.jpg",
  },
  {
    name: "Fractals Generator",
    url: "https://github.com/WhiteWolf45380/Fractals-Generator",
    description: "Un générateur de motifs récursifs complet",
    video: "assets/projects_videos/fractals_generator.mp4",
    poster: "assets/projects_posters/fractals_generator.jpg",
  },
  {
    name: "Class Master",
    url: "https://github.com/WhiteWolf45380/Class-Master",
    description: "Un générateur de plans de classe automatisé",
    video: "assets/projects_videos/class_master.mp4",
    poster: "assets/projects_posters/class_master.jpg",
  },
  {
    name: "The Myth of Velkuria",
    url: "https://github.com/WhiteWolf45380/The-Myth-of-Velkuria",
    description: "Jeu indépendant type Rogue Like en collaboration avec Waïbringer (en cours)",
    video: "assets/projects_videos/the_myth_of_velkuria.mp4",
    poster: "assets/projects_posters/the_myth_of_velkuria.jpg",
  },
  {
    name: "Environnement 3D",
    url: "https://github.com/WhiteWolf45380/Deep-Learning",
    description: "Un espace 3D virtuel utilisant la rasterization",
    video: "assets/projects_videos/3D_env.mp4",
    poster: "assets/projects_posters/3D_env.jpg",
  },
  {
    name: "Agent DDQN",
    url: "https://github.com/WhiteWolf45380/Deep-Learning",
    description: "Agent Double-Deep-Quality-Network ayant appris à jouer à cartpole-v1",
    video: "assets/projects_videos/ddqn.mp4",
    poster: "assets/projects_posters/ddqn.jpg",
  }
];

const container = document.getElementById("projects_container");

// Lecteur mp4
projects.forEach((proj, index) => {
  const div = document.createElement("div");
  div.className = "project_item";

  div.innerHTML = `
    <p>
      <span class="project_number">${index + 1}.</span>
      <a href="${proj.url}" target="_blank">${proj.name}</a> - ${proj.description}
    </p>
    <div class="video_container">
      <video class="project_video" muted playsinline preload="metadata" poster="${proj.poster}">
        <source src="${proj.video}" type="video/mp4">
        Vidéo non supportée par le navigateur.
      </video>
      <div class="video_overlay">▶</div>
    </div>
  `;

  container.appendChild(div);

  const video = div.querySelector('.project_video');
  const overlay = div.querySelector('.video_overlay');
  const video_container = div.querySelector('.video_container');

// Play/Pause toggle
overlay.addEventListener('click', () => {
  if (video.paused) {
    video.play();  // ← CETTE LIGNE MANQUE !
    overlay.textContent = "⏸";
    video_container.classList.add("playing");
  } else {
    video.pause();
    overlay.textContent = "▶";
    video_container.classList.remove("playing");
  }
});

// Vidéo finit
video.addEventListener('ended', () => {
  video.pause();
  video.currentTime = 0;
  video.load(); // force l'affichage du poster
  overlay.textContent = "▶";
  video_container.classList.remove("playing");  // ← C'était écrit "videoContainer" sans underscore
});

  // Vidéo sort du viewport
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting && !video.paused) {
        video.pause();
        video.currentTime = 0;
        video.load(); // affiche le poster
        overlay.textContent = "▶";
        video_container.classList.remove("playing");
      }
    });
  });

  observer.observe(video);
});

// Animation d'entrée des projets
const project_items = document.querySelectorAll('.project_item');

const observer_projects = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      observer_projects.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

project_items.forEach(item => {
  observer_projects.observe(item);
});