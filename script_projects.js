const projects = [
  {
    name: "Othello",
    url: "https://github.com/WhiteWolf45380/Othello",
    description: "Un environnement de jeu Othello incluant deux modèles d'IA",
    video: "assets/project_video_othello.mp4",
    poster: "assets/project_preview_othello.jpg",
  },
  {
    name: "Fractals Generator",
    url: "https://github.com/WhiteWolf45380/Fractals-Generator",
    description: "Un générateur de motifs récursifs complet",
    video: "assets/project_video_fractalsgenerator.mp4",
    poster: "assets/project_preview_fractalsgenerator.png",
  },
  {
    name: "Class Master",
    url: "https://github.com/WhiteWolf45380/Class-Master",
    description: "Un générateur de plans de classe automatisé",
    video: "assets/project_video_classmaster.mp4",
    poster: "assets/project_preview_classmaster.jpg",
  },
  {
    name: "The Myth of Velkuria",
    url: "https://github.com/WhiteWolf45380/The-Myth-of-Velkuria",
    description: "Jeu indépendant type Rogue Like en collaboration avec Waïbringer (en cours)",
    video: "assets/project_video_themythofvelkuria.mp4",
    poster: "assets/project_preview_themythofvelkuria.jpg",
  },
  {
    name: "Agent DDQN",
    url: "https://github.com/WhiteWolf45380/Deep-Learning",
    description: "Agent Double-Deep-Quality-Network ayant appris à jouer à cartpole-v1",
    video: "assets/project_video_ddqn.mp4",
    poster: "assets/project_preview_ddqn.jpg",
  }
];

const container = document.getElementById("projects_container");

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
  const videoContainer = div.querySelector('.video_container');

  // Play/Pause toggle
  overlay.addEventListener('click', () => {
    if (video.paused) {
      video.play().catch(() => console.log("Lecture automatique bloquée"));
      overlay.textContent = "⏸";
      videoContainer.classList.add("playing");
    } else {
      video.pause();
      overlay.textContent = "▶";
      videoContainer.classList.remove("playing");
    }
  });

  // Quand la vidéo finit → overlay Play visible + poster
  video.addEventListener('ended', () => {
    video.pause();
    video.currentTime = 0;
    video.load(); // force l’affichage du poster
    overlay.textContent = "▶";
    videoContainer.classList.remove("playing");
  });

  // Remise au début automatique si vidéo sort du viewport
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting && !video.paused) {
        video.pause();
        video.currentTime = 0;
        video.load(); // affiche le poster
        overlay.textContent = "▶";
        videoContainer.classList.remove("playing");
      }
    });
  });

  observer.observe(video);
});

// Animation d'entrée des projets
const projectItems = document.querySelectorAll('.project_item');

const observerProjects = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      observerProjects.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

projectItems.forEach(item => {
  observerProjects.observe(item);
});